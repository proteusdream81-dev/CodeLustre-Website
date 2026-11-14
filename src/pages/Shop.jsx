import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, HardDrive, Search, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import ShopProduct from "@/components/site/ShopProduct";
import ShopProductPlaceholder from "@/components/site/ShopProductPlaceholder";
import { base44 } from "@/api/base44Client";

const heroImage = "https://images.pexels.com/photos/17323801/pexels-photo-17323801/free-photo-of-network-rack.jpeg?auto=compress&dpr=1&h=750&w=1260";
const studioImage = "https://images.pexels.com/photos/17489150/pexels-photo-17489150/free-photo-of-light-on-computer-hardware.jpeg?auto=compress&dpr=1&h=750&w=1260";

const filters = [
  { id: "all", label: "All gear" },
  { id: "boot-drive", label: "Linux boot drives" },
  { id: "accessory", label: "Accessories" },
];

const included = [
  "Verified install media",
  "Burn-tested before dispatch",
  "Plain-English setup guidance",
  "Matched to your requirements",
];

export default function Shop() {
  const [accessories, setAccessories] = useState([]);
  const [drivesInStock, setDrivesInStock] = useState([]);
  const [drivesRestocking, setDrivesRestocking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    Promise.all([
      base44.entities.Product.filter({ active: true, category: "accessory" }, { sort: "sort_order", limit: 50 }),
      base44.entities.Product.filter({ active: true, category: "boot-drive" }, { sort: "sort_order", limit: 50 }),
      base44.entities.Product.filter({ active: false, category: "boot-drive" }, { sort: "sort_order", limit: 50 }),
    ])
      .then(([extras, inStock, restocking]) => {
        setAccessories(extras.items || []);
        setDrivesInStock(inStock.items || []);
        setDrivesRestocking(restocking.items || []);
      })
      .catch((error) => console.error("Unable to load shop products:", error))
      .finally(() => setLoading(false));
  }, []);

  const products = useMemo(() => {
    const all = [...drivesInStock, ...drivesRestocking, ...accessories];
    return all
      .filter((product) => activeFilter === "all" || product.category === activeFilter)
      .filter((product) => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return true;
        return [product.name, product.short_description, product.tag, ...(product.specs || [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  }, [accessories, drivesInStock, drivesRestocking, activeFilter, searchTerm]);

  const totalProducts = drivesInStock.length + drivesRestocking.length + accessories.length;

  return (
    <div className="pb-8">
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-20 bg-cover bg-center opacity-35" style={{ backgroundImage: `url("${heroImage}")` }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/95 to-background/60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-background/25" />
        <div className="absolute -top-32 right-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-[1.05fr_.95fr] lg:pb-24 lg:pt-36">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
              CodeLustre / Tech gear
            </div>
            <h1 className="font-heading text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Tools for a more capable <span className="bg-gradient-to-r from-primary via-primary to-chart-2 bg-clip-text text-transparent">setup.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Prepared Linux boot media, practical connectivity and dependable hardware essentials — selected for people who build, repair and run technology.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#catalogue" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-[0_0_42px_-12px_hsl(var(--primary))] transition hover:brightness-110">
                Explore the catalogue <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background/60 px-6 py-3.5 font-medium text-foreground backdrop-blur transition hover:border-chart-2/60 hover:text-chart-2">
                Custom imaging & fleet orders
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Verified media</span>
              <span className="inline-flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-chart-2" /> Tested hardware</span>
              <span className="inline-flex items-center gap-2"><HardDrive className="h-3.5 w-3.5 text-primary" /> Practical gear</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-chart-2/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-card/70 p-2 shadow-2xl backdrop-blur">
              <div className="relative aspect-[5/4] overflow-hidden rounded-lg">
                <img src={heroImage} alt="Blue-lit network equipment in a modern server rack" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Built for the bench</div>
                    <div className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Ready when you are.</div>
                  </div>
                  <div className="hidden rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-right backdrop-blur sm:block">
                    <div className="font-mono text-[9px] uppercase tracking-widest text-white/55">Shop status</div>
                    <div className="mt-1 flex items-center gap-2 font-mono text-xs text-white"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Live catalogue</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 divide-x divide-border px-2 py-4">
                <div className="px-3"><div className="font-heading text-lg font-bold">01</div><div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Select</div></div>
                <div className="px-3"><div className="font-heading text-lg font-bold">02</div><div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Prepare</div></div>
                <div className="px-3"><div className="font-heading text-lg font-bold">03</div><div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Dispatch</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/30">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-6 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Checked before dispatch", text: "Boot media is verified and burn-tested." },
            { icon: Zap, title: "Useful, not gimmicky", text: "Practical gear for real-world setups." },
            { icon: Sparkles, title: "Support when needed", text: "Need a custom image or a bulk run? Talk to us." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3 px-1 py-2">
              <div className="rounded-md border border-primary/25 bg-primary/10 p-2 text-primary"><Icon className="h-4 w-4" /></div>
              <div><div className="text-sm font-semibold">{title}</div><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="catalogue" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">[ The catalogue ]</div>
              <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">Gear that earns its place.</h2>
              <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                Browse prepared Linux media and the accessories that make a workstation, recovery kit or deployment bench work better.
              </p>
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {loading ? "Loading catalogue…" : `${totalProducts} items listed`}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-y border-border py-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-md border px-4 py-2.5 text-xs font-medium transition ${activeFilter === filter.id ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <label className="flex w-full items-center gap-3 rounded-md border border-border bg-card px-4 py-2.5 md:max-w-xs">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products…"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Find</span>
            </label>
          </div>

          {loading ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((key) => <div key={key} className="h-[34rem] animate-pulse rounded-xl border border-border bg-card/60" />)}
            </div>
          ) : products.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => product.active === false
                ? <ShopProductPlaceholder key={product.id} product={product} />
                : <ShopProduct key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
              <Search className="mx-auto h-6 w-6 text-muted-foreground" />
              <h3 className="mt-4 font-heading text-xl font-semibold">No matching gear found</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try another search or switch the catalogue filter.</p>
              <button type="button" onClick={() => { setSearchTerm(""); setActiveFilter("all"); }} className="mt-5 text-sm font-medium text-primary hover:underline">Clear filters</button>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-border bg-card/30">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[.9fr_1.1fr] lg:py-20">
          <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-border">
            <img src={studioImage} alt="Blue-lit computer hardware in a technology environment" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Imaging / deployment / support</div>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">[ Fleet & bulk orders ]</div>
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">One image. A consistent rollout.</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              Rolling the same build out across a workshop, office or fleet? We can prepare uniform drives with your selected image, labelling and install workflow, then test against your target hardware.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-md border border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{item}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-[0_0_42px_-12px_hsl(var(--primary))] transition hover:brightness-110">
              Discuss a deployment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pt-8 text-[10px] leading-relaxed text-muted-foreground/70">
        Store photography: selected images from <a href="https://www.pexels.com/" target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-2 hover:text-foreground">Pexels</a>. Product photographs are representative imagery and do not imply a specific USB-drive manufacturer or endorsement.
      </div>
    </div>
  );
}