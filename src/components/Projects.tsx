"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Project, fetchProjects, STATIC_FEATURED_PROJECTS, resolveImageUrl } from "@/lib/api";

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
  refNum?: number | null;
  aspect?: string;
  className?: string;
  imageSrc?: string;
}) {
  const badge = categoryBadge[category] ?? { bg: "bg-brand-blue", text: "text-white" };
  const resolvedSrc = resolveImageUrl(imageSrc || "");

  return (
    <div className={`group cursor-pointer ${className}`}>
      <div className="relative overflow-hidden bg-surface h-full flex flex-col border border-border group-hover:border-brand-blue transition-colors duration-300">
        {/* Image area */}
        <div
          className={`relative w-full ${aspect} flex-grow overflow-hidden bg-slate-900`}
        >
          {resolvedSrc ? (
            <>
              <Image
                src={resolvedSrc}
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
                {refNum && (
                  <span className="text-[0.6rem] text-text-muted mt-1 block">
                    Project Reference #{refNum}
                  </span>
                )}
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
  const [projectsList, setProjectsList] = useState<Project[]>(STATIC_FEATURED_PROJECTS);

  useEffect(() => {
    let isMounted = true;
    fetchProjects({ featured: true }).then((data) => {
      if (isMounted && data && data.length > 0) {
        setProjectsList(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Safe accessor to handle dynamic lists from CMS
  const p = (index: number, fallback: Project) => projectsList[index] || fallback;

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
            category={p(0, STATIC_FEATURED_PROJECTS[0]).category}
            title={p(0, STATIC_FEATURED_PROJECTS[0]).title}
            location={p(0, STATIC_FEATURED_PROJECTS[0]).location}
            year={p(0, STATIC_FEATURED_PROJECTS[0]).year}
            refNum={p(0, STATIC_FEATURED_PROJECTS[0]).refNum}
            aspect={p(0, STATIC_FEATURED_PROJECTS[0]).aspect || "aspect-[3/4]"}
            className="lg:row-span-2"
            imageSrc={p(0, STATIC_FEATURED_PROJECTS[0]).image || p(0, STATIC_FEATURED_PROJECTS[0]).imageSrc}
          />

          {/* Normal — top middle */}
          <ProjectCard
            category={p(1, STATIC_FEATURED_PROJECTS[1]).category}
            title={p(1, STATIC_FEATURED_PROJECTS[1]).title}
            location={p(1, STATIC_FEATURED_PROJECTS[1]).location}
            year={p(1, STATIC_FEATURED_PROJECTS[1]).year}
            refNum={p(1, STATIC_FEATURED_PROJECTS[1]).refNum}
            aspect={p(1, STATIC_FEATURED_PROJECTS[1]).aspect || "aspect-[4/3]"}
            imageSrc={p(1, STATIC_FEATURED_PROJECTS[1]).image || p(1, STATIC_FEATURED_PROJECTS[1]).imageSrc}
          />

          {/* Normal — top right */}
          <ProjectCard
            category={p(2, STATIC_FEATURED_PROJECTS[2]).category}
            title={p(2, STATIC_FEATURED_PROJECTS[2]).title}
            location={p(2, STATIC_FEATURED_PROJECTS[2]).location}
            year={p(2, STATIC_FEATURED_PROJECTS[2]).year}
            refNum={p(2, STATIC_FEATURED_PROJECTS[2]).refNum}
            aspect={p(2, STATIC_FEATURED_PROJECTS[2]).aspect || "aspect-[4/3]"}
            imageSrc={p(2, STATIC_FEATURED_PROJECTS[2]).image || p(2, STATIC_FEATURED_PROJECTS[2]).imageSrc}
          />

          {/* Wide card — spans middle + right under the two normals */}
          <ProjectCard
            category={p(3, STATIC_FEATURED_PROJECTS[3]).category}
            title={p(3, STATIC_FEATURED_PROJECTS[3]).title}
            location={p(3, STATIC_FEATURED_PROJECTS[3]).location}
            year={p(3, STATIC_FEATURED_PROJECTS[3]).year}
            refNum={p(3, STATIC_FEATURED_PROJECTS[3]).refNum}
            aspect={p(3, STATIC_FEATURED_PROJECTS[3]).aspect || "aspect-[16/7]"}
            className="lg:col-span-2"
            imageSrc={p(3, STATIC_FEATURED_PROJECTS[3]).image || p(3, STATIC_FEATURED_PROJECTS[3]).imageSrc}
          />
        </div>

        {/* ─── ROW 2 ─────────────────────────────────────── */}
        {/* Electrical + Solar wide stacked (cols 1-2) | Security tall (col 3, spans 2 sub-rows) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Normal — top left */}
          <ProjectCard
            category={p(4, STATIC_FEATURED_PROJECTS[4]).category}
            title={p(4, STATIC_FEATURED_PROJECTS[4]).title}
            location={p(4, STATIC_FEATURED_PROJECTS[4]).location}
            year={p(4, STATIC_FEATURED_PROJECTS[4]).year}
            refNum={p(4, STATIC_FEATURED_PROJECTS[4]).refNum}
            aspect={p(4, STATIC_FEATURED_PROJECTS[4]).aspect || "aspect-[4/3]"}
            imageSrc={p(4, STATIC_FEATURED_PROJECTS[4]).image || p(4, STATIC_FEATURED_PROJECTS[4]).imageSrc}
          />

          {/* Normal — top middle */}
          <ProjectCard
            category={p(5, STATIC_FEATURED_PROJECTS[5]).category}
            title={p(5, STATIC_FEATURED_PROJECTS[5]).title}
            location={p(5, STATIC_FEATURED_PROJECTS[5]).location}
            year={p(5, STATIC_FEATURED_PROJECTS[5]).year}
            refNum={p(5, STATIC_FEATURED_PROJECTS[5]).refNum}
            aspect={p(5, STATIC_FEATURED_PROJECTS[5]).aspect || "aspect-[4/3]"}
            imageSrc={p(5, STATIC_FEATURED_PROJECTS[5]).image || p(5, STATIC_FEATURED_PROJECTS[5]).imageSrc}
          />

          {/* Tall card — right, spans 2 sub-rows */}
          <ProjectCard
            category={p(6, STATIC_FEATURED_PROJECTS[6]).category}
            title={p(6, STATIC_FEATURED_PROJECTS[6]).title}
            location={p(6, STATIC_FEATURED_PROJECTS[6]).location}
            year={p(6, STATIC_FEATURED_PROJECTS[6]).year}
            refNum={p(6, STATIC_FEATURED_PROJECTS[6]).refNum}
            aspect={p(6, STATIC_FEATURED_PROJECTS[6]).aspect || "aspect-[3/4]"}
            className="lg:row-span-2"
            imageSrc={p(6, STATIC_FEATURED_PROJECTS[6]).image || p(6, STATIC_FEATURED_PROJECTS[6]).imageSrc}
          />

          {/* Wide card — spans left + middle under the two normals */}
          <ProjectCard
            category={p(7, STATIC_FEATURED_PROJECTS[7]).category}
            title={p(7, STATIC_FEATURED_PROJECTS[7]).title}
            location={p(7, STATIC_FEATURED_PROJECTS[7]).location}
            year={p(7, STATIC_FEATURED_PROJECTS[7]).year}
            refNum={p(7, STATIC_FEATURED_PROJECTS[7]).refNum}
            aspect={p(7, STATIC_FEATURED_PROJECTS[7]).aspect || "aspect-[16/7]"}
            className="lg:col-span-2"
            imageSrc={p(7, STATIC_FEATURED_PROJECTS[7]).image || p(7, STATIC_FEATURED_PROJECTS[7]).imageSrc}
          />
        </div>

        {/* Additional Projects (if more than 8 exist in DB) */}
        {projectsList.length > 8 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {projectsList.slice(8).map((proj) => (
              <ProjectCard
                key={proj.id}
                category={proj.category}
                title={proj.title}
                location={proj.location}
                year={proj.year}
                refNum={proj.refNum}
                aspect={proj.aspect || "aspect-[4/3]"}
                imageSrc={proj.image || proj.imageSrc}
              />
            ))}
          </div>
        )}

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
