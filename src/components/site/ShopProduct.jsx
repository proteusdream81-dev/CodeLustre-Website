import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Plus, ShoppingCart } from "lucide-react";
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
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/40">
      <div className="relative aspect-[4/3] border-b border-border">
        <Image
          src={product.image_url}
          alt={product.name}
          fittingType="fill"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent pointer-events-none" />
        {product.badge && (
          <div className="absolute top-4 left-4 font-mono text-xs uppercase tracking-widest text-primary border border-primary/30 rounded-full px-2.5 py-0.5 backdrop-blur-sm">
            {product.badge}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        {product.tag && (
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{product.tag}</div>
        )}
        <h3 className="mt-4 font-heading text-xl sm:text-2xl font-bold tracking-tight">{product.name}</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{product.short_description}</p>

        {product.specs?.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {product.specs.map((spec) => (
              <li key={spec} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-8">
          <div className="flex items-end justify-between gap-4 pt-4 border-t border-border">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">AUD</div>
              <div className="font-heading text-xl font-bold tracking-tight">{formatAUD(product.price_cents)}</div>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {product.category === "accessory" ? "Add-on" : "Ships in 3–5 days"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[0_0_45px_-10px_hsl(var(--primary))]"
          >
            {justAdded ? (
              <>
                Added to cart <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                Add to cart <Plus className="w-4 h-4" />
              </>
            )}
          </button>
          <Link
            to={`/contact?product=${encodeURIComponent(product.name)}`}
            className="mt-4 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            Bulk order? <ShoppingCart className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}