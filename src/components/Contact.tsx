"use client";

import { useState, type FormEvent } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-warm">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-[2px] bg-brand-orange" />
              <p className="label label-accent">Get In Touch</p>
            </div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] mb-8">
              Let&apos;s engineer
              <br />
              your next solution.
            </h2>

            <p className="text-[0.94rem] leading-relaxed text-text-muted mb-12 max-w-md">
              Whether you require a custom solar quotation, electrical inspection, or integrated
              commercial security assessment, our engineering team will respond within 24 hours.
            </p>

            {/* Contact details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-blue/10 flex items-center justify-center shrink-0 border border-brand-blue/20">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2854A6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.78rem] font-medium uppercase tracking-wider text-text mb-1">
                    Direct Line
                  </p>
                  <p className="text-[0.9rem] text-text-muted font-mono">
                    +254 748 455 070
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-orange/10 flex items-center justify-center shrink-0 border border-brand-orange/20">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F7941D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.78rem] font-medium uppercase tracking-wider text-text mb-1">
                    Email Inquiries
                  </p>
                  <p className="text-[0.9rem] text-text-muted font-mono">
                    info@truevoltsystems.co.ke
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-blue/10 flex items-center justify-center shrink-0 border border-brand-blue/20">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2854A6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.78rem] font-medium uppercase tracking-wider text-text mb-1">
                    Head Office
                  </p>
                  <p className="text-[0.9rem] text-text-muted">
                    Nairobi
                    <br />
                    Kenya
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {submitted ? (
              <div className="bg-surface border border-border p-10 text-center">
                <div className="w-14 h-14 bg-brand-blue mx-auto flex items-center justify-center mb-6">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-[1.3rem] font-heading mb-3">
                  Inquiry Received.
                </h3>
                <p className="text-[0.9rem] text-text-muted">
                  Thank you for reaching out. A TrueVolt Systems representative will contact you
                  shortly to discuss your technical requirements.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-surface border border-border p-8 lg:p-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[0.72rem] font-medium uppercase tracking-wider text-text mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Johan Smith"
                      className="w-full border border-border bg-transparent px-4 py-3 text-[0.88rem] text-text focus:border-brand-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-[0.72rem] font-medium uppercase tracking-wider text-text mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+254 7..."
                      className="w-full border border-border bg-transparent px-4 py-3 text-[0.88rem] text-text focus:border-brand-blue transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="contact-email"
                    className="block text-[0.72rem] font-medium uppercase tracking-wider text-text mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@company.co.ke"
                    className="w-full border border-border bg-transparent px-4 py-3 text-[0.88rem] text-text focus:border-brand-blue transition-colors"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="contact-service"
                    className="block text-[0.72rem] font-medium uppercase tracking-wider text-text mb-2"
                  >
                    Service Required *
                  </label>
                  <select
                    id="contact-service"
                    required
                    defaultValue=""
                    className="w-full border border-border bg-transparent px-4 py-3 text-[0.88rem] text-text focus:border-brand-blue transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select primary service area</option>
                    <option value="solar">Solar PV Installation & Storage</option>
                    <option value="electrical">Commercial / Residential Electrical</option>
                    <option value="security">CCTV, Alarms & Access Control</option>
                    <option value="multi">Turnkey / Multi-System Package</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="contact-message"
                    className="block text-[0.72rem] font-medium uppercase tracking-wider text-text mb-2"
                  >
                    Project Scope & Location
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Provide details on project scope, property type, and timeline..."
                    className="w-full border border-border bg-transparent px-4 py-3 text-[0.88rem] text-text focus:border-brand-blue transition-colors resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  Request Quotation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
