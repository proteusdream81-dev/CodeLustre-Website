import GreyhoundCaseStudy from "@/components/site/GreyhoundCaseStudy";

export default function Work() {
  return (
    <section id="work" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Our work ]</div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Selected work.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Designed, built and launched for a NSW greyhound rescue, now live and in daily use.
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-1 self-start">
            Live
          </span>
        </div>

        <GreyhoundCaseStudy />
      </div>
    </section>
  );
}