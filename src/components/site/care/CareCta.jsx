import { Mail, ArrowRight } from "lucide-react";

const MAILTO = "mailto:schradercapitol@gmail.com?subject=Website%20care%20plan%20enquiry";

export default function CareCta() {
  return (
    <section id="care-contact">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Get started ]</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight leading-tight">Ready to hand off the worry?</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Email{" "}
            <a href={MAILTO} className="text-foreground underline decoration-primary/60 underline-offset-4 hover:text-primary transition-colors">
              schradercapitol@gmail.com
            </a>{" "}
            or visit our{" "}
            <a href="/contact" className="text-foreground underline decoration-primary/60 underline-offset-4 hover:text-primary transition-colors">
              contact page
            </a>{" "}
            and we&apos;ll set your site up within one business day.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href={MAILTO}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[0_0_45px_-10px_hsl(var(--primary))]"
            >
              Email schradercapitol@gmail.com <Mail className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md border border-border text-foreground font-medium hover:border-chart-2/60 hover:text-chart-2 transition"
            >
              Contact page <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-border bg-card px-6 py-6 text-sm text-muted-foreground">
          <div className="font-mono text-xs uppercase tracking-widest text-chart-2 mb-4">[ Studio details ]</div>
          <address className="not-italic space-y-1">
            <div className="text-foreground">Justin Schrader &middot; Code Lustre</div>
            <div>ABN 21 214 407 939</div>
            <div>
              <a href="https://codelustre.com" className="hover:text-foreground transition-colors">https://codelustre.com</a>
            </div>
          </address>
        </div>
      </div>
    </section>
  );
}