import { paypalConfig } from "../../shared/paypal.ts";

// The PayPal client ID is public by design (it is loaded by the PayPal buttons script),
// so it is safe to hand to the checkout page.
export default async function (req) {
  try {
    const config = paypalConfig();
    return Response.json({
      configured: config.configured,
      client_id: config.configured ? config.clientId : null,
    });
  } catch (error) {
    console.log("getPaypalClientId failed", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}