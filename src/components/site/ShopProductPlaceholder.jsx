import { Check, Clock } from "lucide-react";
import { Image } from "@/components/ui/image";
import { BRAND_LOGO } from "@/lib/brand";

export default function ShopProductPlaceholder({ product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-[#0b0f10]">
        {product.image_url ? (
          <Image src={product.image_url} alt={`${product.name} — representative product image`} fittingType="fill" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,hsl(var(--primary)/.18),transparent_62%)]" />
        )}
        <Image src={BRAND_LOGO} alt="" fittingType="fit" className="absolute inset-0 m-auto h-14 w-14 opacity-75" />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[.16em] text-white/75 backdrop-blur">Restocking</div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="font-mono text-[10px] uppercase tracking-[.22em] text-muted-foreground">{product.tag || "Boot media"}</div>
        <h3 className="mt-3 font-heading text-xl font-bold leading-snug tracking-tight sm:text-2xl">{product.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.short_description}</p>
        {product.specs?.length > 0 && (
          <ul className="mt-5 space-y-2">
            {product.specs.map((spec) => <li key={spec} className="flex items-start gap-2.5 text-xs text-muted-foreground"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" /><span>{spec}</span></li>)}
          </ul>
        )}
        <div className="mt-auto pt-7">
          <div className="border-t border-border pt-4">
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/35 bg-primary/10 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-primary">
              <Clock className="h-3.5 w-3.5" /> Temporarily unavailable
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">This item is between production runs. Contact us for an expected restock window.</p>
        </div>
      </div>
    </article>
  );
}