import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Layers3,
  MonitorSmartphone,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import ShelfLifeVisual from "@/components/site/work/ShelfLifeVisual";
import LindenVisual from "@/components/site/work/LindenVisual";
import GreyhoundVisual from "@/components/site/work/GreyhoundVisual";

const services = [
  {
    number: "01",
    title: "Websites that work harder.",
    description: "Clear, responsive websites that explain what you do and make it easy for customers to take the next step.",
    icon: MonitorSmartphone,
    to: "/services",
    tone: "text-primary",
  },
  {
    number: "02",
    title: "Apps built around people.",
    description: "Purpose-built web and mobile applications, portals and workflows shaped around real user needs.",
    icon: Code2,
    to: "/services",
    tone: "text-chart-2",
  },
  {
    number: "03",
    title: "Commerce without friction.",
    description: "Online stores, product catalogues and connected checkout experiences that support the way you sell.",
    icon: ShoppingBag,
    to: "/shop",
    tone: "text-primary",
  },
  {
    number: "04",
    title: "Support beyond launch.",
    description: "Practical maintenance, improvements and technical support to help your digital presence stay useful.",
    icon: ShieldCheck,
    to: "/care-plans",
    tone: "text-chart-2",
  },
];

const steps = [
  { number: "01", title: "Discover", description: "Understand the goal, audience and constraints." },
  { number: "02", title: "Design", description: "Shape the structure and experience before build." },
  { number: "03", title: "Build", description: "Develop, integrate and test the agreed solution." },
  { number: "04", title: "Launch", description: "Deploy, hand over and plan what comes next." },
];

function SectionIntro({ eyebrow, title, description }) {
  return (
    <div className="mb-12 max-w-2xl sm:mb-16">
      <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">[ {eyebrow} ]</div>
      <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-5 max-w-xl leading-7 text-muted-foreground">{description}</p>}
    </div>
  );
}

export default function HomeTeasers() {
  return (
    <>
      <section id="services" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionIntro
              eyebrow="What we build"
              title="Technology should make things easier."
              description="From a sharper online presence to a custom platform, we bring the right mix of design and engineering to the problem in front of you."
            />
            <Link to="/services" className="mb-12 inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary transition hover:gap-3 sm:mb-16">
              Explore all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {services.map(({ number, title, description, icon: Icon, to, tone }) => (
              <Link
                key={number}
                to={to}
                className="group relative overflow-hidden rounded-lg border border-border bg-card/65 p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-card sm:p-8"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/60 via-chart-2/30 to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-5">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background ${tone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60">{number} / 04</span>
                </div>
                <h3 className="mt-7 font-heading text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">{description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground transition group-hover:text-primary">
                  Find out more <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="border-b border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionIntro
              eyebrow="Selected work"
              title="Ideas made tangible."
              description="A look at products and platforms shaped by CodeLustre — from our own software to digital experiences built for organisations."
            />
            <Link to="/work" className="mb-12 inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary transition hover:gap-3 sm:mb-16">
              View the work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-2">
            <article className="min-w-0">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">01 / Owned product</div>
                  <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight">ShelfLife</h3>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-primary">In development</span>
              </div>
              <ShelfLifeVisual />
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                A social reading app for tracking books, organising shelves and sharing a reading life with others.
              </p>
              <Link to="/work" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-primary">
                Explore the build <ArrowRight className="h-4 w-4" />
              </Link>
            </article>

            <div className="space-y-8">
              <article className="min-w-0">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-chart-2">02 / Client platform</div>
                    <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight">Greyhound Re-Homing</h3>
                  </div>
                  <span className="rounded-full border border-chart-2/30 bg-chart-2/5 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-chart-2">Live</span>
                </div>
                <GreyhoundVisual />
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  A welcoming digital home that helps people discover greyhounds, understand rehoming and connect with the organisation.
                </p>
              </article>

              <article className="grid gap-5 rounded-lg border border-border bg-card/60 p-5 sm:grid-cols-[0.8fr_1.2fr] sm:items-center sm:p-6">
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">03 / Product concept</div>
                  <h3 className="mt-2 font-heading text-xl font-bold tracking-tight">Linden</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Animal care and rehoming workflows, brought into one considered interface.</p>
                  <span className="mt-3 inline-flex rounded-full border border-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">In development</span>
                </div>
                <div className="min-w-0"><LindenVisual /></div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <SectionIntro
            eyebrow="How we work"
            title="A clear path from idea to launch."
            description="Good delivery is more than a polished screen. We keep the process visible, the scope considered and the technical choices practical."
          />
          <div className="grid overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="group relative bg-background p-6 transition hover:bg-card sm:p-7">
                <div className="mb-7 flex items-center justify-between">
                  <span className="font-mono text-sm text-primary">{step.number}</span>
                  {index < steps.length - 1 && <span className="hidden h-px w-10 bg-gradient-to-r from-primary/70 to-chart-2/50 lg:block" />}
                </div>
                <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/25">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-[#0b0d0b] p-7 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-0 right-1/3 h-40 w-40 rounded-full bg-chart-2/10 blur-[80px]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> Ongoing care
                </div>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">Your website deserves attention after launch.</h2>
                <p className="mt-4 max-w-xl leading-7 text-white/55">
                  Code Lustre Care keeps the essentials covered with updates, backups, monitoring and agreed content changes — so you can focus on running your business.
                </p>
              </div>
              <div className="relative flex flex-col items-start gap-4 lg:items-end">
                <div className="font-heading text-4xl font-bold text-white"><span className="text-primary">$50</span><span className="ml-1 text-base font-medium text-white/45">/ month</span></div>
                <Link to="/care-plans" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5">
                  View care plans <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "radial-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">[ Your next move ]</div>
            <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Have an idea worth building?</h2>
            <p className="mx-auto mt-6 max-w-xl leading-7 text-muted-foreground">
              Tell us what you want to improve, launch or make possible. We’ll help turn the moving parts into a practical next step.
            </p>
            <Link to="/contact" className="mt-9 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-[0_0_42px_-12px_hsl(var(--primary))] transition hover:-translate-y-0.5">
              Talk to CodeLustre <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
