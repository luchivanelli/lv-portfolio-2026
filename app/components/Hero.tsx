"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "../lib/gsapClient";
import { personal, stats } from "../lib/data";
import { useLanguage } from "./LanguageProvider";

export default function Hero() {
  const { t, language } = useLanguage();
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await loadGsap();

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(tagRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 })
        .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .fromTo(btnsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(decoRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");

      const outerRing = decoRef.current?.querySelector(".ring-outer");
      const midRing = decoRef.current?.querySelector(".ring-mid");

      if (outerRing) {
        gsap.to(outerRing, {
          rotation: 360,
          duration: 30,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });
      }

      if (midRing) {
        gsap.to(midRing, {
          rotation: -360,
          duration: 20,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });
      }
    };

    const phrases = t.hero.phrases;
    let phraseIndex = 0;
    let charIndex = 0;
    const timeoutIds: number[] = [];

    const typePhrase = () => {
      const el = typingRef.current;
      if (!el) return;

      const current = phrases[phraseIndex % phrases.length];
      charIndex += 1;
      el.textContent = current.slice(0, charIndex);

      if (charIndex < current.length) {
        timeoutIds.push(window.setTimeout(typePhrase, 85));
      } else {
        timeoutIds.push(window.setTimeout(erasePhrase, 1200));
      }
    };

    const erasePhrase = () => {
      const el = typingRef.current;
      if (!el) return;

      const current = phrases[phraseIndex % phrases.length];
      charIndex -= 1;
      el.textContent = current.slice(0, charIndex);

      if (charIndex > 0) {
        timeoutIds.push(window.setTimeout(erasePhrase, 45));
      } else {
        phraseIndex += 1;
        timeoutIds.push(window.setTimeout(typePhrase, 300));
      }
    };

    animate();
    timeoutIds.push(window.setTimeout(typePhrase, 900));

    return () => {
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [t.hero.phrases]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative h-dvh flex items-center pt-14 overflow-hidden"
    >
      {/* Grid bg */}
      <div className="grid-bg absolute inset-0 opacity-30" />

      {/* Glow */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none bg-[radial-gradient(circle,#2bffb115_0%,transparent_70%)] filter blur-2xl"
      />

      <div className="relative max-w-6xl mx-auto px-6 py-32 w-full">
        <div className="max-w-2xl">

          {/* Tag */}
          <div
            ref={tagRef}
            className="inline-block mb-6 rounded-sm border border-[#2bffb130] px-3 py-1 text-[0.65rem] sm:text-sm uppercase tracking-[0.2em] text-[#2bffb1] opacity-0 font-['Space Mono',monospace]"
          >
            {t.hero.tag}
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="mb-6 text-[32px] sm:text-6xl md:text-7xl font-['Space Mono',monospace] font-bold leading-none tracking-[-0.02em] opacity-0"
          >
            {language === "en" && t.hero.titleLines.length === 2 ? (
              <>
                <span>
                  {t.hero.titleLines[0]} <span ref={typingRef} className="inline-block min-w-[18ch] text-[#2bffb1]" /> {t.hero.titleLines[1]}
                </span>
              </>
            ) : (
              <>
                {t.hero.titleLines.map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < t.hero.titleLines.length - 1 ? <br /> : null}
                  </span>
                ))}
                <br />
                <span ref={typingRef} className="inline-block min-w-[18ch] text-[#2bffb1]" />
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p
            ref={subRef}
            className="mb-10 max-w-120 text-sm sm:text-lg leading-[1.7] text-[#8a9990] opacity-0"
          >
            {t.hero.subtitle}
          </p>

          {/* Buttons */}
          <div ref={btnsRef} className="flex flex-wrap gap-4 opacity-0">
            <a
              href="#proyectos"
              onClick={(e) => handleScroll(e, "#proyectos")}
              className="inline-block rounded-sm bg-[#2bffb1] px-6 py-2 sm:px-7 sm:py-3 text-[10px] sm:text-xs font-['Space Mono',monospace] font-bold uppercase tracking-[0.12em] text-[#0d0f0e] transition duration-200 ease-out hover:bg-[#00e5a0] hover:shadow-[0_0_20px_#2bffb140]"
            >
              {t.buttons.viewProjects}
            </a>
            <a
              href="#contacto"
              onClick={(e) => handleScroll(e, "#contacto")}
              className="inline-block rounded-sm border border-[#2bffb1] bg-transparent px-6 py-2 sm:px-7 sm:py-3 text-[10px] sm:text-xs font-['Space Mono',monospace] font-bold uppercase tracking-[0.12em] text-[#2bffb1] transition duration-200 ease-out hover:bg-[#2bffb110] hover:shadow-[0_0_20px_#2bffb130]"
            >
              {t.buttons.talk}
            </a>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex gap-6 sm:gap-8 mt-16 opacity-0">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`${i > 0 ? "border-l border-[#252a27] pl-8" : ""}`}>
                <p className="text-xl sm:text-3xl font-['Space Mono',monospace] font-bold leading-none text-[#2bffb1]">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.75rem] sm:text-base text-[#8a9990]">
                  {t.stats[i]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative rings — desktop only */}
        <div
          ref={decoRef}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-0"
        >
          <div className="relative flex items-center justify-center w-65 h-65">
            <div className="absolute -top-4 -left-14 rounded-sm border border-[#2bffb140] bg-[#131614] px-2.5 py-1 text-[0.67rem] uppercase tracking-[0.06em] text-[#2bffb1] font-['Space Mono',monospace]">
              React
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 rounded-sm border border-[#2bffb140] bg-[#131614] px-2.5 py-1 text-[0.67rem] uppercase tracking-[0.06em] text-[#2bffb1] font-['Space Mono',monospace]">
              Next.js
            </div>
            <div className="absolute -bottom-4 left-8 rounded-sm border border-[#2bffb140] bg-[#131614] px-2.5 py-1 text-[0.67rem] uppercase tracking-[0.06em] text-[#2bffb1] font-['Space Mono',monospace]">
              Tailwind CSS
            </div>
            <div className="absolute -top-16 left-18 rounded-sm border border-[#2bffb140] bg-[#131614] px-2.5 py-1 text-[0.67rem] uppercase tracking-[0.06em] text-[#2bffb1] font-['Space Mono',monospace]">
              Javascript
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
