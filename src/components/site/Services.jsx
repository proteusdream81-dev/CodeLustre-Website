import { Check } from "lucide-react";

const accents = {
  lime: { card: "hover:border-primary/40", bar: "from-primary/70", tag: "text-primary", check: "text-primary" },
  blue: { card: "hover:border-chart-2/40", bar: "from-chart-2/70", tag: "text-chart-2", check: "text-chart-2" },
};

const offerings = [
  {
    tag: "01 / Business websites",
    title: "Websites that convert",
    desc: "Marketing sites and web platforms built to be fast, accessible, and easy to grow.",
    items: ["Marketing sites", "Design systems", "Web platforms", "SEO & performance"],
    accent: "lime",
  },
  {
    tag: "02 / E-commerce",
    title: "Stores that sell",
    desc: "Online stores with secure checkout, inventory and shipping built in, tuned to turn browsers into customers.",
    items: ["Online stores", "Secure checkout", "Inventory & shipping", "Conversion tuning"],
    accent: "blue",
  },
  {
    tag: "03 / Web apps & portals",
    title: "Apps that scale",
    desc: "Web and mobile apps, MVPs, portals and internal tools engineered on a modern, maintainable stack.",
    items: ["Web apps", "Mobile apps", "MVP builds", "Internal tools", "Customer & staff portals", "APIs & integrations"],
    accent: "lime",
  },
  {
    tag: "04 / Care & support",
    title: "Support that lasts",
    desc: "Ongoing care plans that keep your site and app fast, secure and improving long after launch.",
    items: ["Hosting & monitoring", "Security updates", "Content & feature updates", "Priority support"],
    accent: "blue",
  },
];

function ServiceCard({ tag, title, desc, items, accent = "lime" }) {
  const a = accents[accent];
  return (
    <div className={`relative overflow-hidden rounded-lg border border-border bg-card p-8 sm:p-10 transition-colors ${a.card}`}>
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${a.bar} via-transparent to-transparent`} />
      <div className={`font-mono text-xs uppercase tracking-widest mb-6 ${a.tag}`}>{tag}</div>
      <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">{title}</h3>
      <p className="mt-4 text-muted-foreground leading-relaxed">{desc}</p>
      <ul className="mt-8 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm">
            <Check className={`w-4 h-4 shrink-0 ${a.check}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ What we do ]</div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Four disciplines, one studio.</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            We cover the full spectrum, from marketing sites that win customers to apps that run your business. No handoffs, no lost context, just one team end to end.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {offerings.map((o) => (
            <ServiceCard key={o.tag} tag={o.tag} title={o.title} desc={o.desc} items={o.items} accent={o.accent} />
          ))}
        </div>
      </div>
    </section>
  );
}