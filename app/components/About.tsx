"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { loadGsap } from "../lib/gsapClient";
import { personal, education, languages } from "../lib/data";
import SectionLabel from "./SectionLabel";
import { useLanguage } from "./LanguageProvider";

export default function About() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await loadGsap({ registerScrollTrigger: true });

      const els = sectionRef.current?.querySelectorAll(".about-item");
      if (!els) return;

      els.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
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
    <section id="sobre-mi" className="py-24 bg-[#131614]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">

          {/* Photo */}
          <div className="md:w-2/5 about-item opacity-0 mx-8 sm:mx-0">
            <div className="relative inline-block">
              {/* Decorative border layers */}
              <div className="absolute -inset-3 border border-[#2bffb120] rounded-sm z-0" />
              <div className="absolute -inset-6 border border-[#2bffb10a] rounded-sm z-0" />

              <div className="relative z-10">
                <Image
                  src={personal.photoUrl}
                  alt="Luciana Vanelli"
                  width={350}
                  height={500}
                  className="block rounded-sm filter grayscale brightness-[0.9] transition duration-500 ease-out hover:grayscale-0 hover:brightness-100"
                  unoptimized
                />
              </div>

              {/* Label badge */}
              <div className="absolute -bottom-4 -right-4 z-20 rounded-sm border border-[#252a27] bg-[#0d0f0e] px-3 py-2">
                <p className="font-['Space Mono',monospace] text-[0.65rem] sm:text-xs text-[#2bffb1]">
                  Frontend Dev.
                </p>
                <p className="font-['Space Mono',monospace] text-[0.6rem] sm:text-[0.75rem] text-[#4f5c55] mt-0.5">
                  Arroyo Seco, SF — AR
                </p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="md:w-3/5">
            <div className="about-item opacity-0">
              <SectionLabel label={t.about.sectionLabel} title={t.about.title} />
            </div>

            <div className="about-item mt-6 space-y-4 opacity-0">
              {t.about.bio.map((paragraph, i) => (
                <p key={i} className="text-[#8a9990] text-[0.875rem] sm:text-base leading-[1.7]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Education */}
            <div className="about-item mt-8 flex items-center gap-3 sm:gap-4 rounded-sm border border-[#252a27] bg-[#1a1e1c] p-4 opacity-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#2bffb130] bg-[#2bffb110]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2bffb1" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div>
                <p className="font-['Space Mono',monospace] mb-0.5 text-[0.65rem] sm:text-xs text-[#2bffb1]">
                  {t.about.educationLabel}
                </p>
                <p className="text-[#e8ede9] text-xs sm:text-sm font-medium">
                  {education[language].degree}
                </p>
                <p className="mt-0.5 text-[#4f5c55] text-xs sm:text-sm">
                  {education[language].institution} · {education[language].location} · {education[language].period}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
