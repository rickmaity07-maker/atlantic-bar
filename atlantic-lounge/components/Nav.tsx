"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useLanguage } from "@/app/context/LanguageContext";

const LINK_KEYS = ["about", "cocktails", "gallery", "nights", "reserve"] as const;
const LINK_HREFS: Record<(typeof LINK_KEYS)[number], string> = {
  about: "#about",
  cocktails: "#cocktails",
  gallery: "#gallery",
  nights: "#nights",
  reserve: "#reserve",
};

function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, toggleLocale } = useLanguage();
  return (
    <button
      onClick={toggleLocale}
      aria-label="Switch language"
      className={`text-xs tracking-[0.2em] uppercase text-smoke hover:text-gold-bright transition-colors ${className}`}
    >
      {locale === "de" ? "DE" : "EN"} <span className="text-gold/50">/</span>{" "}
      <span className="text-smoke/50">{locale === "de" ? "EN" : "DE"}</span>
    </button>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-obsidian/85 backdrop-blur-md border-b border-gold/15" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <svg width="20" height="16" viewBox="0 0 34 26" fill="none" className="text-gold">
            <path
              d="M2 8L9 14L17 3L25 14L32 8L29 22H5L2 8Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display tracking-[0.25em] text-sm sm:text-base uppercase text-cream group-hover:text-gold-bright transition-colors">
            Atlantic <span className="text-gold">Lounge</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {LINK_KEYS.map((key) => (
            <li key={key}>
              <a
                href={LINK_HREFS[key]}
                className="relative text-xs tracking-[0.2em] uppercase text-smoke hover:text-gold-bright transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {t.nav[key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />
          {!authLoading && (
            user ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="text-xs tracking-[0.2em] uppercase text-gold-bright hover:text-cream transition-colors"
                  >
                    {t.nav.admin}
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-xs tracking-[0.2em] uppercase text-smoke hover:text-gold-bright transition-colors"
                >
                  {t.nav.signOut}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-xs tracking-[0.2em] uppercase text-smoke hover:text-gold-bright transition-colors"
              >
                {t.nav.signIn}
              </Link>
            )
          )}
          <a
            href="#reserve"
            className="inline-flex items-center border border-gold/60 px-5 py-2 text-xs tracking-[0.2em] uppercase text-gold-bright hover:bg-gold hover:text-obsidian transition-colors duration-300"
          >
            {t.nav.reserve}
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-gold-bright"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {open && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-obsidian/95 border-t border-gold/15 px-6 py-6 flex flex-col gap-5"
        >
          {LINK_KEYS.map((key) => (
            <li key={key}>
              <a
                href={LINK_HREFS[key]}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-cream hover:text-gold-bright"
              >
                {t.nav[key]}
              </a>
            </li>
          ))}
          <li>
            <LanguageToggle className="!text-sm" />
          </li>
          <li>
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className="block mb-5 text-sm tracking-[0.2em] uppercase text-gold-bright"
                  >
                    {t.nav.admin}
                  </Link>
                )}
                <button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="text-sm tracking-[0.2em] uppercase text-cream hover:text-gold-bright"
                >
                  {t.nav.signOut}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-cream hover:text-gold-bright"
              >
                {t.nav.signIn}
              </Link>
            )}
          </li>
        </motion.ul>
      )}
    </motion.header>
  );
}
