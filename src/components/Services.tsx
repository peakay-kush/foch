"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchSiteContent, DEFAULT_SITE_CONTENT, resolveImageUrl, SiteContent } from "@/lib/api";

export default function Services() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);

  useEffect(() => {
    fetchSiteContent().then((res) => setContent(res));
  }, []);

  const parseTags = (tagsStr?: string, defaultTags: string[] = []): string[] => {
    if (!tagsStr) return defaultTags;
    const split = tagsStr.split(",").map((s) => s.trim()).filter(Boolean);
    return split.length > 0 ? split : defaultTags;
  };

  const services = [
    {
      num: "01",
      badge: content.services_solar_badge || DEFAULT_SITE_CONTENT.services_solar_badge,
      title: content.services_solar_title || DEFAULT_SITE_CONTENT.services_solar_title,
      statement: content.services_solar_statement || DEFAULT_SITE_CONTENT.services_solar_statement,
      tags: parseTags(content.services_solar_tags, ["Rooftop PV Arrays", "Battery Backup", "Hybrid Inverters", "Grid-Tie Systems"]),
      link: "/services/solar",
      image: resolveImageUrl(content.services_solar_image || DEFAULT_SITE_CONTENT.services_solar_image),
      badgeColor: "bg-amber-50 text-[#F7941D] border-amber-200",
    },
    {
      num: "02",
      badge: content.services_electrical_badge || DEFAULT_SITE_CONTENT.services_electrical_badge,
      title: content.services_electrical_title || DEFAULT_SITE_CONTENT.services_electrical_title,
      statement: content.services_electrical_statement || DEFAULT_SITE_CONTENT.services_electrical_statement,
      tags: parseTags(content.services_electrical_tags, ["Main DB Boards", "Three-Phase Wiring", "NCA Certified", "Fault Rectification"]),
      link: "/services/electrical",
      image: resolveImageUrl(content.services_electrical_image || DEFAULT_SITE_CONTENT.services_electrical_image),
      badgeColor: "bg-blue-50 text-[#2854A6] border-blue-200",
    },
    {
      num: "03",
      badge: content.services_security_badge || DEFAULT_SITE_CONTENT.services_security_badge,
      title: content.services_security_title || DEFAULT_SITE_CONTENT.services_security_title,
      statement: content.services_security_statement || DEFAULT_SITE_CONTENT.services_security_statement,
      tags: parseTags(content.services_security_tags, ["4K IP CCTV", "Electric Fencing", "Intruder Alarms", "Biometric Access"]),
      link: "/services/security",
      image: resolveImageUrl(content.services_security_image || DEFAULT_SITE_CONTENT.services_security_image),
      badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#FAF8F5] border-b border-border">
      <div className="container-custom">
        
        {/* Section Header - Swiss Minimalist */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-blue" />
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-brand-blue">
                Core Capabilities
              </span>
            </div>
            <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-bold tracking-tight text-slate-900 leading-tight">
              What We Deliver
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-sm font-normal leading-relaxed">
            Turnkey installations engineered to national compliance standards by certified technical specialists.
          </p>
        </div>

        {/* 3 Modern Swiss Minimalist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item) => (
            <div
              key={item.num}
              className="bg-white border border-slate-200/90 hover:border-brand-blue transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg group relative"
            >
              <div>
                {/* ── Image Container with Sharp Blue Corner Bracket ── */}
                <div className="relative p-3 pb-0">
                  
                  {/* Architectural Blue Corner Bracket */}
                  <div className="absolute top-1.5 right-1.5 w-8 h-8 border-t-[2.5px] border-r-[2.5px] border-brand-blue pointer-events-none z-10" />

                  {/* Real Project Installation Visual */}
                  <div className="aspect-[16/10] bg-[#EDF2F7] relative border border-slate-200 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      loading="eager"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Architectural reference badge over image */}
                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                      <span className="font-mono text-[0.65rem] font-bold text-white bg-slate-900/85 px-2.5 py-0.5 tracking-wider uppercase border border-white/10 backdrop-blur-xs">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Swiss Typography Body ── */}
                <div className="p-7">
                  
                  {/* Division Badge & Number */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      System #{item.num}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Bold Sans-Serif Title */}
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>

                  {/* Punchy One-Sentence Statement */}
                  <p className="text-[0.85rem] text-slate-600 leading-relaxed font-normal mb-6">
                    {item.statement}
                  </p>

                  {/* Clean Pill Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 text-[0.72rem] font-medium tracking-wide rounded-none group-hover:border-slate-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>

              {/* ── Clean Action Bar ── */}
              <div className="p-7 pt-0">
                <a
                  href={item.link}
                  className="w-full py-3 px-4 bg-white hover:bg-brand-blue text-brand-blue hover:text-white border border-slate-200 hover:border-brand-blue text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-between group/btn shadow-xs"
                >
                  <span>View Projects</span>
                  <span className="text-sm group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
