import CareHero from "@/components/site/care/CareHero";
import CareIncluded from "@/components/site/care/CareIncluded";
import CarePricing from "@/components/site/care/CarePricing";
import CareAudience from "@/components/site/care/CareAudience";
import CareCta from "@/components/site/care/CareCta";

export default function CarePlans() {
  return (
    <>
      <CareHero />
      <CareIncluded />
      <CarePricing />
      <CareAudience />
      <CareCta />
    </>
  );
}