"use client";

import React from "react";
import { useEffect, useRef } from "react";
import { loadGsap } from "../lib/gsapClient";
import { stack, marqueeItems } from "../lib/data";
import SectionLabel from "./SectionLabel";
import { useLanguage } from "./LanguageProvider";

const stackIcons: Record<string, React.ReactElement> = {
  Frontend: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2bffb1" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Backend: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2bffb1" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
    </svg>
  ),
  "Bases de datos & Tools": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2bffb1" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
};

const doubled = [...marqueeItems, "—", ...marqueeItems, "—", ...marqueeItems, "—", ...marqueeItems];

export default function Stack() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await loadGsap({ registerScrollTrigger: true });
      const cols = sectionRef.current?.querySelectorAll(".stack-col");
      if (!cols) return;
      cols.forEach((col, i) => {
        gsap.fromTo(col, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: "power3.out",
          scrollTrigger: { trigger: col, start: "top 88%", toggleActions: "play none none none" },
        });
      });
    };
    animate();
  }, []);

  return (
    <section id="stack" className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel label={t.stack.sectionLabel} title={t.stack.title} center />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
          {Object.entries(stack).map(([category, techs]) => {
            const categoryLabel = t.stack.categories[category as keyof typeof t.stack.categories] || category;
            return (
              <div key={category} className="stack-col opacity-0">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-[#2bffb130] bg-[#2bffb110]">
                    {stackIcons[category]}
                  </div>
                  <p className="font-['Space Mono',monospace] text-[0.7rem] sm:text-sm uppercase tracking-[0.2em] text-[#2bffb1]">
                    {categoryLabel}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="font-['Space Mono',monospace] cursor-default whitespace-nowrap rounded-sm border border-[#252a27] bg-[#131614] px-2.5 py-1 text-[0.6rem] sm:text-sm tracking-[0.06em] text-[#8a9990] transition duration-200 ease-out hover:border-[#2bffb160] hover:text-[#2bffb1]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-20 overflow-hidden border-t border-b border-[#252a27] py-4">
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span
              key={i}
              className={`font-['Space Mono',monospace] text-[0.65rem] uppercase tracking-[0.2em] whitespace-nowrap ${
                item === "—" ? "text-[#252a27]" : "text-[#4f5c55]"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
