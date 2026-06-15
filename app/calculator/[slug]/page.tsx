import type { Metadata } from "next";
import Link from "next/link";
import { Construction, Home, ArrowLeft, Calculator } from "lucide-react";

const calculatorNames: Record<string, string> = {
  salaried: "Salaried Income Tax",
  business: "Business & AOP Income Tax",
  "punjab-agricultural": "Punjab Agricultural Income Tax",
  "sindh-agricultural": "Sindh Agricultural Income Tax",
  "kpk-agricultural": "KPK Agricultural Income Tax",
  "balochistan-agricultural": "Balochistan Agricultural Income Tax",
};

export function generateStaticParams() {
  return Object.keys(calculatorNames).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = calculatorNames[slug] ?? "Tax Calculator";
  return {
    title: `${name} Calculator - Coming Soon | Navigate Business`,
    description: `The ${name} calculator is under development. Check back soon for updates.`,
  };
}

function formatSlug(slug: string): string {
  return (
    calculatorNames[slug] ??
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}

export default async function CalculatorComingSoon({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = formatSlug(slug);

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-2">
          <p className="text-[#0d7a7a] font-semibold text-sm tracking-widest uppercase">
            Coming Soon
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0a3d3d]">
            {name} Calculator
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            We are building this calculator to help you estimate your taxes
            accurately. It will be available shortly.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 space-y-6">
          <div className="mx-auto w-16 h-16 bg-[#f4f7f6] rounded-full flex items-center justify-center">
            <Construction className="w-8 h-8 text-[#0d7a7a]" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Our team is working on adding support for this tax category. Please
            use the main income tax calculator in the meantime.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0d7a7a] hover:bg-[#0a6666] text-white font-bold rounded-lg transition-colors"
          >
            <Calculator className="w-4 h-4" />
            Try Income Tax Calculator
          </Link>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#0d7a7a] hover:text-[#0a6666] font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
