import SectionHeading from "../SectionHeading";
import { includedServices } from "../service-page-data";

export default function ServicesIncludeSection() {
  return (
    <section className="py-14 md:py-20 bg-[#F4F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          beforeHighlight="Our Income Tax Registration"
          highlight="Services"
          afterHighlight=" Include"
          className="mb-10 md:mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {includedServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-7 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#006666]/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#006666]" />
                </div>
                <h3 className="text-base font-bold text-[#002233] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
