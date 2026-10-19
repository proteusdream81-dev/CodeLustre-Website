const animals = [
  { name: "Willow", species: "Greyhound", status: "Ready to adopt", tone: "primary" },
  { name: "Pepper", species: "Cat", status: "Boarding · out 24 Oct", tone: "muted" },
  { name: "Buster", species: "Kelpie cross", status: "Vaccination ✓", tone: "primary" },
];

const pillTones = {
  primary: "text-primary border-primary/40",
  muted: "text-muted-foreground border-border",
};

export default function LindenVisual() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_0_70px_-30px_hsl(var(--primary))]">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <span className="font-heading text-sm font-semibold sm:text-base">Animals in care</span>
        <span className="rounded-full border border-primary/40 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest text-primary">
          24 active
        </span>
      </div>

      <div className="divide-y divide-border">
        {animals.map((animal) => (
          <div key={animal.name} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <div className="text-sm font-medium">{animal.name}</div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{animal.species}</div>
            </div>
            <span className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest ${pillTones[animal.tone]}`}>
              {animal.status}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-background px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:px-6">
        Intake · Health · Movement · Matching
      </div>
    </div>
  );
}