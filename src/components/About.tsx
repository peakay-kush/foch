import Image from "next/image";

export default function About() {
  const values = [
    {
      num: "01",
      title: "Certified Excellence",
      desc: "EPRA-licensed solar technicians and NCA-registered electricians adhering to Kenyan national standards.",
      accent: "bg-brand-blue",
    },
    {
      num: "02",
      title: "Transparent Costing",
      desc: "Detailed bills of materials, fixed quotes, and no hidden costs.",
      accent: "bg-brand-blue",
    },
    {
      num: "03",
      title: "Long-term Performance",
      desc: "Systems built for decades of optimal output, backed by maintenance plans.",
      accent: "bg-brand-blue",
    },
    {
      num: "04",
      title: "Responsive Support",
      desc: "Direct project managers before, during, and after commissioning.",
      accent: "bg-brand-orange",
    },
  ];

  return (
    <section id="about" className="section-padding bg-warm">
      <div className="container-custom">
        {/* ── Label ──────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-[2px] bg-brand-blue" />
          <p className="label text-brand-blue">About TrueVolt</p>
        </div>

        {/* ── Headline + Body + Field Photo ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mb-16 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] mb-6">
              Built on integrity,
              <br />
              <span className="text-brand-blue">powered by precision.</span>
            </h2>
            <p className="text-text-muted text-[1.05rem] leading-[1.75] max-w-xl">
              Advanced solar infrastructure, certified electrical contracting, and
              modern security solutions — engineered for decades of reliable
              performance across residential estates, commercial facilities, and agricultural projects.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative border border-border bg-surface p-2.5 shadow-sm group">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <Image
                  src="/images/projects/certified-engineer-onsite.jpeg"
                  alt="Certified TrueVolt Engineer on Site"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 text-white z-10">
                  <span className="text-[0.65rem] font-mono font-bold uppercase tracking-widest text-brand-orange block">
                    Certified Technical Team
                  </span>
                  <span className="text-xs font-semibold text-slate-100">
                    EPRA & NCA Certified Compliance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Value Cards — full-width row ────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((item, i) => (
            <div
              key={i}
              className="relative bg-surface border border-border p-8 pt-10 group hover:border-brand-blue/40 hover:shadow-[0_8px_30px_rgba(40,84,166,0.06)] transition-all duration-300"
            >
              {/* Top accent stripe */}
              <div
                className={`absolute top-0 left-0 right-0 h-[3px] ${item.accent}`}
              />

              {/* Number */}
              <span className="block text-[2.5rem] font-heading text-brand-blue/10 leading-none mb-4 group-hover:text-brand-blue/20 transition-colors duration-300">
                {item.num}
              </span>

              <h4 className="text-[1.2rem] font-heading text-dark mb-3">
                {item.title}
              </h4>
              <p className="text-[0.92rem] leading-relaxed text-text-muted">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
