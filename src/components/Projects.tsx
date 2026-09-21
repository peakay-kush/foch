import Image from "next/image";

const categoryBadge: Record<string, { bg: string; text: string }> = {
  Solar: { bg: "bg-brand-blue", text: "text-white" },
  Electrical: { bg: "bg-brand-blue-deep", text: "text-white" },
  Security: { bg: "bg-dark", text: "text-white" },
};

/* ── Reusable card ─────────────────────────────────────────── */
function ProjectCard({
  category,
  title,
  location,
  year,
  refNum,
  aspect = "aspect-[4/3]",
  className = "",
  imageSrc,
}: {
  category: string;
  title: string;
  location: string;
  year: string;
  refNum: number;
  aspect?: string;
  className?: string;
  imageSrc?: string;
}) {
  const badge = categoryBadge[category] ?? { bg: "bg-brand-blue", text: "text-white" };

  return (
    <div className={`group cursor-pointer ${className}`}>
      <div className="relative overflow-hidden bg-surface h-full flex flex-col border border-border group-hover:border-brand-blue transition-colors duration-300">
        {/* Image area */}
        <div
          className={`relative w-full ${aspect} flex-grow overflow-hidden bg-slate-900`}
        >
          {imageSrc ? (
            <>
              <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
            </>
          ) : (
            <div className="img-placeholder w-full h-full flex items-center justify-center">
              <div className="text-center p-4">
                <span className="block font-semibold">{category} System</span>
                <span className="text-[0.6rem] text-text-muted mt-1 block">
                  Project Reference #{refNum}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5 bg-surface border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-block px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${badge.bg} ${badge.text}`}
            >
              {category}
            </span>
          </div>
          <h3 className="text-[1.05rem] leading-snug mb-2 font-heading group-hover:text-brand-blue transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-3 text-text-muted text-[0.75rem] mt-auto">
            <span>{location}</span>
            <span className="w-[3px] h-[3px] bg-border rounded-full" />
            <span className="font-mono">{year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ──────────────────────────────────────────── */
export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-warm-dark">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-[2px] bg-brand-blue" />
              <p className="label text-brand-blue">Portfolio</p>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)]">Featured projects.</h2>
          </div>
          <p className="text-text-muted text-[0.92rem] leading-relaxed max-w-sm">
            A track record of high-performance installations across commercial,
            industrial, and residential sectors.
          </p>
        </div>

        {/* ─── ROW 1 ─────────────────────────────────────── */}
        {/* Solar tall (col 1, spans 2 sub-rows) | Electrical + Security stacked (cols 2-3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          {/* Tall card — left */}
          <ProjectCard
            category="Solar"
            title="Greenfield Estate — 12kW Hybrid Inverter & Storage Bank"
            location="Karen, Nairobi"
            year="2024"
            refNum={101}
            aspect="aspect-[3/4]"
            className="lg:row-span-2"
            imageSrc="/images/projects/solar-hybrid-inverter.jpeg"
          />

          {/* Normal — top middle */}
          <ProjectCard
            category="Electrical"
            title="Woodlands Office Park — Complete DB & Wiring Retrofit"
            location="Westlands, Nairobi"
            year="2024"
            refNum={102}
            imageSrc="/images/projects/electrical-commercial-db.jpeg"
          />

          {/* Normal — top right */}
          <ProjectCard
            category="Security"
            title="Riverside Corporate — 64-Channel IP CCTV & Access"
            location="Riverside, Nairobi"
            year="2023"
            refNum={103}
            imageSrc="/images/projects/security-cctv-surveillance.jpeg"
          />

          {/* Wide card — spans middle + right under the two normals */}
          <ProjectCard
            category="Solar"
            title="Hazelwood Agri-Hub — 25kW Waterfront Solar Array"
            location="Naivasha"
            year="2024"
            refNum={104}
            aspect="aspect-[16/7]"
            className="lg:col-span-2"
            imageSrc="/images/projects/solar-waterfront-array.jpeg"
          />
        </div>

        {/* ─── ROW 2 ─────────────────────────────────────── */}
        {/* Electrical + Solar wide stacked (cols 1-2) | Security tall (col 3, spans 2 sub-rows) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Normal — top left */}
          <ProjectCard
            category="Electrical"
            title="Sunset Ridge Estate — Precision Electrical & Lighting Retrofit"
            location="Upper Hill, Nairobi"
            year="2023"
            refNum={105}
            imageSrc="/images/projects/electrical-specialist-wiring.jpeg"
          />

          {/* Normal — top middle */}
          <ProjectCard
            category="Solar"
            title="Kiambu Commercial Farm — 50kW Rooftop PV Array"
            location="Kiambu"
            year="2024"
            refNum={106}
            imageSrc="/images/projects/solar-rooftop-array.jpeg"
          />

          {/* Tall card — right, spans 2 sub-rows */}
          <ProjectCard
            category="Security"
            title="Thornhill Executive Compound — Perimeter Protection"
            location="Runda, Nairobi"
            year="2024"
            refNum={107}
            aspect="aspect-[3/4]"
            className="lg:row-span-2"
            imageSrc="/images/projects/security-perimeter-protection.jpeg"
          />

          {/* Wide card — spans left + middle under the two normals */}
          <ProjectCard
            category="Electrical"
            title="Waterfall Business District — Multi-Tier Electrical Infrastructure"
            location="Industrial Area, Nairobi"
            year="2024"
            refNum={108}
            aspect="aspect-[16/7]"
            className="lg:col-span-2"
            imageSrc="/images/projects/electrical-commercial-complex.jpeg"
          />
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a href="#contact" className="btn-primary">
            Discuss Your Installation
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

