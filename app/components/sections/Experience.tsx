"use client";

import { experience } from "../../lib/data";
import { useReveal } from "../motion/use-reveal";
import { useLanguage } from "../providers/LanguageProvider";
import SectionLabel from "../ui/SectionLabel";

export default function Experience() {
  const { t, language } = useLanguage();
  const ref = useReveal<HTMLElement>({ selector: "[data-reveal]", stagger: 0.08 });

  return (
    <section id="experiencia" ref={ref} className="relative py-24" aria-labelledby="experience-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-16 md:flex-row">
          <div className="text-halo -mx-6 px-6 py-4 md:w-1/3">
            <div data-reveal>
              <SectionLabel id="experience-title" label={t.experience.sectionLabel} title={t.experience.title} />
            </div>
            <p data-reveal className="mt-4 text-[0.875rem] leading-[1.7] text-fg-muted sm:text-base">
              {t.experience.description}
            </p>
          </div>

          <ol className="flex flex-col gap-10 md:w-2/3">
            {experience.map((job, idx) => (
              <li key={job.company}>
                <article data-reveal className="relative border-l border-line pl-6">
                  <span
                    aria-hidden="true"
                    className={`${job.current ? "pulse-dot" : ""} absolute -left-1 top-1.5 h-1.75 w-1.75 rounded-full bg-accent shadow-[0_0_10px_var(--glow-strong)]`}
                  />

                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[0.65rem] tracking-widest text-accent sm:text-sm">{job.period[language]}</span>
                    {job.current && (
                      <span className="rounded-sm border border-accent/20 bg-accent/10 px-2 py-0.5 font-mono text-[0.6rem] text-accent sm:text-xs">
                        {t.experience.current}
                      </span>
                    )}
                  </div>

                  <p className="text-[0.8rem] font-light text-fg-muted sm:text-base">
                    {job.company} · {job.location[language]}
                  </p>
                  <h3 className="mb-3 mt-1 text-[1.05rem] font-semibold text-fg sm:text-xl">{job.role[language]}</h3>

                  <ul className="space-y-1">
                    {job.bullets[language].map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-[0.875rem] leading-[1.6] text-fg-muted sm:text-base">
                        <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">›</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>

                {idx < experience.length - 1 && (
                  <div data-reveal aria-hidden="true" className="relative mt-10 border-t border-line">
                    <div className="absolute -top-px left-0 h-px w-15 bg-accent" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
