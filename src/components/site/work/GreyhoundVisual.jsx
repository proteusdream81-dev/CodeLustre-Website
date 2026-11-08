const greyhoundPhoto = "https://images.unsplash.com/photo-1719228066880-2499eee8245c?auto=format&fit=crop&fm=jpg&q=85&w=1600";

export default function GreyhoundVisual() {
  return (
    <a
      href="https://greyhoundrehoming.com.au"
      target="_blank"
      rel="noreferrer"
      aria-label="Visit Greyhound Re-Homing website"
      className="group block overflow-hidden rounded-lg border border-border bg-card shadow-[0_0_70px_-34px_hsl(var(--primary))]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={greyhoundPhoto}
          alt="A gentle greyhound standing in a green garden"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-white/40 bg-black/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          Greyhound Re-Homing
        </div>
        <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/75">A better next chapter</div>
          <div className="mt-2 max-w-md font-heading text-3xl font-bold leading-tight sm:text-4xl">
            Every hound deserves a home.
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <div>
          <div className="font-heading text-base font-semibold">greyhoundrehoming.com.au</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Website design & development</div>
        </div>
        <span className="shrink-0 rounded-full border border-primary/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
          Live ↗
        </span>
      </div>
    </a>
  );
}
