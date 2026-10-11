const values = ["Precision", "Craft", "Partnership", "Speed"];

export default function About() {
  return (
    <section id="about" className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ About the studio ]</div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Design craft meets <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">engineering rigor.</span>
            </h2>
          </div>
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              LaunchPad Studio helps founders and teams turn ideas into shipped products. We pair design craft with engineering discipline, so every site we design and every app we build is fast, beautiful, and built to last.
            </p>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We work as one team across strategy, design, and development, which means fewer handoffs, clearer communication, and a product that actually matches the vision.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {values.map((v) => (
                <span key={v} className="font-mono text-xs uppercase tracking-widest border border-border rounded-full px-4 py-1.5 text-foreground transition-colors hover:border-chart-2/50">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}