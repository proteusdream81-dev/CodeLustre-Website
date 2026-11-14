import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Plus, ShoppingCart, ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useCart } from "@/components/shop/CartProvider";
import { formatAUD } from "@/lib/shop";

export default function ShopProduct({ product }) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    add(product, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_60px_-35px_hsl(var(--primary)/.28)]">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-[#0b0f10]">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={`${product.name} — representative product image`}
            fittingType="fill"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_45%,hsl(var(--primary)/.14),transparent_60%)]">
            <div className="font-mono text-xs uppercase tracking-[.2em] text-primary/70">CodeLustre / Gear</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/65 via-transparent to-black/10 pointer-events-none" />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[.16em] text-white/75 backdrop-blur">
          Representative image
        </div>
        {product.badge && (
          <div className="absolute bottom-4 left-4 rounded-full border border-primary/35 bg-background/85 px-3 py-1 font-mono text-[9px] uppercase tracking-[.15em] text-primary backdrop-blur">
            {product.badge}
          </div>
        )}
        <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white/80 opacity-0 backdrop-blur transition group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          {product.tag && <div className="font-mono text-[10px] uppercase tracking-[.22em] text-primary">{product.tag}</div>}
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{product.category === "accessory" ? "Accessory" : "Boot media"}</span>
        </div>
        <h3 className="mt-3 font-heading text-xl font-bold leading-snug tracking-tight sm:text-2xl">{product.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.short_description}</p>

        {product.specs?.length > 0 && (
          <ul className="mt-5 space-y-2">
            {product.specs.map((spec) => (
              <li key={spec} className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-7">
          <div className="flex items-end justify-between gap-3 border-t border-border pt-4">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[.2em] text-muted-foreground">AUD</div>
              <div className="mt-1 font-heading text-2xl font-bold tracking-tight">{formatAUD(product.price_cents)}</div>
            </div>
            <span className="pb-1 text-right font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              {product.category === "accessory" ? "Add-on" : "Ships in 3–5 days"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            aria-live="polite"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_35px_-12px_hsl(var(--primary))] transition hover:brightness-110"
          >
            {justAdded ? <>Added to cart <Check className="h-4 w-4" /></> : <>Add to cart <Plus className="h-4 w-4" /></>}
          </button>
          <Link
            to={`/contact?product=${encodeURIComponent(product.name)}`}
            className="mt-4 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[.18em] text-muted-foreground transition-colors hover:text-primary"
          >
            Bulk order? <ShoppingCart className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}