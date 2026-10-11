import { Check } from "lucide-react";

const sites = ["Marketing sites", "E-commerce stores", "Design systems", "Web platforms", "SEO & performance"];
const apps = ["Web apps", "Mobile apps", "MVP builds", "Internal tools", "APIs & integrations"];

function ServiceCard({ tag, title, desc, items }) {
  return (
    <div className="relative rounded-lg border border-border bg-card p-8 sm:p-10 hover:border-primary/40 transition-colors">
      <div className="font-mono text-xs uppercase tracking-widest text-primary mb-6">{tag}</div>
      <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">{title}</h3>
      <p className="mt-4 text-muted-foreground leading-relaxed">{desc}</p>
      <ul className="mt-8 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm">
            <Check className="w-4 h-4 text-primary shrink-0" />
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
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Two disciplines, one studio.</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            We cover the full spectrum, from marketing sites that win customers to apps that run your business. No handoffs, no lost context, just one team end to end.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <ServiceCard
            tag="01 / Sites"
            title="Websites that convert"
            desc="Marketing sites, e-commerce, and web platforms built to be fast, accessible, and easy to grow."
            items={sites}
          />
          <ServiceCard
            tag="02 / Apps"
            title="Apps that scale"
            desc="Web and mobile apps, MVPs, and internal tools engineered on a modern, maintainable stack."
            items={apps}
          />
        </div>
      </div>
    </section>
  );
}