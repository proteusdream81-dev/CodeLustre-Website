import { MapPin } from "lucide-react";

export default function CareAudience() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Who it&apos;s for ]</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">Local sites, looked after properly.</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Small businesses and community organisations in the Manilla, Tamworth and New England region who want their website looked after properly, without paying agency prices.
          </p>
        </div>
        <div className="mt-10 inline-flex items-start gap-3 rounded-lg border border-border bg-card px-5 py-4 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 text-chart-2 shrink-0" />
          <span>Manilla &middot; Tamworth &middot; New England, NSW &mdash; and anywhere in Australia remotely.</span>
        </div>
      </div>
    </section>
  );
}