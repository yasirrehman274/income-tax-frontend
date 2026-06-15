"use client";

import { useState, useEffect } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { DynamicIcon } from "lucide-react/dynamic";
import { wrapTables } from "@/lib/html";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import { INCOME_TAX_REGISTRATION_SLUG } from "@/components/service-detail/constants";
import ServicePageBody from "@/components/service-detail/ServicePageBody";
import ServiceCtaBanner from "@/components/service-detail/sections/ServiceCtaBanner";

interface ServiceData {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  icon?: string;
  featureImage: string;
  featureImageAlt: string;
  created_at: string;
  updated_at: string;
}

export function ServiceDetailClient({ slug }: { slug: string }) {
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${slug}`);
        if (!res.ok) throw new Error("Service not found");
        const data = await res.json();
        if (!cancelled) setService(data.service);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchService();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <>
        <PublicHeader />
        <main className="min-h-[70vh] flex items-center justify-center bg-[#f4f7f6]">
          <Loader2 className="w-10 h-10 animate-spin text-[#0d7a7a]" />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !service) {
    return (
      <>
        <PublicHeader />
        <main className="min-h-[70vh] flex items-center justify-center bg-[#f4f7f6]">
          <div className="text-center max-w-md mx-auto px-4">
            <AlertCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Service Not Found
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {error || "The requested service does not exist."}
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0d7a7a] text-white rounded-lg hover:bg-[#0a6666] transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Services
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PublicHeader />
      <main>
        <section className="relative w-full bg-white overflow-hidden min-h-[500px] flex items-center">
          {/* Main Structural Container */}
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Text Column: Set to 7/12 width so it never gets covered */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-500 mb-5">
                  <Link
                    href="/"
                    className="hover:text-[#007a7a] transition-colors"
                  >
                    Home
                  </Link>
                  <span>/</span>
                  <Link
                    href="/services"
                    className="hover:text-[#007a7a] transition-colors"
                  >
                    Services
                  </Link>
                  <span>/</span>
                  <span className="text-gray-400 font-medium">
                    Income Tax Registration
                  </span>
                </div>

                {/* Title */}
                <div className="flex flex-col gap-4 mb-5">
                  {service.icon && (
                    <div className="w-14 h-14 rounded-2xl bg-[#0d7a7a]/10 flex items-center justify-center shrink-0">
                      <DynamicIcon name={service.icon as any} className="w-7 h-7 text-[#0d7a7a]" />
                    </div>
                  )}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#0f2547] leading-[1.15] tracking-tight">
                    {service.title} 
                  </h1>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base max-w-xl leading-relaxed mb-8">
                  {service.short_description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <Link
                    href="/apply"
                    className="bg-[#007a7a] hover:bg-[#006363] text-white px-6 py-3.5 rounded font-semibold text-sm transition-all"
                  >
                    Apply for Income Tax Registration
                  </Link>
                  <Link
                    href="/consultation"
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3.5 rounded font-semibold text-sm transition-all"
                  >
                    Free Consultation
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-[#007a7a] stroke-[3]" />
                    <span>FBR Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-[#007a7a] stroke-[3]" />
                    <span>Fast Processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-[#007a7a] stroke-[3]" />
                    <span>Trusted by Hundreds</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Kept completely blank on the grid system to safely reserve space */}
              <div className="hidden lg:block lg:col-span-5" />
            </div>
          </div>
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <clipPath id="diagonal-clip" clipPathUnits="objectBoundingBox">
                <path
                  d="M 0.3,0 
               C 0.1,0.3 0.2,0.7 0,1 
               L 1,1 
               L 1,0 
               Z"
                />
              </clipPath>
            </defs>
          </svg>

          {service.featureImage && (
            <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-[45vw] h-full z-0 select-none pointer-events-none">
              <div
                className="absolute -inset-1 w-full h-full"
                style={{ clipPath: "url(#diagonal-clip)" }}
              >
                <img
                  src={service.featureImage}
                  alt={service.featureImageAlt || service.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          )}
        </section>

        {slug === INCOME_TAX_REGISTRATION_SLUG ? (
          <>
            <ServicePageBody />
            <ServiceCtaBanner />
          </>
        ) : (
          <>
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex">
                  <div className="">
                    {service.long_description && (
                      <div className="tiptap-editor-content">
                        <div
                          className="ProseMirror prose prose-sm md:prose-base lg:prose-lg max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: wrapTables(service.long_description),
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="py-12 bg-[#f4f7f6] border-t border-gray-200">
              <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-gray-500">
                  {service.created_at && (
                    <span>
                      Published:{" "}
                      {format(new Date(service.created_at), "dd MMM yyyy")}
                    </span>
                  )}
                  {service.updated_at &&
                    service.updated_at !== service.created_at && (
                      <span>
                        Last updated:{" "}
                        {format(
                          new Date(service.updated_at),
                          "dd MMM yyyy"
                        )}
                      </span>
                    )}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
