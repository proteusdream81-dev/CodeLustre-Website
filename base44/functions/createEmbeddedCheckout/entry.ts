import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";

// Fixed test amount for the embedded card checkout: A$49.00
const TEST_PAYMENT = {
  name: "Code Lustre — test payment",
  amount: 4900,
  currency: "aud",
};

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const checkout = await base44.asServiceRole.payments.createCheckout({
      items: [{ name: TEST_PAYMENT.name, amount: TEST_PAYMENT.amount }],
      currency: TEST_PAYMENT.currency,
      success_path: "/order/success",
      presentation: "embedded",
    });

    if (!checkout.embedded) {
      console.log("createEmbeddedCheckout: provider did not return an embedded checkout", checkout.checkout_id);
      return Response.json({ error: "Embedded checkout is not available for this payment account." }, { status: 502 });
    }

    console.log("createEmbeddedCheckout: created", checkout.checkout_id, checkout.amount_total, checkout.currency);

    return Response.json({
      checkout_id: checkout.checkout_id,
      currency: checkout.currency,
      amount_total: checkout.amount_total,
      embedded: checkout.embedded,
    });
  } catch (error) {
    console.log("createEmbeddedCheckout failed", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}