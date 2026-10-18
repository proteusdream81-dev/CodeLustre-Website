import { ArrowUpRight, Check } from "lucide-react";
import { Image } from "@/components/ui/image";

const PROJECT_NAME = "Greyhound Rehoming";
const PROJECT_URL = "https://greyhoundrehoming.com.au";
const PROJECT_IMAGE =
  "https://media.base44.com/images/public/6acb87def949f330c260234b/e4b1e367b_generated_image.png";

const deliverables = ["Web design & UX", "16-page platform", "Content management", "Launch & handover"];

export default function GreyhoundCaseStudy() {
  return (
    <article className="group grid md:grid-cols-2 rounded-lg border border-border bg-card overflow-hidden transition-colors hover:border-primary/40">
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px] border-b md:border-b-0 md:border-r border-border">
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
        <div className="absolute top-4 left-4 font-mono text-xs uppercase tracking-widest text-primary border border-primary/30 rounded-full px-2.5 py-0.5 backdrop-blur-sm">
          Web platform
        </div>
      </div>

      <div className="p-6 sm:p-10 flex flex-col">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">[ Flagship project ]</div>
        <h3 className="mt-4 font-heading text-2xl sm:text-3xl font-bold tracking-tight">{PROJECT_NAME}</h3>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          A complete rehoming platform for greyhound adoption: dog profiles, adoption enquiries, boarding options,
          rescue news and a supporter shop, delivered end-to-end by Code Lustre.
        </p>

        <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          <div className="pt-4 border-t border-border font-mono text-xs text-muted-foreground">
            greyhoundrehoming.com.au
          </div>
          <a
            href={PROJECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[0_0_45px_-10px_hsl(var(--primary))]"
          >
            Visit the live site <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}