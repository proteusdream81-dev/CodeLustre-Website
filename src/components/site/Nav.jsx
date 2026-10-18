import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { BRAND_LOGO } from "@/lib/brand";
import { useAuth } from "@/lib/AuthContext";

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const { isAuthenticated, navigateToLogin } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "border-b border-transparent"}`}>
      <div className="h-px w-full bg-gradient-to-r from-primary via-chart-2 to-primary opacity-70" />
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-heading font-bold tracking-tight">
          <Image src={BRAND_LOGO} alt="" fittingType="fit" className="w-6 h-6 rounded-sm" />
          <span>CodeLustre</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated && (
            <button
              onClick={() => navigateToLogin()}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </button>
          )}
          <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition shadow-[0_0_28px_-10px_hsl(var(--primary))]">
            Start a project <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">{l.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="text-sm font-medium px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-center">Start a project</a>
            {!isAuthenticated && (
              <button
                onClick={() => { setOpen(false); navigateToLogin(); }}
                className="text-sm text-muted-foreground hover:text-foreground text-center"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}