import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { BRAND_LOGO } from "@/lib/brand";

const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const values = ["Precision", "Innovation", "Craft", "Partnership"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border bg-card/30">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/50 via-chart-2/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5 font-heading font-bold tracking-tight">
              <Image src={BRAND_LOGO} alt="" fittingType="fit" className="w-6 h-6 rounded-sm" />
              <span>CodeLustre</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              A digital studio designing websites and building apps for ambitious teams across Australia.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">Navigate</div>
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">Start</div>
            <Link to="/contact" className="text-sm text-primary hover:underline">Start a project</Link>
            <span className="text-sm text-muted-foreground">Available for new work</span>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border overflow-hidden">
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {values.map((v, i) => (
              <span key={v} className="flex items-center gap-6">
                {i > 0 && <span className="text-chart-2">/</span>}
                <span>{v}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3 font-mono text-xs text-muted-foreground">
          <span>© {year} CodeLustre. All rights reserved.</span>
          <span>codelustre.com</span>
        </div>
      </div>
    </footer>
  );
}