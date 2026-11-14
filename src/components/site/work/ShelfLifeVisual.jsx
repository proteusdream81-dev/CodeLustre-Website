import { Image } from "@/components/ui/image";

const LOGO_IMAGE =
  "https://base44.app/api/apps/6acb4bff5b2cf5faa0b3fd45/files/mp/public/6acb4bff5b2cf5faa0b3fd45/5d7f8f5e5_sl_logo_clean.png";

const books = [
  { title: "The Gilded Hour", author: "Sample title", cover: "linear-gradient(145deg, #f5c66a, #9c552c)", label: "FEATURED" },
  { title: "Midnight Bloom", author: "Sample title", cover: "linear-gradient(145deg, #e879a8, #51204f)", label: "WANT TO READ" },
  { title: "Salt & Static", author: "Sample title", cover: "linear-gradient(145deg, #6bb9dc, #183c70)", label: "READING" },
];

export default function ShelfLifeVisual() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-[#63375f] bg-[#1b0d22] shadow-[0_28px_90px_-42px_rgba(91,38,91,0.9)]">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#f5a524]/15 blur-3xl" />
      <div className="relative p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Image src={LOGO_IMAGE} alt="ShelfLife logo" fittingType="fit" className="h-11 w-11 rounded-xl" />
            <div>
              <div className="font-heading text-lg font-bold leading-none text-[#f5b84e]">ShelfLife</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#c6a6c9]">Your books. Beautifully shelved.</div>
            </div>
          </div>
          <span className="rounded-full bg-[#f5a524] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#27112b]">Concept preview</span>
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-[#2b1832] p-4 sm:p-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#c6a6c9]">Your reading life</div>
              <div className="mt-1 font-heading text-2xl font-semibold text-white sm:text-3xl">A shelf of your own.</div>
            </div>
            <div className="hidden rounded-lg border border-[#f5a524]/30 bg-[#f5a524]/10 px-3 py-2 text-right sm:block">
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#d8b7dc]">Interface</div>
              <div className="font-heading text-base font-bold text-[#f5b84e]">Preview</div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {["My shelves", "Discover", "Friends", "Releases"].map((tab, index) => (
              <span key={tab} className={`rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider ${index === 0 ? "bg-[#f5a524] text-[#27112b]" : "border border-white/10 text-[#d8c5da]"}`}>
                {tab}
              </span>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {books.map((book) => (
              <div key={book.title} className="min-w-0">
                <div className="relative aspect-[3/4] overflow-hidden rounded-md p-2 shadow-lg sm:p-3" style={{ background: book.cover }}>
                  <div className="absolute inset-1.5 rounded border border-white/20" />
                  <div className="relative flex h-full flex-col justify-between">
                    <span className="font-mono text-[6px] tracking-[0.14em] text-white/75 sm:text-[8px]">SHELFLIFE EDITION</span>
                    <span className="font-heading text-[10px] font-bold leading-tight text-white sm:text-sm">{book.title}</span>
                  </div>
                </div>
                <div className="mt-2 truncate font-heading text-[10px] font-semibold text-white sm:text-xs">{book.title}</div>
                <div className="mt-0.5 truncate font-mono text-[8px] uppercase tracking-wider text-[#b99cbd]">{book.author}</div>
                <div className="mt-1.5 truncate font-mono text-[7px] uppercase tracking-widest text-[#f5b84e]">{book.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#c6a6c9]">
          <span>Track · Share · Discover</span>
          <span>Illustrative sample data</span>
        </div>
      </div>
    </div>
  );
}
