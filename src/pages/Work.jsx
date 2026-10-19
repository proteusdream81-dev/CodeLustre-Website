import GreyhoundCaseStudy from "@/components/site/GreyhoundCaseStudy";
import ShelfLifeCaseStudy from "@/components/site/ShelfLifeCaseStudy";

export default function Work() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Our work ]</div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Selected work.</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Designed, built and launched by Code Lustre, now live and in daily use.
          </p>
        </div>

        <div className="grid gap-6">
          <GreyhoundCaseStudy />
          <ShelfLifeCaseStudy />
        </div>
      </div>
    </section>
  );
}