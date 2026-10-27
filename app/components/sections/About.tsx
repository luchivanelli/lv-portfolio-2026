"use client";

import Image from "next/image";
import { education, languages, personal } from "../../lib/data";
import { useReveal } from "../motion/use-reveal";
import { useLanguage } from "../providers/LanguageProvider";
import { GraduationIcon } from "../ui/Icons";
import SectionLabel from "../ui/SectionLabel";

export default function About() {
  const { t, language } = useLanguage();
  const ref = useReveal<HTMLElement>({ selector: "[data-reveal]", stagger: 0.1 });

  return (
    <section id="sobre-mi" ref={ref} className="relative py-24" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-16 md:flex-row">
          <div data-reveal className="mx-8 sm:mx-0 md:w-2/5">
            <div className="relative inline-block">
              <div aria-hidden="true" className="absolute -inset-3 z-0 rounded-sm border border-accent/15" />
              <div aria-hidden="true" className="absolute -inset-6 z-0 rounded-sm border border-accent/5" />

              <Image
                src={personal.photoUrl}
                alt={personal.name}
                width={420}
                height={420}
                sizes="(min-width: 768px) 40vw, 80vw"
                className="relative z-10 block aspect-square rounded-sm object-cover brightness-[0.9] grayscale transition duration-500 ease-out hover:brightness-100 hover:grayscale-0"
              />

              <div className="absolute -bottom-4 -right-4 z-20 rounded-sm border border-line bg-bg px-3 py-2">
                <p className="font-mono text-[0.65rem] text-accent sm:text-xs">{t.hero.tag}</p>
                <p className="mt-0.5 font-mono text-[0.6rem] text-fg-faint sm:text-[0.75rem]">{personal.location}</p>
              </div>
            </div>
          </div>

          <div className="text-halo -mx-6 px-6 py-4 md:w-3/5">
            <div data-reveal>
              <SectionLabel id="about-title" label={t.about.sectionLabel} title={t.about.title} />
            </div>

            <div data-reveal className="mt-6 space-y-4">
              {personal.bio[language].map((paragraph) => (
                <p key={paragraph} className="text-[0.875rem] leading-[1.7] text-fg-muted sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            <div data-reveal className="mt-8 flex items-center gap-3 rounded-sm border border-line bg-surface-2/90 p-4 sm:gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-accent/20 bg-accent/10 text-accent">
                <GraduationIcon />
              </span>
              <div>
                <p className="mb-0.5 font-mono text-[0.65rem] text-accent sm:text-xs">{t.about.educationLabel}</p>
                <p className="text-xs font-medium text-fg sm:text-sm">{education[language].degree}</p>
                <p className="mt-0.5 text-xs text-fg-faint sm:text-sm">
                  {education[language].institution} · {education[language].location} · {education[language].period}
                </p>
              </div>
            </div>

            <div data-reveal className="mt-4">
              <p className="mb-2 font-mono text-[0.65rem] text-accent sm:text-xs">{t.about.languagesLabel}</p>
              <ul className="flex flex-wrap gap-3">
                {languages.map((lang) => (
                  <li
                    key={lang.name.es}
                    className="flex items-center gap-2 rounded-sm border border-line bg-surface px-3 py-1.5 text-xs text-fg-muted sm:text-sm"
                  >
                    <span aria-hidden="true">{lang.flag}</span>
                    <span className="text-fg">{lang.name[language]}</span>
                    <span className="font-mono text-[0.65rem] text-fg-faint">{lang.level[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
