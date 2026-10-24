import { ArrowRight, Mail } from "lucide-react";

const MAILTO = "mailto:schradercapitol@gmail.com?subject=Website%20care%20plan%20enquiry";

export default function CareHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-chart-2/10 blur-[150px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-5">
          [ Code Lustre Care ]
        </div>
        <h1 className="font-heading font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">
          Code Lustre Care — <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">Website Care Plans</span>
        </h1>
        <p className="mt-7 text-lg text-foreground max-w-2xl leading-relaxed">
          Professional website care from $50/month. Your site stays fast, secure and up to date while you run your business.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href={MAILTO}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[0_0_45px_-10px_hsl(var(--primary))]"
          >
            Email us about a plan <Mail className="w-4 h-4" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md border border-border text-foreground font-medium hover:border-chart-2/60 hover:text-chart-2 transition"
          >
            Go to the contact page <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <p className="mt-12 max-w-3xl text-muted-foreground leading-relaxed">
          A website isn&apos;t set-and-forget. Software needs updating, backups need taking, and small things break when nobody&apos;s watching. Code Lustre Care is a simple monthly plan that keeps your website healthy, with a real local designer behind it.
        </p>
      </div>
    </section>
  );
}