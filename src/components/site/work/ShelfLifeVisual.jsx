import { Image } from "@/components/ui/image";

const SHELF_IMAGE =
  "https://media.base44.com/images/public/6acc0ce0e34a89cc34457777/8cb2501c1_generated_image.png";

export default function ShelfLifeVisual() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-[0_0_70px_-30px_hsl(var(--primary))]">
      <Image
        src={SHELF_IMAGE}
        alt="Shelf of book spines on a wooden plank"
        fittingType="fill"
        className="aspect-[4/3] w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-4 left-4 rounded-full border border-primary/40 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest text-primary backdrop-blur-sm">
        Google Play · soon
      </div>
    </div>
  );
}