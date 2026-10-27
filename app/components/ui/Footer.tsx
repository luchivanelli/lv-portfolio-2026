"use client";

import { sections } from "../../lib/data";
import { useLanguage } from "../providers/LanguageProvider";
import { useScrollTo } from "../providers/SmoothScroll";

const footerLinks = sections.filter((s) => s.navKey !== null && s.id !== "contacto") as {
  id: string;
  navKey: "experiencia" | "proyectos" | "stack" | "sobreMi";
}[];

export default function Footer() {
  const { t } = useLanguage();
  const scrollTo = useScrollTo();

  return (
    <footer className="relative z-10 border-t border-line bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <p className="font-mono text-[0.65rem] tracking-[0.05em] text-fg-faint sm:text-xs">
          {t.footer.copy.replace("{year}", String(new Date().getFullYear()))}
        </p>

        <nav aria-label="Footer" className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(`#${link.id}`);
              }}
              className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-fg-faint transition-colors duration-200 hover:text-accent sm:text-xs"
            >
              {t.nav[link.navKey]}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
