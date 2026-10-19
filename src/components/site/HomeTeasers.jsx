import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const teasers = [
  {
    to: "/services",
    tag: "01 / Services",
    title: "Everything we build",
    desc: "Business websites, e-commerce, custom web apps and portals, plus care plans that keep it all running.",
    accent: "hover:border-primary/40",
    tagClass: "text-primary",
    bar: "from-primary/70",
  },
  {
    to: "/work",
    tag: "02 / Work",
    title: "Selected work",
    desc: "Greyhound Rehoming and ShelfLife, designed, built and launched by Code Lustre.",
    accent: "hover:border-chart-2/40",
    tagClass: "text-chart-2",
    bar: "from-chart-2/70",
  },
  {
    to: "/shop",
    tag: "03 / Shop",
    title: "Linux USB boot drives",
    desc: "Boot drives prepared and burn-tested in the studio, made to order for your machine or your fleet.",
    accent: "hover:border-primary/40",
    tagClass: "text-primary",
    bar: "from-primary/70",
  },
];

export default function HomeTeasers() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Where to next ]</div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Start wherever you are.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {teasers.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className={`group relative overflow-hidden rounded-lg border border-border bg-card p-8 transition-colors ${t.accent}`}
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${t.bar} via-transparent to-transparent`} />
              <div className={`font-mono text-xs uppercase tracking-widest mb-6 ${t.tagClass}`}>{t.tag}</div>
              <h3 className="font-heading text-2xl font-bold tracking-tight">{t.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}