import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function CheckoutPayment() {
  const mountRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    let checkoutMount = null;

    const start = async () => {
      try {
        const { data } = await base44.functions.invoke("createEmbeddedCheckout", {});
        if (!active) return;

        if (!data?.embedded) {
          setError(data?.error || "The secure payment form could not load.");
          setStatus("error");
          return;
        }

        checkoutMount = await base44.payments.mountCheckout(mountRef.current, data, {
          onError: () => setError("The payment failed. Please try again."),
        });

        if (!active) {
          checkoutMount.destroy();
          return;
        }
        setStatus("ready");
      } catch (err) {
        if (!active) return;
        setError(err?.response?.data?.error || "The secure payment form could not load.");
        setStatus("error");
      }
    };

    start();

    return () => {
      active = false;
      checkoutMount?.destroy();
    };
  }, []);

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Secure checkout ]</div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Pay by card.</h1>
        <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
          A fixed test payment of A$49.00, processed by Stripe. Card details are entered below and never touch our servers.
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

          <div className="relative p-1 sm:p-2">
            {status === "loading" && (
              <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 text-muted-foreground">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-border border-t-primary" />
                <p className="font-mono text-xs uppercase tracking-widest">Loading secure form</p>
              </div>
            )}

            {status === "error" && (
              <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-sm text-destructive">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/60 hover:text-primary"
                >
                  Try again <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            <div ref={mountRef} className={status === "ready" ? "min-h-[280px]" : "hidden"} />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Stripe · AUD · test card 4242 4242 4242 4242
          </p>
          <Link to="/shop" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Back to the shop
          </Link>
        </div>
      </div>
    </section>
  );
}