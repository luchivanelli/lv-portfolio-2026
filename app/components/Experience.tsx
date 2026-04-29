"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "../lib/gsapClient";
import { experience } from "../lib/data";
import SectionLabel from "./SectionLabel";
import { useLanguage } from "./LanguageProvider";

export default function Experience() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await loadGsap({ registerScrollTrigger: true });

      const els = sectionRef.current?.querySelectorAll(".fade-item");
      if (!els) return;

      els.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
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
    <section id="experiencia" className="py-24 relative" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">

          {/* Left */}
          <div className="md:w-1/3">
            <div className="fade-item">
              <SectionLabel label={t.experience.sectionLabel} title={t.experience.title} />
            </div>
            <p className="fade-item mt-4 text-[#8a9990] text-[0.875rem] sm:text-base leading-[1.7]">
              {t.experience.description}
            </p>
          </div>

          {/* Right: timeline */}
          <div className="md:w-2/3 flex flex-col gap-10">
            {experience.map((job, idx) => (
              <div key={job.company}>
                {/* Timeline item */}
                <div className="fade-item relative border-l border-[#252a27] pl-6">
                  {/* Dot */}
                  <div
                    className={`${job.current ? "pulse-dot" : ""} absolute -left-1 top-1.5 h-1.75 w-1.75 rounded-full bg-[#2bffb1] shadow-[0_0_10px_#2bffb180]`}
                  />

                  {/* Date + badge */}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-['Space Mono',monospace] text-[0.65rem] sm:text-sm tracking-widest text-[#2bffb1]">
                      {job.period[language]}
                    </span>
                    {job.current && (
                      <span className="font-['Space Mono',monospace] text-[0.6rem] sm:text-xs rounded-sm border border-[#2bffb130] bg-[#2bffb110] px-2 py-0.5 text-[#2bffb1]">
                        {t.experience.current}
                      </span>
                    )}
                  </div>

                  <p className="text-[#8a9990] text-[0.8rem] sm:text-base font-light">
                    {job.company} · {job.location[language]}
                  </p>
                  <p className="mt-1 mb-3 text-[1.05rem] sm:text-xl font-semibold text-[#e8ede9]">
                    {job.role[language]}
                  </p>

                  <ul className="space-y-1">
                    {job.bullets[language].map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-[#8a9990] text-[0.875rem] sm:text-base leading-[1.6]">
                        <span className="mt-0.5 shrink-0 text-[#2bffb1]">›</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Divider */}
                {idx < experience.length - 1 && (
                  <div className="fade-item mt-10 relative border-t border-[#252a27]">
                    <div className="absolute left-0 -top-px h-px w-15 bg-[#2bffb1]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
