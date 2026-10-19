import { Image } from "@/components/ui/image";

const HERO_IMAGE =
  "https://media.base44.com/images/public/6acb87def949f330c260234b/e4b1e367b_generated_image.png";

const LOGO_IMAGE =
  "https://media.base44.com/images/public/6acb87def949f330c260234b/81ef5c02c_generated_image.png";

const NAV = [
  { label: "Adopt", active: true },
  { label: "About" },
  { label: "Our Blog" },
  { label: "Boutique" },
  { label: "Boarding" },
  { label: "Contact" },
];

const SERIF = '"Playfair Display", Georgia, serif';

// The real greyhoundrehoming.com.au branding, reproduced here on purpose:
// this is the only place on the site where non-palette colours appear.
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

      <div
        className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4 py-4 sm:px-6"
        style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }}
      >
        <div className="flex items-center gap-4">
          <Image
            src={LOGO_IMAGE}
            alt="Greyhound Re-Homing logo"
            fittingType="fit"
            className="h-[68px] w-[68px] rounded-lg shadow-md"
          />
          <div>
            <div className="text-[26px] leading-none" style={{ fontFamily: SERIF, color: "#1a1a1a" }}>
              Greyhound Re-Homing
            </div>
            <div className="mt-2 text-[9px] uppercase tracking-[0.2em]" style={{ color: "#6b7280" }}>
              Taking greyhounds from kennels to couches!
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {NAV.map((item) => (
            <span
              key={item.label}
              className="text-[10px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: item.active ? "#e60000" : "#4b5563" }}
            >
              {item.label}
            </span>
          ))}
          <span
            className="rounded-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white"
            style={{ backgroundColor: "#e60000" }}
          >
            Adopt a hound
          </span>
        </div>
      </div>

      <div className="relative">
        <Image
          src={HERO_IMAGE}
          alt="Greyhound Re-Homing homepage"
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