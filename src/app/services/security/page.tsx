import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ServiceProjectsGrid from "@/components/ServiceProjectsGrid";
import { STATIC_SECURITY_PROJECTS } from "@/lib/api";

export const metadata = {
  title: "Security Systems — TrueVolt Systems | CCTV, Electric Fencing & Access Control Kenya",
  description:
    "TrueVolt Systems delivers integrated security engineering across Kenya. 4K IP CCTV surveillance, electric fencing, biometric access control, razor wire, gate automation, and solar-backed zero-downtime security systems in Nairobi and nationwide.",
};

const capabilities = [
  {
    title: "4K AI IP CCTV Surveillance",
    category: "Optical Surveillance",
    description: "4K ultra-high-definition cameras with AcuSense human/vehicle filtering, ColorVu low-light night optics, and centralized NVR storage with remote smartphone app access.",
    metric: "4K Ultra-HD",
  },
  {
    title: "Nemtek Electric Fencing",
    category: "Perimeter Defense",
    description: "Multi-strand high-voltage electric security fencing with zone-monitored energizers, tamper loops, cut-wire sensors, and instant siren/GSM strobe alerting.",
    metric: "8-16 Joules",
  },
  {
    title: "Razor Wire Fortification",
    category: "Physical Barriers",
    description: "Heavy-galvanized flat-wrap and concertina razor wire coils mounted on perimeter walls and palisade fencing for maximum physical intrusion deterrence.",
    metric: "Anti-Climb",
  },
  {
    title: "Biometric Access Control",
    category: "Access & Identity",
    description: "Facial recognition terminals, fingerprint turnstiles, and RFID card scanners with automated time-and-attendance logging and remote gate intercom clearance.",
    metric: "<0.2s Match",
  },
  {
    title: "Automated Gates & Barriers",
    category: "Perimeter Automation",
    description: "Heavy-duty Centurion Systems sliding and swing gate motors with optical anti-crush safety beams, inductive ground loops, and GSM remote activation.",
    metric: "Solar Ready",
  },
  {
    title: "Zero-Downtime Solar Backup",
    category: "Power Resilience",
    description: "Dedicated solar-coupled battery backup guaranteeing CCTV recording, perimeter electric fences, alarms, and access gates remain 100% active during KPLC blackouts.",
    metric: "Zero Downtime",
  },
];

export default function SecurityPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <Navbar />

      {/* Breadcrumbs */}
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
            <span className="text-slate-900 font-semibold">Security Systems</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-700 uppercase">
              Zero-Downtime Perimeter Protection
            </span>
          </div>
        </div>
      </div>

      {/* Bento Grid Engineering Hero */}
      <section className="py-8 lg:py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* 1. Main Core Proposition Card (Col 7) */}
            <div className="lg:col-span-7 bg-white border border-border rounded-2xl p-7 lg:p-10 shadow-xs flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div>
                <h1 className="text-[clamp(2.3rem,4.2vw,3.6rem)] font-heading leading-[1.08] text-slate-900 mb-5">
                  Security Systems.
                  <br />
                  <span className="text-brand-blue font-normal">Zero-Downtime Protection.</span>
                </h1>

                <p className="text-slate-600 text-base lg:text-[1.05rem] leading-relaxed max-w-xl mb-8">
                  Enterprise 4K IP CCTV surveillance, high-voltage Nemtek electric fencing with zone monitoring, biometric access control, and smart gate automation — reinforced with solar UPS buffers so your defense never drops during KPLC outages.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <Link
                    href="/#contact"
                    className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-[0.82rem] font-semibold tracking-wider uppercase shadow-sm hover:shadow-md transition-all"
                  >
                    <span>Book Perimeter Assessment</span>
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

              {/* Quick Proof Metrics */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 sm:gap-4">
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-heading text-brand-orange font-bold whitespace-nowrap">0 ms</p>
                  <p className="text-[0.65rem] sm:text-[0.72rem] font-medium text-slate-500 uppercase tracking-normal sm:tracking-wider mt-0.5 leading-tight break-words">
                    Zero Downtime
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-heading text-slate-900 font-bold whitespace-nowrap">4K UHD</p>
                  <p className="text-[0.65rem] sm:text-[0.72rem] font-medium text-slate-500 uppercase tracking-normal sm:tracking-wider mt-0.5 leading-tight break-words">
                    AI Detection
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-heading text-brand-blue font-bold whitespace-nowrap">24/7</p>
                  <p className="text-[0.65rem] sm:text-[0.72rem] font-medium text-slate-500 uppercase tracking-normal sm:tracking-wider mt-0.5 leading-tight break-words">
                    Live Alerts
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Pure Visual Project Showcase (Col 5) */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-sm border border-border bg-slate-900 group min-h-[380px] lg:min-h-[440px] flex flex-col justify-between">
              <Image
                src="/images/projects/security-cctv-surveillance.jpeg"
                alt="64-Channel CCTV Surveillance Command Centre Nairobi"
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
                  Riverside, Nairobi
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
                      64-Channel 4K IP Surveillance Command Centre
                    </p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded bg-brand-blue/80 border border-brand-blue text-white text-[0.66rem] font-mono font-bold uppercase">
                    UPS Protected
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-16 bg-white border-y border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-blue" />
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-brand-blue">
                  Integrated Scope
                </span>
              </div>
              <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-heading text-slate-900">
                Multi-Layered Property Protection
              </h2>
            </div>
            <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
              Deter, detect, delay, and document. TrueVolt engineers cohesive security architecture for complete peace of mind.
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

      {/* Featured Projects */}
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
                Recent Security Installations in Kenya
              </h2>
            </div>
            <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
              Real projects safeguarding corporate headquarters, diplomatic residences, and gated community perimeters in Nairobi.
            </p>
          </div>

          <ServiceProjectsGrid
            category="Security"
            badgeLabel="Security"
            badgeBg="bg-slate-900"
            fallbackProjects={STATIC_SECURITY_PROJECTS}
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="text-[clamp(1.8rem,3.2vw,2.4rem)] font-heading text-white mb-4">
            Protect Your Perimeter with TrueVolt
          </h2>
          <p className="text-blue-100 text-sm lg:text-base leading-relaxed mb-8">
            Schedule a comprehensive perimeter security and surveillance audit with our senior electronic technicians. We identify vulnerable blind spots, test fence energizers, and engineer a robust defence.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-blue text-[0.82rem] font-bold tracking-wider uppercase shadow-lg hover:shadow-xl transition-all hover:bg-slate-50"
            >
              <span>Schedule Security Audit</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="https://wa.me/254748455070?text=Hello%20TrueVolt%20Systems%2C%20I%20would%20like%20to%20inquire%20about%20security%20systems."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[0.82rem] font-bold tracking-wider uppercase shadow-lg transition-all"
            >
              <span>WhatsApp Us Directly</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  );
}
