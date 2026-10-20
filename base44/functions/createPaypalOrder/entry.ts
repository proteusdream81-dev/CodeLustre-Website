import {
  PAYPAL_AMOUNT,
  PAYPAL_CURRENCY,
  PAYPAL_DESCRIPTION,
  paypalConfig,
  paypalAccessToken,
  paypalRequest,
} from "../../shared/paypal.ts";

export default async function (req) {
  try {
    const config = paypalConfig();
    if (!config.configured) {
      console.log("createPaypalOrder: PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET are not set");
      return Response.json({ error: "PayPal is not configured yet." }, { status: 500 });
    }

    const token = await paypalAccessToken(config);
    const created = await paypalRequest(config, token, "/v2/checkout/orders", {
      method: "POST",
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            description: PAYPAL_DESCRIPTION,
            amount: {
              currency_code: PAYPAL_CURRENCY,
              value: (PAYPAL_AMOUNT / 100).toFixed(2),
            },
          },
        ],
      }),
    });

    if (!created.ok || !created.payload?.id) {
      console.log("createPaypalOrder: PayPal rejected the order", created.status, JSON.stringify(created.payload?.details || {}));
      return Response.json(
        { error: created.payload?.message || "PayPal could not start the payment." },
        { status: 502 }
      );
    }

    console.log("createPaypalOrder: created", created.payload.id, PAYPAL_CURRENCY, PAYPAL_AMOUNT);
    return Response.json({ id: created.payload.id });
  } catch (error) {
    console.log("createPaypalOrder failed", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}