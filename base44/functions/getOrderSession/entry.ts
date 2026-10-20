import { secrets } from "base44:runtime";
import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import { serverError } from "../../shared/apiError.ts";

const STRIPE_API = "https://api.stripe.com/v1";

export default async function (req) {
  try {
    const stripeKey = secrets.get("STRIPE_SECRET_KEY") || process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return Response.json({ error: "Payments are not configured yet." }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const sessionId = typeof body.session_id === "string" ? body.session_id.trim() : "";
    if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
      return Response.json({ error: "Missing order reference." }, { status: 400 });
    }

    const response = await fetch(`${STRIPE_API}/checkout/sessions/${sessionId}?expand[]=line_items`, {
      headers: { Authorization: `Bearer ${stripeKey}` },
      signal: AbortSignal.timeout(15000),
    });
    const session = await response.json();
    if (!response.ok) {
      // Stripe's own text names the session and its failure mode, so log it and reply plainly.
      console.log("getOrderSession: Stripe lookup failed", response.status, session?.error?.message);
      return Response.json({ error: "Order not found." }, { status: 404 });
    }

    const paid = session.payment_status === "paid";
    const base44 = createClientFromRequest(req);
    const orderPage = await base44.asServiceRole.entities.Order.filter(
      { stripe_session_id: sessionId },
      { limit: 1 }
    );
    const order = orderPage.items?.[0];

    if (order && paid && order.status !== "paid") {
      await base44.asServiceRole.entities.Order.update(order.id, {
        status: "paid",
        customer_email: session.customer_details?.email || order.customer_email || "",
        shipping_name: session.customer_details?.name || "",
        amount_total: session.amount_total ?? order.amount_total,
      });
    }

    const items = order?.items?.length
      ? order.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          amount: (item.unit_amount || 0) * (item.quantity || 1),
        }))
      : (session.line_items?.data || []).map((line) => ({
          name: line.description || "Item",
          quantity: line.quantity || 1,
          amount: line.amount_total || 0,
        }));

    // A session id is the only thing identifying the caller, and it can travel in browser
    // history, logs or shared links. Return only what the confirmation page displays —
    // never the buyer's name, email or other personal details.
    return Response.json({
      paid,
      status: session.payment_status,
      amount_total: session.amount_total ?? 0,
      currency: session.currency || "aud",
      items,
    });
  } catch (error) {
    return serverError("getOrderSession", error);
  }
}