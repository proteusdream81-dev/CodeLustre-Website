const MAILTO = "mailto:schradercapitol@gmail.com?subject=Website%20care%20plan%20enquiry";

export default function CarePricing() {
  return (
    <section className="border-b border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Pricing ]</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">One simple monthly plan.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
              No lock-in contracts — cancel anytime. Need something bigger? One-off work and larger changes are always available, quoted up front.
            </p>
            <a
              href={MAILTO}
              className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[0_0_45px_-10px_hsl(var(--primary))]"
            >
              Start your plan
            </a>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-primary/30 bg-background p-8 sm:p-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary via-chart-2 to-transparent" />
            <div className="font-mono text-xs uppercase tracking-widest text-chart-2">Code Lustre Care</div>
            <p className="mt-6 flex items-end gap-2 font-heading font-bold tracking-tight">
              <span className="text-5xl sm:text-6xl">$50</span>
              <span className="text-base font-medium text-muted-foreground mb-2">per month</span>
            </p>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              Everything in the monthly care plan, backed by the designer who built your site. Billed monthly in Australian dollars.
            </p>
            <dl className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Contract</dt>
                <dd className="text-foreground">None — cancel anytime</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Content edits</dt>
                <dd className="text-foreground">Up to 1 hour monthly</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Response time</dt>
                <dd className="text-foreground">Within 1 business day</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}