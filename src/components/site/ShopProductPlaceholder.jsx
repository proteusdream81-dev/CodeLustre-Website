import { Check, Clock } from "lucide-react";
import { Image } from "@/components/ui/image";
import { BRAND_LOGO } from "@/lib/brand";

/**
 * Restocking card for a boot drive that is not currently for sale.
 * Mirrors the ShopProduct layout but shows no price and no purchase actions.
 */
export default function ShopProductPlaceholder({ product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/40">
      <div className="relative aspect-[4/3] border-b border-border bg-background">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, hsl(var(--primary) / 0.18), transparent 62%)",
          }}
        />
        <Image
          src={BRAND_LOGO}
          alt=""
          fittingType="fit"
          className="absolute inset-0 m-auto h-24 w-24 opacity-75"
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
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {product.tag || "Restocking"}
        </div>
        <h3 className="mt-4 font-heading text-xl sm:text-2xl font-bold tracking-tight">{product.name}</h3>

        {product.specs?.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {product.specs.map((spec) => (
              <li key={spec} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="w-4 h-4 mt-0.5 text-primary/50 shrink-0" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-8">
          <div className="border-t border-border pt-5">
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-primary">
              <Clock className="w-3.5 h-3.5" />
              Unavailable — Back soon
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            This drive is between runs. Check back soon or ask us about the next batch.
          </p>
        </div>
      </div>
    </article>
  );
}