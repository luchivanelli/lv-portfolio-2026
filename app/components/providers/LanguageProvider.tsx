"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { languageOptions, type Language, translations, type Translation } from "../../lib/i18n";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  languageOptions: typeof languageOptions;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

// --- tiny external store: in-memory value, mirrored to localStorage when available.
const STORAGE_KEY = "preferredLanguage";
const DEFAULT_LANGUAGE: Language = "es";
let memoryLanguage: Language | null = null;
const listeners = new Set<() => void>();

function readStorage(): Language | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "es" ? stored : null;
  } catch {
    return null;
  }
}

function getSnapshot(): Language {
  return memoryLanguage ?? readStorage() ?? DEFAULT_LANGUAGE;
}

function getServerSnapshot(): Language {
  return DEFAULT_LANGUAGE;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function setStoredLanguage(lang: Language) {
  memoryLanguage = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* storage unavailable: the in-memory value still works */
  }
  listeners.forEach((listener) => listener());
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: setStoredLanguage,
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
