"use client";

import Image from "next/image";
import { projects } from "../../lib/data";
import { useReveal } from "../motion/use-reveal";
import { useLanguage } from "../providers/LanguageProvider";
import { ExternalIcon, GithubIcon } from "../ui/Icons";
import SectionLabel from "../ui/SectionLabel";

export default function Projects() {
  const { t, language } = useLanguage();
  const headerRef = useReveal<HTMLDivElement>();

  return (
    <section id="proyectos" className="relative py-24" aria-labelledby="projects-title">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headerRef} className="text-halo mb-8 py-6 text-center md:mb-16">
          <SectionLabel id="projects-title" label={t.projects.sectionLabel} title={t.projects.title} center />
        </div>

        <div className="flex flex-col gap-8 md:gap-0">
          {projects.map((project, i) => (
            <ProjectBlock key={project.title} index={i} project={project} language={language} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

type BlockProps = {
  index: number;
  project: (typeof projects)[number];
  language: "es" | "en";
  t: ReturnType<typeof useLanguage>["t"];
};

/** One block per project; the 3D object slides behind the image side on each one. */
function ProjectBlock({ index, project, language, t }: BlockProps) {
  const ref = useReveal<HTMLElement>({ selector: "[data-reveal]", stagger: 0.12, start: "top 75%" });
  const imageRight = index % 2 === 0;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={ref}
      data-project-index={index}
      className="grid items-center gap-6 md:min-h-[72vh] md:grid-cols-12 md:gap-10 md:py-10"
    >
      <div data-reveal className={`md:col-span-7 ${imageRight ? "md:order-2" : "md:order-1"}`}>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — ${t.buttons.live}`}
          className="group relative block aspect-[16/10] overflow-hidden rounded-sm border border-surface-2 bg-surface-2 transition duration-300 ease-out hover:border-accent/40"
        >
          <Image
            src={project.image}
            alt={`Captura de ${project.title}`}
            fill
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover object-top brightness-[0.85] grayscale transition duration-500 ease-out group-hover:brightness-100 group-hover:grayscale-0"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,#0d0f0e)]" />
        </a>
      </div>

      <div className={`text-halo -mx-6 px-6 py-4 md:col-span-5 ${imageRight ? "md:order-1" : "md:order-2"}`}>
        <p data-reveal className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-fg-faint sm:text-xs">
          {number} / {String(projects.length).padStart(2, "0")}
        </p>
        <h3 data-reveal className="mb-3 font-mono text-xl font-bold text-fg sm:text-3xl">
          {project.title}
        </h3>
        <p data-reveal className="mb-5 text-[0.875rem] leading-[1.7] text-fg-muted sm:text-base">
          {project.description[language]}
          {project.note && <span className="ml-1 font-mono text-[0.7rem] text-accent/70">· {project.note}</span>}
        </p>

        <ul data-reveal className="mb-6 flex flex-wrap gap-2" aria-label="Stack">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm border border-accent/20 bg-accent/10 px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.08em] text-accent sm:text-xs"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div data-reveal className="flex gap-6">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-fg-muted transition-colors duration-200 hover:text-accent sm:text-xs"
          >
            <ExternalIcon /> {t.buttons.live}
          </a>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-fg-muted transition-colors duration-200 hover:text-accent sm:text-xs"
          >
            <GithubIcon /> {t.buttons.code}
          </a>
        </div>
      </div>
    </article>
  );
}
