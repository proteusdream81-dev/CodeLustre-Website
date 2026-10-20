import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import { serverError } from "../../shared/apiError.ts";
import {
  PAYPAL_AMOUNT,
  PAYPAL_CURRENCY,
  PAYPAL_DESCRIPTION,
  paypalAccessToken,
  paypalConfig,
  paypalRequest,
} from "../../shared/paypal.ts";

const ORDER_ID = /^[A-Za-z0-9-]{6,64}$/;

export default async function (req) {
  try {
    const body = await req.json().catch(() => ({}));
    const orderId = typeof body?.order_id === "string" ? body.order_id.trim() : "";
    if (!ORDER_ID.test(orderId)) {
      return Response.json({ error: "Missing PayPal order reference." }, { status: 400 });
    }

    const config = paypalConfig();
    if (!config.configured) {
      console.log("capturePaypalOrder: PayPal credentials are not set");
      return Response.json({ error: "PayPal is not configured yet." }, { status: 500 });
    }

    const token = await paypalAccessToken(config);
    let capture = await paypalRequest(config, token, `/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      body: JSON.stringify({}),
    });

    if (!capture.ok) {
      const issue = capture.payload?.details?.[0]?.issue;
      if (issue === "ORDER_ALREADY_CAPTURED") {
        // A retry or a double click: read the order back instead of capturing twice.
        capture = await paypalRequest(config, token, `/v2/checkout/orders/${orderId}`, { method: "GET" });
      } else {
        console.log("capturePaypalOrder: PayPal capture failed", capture.status, JSON.stringify(capture.payload?.details || {}));
        return Response.json(
          { error: capture.payload?.message || "PayPal could not complete the payment." },
          { status: 502 }
        );
      }
    }

    const order = capture.payload;
    const amount = order?.purchase_units?.[0]?.amount;
    const expected = (PAYPAL_AMOUNT / 100).toFixed(2);

    if (order?.status !== "COMPLETED" || amount?.currency_code !== PAYPAL_CURRENCY || amount?.value !== expected) {
      console.log("capturePaypalOrder: unexpected order state", order?.status, amount?.currency_code, amount?.value);
      return Response.json({ error: "PayPal did not confirm this payment." }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);
    const existing = await base44.asServiceRole.entities.Order.filter({
      stripe_session_id: orderId,
      provider: "paypal",
    });

    if (!existing?.length) {
      await base44.asServiceRole.entities.Order.create({
        provider: "paypal",
        stripe_session_id: orderId,
        status: "paid",
        currency: "aud",
        amount_total: PAYPAL_AMOUNT,
        items: [{ name: PAYPAL_DESCRIPTION, quantity: 1, unit_amount: PAYPAL_AMOUNT }],
      });
    }

    console.log("capturePaypalOrder: captured", orderId, amount.currency_code, amount.value);
    return Response.json({ paid: true, order_id: orderId });
  } catch (error) {
    return serverError("capturePaypalOrder", error);
  }
}