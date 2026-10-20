import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function StripePaymentForm() {
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
  );
}