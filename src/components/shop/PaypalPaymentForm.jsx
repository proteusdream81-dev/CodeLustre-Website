import { useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";

const SDK_ID = "paypal-checkout-sdk";

function loadPaypalSdk(clientId) {
  return new Promise((resolve, reject) => {
    if (window.paypal?.Buttons) {
      resolve(window.paypal);
      return;
    }

    const fail = () => reject(new Error("PayPal could not load."));
    const existing = document.getElementById(SDK_ID);

    if (existing) {
      existing.addEventListener("load", () => (window.paypal?.Buttons ? resolve(window.paypal) : fail()));
      existing.addEventListener("error", fail);
      return;
    }

    const script = document.createElement("script");
    script.id = SDK_ID;
    script.async = true;
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
      clientId
    )}&currency=AUD&intent=capture&components=buttons`;
    script.onload = () => (window.paypal?.Buttons ? resolve(window.paypal) : fail());
    script.onerror = fail;
    document.body.appendChild(script);
  });
}

export default function PaypalPaymentForm() {
  const holder = useRef(null);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    let buttons = null;

    const start = async () => {
      try {
        const { data } = await base44.functions.invoke("getPaypalClientId", {});
        if (!active) return;

        if (!data?.configured) {
          setStatus("unavailable");
          return;
        }

        const paypal = await loadPaypalSdk(data.client_id);
        if (!active) return;

        buttons = paypal.Buttons({
          style: { layout: "vertical", color: "gold", shape: "rect", label: "paypal", height: 48 },
          createOrder: async () => {
            const { data: created } = await base44.functions.invoke("createPaypalOrder", {});
            if (!created?.id) throw new Error(created?.error || "PayPal could not start the payment.");
            return created.id;
          },
          onApprove: async ({ orderID }) => {
            setMessage("Confirming your PayPal payment…");
            const { data: captured } = await base44.functions.invoke("capturePaypalOrder", { order_id: orderID });
            if (!captured?.paid) {
              setMessage(captured?.error || "PayPal could not complete the payment. Please try again.");
              return;
            }
            window.location.assign(`/order/success?provider=paypal&order_id=${encodeURIComponent(orderID)}`);
          },
          onCancel: () => setMessage("PayPal payment cancelled. Nothing was charged."),
          onError: () => setMessage("PayPal could not complete the payment. Please try again."),
        });

        await buttons.render(holder.current);
        if (!active) return;
        setStatus("ready");
      } catch (err) {
        if (!active) return;
        setMessage(err?.response?.data?.error || err?.message || "PayPal could not load.");
        setStatus("error");
      }
    };

    start();

    return () => {
      active = false;
      try {
        buttons?.close();
      } catch {
        // nothing to close
      }
    };
  }, []);

  return (
    <div className="min-h-[280px] p-4 sm:p-6">
      {status === "loading" && (
        <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 text-muted-foreground">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-border border-t-primary" />
          <p className="font-mono text-xs uppercase tracking-widest">Loading PayPal</p>
        </div>
      )}

      {(status === "unavailable" || status === "error") && (
        <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 px-4 text-center">
          <p className="text-sm text-muted-foreground">
            {status === "unavailable"
              ? "PayPal isn't available right now. Please pay by card instead."
              : message}
          </p>
        </div>
      )}

      <div ref={holder} className={status === "ready" ? "" : "hidden"} />

      {status === "ready" && message && (
        <p className="mt-4 text-center text-sm text-muted-foreground">{message}</p>
      )}
    </div>
  );
}