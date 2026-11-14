import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Layers3,
  MonitorSmartphone,
  ShieldCheck,
} from "lucide-react";

const capabilities = ["Strategy", "UI / UX", "Web", "Mobile", "Commerce", "Support"];

const buildLayers = [
  { icon: Layers3, label: "Experience design", detail: "Clear journeys · thoughtful interfaces", tone: "text-primary" },
  { icon: Code2, label: "Product engineering", detail: "Websites · apps · integrations", tone: "text-chart-2" },
  { icon: ShieldCheck, label: "Launch & care", detail: "Testing · handover · ongoing support", tone: "text-primary" },
];

export default function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden border-b border-border">
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

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-border bg-card/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground shadow-lg shadow-black/10 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Digital studio · NSW, Australia
          </div>

          <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-[4.65rem]">
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

          <div className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border/80 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:gap-x-7">
            {capabilities.map((item, index) => (
              <span key={item} className="flex items-center gap-5 sm:gap-7">
                {index > 0 && <span className="text-chart-2/80">/</span>}
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:ml-auto">
          <div className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-chart-2/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-xl border border-border bg-[#090b0b]/95 shadow-[0_32px_100px_-42px_rgba(0,0,0,0.95)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">CodeLustre / Studio</span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/35">01 — 03</span>
            </div>

            <div className="relative overflow-hidden px-5 py-7 sm:px-7 sm:py-8">
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">From idea to impact</div>
                    <div className="mt-2 font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">One connected build.</div>
                  </div>
                  <div className="hidden h-12 w-12 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 sm:flex">
                    <MonitorSmartphone className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <div className="my-7 flex items-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/80 to-chart-2/70" />
                  <span className="h-2 w-2 rotate-45 border border-primary bg-[#090b0b]" />
                  <div className="h-px flex-1 bg-gradient-to-r from-chart-2/70 to-transparent" />
                </div>

                <div className="space-y-3">
                  {buildLayers.map(({ icon: Icon, label, detail, tone }, index) => (
                    <div
                      key={label}
                      className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:border-primary/30 hover:bg-white/[0.06]"
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/30 ${tone}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-heading text-sm font-semibold text-white">{label}</div>
                        <div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-white/40 sm:text-[10px]">{detail}</div>
                      </div>
                      <span className="font-mono text-[10px] text-primary/70">0{index + 1}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/[0.06] px-4 py-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">Thoughtful by design</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Built around you ↗</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
              <span>Design / Build / Support</span>
              <span>NSW · Australia</span>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-5 -left-5 hidden h-16 w-16 rounded-lg border border-chart-2/20 bg-chart-2/[0.04] sm:block" />
          <div className="pointer-events-none absolute -right-4 -top-4 hidden h-9 w-9 rounded-full border border-primary/30 bg-primary/10 sm:block" />
        </div>
      </div>
    </section>
  );
}
