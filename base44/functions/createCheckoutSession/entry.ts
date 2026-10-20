import { secrets } from "base44:runtime";
import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";

const STRIPE_API = "https://api.stripe.com/v1/checkout/sessions";

function resolveOrigin(req, requested) {
  const headerOrigin = req.headers.get("X-Base44-App-Url");
  if (headerOrigin) return headerOrigin.replace(/\/$/, "");
  if (typeof requested === "string" && /^https:\/\/[a-z0-9.-]+(:\d+)?$/i.test(requested)) {
    return requested.replace(/\/$/, "");
  }
  return "";
}

export default async function (req) {
  try {
    const stripeKey = secrets.get("STRIPE_SECRET_KEY") || process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return Response.json({ error: "Payments are not configured yet." }, { status: 500 });
    }

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

    const origin = resolveOrigin(req, body.origin);
    if (!origin) {
      return Response.json({ error: "Missing site origin." }, { status: 400 });
    }

    const buildParams = (withPaypal) => {
      const params = new URLSearchParams();
      params.append("mode", "payment");
      params.append("payment_method_types[]", "card");
      if (withPaypal) params.append("payment_method_types[]", "paypal");
      params.append("success_url", `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`);
      params.append("cancel_url", `${origin}/checkout?canceled=1`);
      params.append("shipping_address_collection[allowed_countries][0]", "AU");
      params.append("billing_address_collection", "auto");

      const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
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
      return { ok: response.ok, status: response.status, payload: await response.json() };
    };

    let paypalEnabled = true;
    let attempt = await createSession(buildParams(true));

    if (!attempt.ok) {
      const message = String(attempt.payload?.error?.message || "").toLowerCase();
      if (message.includes("paypal")) {
        paypalEnabled = false;
        attempt = await createSession(buildParams(false));
      }
    }

    if (!attempt.ok) {
      const message = attempt.payload?.error?.message || "Stripe could not start the payment.";
      console.log("Stripe checkout failed", attempt.status, message);
      return Response.json({ error: message }, { status: 502 });
    }

    const session = attempt.payload;
    await base44.asServiceRole.entities.Order.create({
      stripe_session_id: session.id,
      status: "pending",
      currency: session.currency || "aud",
      amount_total: session.amount_total ?? 0,
      customer_email: typeof body.email === "string" ? body.email.trim() : "",
      items: orderItems,
    });

    return Response.json({ url: session.url, id: session.id, paypal_enabled: paypalEnabled });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}