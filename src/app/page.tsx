"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function Home() {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef}>
      <Navbar />
      <Hero />

      {/* Banner strip in Royal Blue with Orange accents */}
      <div className="bg-brand-blue py-4 overflow-hidden border-y border-brand-blue-hover">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="text-[0.72rem] font-semibold tracking-[0.25em] uppercase text-white mx-8 flex items-center gap-4"
            >
              <span>Solar Installations</span>
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full inline-block" />
              <span>Electrical Contracting</span>
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full inline-block" />
              <span>Integrated Security</span>
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full inline-block" />
              <span className="text-white/80">Powered by Precision</span>
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full inline-block" />
            </span>
          ))}
        </div>
      </div>

      <div data-reveal className="reveal">
        <Services />
      </div>

      <div data-reveal className="reveal">
        <Process />
      </div>

      <div data-reveal className="reveal">
        <Projects />
      </div>

      <div data-reveal className="reveal">
        <About />
      </div>

      <div data-reveal className="reveal">
        <Testimonials />
      </div>

      <div data-reveal className="reveal">
        <Contact />
      </div>

      <Footer />
      <FloatingActions />
    </div>
  );
}
