// Every payment endpoint is anonymous-reachable, and a thrown error's text carries provider
// internals (Stripe/PayPal messages, sandbox vs live, credential failure modes). Keep that
// text in the server log only and hand anonymous callers one fixed, non-revealing reply.
export const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";

export function serverError(label: string, error: unknown): Response {
  const detail = error instanceof Error ? error.message : String(error);
  console.log(`${label} failed`, detail);
  return Response.json({ error: GENERIC_ERROR_MESSAGE }, { status: 500 });
}