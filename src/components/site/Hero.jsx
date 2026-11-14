import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Layers3,
  MonitorSmartphone,
  ShieldCheck,
} from "lucide-react";

const heroImage =
  "https://images.pexels.com/photos/17489150/pexels-photo-17489150/free-photo-of-light-on-computer-hardware.jpeg?auto=compress&dpr=1&h=750&w=1260";

const capabilities = ["Strategy", "UI / UX", "Web", "Mobile", "Commerce", "Support"];

const buildLayers = [
  { icon: Layers3, label: "Experience design", detail: "Clear journeys · thoughtful interfaces", tone: "text-primary" },
  { icon: Code2, label: "Product engineering", detail: "Websites · apps · integrations", tone: "text-chart-2" },
  { icon: ShieldCheck, label: "Launch & care", detail: "Testing · handover · ongoing support", tone: "text-primary" },
];

export default function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 92%)",
        }}
      />
      <div className="pointer-events-none absolute -top-48 left-[15%] h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-48 top-1/4 h-[34rem] w-[34rem] rounded-full bg-chart-2/10 blur-[150px]" />

      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:py-20">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-border bg-card/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground shadow-lg shadow-black/10 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Digital studio · NSW, Australia
          </div>

          <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-[4.4rem]">
            We design digital experiences that{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-chart-2 bg-clip-text text-transparent">
              move business forward.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            CodeLustre brings strategy, design and development together to build
            high-performance websites, custom apps and online stores — from the
            first conversation through to launch and ongoing care.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-[0_0_42px_-12px_hsl(var(--primary))] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_55px_-10px_hsl(var(--primary))]"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card/40 px-6 py-3.5 font-medium text-foreground transition hover:border-chart-2/60 hover:bg-card"
            >
              Explore selected work
              <ArrowUpRight className="h-4 w-4 text-chart-2" />
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border/80 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:gap-x-7">
            {capabilities.map((item, index) => (
              <span key={item} className="flex items-center gap-5 sm:gap-7">
                {index > 0 && <span className="text-chart-2/80">/</span>}
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[35rem] lg:ml-auto">
          <div className="pointer-events-none absolute -inset-7 rounded-[2rem] bg-gradient-to-br from-primary/15 via-transparent to-chart-2/20 blur-2xl" />
          <div className="relative aspect-[5/4] overflow-hidden rounded-xl border border-white/10 bg-[#090b0b] shadow-[0_32px_100px_-42px_rgba(0,0,0,0.95)] sm:aspect-[4/5] lg:aspect-[4/5]">
            <img
              src={heroImage}
              alt="Close-up of illuminated computer hardware and intricate electronic components"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#071012]/10 via-[#071012]/5 to-[#050707]/90" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-chart-2/15 mix-blend-screen" />

            <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3 sm:left-6 sm:right-6 sm:top-6">
              <span className="rounded-full border border-white/20 bg-black/45 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                CodeLustre / Digital studio
              </span>
              <span className="rounded-full border border-primary/35 bg-black/45 px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-primary backdrop-blur-md">
                Design · Build · Evolve
              </span>
            </div>

            <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/15 bg-[#070909]/85 p-4 shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-5">
              <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">From idea to impact</div>
                  <div className="mt-2 font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    One connected build.
                  </div>
                </div>
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 sm:flex">
                  <MonitorSmartphone className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                {buildLayers.map(({ icon: Icon, label, detail, tone }, index) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] " + tone}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-heading text-xs font-semibold text-white sm:text-sm">{label}</div>
                      <div className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-white/45 sm:text-[9px]">{detail}</div>
                    </div>
                    <span className="font-mono text-[9px] text-primary/70">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-4 -left-4 hidden h-14 w-14 rounded-lg border border-chart-2/25 bg-chart-2/[0.05] sm:block" />
          <div className="pointer-events-none absolute -right-4 -top-4 hidden h-9 w-9 rounded-full border border-primary/30 bg-primary/10 sm:block" />
        </div>
      </div>
    </section>
  );
}
