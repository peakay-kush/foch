import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

import ServiceProjectsGrid from "@/components/ServiceProjectsGrid";
import { STATIC_SOLAR_PROJECTS } from "@/lib/api";

export const metadata = {
  title: "Solar Installations — TrueVolt Systems | EPRA Licensed Solar Contractor Kenya",
  description:
    "TrueVolt Systems delivers custom-engineered solar PV installations, hybrid inverter systems, and high-capacity lithium storage across Kenya. EPRA licensed solar contractor serving Nairobi, Naivasha, Mombasa and beyond.",
};

const capabilities = [
  {
    title: "Hybrid Solar Systems",
    category: "Residential & Commercial",
    description: "Grid-tied solar arrays with intelligent battery storage that seamlessly island during KPLC blackouts, keeping critical loads and entire properties powered 24/7.",
    metric: "0ms Switchover",
  },
  {
    title: "Off-Grid Power Stations",
    category: "Remote & Agricultural",
    description: "Complete energy autonomy for ranches, eco-lodges, and commercial farms beyond the national grid, engineered with diesel generator auto-start backup.",
    metric: "100% Autonomy",
  },
  {
    title: "Lithium BESS Storage",
    category: "Energy Storage",
    description: "Tier-1 LiFePO4 battery banks (Deye, Dyness, Pylontech) with intelligent Battery Management Systems (BMS) rated for 6,000+ cycles at 90% depth of discharge.",
    metric: "6,000+ Cycles",
  },
  {
    title: "Commercial & Industrial PV",
    category: "C&I Projects",
    description: "Large-scale rooftop and ground-mounted arrays engineered for factories, logistics parks, and office complexes to curtail daytime peak demand tariffs.",
    metric: "25-Yr Performance",
  },
  {
    title: "Solar Water Pumping",
    category: "Agriculture & Estates",
    description: "High-efficiency VFD solar borehole and booster pumping systems designed for zero-fuel irrigation, livestock watering, and communal water supply across Kenya.",
    metric: "Zero Fuel Cost",
  },
  {
    title: "IoT Telemetry & Support",
    category: "Monitoring & Maintenance",
    description: "Cloud-connected energy monitoring with real-time generation metrics, thermal tracking, fault alerting, and dedicated preventative maintenance SLAs.",
    metric: "24/7 Monitoring",
  },
];

export default function SolarPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Global Navigation */}
      <Navbar />

      {/* ── Breadcrumb Bar ── */}
      <div className="pt-24 lg:pt-28 pb-4 border-b border-border bg-white">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-brand-blue transition-colors flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Home
            </Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-brand-blue transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Solar Installations</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-700 uppercase">
              EPRA Licensed Contractor
            </span>
          </div>
        </div>
      </div>

      {/* ── Bento Grid Engineering Hero ── */}
      <section className="py-8 lg:py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* 1. Main Core Proposition Card (Col 7) */}
            <div className="lg:col-span-7 bg-white border border-border rounded-2xl p-7 lg:p-10 shadow-xs flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div>
                <h1 className="text-[clamp(2.3rem,4.2vw,3.6rem)] font-heading leading-[1.08] text-slate-900 mb-5">
                  Engineered Solar.
                  <br />
                  <span className="text-brand-blue font-normal">Immunity from Grid Outages.</span>
                </h1>

                <p className="text-slate-600 text-base lg:text-[1.05rem] leading-relaxed max-w-xl mb-8">
                  TrueVolt delivers custom-engineered hybrid and off-grid solar systems for Kenyan homes, commercial buildings, and agribusinesses — slashing KPLC bills by up to 90% while guaranteeing zero interruption when the grid drops.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <Link
                    href="/#contact"
                    className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-[0.82rem] font-semibold tracking-wider uppercase shadow-sm hover:shadow-md transition-all"
                  >
                    <span>Request Solar Feasibility Study</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>

                  <a
                    href="tel:+254748455070"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-[0.82rem] tracking-wider uppercase border border-border transition-all"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-blue">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <span>+254 748 455 070</span>
                  </a>
                </div>
              </div>

              {/* Bottom Quick-Proof Bar */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 sm:gap-4">
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-heading text-brand-blue font-bold whitespace-nowrap">100%</p>
                  <p className="text-[0.65rem] sm:text-[0.72rem] font-medium text-slate-500 uppercase tracking-normal sm:tracking-wider mt-0.5 leading-tight break-words">
                    EPRA Licensed
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-heading text-slate-900 font-bold whitespace-nowrap">25 Yrs</p>
                  <p className="text-[0.65rem] sm:text-[0.72rem] font-medium text-slate-500 uppercase tracking-normal sm:tracking-wider mt-0.5 leading-tight break-words">
                    Panel Warranty
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-heading text-brand-orange font-bold whitespace-nowrap">0 ms</p>
                  <p className="text-[0.65rem] sm:text-[0.72rem] font-medium text-slate-500 uppercase tracking-normal sm:tracking-wider mt-0.5 leading-tight break-words">
                    Auto-Switch
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Pure Visual Project Showcase (Col 5) */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-sm border border-border bg-slate-900 group min-h-[380px] lg:min-h-[440px] flex flex-col justify-between">
              <Image
                src="/images/projects/solar-rooftop-array.jpeg"
                alt="TrueVolt Commercial Solar Rooftop Installation Nairobi"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30 pointer-events-none" />

              {/* Top Location Pill */}
              <div className="relative z-10 p-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[0.7rem] font-mono font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Westlands, Nairobi
                </span>
              </div>

              {/* Bottom Compact Floating Caption Pill */}
              <div className="relative z-10 p-4">
                <div className="p-3.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-between shadow-xl">
                  <div className="min-w-0 pr-3">
                    <p className="text-[0.62rem] font-mono font-bold uppercase tracking-wider text-brand-orange">
                      Delivered Project
                    </p>
                    <p className="text-sm font-bold text-white truncate">
                      50kW Commercial Rooftop PV Array
                    </p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded bg-brand-blue/80 border border-brand-blue text-white text-[0.66rem] font-mono font-bold uppercase">
                    Grid-Tie Active
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Capabilities Grid ── */}
      <section className="py-16 bg-white border-y border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-blue" />
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-brand-blue">
                  System Topologies
                </span>
              </div>
              <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-heading text-slate-900">
                Tailored Solar Architectures
              </h2>
            </div>
            <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
              Every facility has distinct consumption curves. We specify, simulate, and commission the ideal system topology for your load.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="bg-[#FAF8F5] border border-border p-7 rounded-xl hover:bg-white hover:border-brand-blue hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[0.68rem] font-mono font-bold uppercase tracking-wider text-slate-500">
                      {cap.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-brand-blue font-mono text-[0.68rem] font-bold">
                      {cap.metric}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">{cap.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects Gallery ── */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-orange" />
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-brand-orange">
                  Delivered Sites
                </span>
              </div>
              <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-heading text-slate-900">
                Recent Solar Installations in Kenya
              </h2>
            </div>
            <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
              Photographs from active TrueVolt installations across Nairobi, the Great Rift Valley, and Central Kenya.
            </p>
          </div>

          <ServiceProjectsGrid
            category="Solar"
            badgeLabel="Solar PV"
            badgeBg="bg-brand-blue"
            fallbackProjects={STATIC_SOLAR_PROJECTS}
          />
        </div>
      </section>

      {/* ── 4-Step Engineering Process ── */}
      <section className="py-16 bg-white border-y border-border">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold tracking-widest text-brand-blue uppercase mb-2 block">
              Methodology
            </span>
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-heading text-slate-900 mb-3">
              How We Deliver Turnkey Solar
            </h2>
            <p className="text-slate-600 text-sm">
              From power factor logging to final KPLC liaison, we handle every stage of your solar transition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Site Survey & Load Logging",
                desc: "We analyze your past 12-month KPLC billing data, inspect roof trusses or ground stability, and install a power logger.",
              },
              {
                step: "02",
                title: "CAD & Single-Line Design",
                desc: "Detailed PVsyst yield simulation, cable run optimization, inverter sizing, and safety isolation schematics.",
              },
              {
                step: "03",
                title: "Certified Installation",
                desc: "EPRA-certified solar technicians deploy the array, waterproof penetrations, and assemble the battery rack.",
              },
              {
                step: "04",
                title: "Testing & Handover",
                desc: "Full insulation resistance testing, thermal imaging, inverter programming, and client app onboarding.",
              },
            ].map((phase) => (
              <div key={phase.step} className="p-6 rounded-xl bg-[#FAF8F5] border border-border relative">
                <span className="text-3xl font-heading text-brand-blue/20 font-bold block mb-3">
                  {phase.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">{phase.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="text-[clamp(1.8rem,3.2vw,2.4rem)] font-heading text-white mb-4">
            Take Control of Your Electricity Supply
          </h2>
          <p className="text-blue-100 text-sm lg:text-base leading-relaxed mb-8">
            Book a complimentary site survey. Our senior engineers will evaluate your property, calculate exact annual savings, and provide a fixed-price turnkey proposal.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-blue text-[0.82rem] font-bold tracking-wider uppercase shadow-lg hover:shadow-xl transition-all hover:bg-slate-50"
            >
              <span>Schedule Free Site Survey</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="https://wa.me/254748455070?text=Hello%20TrueVolt%20Systems%2C%20I%20would%20like%20to%20inquire%20about%20a%20solar%20installation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[0.82rem] font-bold tracking-wider uppercase shadow-lg transition-all"
            >
              <span>WhatsApp Us Directly</span>
            </a>
          </div>
        </div>
      </section>

      {/* Shared Footer & Floating Actions */}
      <Footer />
      <FloatingActions />
    </div>
  );
}
