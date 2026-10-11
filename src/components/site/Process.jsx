const steps = [
  { n: "01", title: "Discover", desc: "We map your goals, users, and constraints to define the right scope before a line of code." },
  { n: "02", title: "Design", desc: "Wireframes, UI, and a design system that keeps every screen cohesive and on brand." },
  { n: "03", title: "Build", desc: "We develop, integrate, and test with clean, maintainable code you actually own." },
  { n: "04", title: "Launch", desc: "We deploy, monitor, and iterate so your product keeps improving after release." },
];

export default function Process() {
  return (
    <section id="process" className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ How we work ]</div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">A clear path from idea to launch.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {steps.map((s) => (
            <div key={s.n} className="group relative bg-background p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-chart-2/60 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="font-mono text-sm mb-6 bg-gradient-to-br from-primary to-chart-2 bg-clip-text text-transparent">{s.n}</div>
              <h3 className="font-heading text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}