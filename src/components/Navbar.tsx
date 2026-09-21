"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const serviceSubgroups = [
    { label: "Solar Installations", href: "/services/solar", dotColor: "bg-brand-orange" },
    { label: "Electrical Contracting", href: "/services/electrical", dotColor: "bg-brand-blue" },
    { label: "Security Systems", href: "/services/security", dotColor: "bg-slate-900" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* Main Navigation */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border py-3"
            : "bg-[#FAF8F5]/90 backdrop-blur-sm border-b border-border/70 py-4"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/images/truevolt-logo-transparent.png"
              alt="TrueVolt Systems Ltd"
              className="h-11 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services with Desktop Dropdown */}
            <div className="relative group">
              <Link
                href="/#services"
                className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold tracking-wider uppercase text-slate-700 hover:text-brand-blue transition-colors duration-150 py-2"
              >
                <span>Services</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-slate-400 group-hover:text-brand-blue group-hover:rotate-180 transition-all duration-200"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-50 min-w-[230px]">
                <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-2 flex flex-col gap-1">
                  {serviceSubgroups.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-[0.82rem] font-medium text-slate-800 hover:text-brand-blue transition-colors"
                    >
                      <span className={`w-2 h-2 rounded-full ${sub.dotColor}`} />
                      <span>{sub.label}</span>
                    </Link>
                  ))}
                  <div className="pt-1 mt-1 border-t border-slate-100">
                    <Link
                      href="/#services"
                      className="block px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-wider text-slate-500 hover:text-brand-blue"
                    >
                      View All Services &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/#projects"
              className="text-[0.8rem] font-semibold tracking-wider uppercase text-slate-700 hover:text-brand-blue transition-colors duration-150"
            >
              Projects
            </Link>

            <Link
              href="/#about"
              className="text-[0.8rem] font-semibold tracking-wider uppercase text-slate-700 hover:text-brand-blue transition-colors duration-150"
            >
              About
            </Link>

            <Link
              href="/#contact"
              className="text-[0.8rem] font-semibold tracking-wider uppercase text-slate-700 hover:text-brand-blue transition-colors duration-150"
            >
              Contact
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/#contact"
              className="btn-primary text-[0.74rem] font-semibold py-3 px-6 shadow-sm hover:shadow transition-all"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[2px] bg-slate-900 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-slate-900 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-slate-900 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu (collapsible sidebar / drawer) */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-white ${
            menuOpen ? "max-h-[38rem] border-b border-border shadow-lg" : "max-h-0"
          }`}
        >
          <div className="container-custom py-6 flex flex-col gap-3">
            
            {/* Services with subgroups */}
            <div className="flex flex-col border-b border-slate-100 pb-2">
              <div className="flex items-center justify-between py-1">
                <Link
                  href="/#services"
                  onClick={() => setMenuOpen(false)}
                  className="text-[0.88rem] font-bold tracking-wider uppercase text-slate-900 hover:text-brand-blue transition-colors"
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="p-1.5 text-slate-500 hover:text-brand-blue transition-colors"
                  aria-label="Toggle services subgroups"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>

              {/* Subgroups under Services */}
              {servicesOpen && (
                <div className="ml-2 pl-3.5 border-l-2 border-brand-blue/30 flex flex-col gap-2 my-2 py-1 bg-slate-50/50 rounded-r-lg">
                  {serviceSubgroups.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 text-[0.82rem] font-semibold text-slate-700 hover:text-brand-blue transition-colors py-1"
                    >
                      <span className={`w-2 h-2 rounded-full ${sub.dotColor}`} />
                      <span>{sub.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other Navigation Links */}
            <Link
              href="/#projects"
              onClick={() => setMenuOpen(false)}
              className="text-[0.88rem] font-bold tracking-wider uppercase text-slate-800 hover:text-brand-blue transition-colors py-1.5"
            >
              Projects
            </Link>

            <Link
              href="/#about"
              onClick={() => setMenuOpen(false)}
              className="text-[0.88rem] font-bold tracking-wider uppercase text-slate-800 hover:text-brand-blue transition-colors py-1.5"
            >
              About
            </Link>

            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="text-[0.88rem] font-bold tracking-wider uppercase text-slate-800 hover:text-brand-blue transition-colors py-1.5"
            >
              Contact
            </Link>

            {/* Bottom Actions in Drawer */}
            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="btn-primary text-[0.75rem] py-3 text-center justify-center"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:+254748455070"
                className="text-xs text-slate-500 hover:text-brand-blue text-center font-mono transition-colors"
              >
                Direct: +254 748 455 070
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
