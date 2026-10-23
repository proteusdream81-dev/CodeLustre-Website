import { Link } from "react-router-dom";
import { ArrowRight, Bell } from "lucide-react";
import ProjectSection from "@/components/site/work/ProjectSection";
import ShelfLifeVisual from "@/components/site/work/ShelfLifeVisual";
import LindenVisual from "@/components/site/work/LindenVisual";

const primaryButton =
  "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[0_0_45px_-10px_hsl(var(--primary))]";
const ghostButton =
  "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md border border-border text-foreground font-medium hover:border-primary/60 hover:text-primary transition";

export default function Work() {
  return (
    <>
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Our work ]</div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Selected work.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Designed, built and launched by Code Lustre, now live and in daily use.
            </p>
          </div>
        </div>
      </section>

      <ProjectSection
        number="01"
        status="Coming soon"
        statusTone="primary"
        eyebrow="Our next launch"
        title="ShelfLife"
        description="The social shelf for book lovers: track your TBR, share shelves with friends, follow release calendars and import your whole library in minutes. Built by Code Lustre, launching soon on Google Play."
        actions={
          <>
            <Link to="/contact?waitlist=ShelfLife" className={primaryButton}>
              Join the waitlist <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact?waitlist=ShelfLife%20launch%20updates" className={ghostButton}>
              Follow the launch <Bell className="w-4 h-4" />
            </Link>
          </>
        }
        visual={<ShelfLifeVisual />}
      />

      <ProjectSection
        number="02"
        status="In development"
        eyebrow="Product build"
        title="Linden"
        description="Animal management software that tracks animals the way a boarding or rehoming facility actually works: intake, health records, movement and adopter matching in one clean dashboard."
        facts={[
          "Intake-to-adoption tracking without spreadsheets",
          "Health, vaccination and care schedules",
          "Boarding and rehoming workflows out of the box",
        ]}
        actions={
          <Link to="/contact" className={ghostButton}>
            Start a project like this <ArrowRight className="w-4 h-4" />
          </Link>
        }
        visual={<LindenVisual />}
      />
    </>
  );
}