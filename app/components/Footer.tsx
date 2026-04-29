"use client";

import { personal } from "../lib/data";
import { useLanguage } from "./LanguageProvider";

const navLinks = [
  { href: "#experiencia", key: "experiencia" },
  { href: "#proyectos", key: "proyectos" },
  { href: "#stack", key: "stack" },
  { href: "#sobre-mi", key: "sobreMi" },
] as const;

type FooterNavLink = (typeof navLinks)[number];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#252a27]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-['Space Mono',monospace] text-[0.65rem] sm:text-xs text-[#4f5c55] tracking-[0.05em]">
          © {new Date().getFullYear()} Luciana Vanelli
        </p>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-['Space Mono',monospace] text-[0.65rem] sm:text-xs tracking-[0.1em] uppercase text-[#4f5c55] transition-colors duration-200 hover:text-[#2bffb1]"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
