"use client";

import { personal } from "../../lib/data";
import { useReveal } from "../motion/use-reveal";
import { useLanguage } from "../providers/LanguageProvider";
import Button from "../ui/Button";
import { MailIcon, PinIcon } from "../ui/Icons";
import SectionLabel from "../ui/SectionLabel";

export default function Contact() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLElement>({ selector: "[data-reveal]", stagger: 0.08, start: "top 90%" });

  return (
    <section id="contacto" ref={ref} className="relative overflow-hidden py-28" aria-labelledby="contact-title">
      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="mx-auto max-w-2xl rounded-sm bg-[radial-gradient(ellipse_at_center,rgb(13_15_14/0.92)_0%,rgb(13_15_14/0.75)_50%,transparent_80%)] px-6 py-10">
          <div data-reveal>
            <SectionLabel id="contact-title" label={t.contact.sectionLabel} title={t.contact.title} center />
          </div>

          <p data-reveal className="mx-auto mb-12 mt-4 max-w-[420px] text-[0.875rem] leading-[1.7] text-fg-muted sm:text-base">
            {t.contact.description}
          </p>

          <div data-reveal className="mb-14 flex flex-wrap justify-center gap-4">
            <Button href={`mailto:${personal.email}`}>{t.buttons.email}</Button>
            <Button href={personal.linkedin} variant="outline" external>
              {t.buttons.linkedin}
            </Button>
            <Button href={personal.github} variant="outline" external>
              {t.buttons.github}
            </Button>
          </div>

          <ul data-reveal className="flex flex-wrap justify-center gap-4">
            <li>
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-3 rounded-sm border border-surface-2 bg-surface px-5 py-3 font-mono text-[0.65rem] text-fg-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent sm:text-xs"
              >
                <MailIcon className="text-accent" />
                {personal.email}
              </a>
            </li>
            <li className="flex items-center gap-3 rounded-sm border border-surface-2 bg-surface px-5 py-3 font-mono text-[0.65rem] text-fg-muted sm:text-xs">
              <PinIcon className="text-accent" />
              {personal.location}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
