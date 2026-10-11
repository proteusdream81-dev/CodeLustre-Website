import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    tag: "Web",
    title: "SaaS Marketing Site",
    desc: "A conversion-focused marketing site with a CMS, motion, and a reusable design system.",
    stack: "Next.js · Sanity · Tailwind",
  },
  {
    tag: "App",
    title: "Mobile App MVP",
    desc: "A cross-platform app with auth, payments, and real-time sync shipped in weeks, not months.",
    stack: "React Native · Stripe · Supabase",
  },
  {
    tag: "Web app",
    title: "Operations Dashboard",
    desc: "An internal tool automating workflows, reporting, and team operations in one place.",
    stack: "React · Node · PostgreSQL",
  },
];

export default function Work() {
  return (
    <section id="work" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ What we build ]</div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Example projects.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              A few archetypes of what we can build for you. Swap these for real case studies as your portfolio grows.
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-1 self-start">
            Samples
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.title} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity"
                  style={{
                    backgroundImage:
                      "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 font-mono text-xs uppercase tracking-widest text-primary border border-primary/30 rounded-full px-2.5 py-0.5">
                  {p.tag}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-xl font-semibold tracking-tight">{p.title}</h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="mt-6 pt-4 border-t border-border font-mono text-xs text-muted-foreground">{p.stack}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}