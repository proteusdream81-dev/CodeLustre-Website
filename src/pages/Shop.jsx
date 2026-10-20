import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import ShopProduct from "@/components/site/ShopProduct";
import ShopProductPlaceholder from "@/components/site/ShopProductPlaceholder";
import { base44 } from "@/api/base44Client";

const included = [
  "Verified install media",
  "Burn-tested before it ships",
  "Plain-English setup guide",
  "Matched to your hardware",
];

export default function Shop() {
  const [accessories, setAccessories] = useState([]);
  const [drivesInStock, setDrivesInStock] = useState([]);
  const [drivesRestocking, setDrivesRestocking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.entities.Product.filter({ active: true, category: "accessory" }, { sort: "sort_order", limit: 50 }),
      base44.entities.Product.filter({ active: true, category: "boot-drive" }, { sort: "sort_order", limit: 50 }),
      base44.entities.Product.filter({ active: false, category: "boot-drive" }, { sort: "sort_order", limit: 50 }),
    ])
      .then(([extras, inStock, restocking]) => {
        setAccessories(extras.items);
        setDrivesInStock(inStock.items);
        setDrivesRestocking(restocking.items);
      })
      .finally(() => setLoading(false));
  }, []);

  const driveCount = drivesInStock.length + drivesRestocking.length;

  return (
    <>
      {(loading || accessories.length > 0) && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="max-w-2xl mb-16">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Tech accessories ]</div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Tech accessories.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                The hubs, docks and cables that finish the build — tested on the same benches as our drives, ready to add to the same order.
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[0, 1, 2].map((key) => (
                  <div key={key} className="h-96 rounded-lg border border-border bg-card/60 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accessories.map((product) => (
                  <ShopProduct key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {(loading || driveCount > 0) && (
        <section className="border-t border-border bg-card/30">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="max-w-2xl mb-16">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Boot drives ]</div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Linux USB boot drives.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Prepared, verified and burn-tested in the studio. Pick a drive, or tell us the image you need and we&apos;ll build a run to suit your team.
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[0, 1, 2].map((key) => (
                  <div key={key} className="h-96 rounded-lg border border-border bg-card/60 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivesInStock.map((product) => (
                  <ShopProduct key={product.id} product={product} />
                ))}
                {drivesRestocking.map((product) => (
                  <ShopProductPlaceholder key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Fleet & bulk orders ]</div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                Imaging for teams and sites.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
                Rolling the same build out across a workshop, office or fleet? We prepare uniform drives with your image, labelling and install scripts, then test them against your target hardware.
              </p>
              <Link
                to="/contact"
                className="mt-10 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[0_0_45px_-10px_hsl(var(--primary))]"
              >
                Talk to us about a run <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <ul className="grid sm:grid-cols-2 gap-4">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground border border-border rounded-lg bg-background px-4 py-3">
                  <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}