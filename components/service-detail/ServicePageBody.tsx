import StruggleSection from "./sections/StruggleSection";
import ServicesIncludeSection from "./sections/ServicesIncludeSection";
import ProcessSection from "./sections/ProcessSection";
import DocumentsTimelineSection from "./sections/DocumentsTimelineSection";
import WhyChooseSection from "./sections/WhyChooseSection";
import TestimonialsSection from "./sections/TestimonialsSection";

export default function ServicePageBody() {
  return (
    <>
      <StruggleSection />
      <ServicesIncludeSection />
      <ProcessSection />
      <DocumentsTimelineSection />
      <WhyChooseSection />
      <TestimonialsSection />
    </>
  );
}
