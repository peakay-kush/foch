"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchSiteContent, DEFAULT_SITE_CONTENT, resolveImageUrl, SiteContent } from "@/lib/api";

export default function Hero() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);

  useEffect(() => {
    fetchSiteContent().then((res) => setContent(res));
  }, []);

  // Split headline lines if needed
  const headlineParts = (content.hero_headline || DEFAULT_SITE_CONTENT.hero_headline).split("\n");

  return (
    <section id="hero" className="relative bg-[#FAF8F5] pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden border-b border-border">
      {/* Soft ambient backdrops */}
      <div className="absolute top-0 right-0 w-[38rem] h-[38rem] bg-blue-50/60 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[24rem] h-[24rem] bg-amber-50/40 rounded-full blur-3xl -z-10 pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* ── Left Column: Value Proposition ── */}
          <div className="lg:col-span-7 xl:pr-6">

            {/* Headline */}
            <h1 className="text-[clamp(2.5rem,5vw,4.2rem)] font-heading leading-[1.08] text-slate-900 mb-6">
              {headlineParts[0] || "Power your property."}
              <br />
              <span className="text-brand-blue">{headlineParts[1] || "Protect what matters."}</span>
            </h1>

            {/* Narrative */}
            <p className="text-[1.08rem] leading-relaxed text-slate-600 max-w-xl mb-9">
              {content.hero_description || DEFAULT_SITE_CONTENT.hero_description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
              <a
                href="#contact"
                className="btn-primary inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-[0.82rem] sm:text-[0.84rem] font-semibold tracking-wider uppercase shadow-sm hover:shadow-md transition-all text-center"
              >
                <span>Request Free Site Assessment</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 bg-white hover:bg-slate-50 text-brand-blue font-semibold text-[0.82rem] sm:text-[0.84rem] tracking-wider uppercase border border-border hover:border-brand-blue transition-all text-center"
              >
                <span>View Recent Work</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17l9.2-9.2M17 17V7.8H7.8" />
                </svg>
              </a>
            </div>

            {/* Proof Points */}
            <div className="pt-6 sm:pt-8 border-t border-border/80 grid grid-cols-3 gap-2.5 sm:gap-6 max-w-lg">
              <div className="min-w-0">
                <div className="flex items-baseline gap-0.5 text-2xl sm:text-[2.2rem] font-heading font-extrabold text-brand-blue leading-none whitespace-nowrap">
                  <span>150</span>
                  <span className="text-brand-orange text-lg sm:text-xl font-bold ml-0.5">+</span>
                </div>
                <p className="text-[0.66rem] sm:text-[0.74rem] font-medium text-slate-600 mt-1.5 uppercase tracking-normal sm:tracking-wider leading-snug break-words">
                  Delivered Projects
                </p>
              </div>

              <div className="min-w-0">
                <div className="flex items-baseline gap-0.5 text-2xl sm:text-[2.2rem] font-heading font-extrabold text-slate-900 leading-none whitespace-nowrap">
                  <span>100</span>
                  <span className="text-brand-blue text-lg sm:text-xl font-bold ml-0.5">%</span>
                </div>
                <p className="text-[0.66rem] sm:text-[0.74rem] font-medium text-slate-600 mt-1.5 uppercase tracking-normal sm:tracking-wider leading-snug break-words">
                  EPRA &amp; NCA Certified
                </p>
              </div>

              <div className="min-w-0">
                <div className="flex items-baseline gap-0.5 text-2xl sm:text-[2.2rem] font-heading font-extrabold text-slate-900 leading-none whitespace-nowrap">
                  <span>24</span>
                  <span className="text-brand-orange text-lg sm:text-xl font-bold ml-0.5">/7</span>
                </div>
                <p className="text-[0.66rem] sm:text-[0.74rem] font-medium text-slate-600 mt-1.5 uppercase tracking-normal sm:tracking-wider leading-snug break-words">
                  Support &amp; Care
                </p>
              </div>
            </div>

          </div>

          {/* ── Right Column: Dynamic Showcase Image & Narrative ── */}
          <div className="lg:col-span-5">
            <div className="relative p-3">
              
              {/* Corner Brackets */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-[3.5px] border-l-[3.5px] border-brand-blue pointer-events-none z-20" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-[3.5px] border-r-[3.5px] border-brand-blue pointer-events-none z-20" />

              {/* Outer Framed Container */}
              <div className="bg-white border-2 border-slate-900/10 shadow-xl overflow-hidden relative">
                
                {/* Main Image Container */}
                <div className="aspect-[4/3] bg-[#E8EDF5] relative overflow-hidden flex items-center justify-center border-b border-border group">
                  <Image
                    src={resolveImageUrl(content.hero_showcase_image || DEFAULT_SITE_CONTENT.hero_showcase_image)}
                    alt={content.hero_showcase_title || "TrueVolt Systems Showcase"}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm border border-border px-2.5 py-1 shadow-sm z-10">
                    <span className="text-[0.65rem] font-bold text-slate-800 uppercase tracking-wider">
                      Recent Installation
                    </span>
                  </div>
                </div>

                {/* Description Box */}
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-heading text-slate-900">
                      {content.hero_showcase_title || DEFAULT_SITE_CONTENT.hero_showcase_title}
                    </h3>
                    <span className="text-[0.72rem] font-mono text-brand-blue font-bold">
                      {content.hero_showcase_location || DEFAULT_SITE_CONTENT.hero_showcase_location}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {content.hero_showcase_description || DEFAULT_SITE_CONTENT.hero_showcase_description}
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
