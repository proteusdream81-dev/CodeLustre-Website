import { paypalConfig } from "../../shared/paypal.ts";
import { serverError } from "../../shared/apiError.ts";

// The PayPal client ID is public by design (the PayPal script loads it in the browser), so
// leaking it is harmless. Its only real cost is being called from anywhere, so answer only
// this app's own pages: the platform sets X-Base44-App-Url on every in-app call.
const CANONICAL_ORIGIN = "https://loutish-launch-pad-craft.base44.app";
const ALLOWED_ORIGINS = new Set([
  CANONICAL_ORIGIN,
  "https://codelustre.com",
  "https://www.codelustre.com",
]);

function isAppRequest(raw: string | null): boolean {
  if (!raw) return false;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  if (ALLOWED_ORIGINS.has(url.origin)) return true;
  const host = url.hostname.toLowerCase();
  // Platform-hosted origins (published app, builder preview) are ours; so is local dev.
  if (url.protocol === "https:" && (host === "base44.app" || host.endsWith(".base44.app"))) return true;
  return host === "localhost" || host === "127.0.0.1";
}

export default async function (req) {
  try {
    if (!isAppRequest(req.headers.get("X-Base44-App-Url"))) {
      console.log("getPaypalClientId: refused a request that did not come from the app");
      return Response.json({ error: "Unavailable from this address." }, { status: 403 });
    }

    const config = paypalConfig();
    return Response.json({
      configured: config.configured,
      client_id: config.configured ? config.clientId : null,
    });
  } catch (error) {
    return serverError("getPaypalClientId", error);
  }
}