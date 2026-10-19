import { Dog } from "lucide-react";
import { Image } from "@/components/ui/image";

const PROJECT_IMAGE =
  "https://media.base44.com/images/public/6acb87def949f330c260234b/e4b1e367b_generated_image.png";

const NAV = ["Adopt", "Our Dogs", "Success Stories", "Contact"];

// The real greyhoundrehoming.com.au branding, reproduced here on purpose:
// this is the only place on the site where non-palette colours appear.
const CREAM = "#fdf1ec";
const ROSE = "#b05f6d";

export default function GreyhoundVisual() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_0_70px_-30px_hsl(var(--primary))]">
      <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md border border-border bg-card px-3 py-1 font-mono text-[11px] text-muted-foreground">
          greyhoundrehoming.com.au
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6" style={{ backgroundColor: CREAM }}>
        <div className="flex items-center gap-2">
          <Dog className="h-5 w-5" strokeWidth={1.5} style={{ color: ROSE }} />
          <span className="font-heading text-sm font-bold sm:text-base" style={{ color: ROSE }}>
            Greyhound Rehoming
          </span>
        </div>
        <nav className="hidden items-center gap-4 text-[10px] font-medium uppercase tracking-[0.15em] sm:flex" style={{ color: ROSE }}>
          {NAV.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
      </div>

      <div className="relative">
        <Image
          src={PROJECT_IMAGE}
          alt="Greyhound Rehoming homepage"
          fittingType="fill"
          className="aspect-[16/10] w-full"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent px-4 pb-4 pt-14 sm:px-6 sm:pb-6">
          <p className="font-heading text-sm font-semibold sm:text-base">A second chance, beautifully presented.</p>
        </div>
      </div>
    </div>
  );
}