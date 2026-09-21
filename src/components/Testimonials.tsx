const testimonials = [
  {
    quote:
      "TrueVolt installed a 12kW hybrid solar system on our residence. The craftsmanship was immaculate, the handover was thorough, and our reliance on KPLC dropped over 80%.",
    name: "David Kamau",
    role: "Homeowner, Karen",
  },
  {
    quote:
      "We contracted TrueVolt for a complete electrical retrofit of our 1,800m² logistics facility. Delivered on schedule, full compliance documentation issued, and zero downtime.",
    name: "Grace Wanjiru",
    role: "Operations Director, TransPack Logistics",
  },
  {
    quote:
      "After assessing multiple vendors for our office complex perimeter and CCTV, TrueVolt stood out for engineering depth. Their 64-channel IP surveillance system has been flawless.",
    name: "James Odhiambo",
    role: "Principal, Odhiambo & Associates",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 lg:py-16 bg-dark">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-8 h-[2px] bg-brand-blue" />
              <p className="label text-brand-blue">Client Feedback</p>
            </div>
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] text-white">
              What our clients say.
            </h2>
          </div>
          <p className="text-[#94A3B8] text-sm max-w-sm">
            Proven performance and trusted engineering across Kenya&apos;s residential, commercial, and industrial sectors.
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#26334D]">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-dark p-6 lg:p-8 flex flex-col hover:bg-dark-soft transition-colors">
              {/* Quote mark */}
              <span className="text-[2rem] leading-none text-brand-blue font-heading mb-3">
                &ldquo;
              </span>

              <p className="text-[0.92rem] leading-relaxed text-[#94A3B8] mb-6">
                {t.quote}
              </p>

              <div className="border-t border-[#26334D] pt-5">
                <p className="text-[0.88rem] text-white font-medium">
                  {t.name}
                </p>
                <p className="text-[0.75rem] text-[#7E8B9F] mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
