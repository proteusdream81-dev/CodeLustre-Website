import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { BRAND_LOGO } from "@/lib/brand";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Care Plans", to: "/care-plans" },
  { label: "Work", to: "/work" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const values = ["Precision", "Innovation", "Craft", "Partnership"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/25">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/60 via-chart-2/45 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.7fr_0.9fr]">
          <div className="max-w-sm">
            <Link to="/" className="group inline-flex items-center gap-3 font-heading font-bold tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/25 bg-primary/10">
                <Image src={BRAND_LOGO} alt="" fittingType="fit" className="h-6 w-6 rounded-sm transition-transform duration-300 group-hover:scale-110" />
              </span>
              <span>
                <span className="block">CodeLustre</span>
                <span className="mt-1 block font-mono text-[8px] font-normal uppercase tracking-[0.2em] text-muted-foreground">Digital studio · NSW, Australia</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Thoughtful websites, useful applications and connected digital experiences — designed and built around the people who use them.
            </p>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3">
              Start a conversation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Explore</div>
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="w-fit text-sm text-muted-foreground transition-colors hover:text-primary">{link.label}</Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Built with intent</div>
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">
              From first brief to launch and ongoing care, each project is scoped around its goals, users and practical requirements.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Web", "Apps", "Commerce", "Support"].map((value) => (
                <span key={value} className="rounded-full border border-border bg-background/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{value}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
          {values.map((value, index) => (
            <span key={value} className="flex items-center gap-6">
              {index > 0 && <span className="text-chart-2">/</span>}
              {value}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col justify-between gap-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground sm:flex-row">
          <span>© {year} CodeLustre. All rights reserved.</span>
          <span>codelustre.com · NSW, Australia</span>
        </div>
      </div>
    </footer>
  );
}
