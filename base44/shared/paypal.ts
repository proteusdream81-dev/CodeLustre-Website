import { secrets } from "base44:runtime";

// Fixed test payment, matching the Stripe embedded checkout: A$49.00
export const PAYPAL_AMOUNT = 4900;
export const PAYPAL_CURRENCY = "AUD";
export const PAYPAL_DESCRIPTION = "Code Lustre — test payment";

export function paypalConfig() {
  const clientId = secrets.get("PAYPAL_CLIENT_ID") || "";
  const secret = secrets.get("PAYPAL_CLIENT_SECRET") || "";
  const mode = String(secrets.get("PAYPAL_ENV") || "sandbox").trim().toLowerCase();
  return { clientId, secret, live: mode === "live", configured: Boolean(clientId && secret) };
}

export function paypalApiBase(live) {
  return live ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
}

export async function paypalAccessToken(config) {
  const response = await fetch(`${paypalApiBase(config.live)}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${config.clientId}:${config.secret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    signal: AbortSignal.timeout(10000),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error_description || "PayPal rejected these credentials.");
  }
  return payload.access_token;
}

export async function paypalRequest(config, token, path, init = {}) {
  const response = await fetch(`${paypalApiBase(config.live)}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    signal: AbortSignal.timeout(15000),
  });
  const payload = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, payload };
}