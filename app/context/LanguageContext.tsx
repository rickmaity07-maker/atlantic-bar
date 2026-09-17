"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Locale } from "@/lib/translations";

const STORAGE_KEY = "atlantic-lounge-locale";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  t: typeof translations.de;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "de",
  setLocale: () => {},
  toggleLocale: () => {},
  t: translations.de,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("de");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en") {
      setLocaleState("en");
      document.documentElement.lang = "en";
    } else {
      setLocaleState("de");
      document.documentElement.lang = "de";
      if (saved !== "de") window.localStorage.setItem(STORAGE_KEY, "de");
    }
    setReady(true);
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }

  function toggleLocale() {
    setLocale(locale === "de" ? "en" : "de");
  }

  const active = ready ? locale : "de";

  return (
    <LanguageContext.Provider
      value={{ locale: active, setLocale, toggleLocale, t: translations[active] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);