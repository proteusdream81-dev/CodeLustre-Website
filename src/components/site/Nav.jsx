import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, ShoppingCart } from "lucide-react";
import { Image } from "@/components/ui/image";
import { BRAND_LOGO } from "@/lib/brand";
import { useCart } from "@/components/shop/CartProvider";
import { useAuth } from "@/lib/AuthContext";

const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Nav() {
  const { isAuthenticated, navigateToLogin } = useAuth();
  const { count } = useCart();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "border-b border-transparent"}`}>
      <div className="h-px w-full bg-gradient-to-r from-primary via-chart-2 to-primary opacity-70" />
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-heading font-bold tracking-tight">
          <Image src={BRAND_LOGO} alt="" fittingType="fit" className="w-6 h-6 rounded-sm" />
          <span>CodeLustre</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => `relative transition-colors hover:text-foreground ${isActive ? "text-foreground" : ""}`}
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span className={`absolute -bottom-1.5 left-0 h-px w-full bg-gradient-to-r from-primary to-chart-2 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/cart" aria-label="Cart" className="relative text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          {!isAuthenticated && (
            <button
              onClick={() => navigateToLogin()}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </button>
          )}
          <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition shadow-[0_0_28px_-10px_hsl(var(--primary))]">
            Start a project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) => `flex items-center gap-3 text-sm transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {({ isActive }) => (
                  <>
                    <span className={`h-px w-4 bg-gradient-to-r from-primary to-chart-2 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
                    {l.label}
                  </>
                )}
              </NavLink>
            ))}
            <Link to="/cart" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ShoppingCart className="w-4 h-4" /> Cart{count > 0 ? ` (${count})` : ""}
            </Link>
            <Link to="/contact" className="text-sm font-medium px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-center">Start a project</Link>
            {!isAuthenticated && (
              <button
                onClick={() => navigateToLogin()}
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