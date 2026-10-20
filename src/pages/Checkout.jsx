import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useCart } from "@/components/shop/CartProvider";
import { formatAUD } from "@/lib/shop";

export default function Checkout() {
  const { items, subtotal } = useCart();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const canceled = new URLSearchParams(window.location.search).get("canceled");

  if (items.length === 0) return <Navigate to="/cart" replace />;

  const pay = async (event) => {
    event.preventDefault();
    setStatus("redirecting");
    setError("");

    // Stripe Checkout must be a top-level page. In the builder preview the app runs
    // inside an iframe, so open the tab now — while the click still counts — and
    // send it to the session URL once Stripe has created one.
    const isFramed = window.self !== window.top;
    const checkoutTab = isFramed ? window.open("", "_blank") : null;
    if (isFramed && !checkoutTab) {
      setError("Allow popups to continue to checkout.");
      setStatus("idle");
      return;
    }
    if (checkoutTab) checkoutTab.opener = null;

    try {
      const response = await base44.functions.invoke("createCheckoutSession", {
        items: items.map((item) => ({ product_id: item.product_id, quantity: item.quantity })),
        email: email.trim() || undefined,
      });
      const url = response.data?.url;
      if (!url) {
        checkoutTab?.close();
        setError(response.data?.error || "We couldn't start checkout. Please try again.");
        setStatus("idle");
        return;
      }
      if (checkoutTab) checkoutTab.location.replace(url);
      else window.location.assign(url);
    } catch (err) {
      checkoutTab?.close();
      setError(err?.response?.data?.error || "We couldn't start checkout. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Checkout ]</div>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Secure checkout.</h2>

        {canceled && (
          <div className="mt-8 rounded-md border border-chart-2/40 bg-chart-2/10 px-4 py-3 text-sm text-foreground">
            Payment was cancelled — your cart is still here whenever you&apos;re ready.
          </div>
        )}

        <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          <form onSubmit={pay} className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Contact</div>
            <label className="mt-5 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Email <span className="lowercase">(optional, for your receipt)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm transition focus:border-chart-2 focus:outline-none"
            />

            <div className="mt-8 rounded-md border border-border bg-background p-4">
              <div className="flex items-start gap-3">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  You&apos;ll pay on Stripe&apos;s secure checkout and add your delivery address there. Stripe shows every payment method available on our account, and we never see your card details.
                </p>
              </div>
            </div>

            {error && <p className="mt-5 text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={status === "redirecting"}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50 shadow-[0_0_45px_-10px_hsl(var(--primary))]"
            >
              {status === "redirecting" ? "Opening Stripe…" : `Pay ${formatAUD(subtotal)}`}
              {status !== "redirecting" && <ArrowRight className="w-4 h-4" />}
            </button>
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Secure Stripe checkout · AUD
            </p>
          </form>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Order summary</div>
            <ul className="mt-5 space-y-3">
              {items.map((item) => (
                <li key={item.product_id} className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">
                    {item.name} <span className="font-mono text-xs text-foreground/70">× {item.quantity}</span>
                  </span>
                  <span className="whitespace-nowrap">{formatAUD(item.price_cents * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-between gap-4 border-t border-border pt-3">
              <span className="font-medium">Total (AUD)</span>
              <span className="font-heading text-lg font-bold">{formatAUD(subtotal)}</span>
            </div>
            <Link
              to="/cart"
              className="mt-5 inline-flex w-full items-center justify-center rounded-md border border-border px-6 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Edit cart
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}