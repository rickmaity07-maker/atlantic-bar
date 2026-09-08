"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Locale } from "@/lib/translations";

const STORAGE_KEY = "atlantic-lounge-locale";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  /** All strings for the current locale. */
  t: typeof translations.de;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "de",
  setLocale: () => {},
  toggleLocale: () => {},
  t: translations.de,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // German is the default/primary language, English is secondary.
  const [locale, setLocaleState] = useState<Locale>("de");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "de" || saved === "en") setLocaleState(saved);
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }

  function toggleLocale() {
    setLocale(locale === "de" ? "en" : "de");
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
