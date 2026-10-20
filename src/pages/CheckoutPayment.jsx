import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Lock, ShieldCheck, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import StripePaymentForm from "@/components/shop/StripePaymentForm";
import PaypalPaymentForm from "@/components/shop/PaypalPaymentForm";

const METHODS = [
  { id: "card", label: "Card", detail: "Stripe", icon: CreditCard },
  { id: "paypal", label: "PayPal", detail: "PayPal balance or linked card", icon: Wallet },
];

export default function CheckoutPayment() {
  const [method, setMethod] = useState("card");

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Secure checkout ]</div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Pay your way.</h1>
        <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
          A fixed test payment of A$49.00. Pay by card or with your PayPal account — both in AUD, and your payment
          details never touch our servers.
        </p>

        <div className="mt-10 rounded-lg border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Amount due</div>
              <div className="mt-1 font-heading text-2xl font-bold tracking-tight">A$49.00</div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">
              <Lock className="h-3 w-3" /> Test mode
            </span>
          </div>

          <div className="grid gap-2 border-b border-border p-4 sm:grid-cols-2">
            {METHODS.map(({ id, label, detail, icon: Icon }) => {
              const selected = method === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMethod(id)}
                  aria-pressed={selected}
                  className={cn(
                    "flex items-center gap-3 rounded-md border px-4 py-3 text-left transition",
                    selected
                      ? "border-primary/60 bg-primary/10"
                      : "border-border hover:border-primary/40 hover:bg-secondary/40"
                  )}
                >
                  <Icon className={cn("h-5 w-5 shrink-0", selected ? "text-primary" : "text-muted-foreground")} />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">{label}</span>
                    <span className="block truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {detail}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {method === "card" ? <StripePaymentForm /> : <PaypalPaymentForm />}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Stripe &amp; PayPal · AUD · test card 4242 4242 4242 4242
          </p>
          <Link to="/shop" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Back to the shop
          </Link>
        </div>
      </div>
    </section>
  );
}