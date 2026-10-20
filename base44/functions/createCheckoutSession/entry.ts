import { secrets } from "base44:runtime";
import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";

const STRIPE_API = "https://api.stripe.com/v1/checkout/sessions";

// Buyers must only ever be returned to this app. The X-Base44-App-Url header is normally
// set by the platform, but this endpoint is anonymous-reachable, so an unvalidated value
// would let a caller aim Stripe's success/cancel URLs at any site (open redirect).
const CANONICAL_ORIGIN = "https://loutish-launch-pad-craft.base44.app";
const ALLOWED_ORIGINS = new Set([
  CANONICAL_ORIGIN,
  "https://codelustre.com",
  "https://www.codelustre.com",
]);

function resolveOrigin(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return CANONICAL_ORIGIN;
  }
  const host = url.hostname.toLowerCase();
  const platformHost = host === "base44.app" || host.endsWith(".base44.app");
  const localHost = host === "localhost" || host === "127.0.0.1";
  if (ALLOWED_ORIGINS.has(url.origin)) return url.origin;
  // Platform-hosted origins (published app, builder preview) are ours; so is local dev.
  if (url.protocol === "https:" && platformHost) return url.origin;
  if (localHost) return url.origin;
  return CANONICAL_ORIGIN;
}

export default async function (req) {
  try {
    const stripeKey = secrets.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.log("createCheckoutSession: STRIPE_SECRET_KEY is not set");
      return Response.json({ error: "Payments are not configured yet." }, { status: 500 });
    }

    const appOrigin = req.headers.get("X-Base44-App-Url");
    if (!appOrigin) {
      console.log("createCheckoutSession: missing X-Base44-App-Url header");
      return Response.json({ error: "Checkout is unavailable from this address." }, { status: 400 });
    }
    const origin = resolveOrigin(appOrigin);

    const body = await req.json().catch(() => ({}));
    const requested = Array.isArray(body.items) ? body.items.slice(0, 20) : [];
    const wanted = requested
      .map((item) => ({
        id: typeof item?.product_id === "string" ? item.product_id : "",
        quantity: Math.min(Math.max(Number.parseInt(item?.quantity, 10) || 1, 1), 20),
      }))
      .filter((item) => item.id);

    if (wanted.length === 0) {
      return Response.json({ error: "Your cart is empty." }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);
    const catalog = await base44.asServiceRole.entities.Product.filter({
      id: { $in: wanted.map((item) => item.id) },
      active: true,
    });

    const lines = [];
    const orderItems = [];
    for (const want of wanted) {
      const product = catalog.find((entry) => entry.id === want.id);
      if (!product || typeof product.price_cents !== "number") continue;
      lines.push({ product, quantity: want.quantity });
      orderItems.push({
        product_id: product.id,
        name: product.name,
        quantity: want.quantity,
        unit_amount: Math.round(product.price_cents),
      });
    }

    if (lines.length === 0) {
      return Response.json({ error: "Those products are no longer available." }, { status: 400 });
    }

    const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";

    // Payment methods are managed on the Stripe account, not per session: Stripe removed
    // the payment_method_types parameter. Card is on by default, and any method enabled in
    // the Stripe dashboard (e.g. PayPal, where the account country supports it) appears at checkout.
    const buildParams = () => {
      const params = new URLSearchParams();
      params.append("mode", "payment");
      params.append("success_url", `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`);
      params.append("cancel_url", `${origin}/checkout/cart?canceled=1`);
      params.append("shipping_address_collection[allowed_countries][0]", "AU");
      params.append("billing_address_collection", "auto");
      params.append("metadata[base44_app_id]", secrets.get("BASE44_APP_ID") || "");
      if (email) params.append("customer_email", email);

      lines.forEach((line, index) => {
        const prefix = `line_items[${index}]`;
        params.append(`${prefix}[quantity]`, String(line.quantity));
        params.append(`${prefix}[price_data][currency]`, "aud");
        params.append(`${prefix}[price_data][unit_amount]`, String(Math.round(line.product.price_cents)));
        params.append(`${prefix}[price_data][product_data][name]`, line.product.name);
        if (line.product.short_description) {
          params.append(`${prefix}[price_data][product_data][description]`, line.product.short_description.slice(0, 300));
        }
        if (line.product.image_url) {
          params.append(`${prefix}[price_data][product_data][images][0]`, line.product.image_url);
        }
      });

      return params;
    };

    const createSession = async (params) => {
      const response = await fetch(STRIPE_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
        signal: AbortSignal.timeout(15000),
      });
      const payload = await response.json();
      if (!response.ok) {
        console.log("createCheckoutSession: Stripe error", response.status, JSON.stringify(payload?.error || {}));
      }
      return { ok: response.ok, payload };
    };

    const attempt = await createSession(buildParams());

    if (!attempt.ok) {
      return Response.json(
        { error: attempt.payload?.error?.message || "Stripe could not start the payment." },
        { status: 502 }
      );
    }

    const session = attempt.payload;
    await base44.asServiceRole.entities.Order.create({
      stripe_session_id: session.id,
      status: "pending",
      currency: session.currency || "aud",
      amount_total: session.amount_total ?? 0,
      customer_email: email,
      items: orderItems,
    });

    return Response.json({ url: session.url, id: session.id });
  } catch (error) {
    console.log("createCheckoutSession failed", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}