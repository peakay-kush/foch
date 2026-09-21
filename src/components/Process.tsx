export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Consultation & Audit",
      desc: "We perform an on-site assessment of your power demands, roof structure, or security perimeter to evaluate feasibility and return on investment.",
    },
    {
      num: "02",
      title: "Custom Engineering",
      desc: "Our engineers prepare detailed schematics, equipment specifications, and transparent cost estimates tailored to your site requirements.",
    },
    {
      num: "03",
      title: "Certified Installation",
      desc: "Licensed technicians carry out the installation with precision, zero compromise on safety regulations, and minimal interruption to your operations.",
    },
    {
      num: "04",
      title: "Commissioning & CoC",
      desc: "Comprehensive testing, handover documentation, official Certificate of Compliance issuance, and ongoing monitoring setup.",
    },
  ];

  return (
    <section className="section-padding bg-warm-dark">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="block w-8 h-[2px] bg-brand-blue" />
            <p className="label text-brand-blue">Operational Workflow</p>
            <span className="block w-8 h-[2px] bg-brand-blue" />
          </div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] mx-auto">
            A clear process,
            <br />
            every single time.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border bg-surface">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className={`p-8 lg:p-10 ${
                idx < steps.length - 1
                  ? "border-b sm:border-b-0 sm:border-r border-border"
                  : ""
              }`}
            >
              <span className="text-[2.2rem] font-heading text-brand-blue leading-none block mb-5">
                {step.num}
              </span>
              <h3 className="text-[1.15rem] font-heading mb-3">{step.title}</h3>
              <p className="text-[0.84rem] leading-relaxed text-text-muted">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
