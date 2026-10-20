import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";

const ORDER_ID = /^[A-Za-z0-9-]{6,64}$/;

// Public lookup for the confirmation page. Returns purchase details only, never buyer details.
export default async function (req) {
  try {
    const body = await req.json().catch(() => ({}));
    const orderId = typeof body?.order_id === "string" ? body.order_id.trim() : "";
    if (!ORDER_ID.test(orderId)) {
      return Response.json({ error: "Missing PayPal order reference." }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);
    const rows = await base44.asServiceRole.entities.Order.filter({
      stripe_session_id: orderId,
      provider: "paypal",
    });
    const record = rows?.[0];

    if (!record) return Response.json({ paid: false });

    return Response.json({
      paid: record.status === "paid",
      amount_total: record.amount_total,
      items: (record.items || []).map((item) => ({
        name: item.name,
        quantity: item.quantity,
        amount: item.unit_amount,
      })),
      reference: orderId,
    });
  } catch (error) {
    console.log("getPaypalOrder failed", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}