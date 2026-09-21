import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export const metadata = {
  title: "Electrical Contracting — TrueVolt Systems | NCA Certified Electrical Contractor Kenya",
  description:
    "TrueVolt Systems provides NCA-registered and EPRA-licensed electrical contracting services across Kenya. Commercial power reticulation, switchboards, wiring, generator integration, and architectural lighting in Nairobi and nationwide.",
};

const projects = [
  {
    title: "Westlands Office Park — Complete Main Distribution Board Retrofit",
    location: "Westlands, Nairobi",
    year: "2025",
    image: "/images/projects/electrical-commercial-db.jpeg",
    description:
      "Full replacement and upgrade of ageing main distribution boards across a 6-storey commercial office block, including three-phase bus-bar systems, surge protection, and earth leakage units.",
    specs: ["3-Phase MDB Upgrade", "Surge Protection", "Earth Leakage Units", "KPLC Compliance"],
  },
  {
    title: "Industrial Area Complex — Multi-Tier Electrical Infrastructure",
    location: "Industrial Area, Nairobi",
    year: "2025",
    image: "/images/projects/electrical-commercial-complex.jpeg",
    description:
      "Large-scale commercial electrical fit-out across a multi-storey development — cable tray reticulation, sub-distribution boards, generator changeover switches, and power factor correction.",
    specs: ["Cable Tray Reticulation", "Sub-DB Installation", "Generator Changeover", "Power Factor Correction"],
  },
  {
    title: "Karen Residence — Precision Chandelier & Architectural Wiring",
    location: "Karen, Nairobi",
    year: "2025",
    image: "/images/projects/electrical-specialist-wiring.jpeg",
    description:
      "Specialist electrical wiring for luxury residential lighting — including heavy chandelier mounting, dimmer circuit integration, and concealed conduit runs in plastered ceilings.",
    specs: ["Chandelier Mounting", "Dimmer Circuits", "Concealed Conduit", "Premium Finishes"],
  },
  {
    title: "Kilimani Apartments — Modern Geometric LED Ceiling Lighting",
    location: "Kilimani, Nairobi",
    year: "2024",
    image: "/images/projects/electrical-modern-lighting.jpeg",
    description:
      "Contemporary architectural LED lighting installation featuring geometric gypsum ceiling designs with integrated strip lighting, downlights, and smart control systems.",
    specs: ["LED Strip Integration", "Gypsum Ceiling Design", "Smart Controls", "Energy Efficient"],
  },
];

const services = [
  {
    title: "Main Distribution Boards (MDB)",
    category: "Switchgear & Controls",
    description: "Engineering, assembly, and testing of custom 3-phase switchboards with bus-bar systems, MCCBs, surge suppression devices, and comprehensive phase labeling.",
    metric: "Up to 2500A",
  },
  {
    title: "Three-Phase Reticulation",
    category: "Industrial Power",
    description: "Heavy-gauge cable sizing calculations, perforated cable tray networks, bus-duct systems, and load balancing across multi-floor commercial buildings.",
    metric: "KS 04-180 Code",
  },
  {
    title: "Generator & ATS Systems",
    category: "Backup Power",
    description: "Automatic Transfer Switches with phase-failure sensing and mechanical interlocking, synchronizing backup diesel generators without back-feeding the grid.",
    metric: "<10ms Transfer",
  },
  {
    title: "Power Factor Correction (PFC)",
    category: "Energy Efficiency",
    description: "Automatic capacitor bank installations mitigating inductive motor loads, eliminating KPLC low power-factor penalty surcharges for industrial clients.",
    metric: "0.98+ Power Factor",
  },
  {
    title: "Architectural & Specialty Lighting",
    category: "Commercial & Residential",
    description: "Precision wiring for luxury fixtures, high-bay factory illumination, architectural gypsum cove LED lighting, and programmable DALI control systems.",
    metric: "Smart Automation",
  },
  {
    title: "Periodic Inspection & Testing",
    category: "Safety & Compliance",
    description: "Megger insulation resistance logging, earth mat resistance verification, thermal infrared imaging of busbars, and formal statutory compliance sign-offs.",
    metric: "NCA Certified",
  },
];

export default function ElectricalPage() {
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
            <span className="text-slate-900 font-semibold">Electrical Contracting</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-700 uppercase">
              NCA Certified Contractor
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
                  Electrical Contracting.
                  <br />
                  <span className="text-brand-blue font-normal">Certified Precision & Power.</span>
                </h1>

                <p className="text-slate-600 text-base lg:text-[1.05rem] leading-relaxed max-w-xl mb-8">
                  NCA-registered and EPRA-licensed electrical contracting for corporate developments, industrial plants, and luxury residences. Fully compliant with Kenyan Standard KS 04-180 and KPLC connection protocols.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <Link
                    href="/#contact"
                    className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-[0.82rem] font-semibold tracking-wider uppercase shadow-sm hover:shadow-md transition-all"
                  >
                    <span>Request Engineering Consultation</span>
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
                  <p className="text-lg sm:text-xl font-heading text-brand-blue font-bold whitespace-nowrap">KS 04-180</p>
                  <p className="text-[0.65rem] sm:text-[0.72rem] font-medium text-slate-500 uppercase tracking-normal sm:tracking-wider mt-0.5 leading-tight break-words">
                    Wiring Code
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-heading text-slate-900 font-bold whitespace-nowrap">Class 4</p>
                  <p className="text-[0.65rem] sm:text-[0.72rem] font-medium text-slate-500 uppercase tracking-normal sm:tracking-wider mt-0.5 leading-tight break-words">
                    NCA Certified
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-heading text-brand-orange font-bold whitespace-nowrap">100%</p>
                  <p className="text-[0.65rem] sm:text-[0.72rem] font-medium text-slate-500 uppercase tracking-normal sm:tracking-wider mt-0.5 leading-tight break-words">
                    EPRA Class A
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Pure Visual Project Showcase (Col 5) */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-sm border border-border bg-slate-900 group min-h-[380px] lg:min-h-[440px] flex flex-col justify-between">
              <Image
                src="/images/projects/electrical-commercial-db.jpeg"
                alt="TrueVolt Main Distribution Switchgear Retrofit Nairobi"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30 pointer-events-none" />

              {/* Top Location Pill */}
              <div className="relative z-10 p-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-white text-[0.7rem] font-mono font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Westlands, Nairobi
                </span>
              </div>

              {/* Floating Bottom Spec Pill */}
              <div className="relative z-10 p-5">
                <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[0.72rem] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      Commercial 3-Phase Retrofit
                    </span>
                    <span className="text-[0.68rem] font-mono text-slate-400">400A / 415V</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    Full copper busbar dressing, digital energy sub-metering, and automatic surge suppression across 6 commercial floors.
                  </p>
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
                  Engineering Scope
                </span>
              </div>
              <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-heading text-slate-900">
                Full-Spectrum Electrical Contracting
              </h2>
            </div>
            <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
              Industrial reticulation, commercial switchboards, backup power integration, and luxury architectural installations across Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-[#FAF8F5] border border-border p-7 rounded-xl hover:bg-white hover:border-brand-blue hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[0.68rem] font-mono font-bold uppercase tracking-wider text-slate-500">
                      {service.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-brand-blue font-mono text-[0.68rem] font-bold">
                      {service.metric}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">{service.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{service.description}</p>
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
                  Delivered Work
                </span>
              </div>
              <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-heading text-slate-900">
                Recent Electrical Projects in Kenya
              </h2>
            </div>
            <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
              Real commercial switchboards, industrial reticulation, and specialist architectural lighting installations delivered by our teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <div
                key={i}
                className="bg-white border border-border rounded-xl overflow-hidden shadow-xs hover:border-brand-blue hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="bg-brand-blue text-white text-[0.62rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                      Electrical
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[1.02rem] font-bold text-slate-900 mb-2 leading-snug group-hover:text-brand-blue transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.specs.map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 text-[0.66rem] font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[0.74rem] text-slate-500 pt-3 border-t border-slate-100">
                      <span className="font-medium text-slate-700 flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-orange">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                        {project.location}
                      </span>
                      <span className="font-mono text-slate-400">{project.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="text-[clamp(1.8rem,3.2vw,2.4rem)] font-heading text-white mb-4">
            Need an NCA-Certified Electrical Contractor?
          </h2>
          <p className="text-blue-100 text-sm lg:text-base leading-relaxed mb-8">
            Whether for a new commercial build, main switchboard upgrade, or generator ATS synchronization, TrueVolt provides transparent engineering documentation and flawless execution.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-blue text-[0.82rem] font-bold tracking-wider uppercase shadow-lg hover:shadow-xl transition-all hover:bg-slate-50"
            >
              <span>Request Engineering Quote</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="https://wa.me/254748455070?text=Hello%20TrueVolt%20Systems%2C%20I%20would%20like%20to%20inquire%20about%20electrical%20contracting%20services."
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
