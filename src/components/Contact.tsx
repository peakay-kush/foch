"use client";

import { useState, type FormEvent } from "react";
import { submitContactInquiry } from "@/lib/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    service: "Solar PV Installation & Storage",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    const res = await submitContactInquiry(formData);

    if (res.success) {
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        service: "Solar PV Installation & Storage",
        message: "",
      });
    } else {
      setErrorMessage(res.message);
    }

    setSubmitting(false);
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage(null);
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
                <div className="w-14 h-14 bg-emerald-600 mx-auto flex items-center justify-center mb-6 text-white rounded-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
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
                <p className="text-[0.9rem] text-text-muted mb-6">
                  Thank you for reaching out. Your request has been logged in our system and an engineering representative will contact you shortly to review your technical requirements.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-blue border border-brand-blue/30 hover:bg-brand-blue/5 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-surface border border-border p-8 lg:p-10"
              >
                {errorMessage && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex flex-col gap-2">
                    <p className="font-semibold">{errorMessage}</p>
                    <p className="text-red-600 text-[11px]">
                      Need immediate help? Reach us directly via{" "}
                      <a
                        href="https://wa.me/254748455070"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-bold text-emerald-700 hover:text-emerald-800"
                      >
                        WhatsApp (+254 748 455 070)
                      </a>.
                    </p>
                  </div>
                )}

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
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254 7..."
                      className="w-full border border-border bg-transparent px-4 py-3 text-[0.88rem] text-text focus:border-brand-blue transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.co.ke"
                      className="w-full border border-border bg-transparent px-4 py-3 text-[0.88rem] text-text focus:border-brand-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-location"
                      className="block text-[0.72rem] font-medium uppercase tracking-wider text-text mb-2"
                    >
                      Location / Region
                    </label>
                    <input
                      id="contact-location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Westlands, Nairobi"
                      className="w-full border border-border bg-transparent px-4 py-3 text-[0.88rem] text-text focus:border-brand-blue transition-colors"
                    />
                  </div>
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
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full border border-border bg-transparent px-4 py-3 text-[0.88rem] text-text focus:border-brand-blue transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Solar PV Installation & Storage">Solar PV Installation & Storage</option>
                    <option value="Commercial / Residential Electrical">Commercial / Residential Electrical</option>
                    <option value="CCTV, Alarms & Access Control">CCTV, Alarms & Access Control</option>
                    <option value="Turnkey / Multi-System Package">Turnkey / Multi-System Package</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="contact-message"
                    className="block text-[0.72rem] font-medium uppercase tracking-wider text-text mb-2"
                  >
                    Project Scope & Details *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on project scope, property type, and timeline..."
                    className="w-full border border-border bg-transparent px-4 py-3 text-[0.88rem] text-text focus:border-brand-blue transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Sending Inquiry...
                    </span>
                  ) : (
                    "Request Quotation"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
