const accents = {
  lime: { card: "hover:border-primary/40", bar: "from-primary/70", tag: "text-primary" },
  blue: { card: "hover:border-chart-2/40", bar: "from-chart-2/70", tag: "text-chart-2" },
};

const offerings = [
  {
    tag: "01 / Web design & development",
    title: "Web Design & Development",
    desc: "Fast, clean custom websites for small business and community organisations. Recent work includes Greyhound Rehoming, a national dog adoption platform.",
    accent: "lime",
  },
  {
    tag: "02 / App development",
    title: "App Development",
    desc: "Web and Android apps built to spec, from concept to launch. Current flagship: ShelfLife, a book tracking and social reading app.",
    accent: "blue",
  },
  {
    tag: "03 / Online stores",
    title: "Online Stores",
    desc: "Full shop builds, product sourcing, pricing and margin setup, and marketplace integration (eBay and beyond).",
    accent: "lime",
  },
  {
    tag: "04 / Linux boot drives & tech gear",
    title: "Linux Boot Drives & Tech Gear",
    desc: "Hand-crafted Linux USB boot drives plus curated tech accessories, shipping Australia-wide from our online shop.",
    accent: "blue",
  },
  {
    tag: "05 / Ongoing support",
    title: "Ongoing Support",
    desc: "Updates, backups and fixes for anything we build.",
    accent: "lime",
  },
];

function ServiceCard({ tag, title, desc, accent = "lime" }) {
  const a = accents[accent];
  return (
    <div className={`relative flex flex-col overflow-hidden rounded-lg border border-border bg-card p-8 sm:p-10 transition-colors ${a.card}`}>
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${a.bar} via-transparent to-transparent`} />
      <div className={`font-mono text-xs uppercase tracking-widest mb-6 ${a.tag}`}>{tag}</div>
      <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">{title}</h3>
      <p className="mt-4 text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ What we do ]</div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Five services, one studio.</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Websites, apps and online stores, the Linux gear that runs them, and the support that keeps it all going. One team, end to end.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {offerings.map((o) => (
            <ServiceCard key={o.tag} tag={o.tag} title={o.title} desc={o.desc} accent={o.accent} />
          ))}
        </div>
      </div>
    </section>
  );
}