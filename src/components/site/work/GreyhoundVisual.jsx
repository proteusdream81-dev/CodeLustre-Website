export default function GreyhoundVisual() {
  return (
    <a
      href="https://greyhoundrehoming.com.au"
      target="_blank"
      rel="noreferrer"
      aria-label="Visit Greyhound Re-Homing website"
      className="group block overflow-hidden rounded-lg border border-border bg-card shadow-[0_0_70px_-34px_hsl(var(--primary))]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <img
          src="/images/greyhound-rehoming-homepage.webp"
          alt="Screenshot of the Greyhound Re-Homing website homepage"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          loading="lazy"
        />
        <div className="absolute left-5 top-5 rounded-full border border-white/40 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          Greyhound Re-Homing
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
