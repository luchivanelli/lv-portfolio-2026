"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { languageOptions, Language, translations, type Translation } from "../lib/i18n";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  languageOptions: typeof languageOptions;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem("preferredLanguage");
    if (stored === "en" || stored === "es") {
      setLanguage(stored);
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (lang: Language) => {
        window.localStorage.setItem("preferredLanguage", lang);
        setLanguage(lang);
      },
      t: translations[language],
      languageOptions,
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
