const SERIF = '"Playfair Display", Georgia, serif';

// ShelfLife's own world: plum and amber live inside this showcase panel only.
const books = [
  { title: "Midnight Bloom", author: "A. Rowe", height: "h-44", from: "#ff4fa3", to: "#7a1f8f", ink: "#ffe1f2" },
  { title: "Salt & Static", author: "J. Okafor", height: "h-40", from: "#3aa0ff", to: "#173a8a", ink: "#dcecff" },
  {
    title: "The Gilded Hour",
    author: "M. Castellan",
    height: "h-56",
    from: "#ffd166",
    to: "#a8650a",
    ink: "#3a2100",
    featured: true,
  },
  { title: "Greenhouse Ghosts", author: "T. Lindqvist", height: "h-48", from: "#4fe08d", to: "#0d5c40", ink: "#ddfff0" },
  { title: "Violet Hours", author: "R. Nakamura", height: "h-44", from: "#a97bff", to: "#3d1f8f", ink: "#efe4ff", wideOnly: true },
  { title: "Red Sky Rounds", author: "L. Bianchi", height: "h-52", from: "#ff6a5a", to: "#8a1414", ink: "#ffe3df", wideOnly: true },
];

export default function ShelfLifeVisual() {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-border"
      style={{ backgroundImage: "linear-gradient(160deg, #451044 0%, #26082c 48%, #130313 100%)" }}
    >
      <div
        className="pointer-events-none absolute -top-20 right-0 h-56 w-56 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,165,36,0.22), transparent 70%)" }}
      />

      <div className="relative p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className="rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ backgroundColor: "#f5a524", color: "#2a0b2e" }}
          >
            Coming soon
          </span>
          <span
            className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ borderColor: "rgba(245,165,36,0.5)", color: "#f5a524" }}
          >
            Switch in minutes
          </span>
        </div>

        <div className="mt-8 flex items-end gap-1.5 sm:gap-2.5">
          {books.map((book) => (
            <div
              key={book.title}
              className={`relative ${book.height} min-w-0 flex-1 overflow-hidden rounded-[3px] ${book.wideOnly ? "hidden sm:block" : ""}`}
              style={{
                backgroundImage: `linear-gradient(150deg, ${book.from}, ${book.to})`,
                boxShadow: book.featured
                  ? "0 24px 40px -16px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,214,102,0.6)"
                  : "0 18px 30px -16px rgba(0,0,0,0.75)",
              }}
            >
              <span
                className="absolute inset-y-0 left-0 w-[3px]"
                style={{ backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.08))" }}
              />
              <span className="absolute inset-y-0 right-0 w-px bg-black/25" />
              <div className="flex h-full flex-col justify-between p-2.5">
                <span
                  className="text-[9px] leading-tight"
                  style={{ fontFamily: SERIF, color: book.ink }}
                >
                  {book.title}
                </span>
                <span className="text-[7px] uppercase tracking-[0.16em] opacity-80" style={{ color: book.ink }}>
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
        <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "#c79ad0" }}>
          <span>Your shelves</span>
          <span>{books.length} titles · 1 picked</span>
        </div>
      </div>
    </div>
  );
}