const workflows = [
  { label: "Intake & records", detail: "Centralised animal profiles", state: "CORE WORKFLOW" },
  { label: "Care schedules", detail: "Health and daily care planning", state: "OPERATIONS" },
  { label: "Rehoming pathway", detail: "Matching and placement steps", state: "OUTCOMES" },
];

export default function LindenVisual() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_0_70px_-30px_hsl(var(--primary))]">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div>
          <div className="font-heading text-sm font-semibold sm:text-base">Linden / Operations</div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Illustrative interface</div>
        </div>
        <span className="rounded-full border border-primary/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-primary">
          In development
        </span>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        {workflows.map((workflow, index) => (
          <div key={workflow.label} className="flex items-center gap-3 rounded-md border border-border bg-background/70 p-3 sm:p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/5 font-mono text-xs text-primary">
              0{index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">{workflow.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{workflow.detail}</div>
            </div>
            <span className="hidden shrink-0 font-mono text-[8px] uppercase tracking-wider text-muted-foreground sm:block">{workflow.state}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-background px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:px-6">
        Intake · Health · Movement · Matching
      </div>
    </div>
  );
}
