import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useCart } from "@/components/shop/CartProvider";
import { formatAUD } from "@/lib/shop";

export default function OrderSuccess() {
  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  const { clear } = useCart();
  const [order, setOrder] = useState(null);
  const [state, setState] = useState("loading");
  const cleared = useRef(false);

  useEffect(() => {
    if (!sessionId) {
      setState("missing");
      return;
    }
    base44.functions
      .invoke("getOrderSession", { session_id: sessionId })
      .then(({ data }) => {
        setOrder(data);
        setState(data?.paid ? "paid" : "pending");
        if (data?.paid && !cleared.current) {
          cleared.current = true;
          clear();
        }
      })
      .catch(() => setState("error"));
  }, [sessionId]);

  if (state === "loading" || state === "pending") {
    return (
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight">
            {state === "pending" ? "Confirming your payment…" : "Loading your order…"}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {state === "pending"
              ? "Stripe is still finalising this payment. Refresh in a moment if it hasn't updated."
              : "One moment while we pull the details."}
          </p>
        </div>
      </section>
    );
  }

  if (state !== "paid") {
    return (
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight">We couldn&apos;t find that order.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            If you were charged, email us and we&apos;ll sort it out straight away.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Back to the shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <Check className="h-7 w-7 text-primary" />
          </div>
          <h2 className="mt-6 font-heading text-4xl font-bold tracking-tight">Order confirmed.</h2>
          <p className="mt-3 text-muted-foreground">
            Thanks{order?.name ? `, ${order.name.split(" ")[0]}` : ""} — we&apos;re preparing your order and will email tracking details
            {order?.email ? ` to ${order.email}` : ""}.
          </p>
        </div>

        <div className="mt-12 rounded-lg border border-border bg-card p-6 sm:p-8">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">What you ordered</div>
          <ul className="mt-5 divide-y divide-border">
            {order.items?.map((item) => (
              <li key={item.name} className="flex justify-between gap-4 py-3 text-sm">
                <span>
                  {item.name} <span className="font-mono text-xs text-muted-foreground">× {item.quantity}</span>
                </span>
                <span className="whitespace-nowrap">{formatAUD(item.amount)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between gap-4 border-t border-border pt-4">
            <span className="font-medium">Total paid (AUD)</span>
            <span className="font-heading text-lg font-bold">{formatAUD(order.amount_total)}</span>
          </div>
          <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Reference {sessionId}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3.5 font-medium text-foreground transition hover:border-primary/60 hover:text-primary"
          >
            Continue shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}