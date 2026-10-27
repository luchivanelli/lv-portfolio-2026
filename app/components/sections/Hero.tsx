"use client";

import type { CSSProperties, MouseEvent } from "react";
import { stats } from "../../lib/data";
import { useLanguage } from "../providers/LanguageProvider";
import { useScrollTo } from "../providers/SmoothScroll";
import Button from "../ui/Button";
import PhraseRotator from "../ui/PhraseRotator";

/** Stagger index for the CSS intro animation (see .hero-in in globals.css). */
const enter = (i: number): CSSProperties => ({ "--i": i } as CSSProperties);

export default function Hero() {
  const { t, language } = useLanguage();
  const scrollTo = useScrollTo();

  const handleAnchor = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  // Slightly smaller than the title so the longest phrase fits on one line at every breakpoint.
  const rotator = (
    <PhraseRotator phrases={t.hero.phrases} className="text-accent text-[24px] sm:text-[2.6rem] md:text-[3.4rem]" />
  );

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden pt-14"
      aria-labelledby="hero-title"
    >
      <div className="grid-bg absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-28">
        <div className="text-halo -mx-6 max-w-3xl px-6 py-6 md:bg-none">
          <p
            style={enter(0)}
            className="hero-in mb-6 inline-block rounded-sm border border-accent/20 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent sm:text-sm"
          >
            {t.hero.tag}
          </p>

          {/* LCP element: slides in but never starts at opacity 0 (see .hero-in rules). */}
          <h1
            id="hero-title"
            style={enter(1)}
            className="hero-in mb-6 font-mono text-[32px] font-bold leading-none tracking-[-0.02em] sm:text-6xl md:text-7xl"
          >
            {language === "en" ? (
              <>
                {t.hero.titleLines[0]}
                {rotator}
                {t.hero.titleLines[1]}
              </>
            ) : (
              <>
                {t.hero.titleLines[0]}
                <br />
                {t.hero.titleLines[1]}
                {rotator}
              </>
            )}
          </h1>

          <p style={enter(2)} className="hero-in mb-10 max-w-[30rem] text-sm leading-[1.7] text-fg-muted sm:text-lg">
            {t.hero.subtitle}
          </p>

          <div style={enter(3)} className="hero-in flex flex-wrap gap-4">
            <Button href="#proyectos" onClick={(e) => handleAnchor(e, "#proyectos")}>
              {t.buttons.viewProjects}
            </Button>
            <Button href="#contacto" variant="outline" onClick={(e) => handleAnchor(e, "#contacto")}>
              {t.buttons.talk}
            </Button>
          </div>

          <dl style={enter(4)} className="hero-in mt-16 flex gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label.es} className={i > 0 ? "border-l border-line pl-6 sm:pl-8" : ""}>
                <dt className="order-2 mt-1 text-[0.75rem] text-fg-muted sm:text-base">{stat.label[language]}</dt>
                <dd className="order-1 font-mono text-xl font-bold leading-none text-accent sm:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div
        style={enter(5)}
        aria-hidden="true"
        className="hero-in absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-fg-faint md:flex"
      >
        <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
        {t.hero.scrollHint}
      </div>
    </section>
  );
}
