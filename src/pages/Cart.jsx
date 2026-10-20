import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useCart } from "@/components/shop/CartProvider";
import { formatAUD } from "@/lib/shop";

export default function Cart() {
  const { items, subtotal, setQuantity, remove } = useCart();

  if (items.length === 0) {
    return (
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Cart ]</div>
          <h2 className="font-heading text-4xl font-bold tracking-tight">Your cart is empty.</h2>
          <p className="mt-4 text-muted-foreground">Add a drive from the shop and it will show up here.</p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[0_0_45px_-10px_hsl(var(--primary))]"
          >
            Browse the shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Cart ]</div>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Your cart.</h2>

        <div className="mt-12 grid lg:grid-cols-[1.6fr_1fr] gap-10 items-start">
          <ul className="divide-y divide-border rounded-lg border border-border bg-card">
            {items.map((item) => (
              <li key={item.product_id} className="flex gap-4 p-4 sm:p-6">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-background">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fittingType="fill"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold tracking-tight">{item.name}</h3>
                      <div className="mt-1 font-mono text-xs text-muted-foreground">{formatAUD(item.price_cents)} each</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(item.product_id)}
                      aria-label={`Remove ${item.name}`}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-4">
                    <div className="inline-flex items-center rounded-md border border-border">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.product_id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-9 text-center font-mono text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.product_id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-heading text-base font-bold">{formatAUD(item.price_cents * item.quantity)}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Order summary</div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Items</span>
                <span>{items.reduce((total, item) => total + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatAUD(subtotal)}</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-border pt-3">
                <span className="font-medium">Total (AUD)</span>
                <span className="font-heading text-lg font-bold">{formatAUD(subtotal)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[0_0_45px_-10px_hsl(var(--primary))]"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/shop"
              className="mt-3 inline-flex w-full items-center justify-center px-6 py-3 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Continue shopping
            </Link>
            <p className="mt-5 font-mono text-[11px] leading-relaxed text-muted-foreground">
              Delivery address is collected on the secure Stripe checkout page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}