"use client";

import type { ReactElement } from "react";
import { marqueeItems, stack, type StackCategory } from "../../lib/data";
import { useReveal } from "../motion/use-reveal";
import { useLanguage } from "../providers/LanguageProvider";
import { CodeIcon, DatabaseIcon, ServerIcon } from "../ui/Icons";
import SectionLabel from "../ui/SectionLabel";

const icons: Record<StackCategory, ReactElement> = {
  Frontend: <CodeIcon className="text-accent" />,
  Backend: <ServerIcon className="text-accent" />,
  "Bases de datos & Tools": <DatabaseIcon className="text-accent" />,
};

const marquee = [...marqueeItems, "—", ...marqueeItems, "—"];

export default function Stack() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLElement>({ selector: "[data-reveal]", stagger: 0.12 });

  return (
    <section id="stack" ref={ref} className="relative overflow-hidden py-24" aria-labelledby="stack-title">
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal className="text-halo mb-14 py-6 text-center">
          <SectionLabel id="stack-title" label={t.stack.sectionLabel} title={t.stack.title} center />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {(Object.keys(stack) as StackCategory[]).map((category) => (
            <div key={category} data-reveal className="text-halo -mx-6 px-6 py-4">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-accent/20 bg-accent/10">
                  {icons[category]}
                </span>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
                  {t.stack.categories[category]}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2 sm:gap-3">
                {stack[category].map((tech) => (
                  <li
                    key={tech}
                    className="cursor-default whitespace-nowrap rounded-sm border border-line bg-surface px-2.5 py-1 font-mono text-xs tracking-[0.06em] text-fg-muted transition duration-200 ease-out hover:border-accent/40 hover:text-accent sm:text-sm"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="mt-20 overflow-hidden border-y border-line bg-bg/70 py-4">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((item, i) =>
            item === "—" ? (
              <span key={i} className="h-3 w-px self-center bg-line" />
            ) : (
              <span key={i} className="whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fg-faint">
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
