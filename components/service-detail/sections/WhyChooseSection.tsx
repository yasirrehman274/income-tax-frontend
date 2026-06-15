import SectionHeading from "../SectionHeading";
import { whyChooseFeatures } from "../service-page-data";

export default function WhyChooseSection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          beforeHighlight="Why Choose"
          highlight="Navigate Business?"
          className="mb-10 md:mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {whyChooseFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="border border-gray-200 rounded-xl bg-white p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#006666]/30"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#006666]/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#006666]" />
                </div>
                <h3 className="text-base font-bold text-[#002233] mb-1.5">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
