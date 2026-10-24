import { Check } from "lucide-react";

const included = [
  "Software, plugin and security updates",
  "Weekly full-site backups — restore-ready if anything ever goes wrong",
  "Uptime monitoring with instant alerts if your site goes down",
  "Up to 1 hour of content edits — text, images, prices, new products",
  "Security checks, spam and malware cleanup",
  "A plain-English site health report emailed to you each month",
  "Priority response within 1 business day",
];

export default function CareIncluded() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Every month ]</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">What&apos;s included every month</h2>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {included.map((item, index) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg border border-border bg-card px-5 py-4 text-sm text-foreground leading-relaxed"
            >
              <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
              <span>
                <span className="font-mono text-xs text-muted-foreground mr-2">{String(index + 1).padStart(2, "0")}</span>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}