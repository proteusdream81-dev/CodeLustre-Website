import { Check } from "lucide-react";

const tones = {
  primary: { tag: "text-primary border-primary/40", dot: "bg-primary" },
  muted: { tag: "text-foreground border-border", dot: "bg-muted-foreground" },
};

export default function ProjectSection({
  number,
  status,
  statusTone = "muted",
  eyebrow,
  title,
  description,
  facts = [],
  actions,
  visual,
  testimonial,
}) {
  const tone = tones[statusTone];

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-36">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute -top-12 -left-2 sm:-top-20 sm:-left-6 font-heading font-bold leading-none text-transparent text-[6rem] sm:text-[10rem]"
              style={{ WebkitTextStroke: "1px hsl(var(--border))" }}
            >
              {number}
            </span>

            <div className="relative">
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</span>
                <span className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest border rounded-full px-3 py-1 ${tone.tag}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                  {status}
                </span>
              </div>

              <h2 className="mt-6 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">{description}</p>

              {facts.length > 0 && (
                <ul className="mt-8 space-y-3">
                  {facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{fact}</span>
                    </li>
                  ))}
                </ul>
              )}

              {testimonial && (
                <figure className="mt-9 rounded-lg border border-border bg-card p-6 sm:p-7">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Client testimonial</div>
                  <blockquote className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {testimonial.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-border pt-4">
                    <div className="font-heading font-semibold text-foreground">{testimonial.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{testimonial.role}</div>
                  </figcaption>
                </figure>
              )}

              {actions && <div className="mt-10 flex flex-wrap gap-4">{actions}</div>}
            </div>
          </div>

          <div>{visual}</div>
        </div>
      </div>
    </section>
  );
}
