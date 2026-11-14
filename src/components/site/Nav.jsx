import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, ShoppingCart } from "lucide-react";
import { Image } from "@/components/ui/image";
import { BRAND_LOGO } from "@/lib/brand";
import { useCart } from "@/components/shop/CartProvider";

const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Care Plans", to: "/care-plans" },
  { label: "Work", to: "/work" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Nav() {
  const { count } = useCart();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-background/85 shadow-lg shadow-black/10 backdrop-blur-xl" : "border-b border-transparent bg-background/35 backdrop-blur-sm"}`}>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-chart-2 opacity-80" />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3 font-heading font-bold tracking-tight" aria-label="CodeLustre home">
          <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-primary/25 bg-primary/10">
            <Image src={BRAND_LOGO} alt="" fittingType="fit" className="h-6 w-6 rounded-sm transition-transform duration-300 group-hover:scale-110" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base">CodeLustre</span>
            <span className="mt-1.5 hidden font-mono text-[8px] font-normal uppercase tracking-[0.2em] text-muted-foreground sm:block">Digital studio</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-[13px] text-muted-foreground lg:flex xl:gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => `relative py-2 transition-colors hover:text-foreground ${isActive ? "text-foreground" : ""}`}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gradient-to-r from-primary to-chart-2 transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0"}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link to="/cart" aria-label={count > 0 ? `Cart, ${count} items` : "Cart"} className="relative text-muted-foreground transition-colors hover:text-foreground">
            <ShoppingCart className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <Link to="/contact" className="group inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_28px_-12px_hsl(var(--primary))] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_38px_-10px_hsl(var(--primary))]">
            Start a project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition hover:border-primary/40 hover:bg-card lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-border bg-background/95 shadow-2xl shadow-black/30 backdrop-blur-xl lg:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-card hover:text-foreground"}`}
              >
                {({ isActive }) => (
                  <>
                    <span className={`h-1.5 w-1.5 rounded-full bg-primary transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
                    {link.label}
                  </>
                )}
              </NavLink>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-4">
              <Link to="/cart" className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm text-muted-foreground transition hover:text-foreground">
                <ShoppingCart className="h-4 w-4" /> Cart{count > 0 ? ` (${count})` : ""}
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
