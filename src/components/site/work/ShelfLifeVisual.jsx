import { Image } from "@/components/ui/image";

const SERIF = '"Playfair Display", Georgia, serif';

const LOGO_IMAGE =
  "https://base44.app/api/apps/6acb4bff5b2cf5faa0b3fd45/files/mp/public/6acb4bff5b2cf5faa0b3fd45/5d7f8f5e5_sl_logo_clean.png";

// ShelfLife's own world: plum and amber live inside this showcase panel only.
const books = [
  { title: "Midnight Bloom", author: "A. Rowe", height: "h-32", from: "#ff4fa3", to: "#7a1f8f", band: "#ff8cc8", ink: "#ffe1f2" },
  { title: "Salt & Static", author: "J. Okafor", height: "h-28", from: "#3aa0ff", to: "#173a8a", band: "#7cc4ff", ink: "#dcecff" },
  {
    title: "The Gilded Hour",
    author: "M. Castellan",
    height: "h-44",
    from: "#ffd166",
    to: "#a8650a",
    band: "#fff0b8",
    ink: "#3a2100",
    featured: true,
  },
  { title: "Greenhouse Ghosts", author: "T. Lindqvist", height: "h-36", from: "#4fe08d", to: "#0d5c40", band: "#9df3c4", ink: "#ddfff0" },
  { title: "Violet Hours", author: "R. Nakamura", height: "h-32", from: "#a97bff", to: "#3d1f8f", band: "#c9aaff", ink: "#efe4ff" },
  { title: "Red Sky Rounds", author: "L. Bianchi", height: "h-40", from: "#ff6a5a", to: "#8a1414", band: "#ffa79b", ink: "#ffe3df" },
];

export default function ShelfLifeVisual() {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-border"
      style={{ backgroundImage: "linear-gradient(160deg, #451044 0%, #26082c 48%, #130313 100%)" }}
    >
      <div
        className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,165,36,0.22), transparent 70%)" }}
      />

      <div className="relative p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              src={LOGO_IMAGE}
              alt="ShelfLife logo"
              fittingType="fit"
              className="h-[62px] w-[62px] rounded-[12px]"
              style={{ boxShadow: "0 0 0 1px rgba(245,165,36,0.45), 0 0 26px -4px rgba(245,165,36,0.55)" }}
            />
            <div>
              <div className="font-heading text-lg font-bold leading-none sm:text-xl" style={{ color: "#f5a524" }}>
                ShelfLife
              </div>
              <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: "#c79ad0" }}>
                Your books. Beautifully shelved.
              </div>
            </div>
          </div>
          <span
            className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ backgroundColor: "#f5a524", color: "#2a0b2e" }}
          >
            Coming soon
          </span>
        </div>

        <div className="mt-5 flex items-end gap-1.5 sm:gap-2">
          {books.map((book) => (
            <div
              key={book.title}
              className={`relative ${book.height} min-w-0 flex-1 overflow-hidden rounded-[3px]`}
              style={{
                backgroundImage: `linear-gradient(150deg, ${book.from}, ${book.to})`,
                boxShadow: book.featured
                  ? "0 24px 40px -18px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,214,102,0.6)"
                  : "0 18px 28px -18px rgba(0,0,0,0.75)",
              }}
            >
              <span
                className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: "linear-gradient(115deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 45%)" }}
              />
              <span
                className="absolute inset-y-0 left-0 w-[3px]"
                style={{ backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.08))" }}
              />
              <span className="absolute inset-y-0 right-0 w-px bg-black/25" />
              <span className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: book.band }} />

              <div className="mt-3 flex h-full flex-col justify-between p-1.5 pb-2 pr-1.5">
                <span className="text-[7px] leading-[1.15] sm:text-[9px]" style={{ fontFamily: SERIF, color: book.ink }}>
                  {book.title}
                </span>
                <span className="text-[6px] uppercase tracking-[0.14em] opacity-80 sm:text-[7px]" style={{ color: book.ink }}>
                  {book.author}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="h-3 rounded-sm"
          style={{
            backgroundImage: "linear-gradient(180deg, #6b2d56 0%, #3a1330 45%, #1c0818 100%)",
            boxShadow: "0 16px 26px -14px rgba(0,0,0,0.85)",
          }}
        />
        <div
          className="mt-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "#c79ad0" }}
        >
          <span>Switch in minutes</span>
          <span>{books.length} titles</span>
        </div>
      </div>
    </div>
  );
}