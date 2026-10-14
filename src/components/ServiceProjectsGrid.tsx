"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Project, fetchProjects, resolveImageUrl } from "@/lib/api";

interface ServiceProjectsGridProps {
  category: "Solar" | "Electrical" | "Security";
  badgeLabel: string;
  badgeBg?: string;
  fallbackProjects: Project[];
}

export default function ServiceProjectsGrid({
  category,
  badgeLabel,
  badgeBg = "bg-brand-blue",
  fallbackProjects,
}: ServiceProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    let isMounted = true;
    fetchProjects({ category }).then((data) => {
      if (isMounted && data && data.length > 0) {
        setProjects(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [category]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {projects.map((project, i) => {
        const imageSrc = resolveImageUrl(project.image || project.imageSrc || "");
        const specsList = Array.isArray(project.specs) ? project.specs : [];

        return (
          <div
            key={project.id || i}
            className="bg-white border border-border rounded-xl overflow-hidden shadow-xs hover:border-brand-blue hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              {imageSrc ? (
                <>
                  <Image
                    src={imageSrc}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-mono">
                  No Image Available
                </div>
              )}
              <div className="absolute bottom-3 left-3 z-10">
                <span className={`${badgeBg} text-white text-[0.62rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded`}>
                  {badgeLabel}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[0.98rem] font-bold text-slate-900 mb-2 leading-snug group-hover:text-brand-blue transition-colors">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {project.description}
                  </p>
                )}
              </div>

              <div>
                {specsList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {specsList.map((spec, specIdx) => (
                      <span
                        key={specIdx}
                        className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 text-[0.66rem] font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-[0.74rem] text-slate-500 pt-3 border-t border-slate-100">
                  <span className="font-medium text-slate-700 flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-orange">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {project.location}
                  </span>
                  <span className="font-mono text-xs">{project.year}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
