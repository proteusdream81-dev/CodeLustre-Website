import { ArrowRight, ArrowUpRight } from "lucide-react";

const capabilities = ["Strategy", "UI / UX", "Web", "Mobile", "Brand", "DevOps"];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[520px] h-[520px] rounded-full bg-chart-2/15 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-24 w-[480px] h-[480px] rounded-full bg-chart-2/10 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 w-full">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-6">
          [ Web design &amp; app development studio ]
        </div>
        <h1 className="font-heading font-bold tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[1.04] max-w-4xl">
          We design websites and build apps that <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">launch brands.</span>
        </h1>
        <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
          LaunchPad Studio is a digital studio crafting high-performance websites and custom apps for ambitious teams, from first wireframe to launch and beyond.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[0_0_45px_-10px_hsl(var(--primary))]">
            Start a project <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#work" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md border border-border text-foreground font-medium hover:border-chart-2/60 hover:text-chart-2 transition">
            See our work <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="mt-20 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {capabilities.map((c, i) => (
            <span key={c} className="flex items-center gap-6">
              {i > 0 && <span className="text-chart-2">/</span>}
              <span>{c}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}