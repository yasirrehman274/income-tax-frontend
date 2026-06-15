"use client";

import {
  User,
  Briefcase,
  Leaf,
  Landmark,
  Mountain,
  Component, // Using this as a proxy for the camel/regional icon if needed
} from "lucide-react";
import Link from "next/link";

const calculators = [
  {
    icon: User,
    title: "Income Tax",
    subTitle: "(Salaried)",
    href: "/calculator/salaried",
  },
  {
    icon: Briefcase,
    title: "AOP & Business",
    subTitle: "(Non-Salaried)",
    href: "/calculator/business",
  },
  {
    icon: Leaf,
    title: "Punjab Agricultural",
    subTitle: "Income Tax",
    href: "/calculator/punjab-agricultural",
  },
  {
    icon: Landmark,
    title: "Sindh Agricultural",
    subTitle: "Income Tax",
    href: "/calculator/sindh-agricultural",
  },
  {
    icon: Mountain,
    title: "KPK Agricultural",
    subTitle: "Income Tax",
    href: "/calculator/kpk-agricultural",
  },
  {
    icon: Component, // Replace with a custom SVG of a camel for 100% accuracy
    title: "Balochistan Agricultural",
    subTitle: "Income Tax",
    href: "/calculator/balochistan-agricultural",
  },
];

export default function OtherTaxCalculators() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#0a3d3d] mb-1">
            Other Tax Calculators
          </h2>
          <p className="text-sm text-gray-500">
            Choose a category to calculate your tax
          </p>
        </div>

        {/* Responsive Grid: 2 cols on mobile, 3 on tablet, 6 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {calculators.map((calculator, index) => {
            const Icon = calculator.icon;
            return (
              <Link key={index} href={calculator.href} prefetch={false} className="group">
                <div className="h-full bg-white rounded-xl p-6 border border-gray-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
                  {/* Icon Wrapper */}
                  <div className="mb-4 text-[#0d7a7a] group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  
                  {/* Title Text */}
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-bold text-[#0a3d3d] leading-tight">
                      {calculator.title}
                    </p>
                    <p className="text-[12px] text-[#0a3d3d] leading-tight opacity-80">
                      {calculator.subTitle}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}