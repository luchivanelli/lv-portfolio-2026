"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import { personal } from "../lib/data";

const navLinks = [
  { href: "#experiencia", labelKey: "experiencia" },
  { href: "#proyectos", labelKey: "proyectos" },
  { href: "#stack", labelKey: "stack" },
  { href: "#sobre-mi", labelKey: "sobreMi" },
  { href: "#contacto", labelKey: "contacto" },
] as const;

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-[#1a1e1c] transition-all duration-300 backdrop-blur-[12px] ${
        scrolled ? "bg-[rgba(13,15,14,0.97)]" : "bg-[rgba(13,15,14,0.8)]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-['Space Mono',monospace] text-sm font-bold tracking-widest uppercase text-[#e8ede9]"
        >
          <span className="text-[#2bffb1]">Luciana</span> Vanelli
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchor(e, link.href)}
              className="font-['Space Mono',monospace] text-[0.7rem] tracking-widest uppercase text-[#8a9990] transition-colors duration-200 hover:text-[#2bffb1]"
            >
              {t.nav[link.labelKey]}
            </a>
          ))}
        </div>

        {/* Language + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-sm bg-[#171a18]">
            {(["es", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                className={`rounded-sm px-2 py-1 text-[0.7rem] uppercase tracking-[0.18em] transition duration-200 ${
                  language === code ? "bg-[#2bffb1] text-[#0d0f0e]" : "text-[#8a9990] hover:text-[#ffffff]"
                }`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            href={personal.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-sm bg-[#2bffb1] px-4 py-2 text-[0.68rem] font-['Space Mono',monospace] font-bold uppercase tracking-[0.12em] text-[#0d0f0e] transition duration-200 ease-out hover:bg-[#00e5a0] hover:shadow-[0_0_20px_#2bffb140]"
          >
            {t.buttons.downloadCV}
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex h-9 w-9 flex-col items-center justify-center gap-1.5 text-[#8a9990] cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out ${
              menuOpen ? "translate-y-[8px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out ${
              menuOpen ? "-translate-y-[8px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden border-t border-[#1a1e1c] bg-[rgba(13,15,14,0.97)] transition-all duration-300 ease-out ${
          menuOpen ? "max-h-[360px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className={`flex flex-col px-6 gap-5 transition-opacity duration-300 ease-out ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchor(e, link.href)}
              className="font-['Space Mono',monospace] text-[0.7rem] tracking-widest uppercase text-[#8a9990]"
            >
              {t.nav[link.labelKey]}
            </a>
          ))}
          <div className="flex items-center gap-2">
            {(["es", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                className={`rounded-sm px-2 py-1 text-[0.7rem] uppercase tracking-[0.18em] transition duration-200 ${
                  language === code ? "bg-[#2bffb1] text-[#0d0f0e]" : "text-[#8a9990] hover:text-[#ffffff]"
                }`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            href={personal.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-sm bg-[#2bffb1] px-5 py-2.5 text-[0.68rem] font-['Space Mono',monospace] font-bold uppercase tracking-[0.1em] text-[#0d0f0e] text-center"
          >
            {t.buttons.downloadCV}
          </a>
        </div>
      </div>
    </nav>
  );
}
