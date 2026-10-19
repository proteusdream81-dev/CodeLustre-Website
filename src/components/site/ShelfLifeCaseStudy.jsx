import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

const PROJECT_NAME = "ShelfLife";
const PROJECT_IMAGE =
  "https://media.base44.com/images/public/6acc0ce0e34a89cc34457777/706a301e7_generated_image.png";

const deliverables = ["Product design", "Web app build", "Multi-site data model", "Launch & handover"];

export default function ShelfLifeCaseStudy() {
  return (
    <article className="group grid md:grid-cols-2 rounded-lg border border-border bg-card overflow-hidden transition-colors hover:border-chart-2/40">
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px] md:order-2 border-b md:border-b-0 md:border-l border-border">
        <Image
          src={PROJECT_IMAGE}
          alt={PROJECT_NAME}
          fittingType="fill"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent pointer-events-none" />
        <div className="absolute top-4 left-4 font-mono text-xs uppercase tracking-widest text-chart-2 border border-chart-2/30 rounded-full px-2.5 py-0.5 backdrop-blur-sm">
          Product app
        </div>
      </div>

      <div className="p-6 sm:p-10 flex flex-col">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-chart-2">[ Product build ]</div>
        <h3 className="mt-4 font-heading text-2xl sm:text-3xl font-bold tracking-tight">{PROJECT_NAME}</h3>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          A stock and expiry tracking app for multi-site operations: product records, batch and best-before
          tracking, low-stock alerts and simple reporting, designed and built end-to-end by Code Lustre.
        </p>

        <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <Check className="w-4 h-4 mt-0.5 text-chart-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          <div className="pt-4 border-t border-border font-mono text-xs text-muted-foreground">
            Inventory &amp; expiry tracking · multi-site
          </div>
          <Link
            to="/contact"
            className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 rounded-md border border-border text-foreground font-medium hover:border-chart-2/60 hover:text-chart-2 transition"
          >
            Start a project like this <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}