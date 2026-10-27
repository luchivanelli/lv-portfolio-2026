"use client";

import { useLanguage } from "../providers/LanguageProvider";

export default function LanguageSwitch({ tabbable = true }: { tabbable?: boolean }) {
  const { language, setLanguage, t, languageOptions } = useLanguage();

  return (
    <div className="inline-flex w-fit items-center gap-1 self-start rounded-sm bg-surface-2" role="group" aria-label={t.a11y.language}>
      {languageOptions.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          tabIndex={tabbable ? 0 : -1}
          className={`rounded-sm px-2 py-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition duration-200 ${
            language === code ? "bg-accent text-bg" : "text-fg-muted hover:text-fg"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
