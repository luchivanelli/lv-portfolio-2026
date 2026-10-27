"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { useLanguage } from "../providers/LanguageProvider";
import { useScrollTo } from "../providers/SmoothScroll";
import { useActiveSection } from "../motion/use-active-section";
import { personal, sections } from "../../lib/data";
import LanguageSwitch from "./LanguageSwitch";

const navLinks = sections.filter((s) => s.navKey !== null) as {
  id: string;
  navKey: "experiencia" | "proyectos" | "stack" | "sobreMi" | "contacto";
}[];

const [firstName, ...restName] = personal.name.split(" ");

export default function Navbar() {
  const { language, t } = useLanguage();
  const scrollTo = useScrollTo();
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleAnchor = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
    setMenuOpen(false);
  };

  const linkClass = (id: string) =>
    `font-mono text-[0.7rem] tracking-widest uppercase transition-colors duration-200 hover:text-accent ${
      active === id ? "text-accent" : "text-fg-muted"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-surface-2 backdrop-blur-[12px] transition-colors duration-300 ${
        scrolled ? "bg-bg/95" : "bg-bg/75"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-3 focus:py-1 focus:font-mono focus:text-xs focus:text-bg"
      >
        {language === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>

      <nav aria-label={t.a11y.mainNav} className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <a
          href="#inicio"
          onClick={(e) => handleAnchor(e, "#inicio")}
          title={t.a11y.home}
          className="font-mono text-sm font-bold uppercase tracking-widest text-fg"
        >
          <span className="text-accent">{firstName}</span> {restName.join(" ")}
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleAnchor(e, `#${link.id}`)}
                aria-current={active === link.id ? "location" : undefined}
                className={linkClass(link.id)}
              >
                {t.nav[link.navKey]}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitch />
          <a
            href={personal.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-sm bg-accent px-4 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-bg transition duration-200 ease-out hover:bg-accent-dim hover:shadow-[0_0_20px_var(--glow)]"
          >
            {t.buttons.downloadCV}
          </a>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 cursor-pointer flex-col items-center justify-center gap-1.5 text-fg-muted lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-surface-2 bg-bg/95 transition-all duration-300 ease-out lg:hidden ${
          menuOpen ? "max-h-[400px] py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className={`flex flex-col gap-5 px-6 ${menuOpen ? "" : "pointer-events-none"}`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleAnchor(e, `#${link.id}`)}
              tabIndex={menuOpen ? 0 : -1}
              aria-current={active === link.id ? "location" : undefined}
              className={linkClass(link.id)}
            >
              {t.nav[link.navKey]}
            </a>
          ))}
          <LanguageSwitch tabbable={menuOpen} />
          <a
            href={personal.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            className="inline-block rounded-sm bg-accent px-5 py-2.5 text-center font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-bg"
          >
            {t.buttons.downloadCV}
          </a>
        </div>
      </div>
    </header>
  );
}
