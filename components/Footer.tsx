"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useBusinessHours } from "@/app/context/BusinessHoursContext";
import { groupBusinessHours } from "@/lib/businessHours";

export default function Footer() {
  const { locale, t } = useLanguage();
  const hours = useBusinessHours();
  const hoursLines = groupBusinessHours(hours, locale);

  return (
    <footer className="relative bg-obsidian border-t border-gold/15 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2">
            <svg width="18" height="14" viewBox="0 0 34 26" fill="none" className="text-gold">
              <path
                d="M2 8L9 14L17 3L25 14L32 8L29 22H5L2 8Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-display tracking-[0.2em] uppercase text-cream">
              Atlantic Lounge
            </span>
          </div>
          <p className="font-script text-xl text-gold-bright mt-3">{t.footer.tagline}</p>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold-bright mb-4">
            {t.footer.hours}
          </p>
          <ul className="space-y-1.5 text-sm text-smoke">
            {hoursLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold-bright mb-4">
            {t.footer.visit}
          </p>
          <ul className="space-y-1.5 text-sm text-smoke">
            <li>21 Harbourfront Row</li>
            <li>Old Quarter District</li>
            <li>reservations@atlanticlounge.bar</li>
            <li>+1 (555) 019 2247</li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold-bright mb-4">
            {t.footer.follow}
          </p>
          <ul className="space-y-1.5 text-sm text-smoke">
            <li className="hover:text-gold-bright transition-colors cursor-pointer">Instagram</li>
            <li className="hover:text-gold-bright transition-colors cursor-pointer">Facebook</li>
            <li className="hover:text-gold-bright transition-colors cursor-pointer">TikTok</li>
          </ul>
        </div>
      </div>

      <div className="hairline mx-auto max-w-7xl mt-12 mb-6" />

      <p className="text-center text-[11px] tracking-[0.15em] text-smoke/70 px-6">
        © {new Date().getFullYear()} {t.footer.copyright}
      </p>
    </footer>
  );
}
