"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "../lib/gsapClient";
import Image from "next/image";
import { projects } from "../lib/data";
import SectionLabel from "./SectionLabel";
import { useLanguage } from "./LanguageProvider";

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Projects() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await loadGsap({ registerScrollTrigger: true });

      const cards = sectionRef.current?.querySelectorAll(".project-card");
      if (!cards) return;

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: (i % 2) * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    };

    animate();
  }, []);

  return (
    <section id="proyectos" className="py-24 relative bg-[#131614]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 text-center">
          <SectionLabel label={t.projects.sectionLabel} title={t.projects.title} center />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="project-card group overflow-hidden rounded-sm border border-[#1a1e1c] bg-[#0d0f0e] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#2bffb140]"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-40 sm:h-50 bg-[#1a1e1c]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top filter grayscale brightness-[0.8] transition duration-300 ease-out group-hover:grayscale-0 group-hover:brightness-[0.95]"
                  unoptimized
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_40%,#0d0f0e)]" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3 gap-3">
                  <h3 className="font-['Space Mono',monospace] text-[0.95rem] sm:text-xl font-bold text-[#e8ede9]">
                    {project.title}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-['Space Mono',monospace] text-[0.65rem] sm:text-xs tracking-widest uppercase text-[#8a9990] transition-colors duration-200 hover:text-[#2bffb1]"
                    >
                      <ExternalIcon /> {t.buttons.live}
                    </a>
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-['Space Mono',monospace] text-[0.65rem] sm:text-xs tracking-widest uppercase text-[#8a9990] transition-colors duration-200 hover:text-[#2bffb1]"
                    >
                      <GithubIcon /> {t.buttons.code}
                    </a>
                  </div>
                </div>

                <p className="mb-4 text-[#8a9990] text-[0.875rem] sm:text-base leading-[1.6]">
                  {project.description[language]}
                  {project.note && (
                    <span className="ml-1 font-['Space Mono',monospace] text-[0.7rem] text-[#2bffb170]">
                      · {project.note}
                    </span>
                  )}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-['Space Mono',monospace] text-[0.6rem] sm:text-xs tracking-[0.08em] rounded-sm border border-[#2bffb130] bg-[#2bffb110] px-2 py-0.5 text-[#2bffb1]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
