"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";

const TABS = [
  { href: "/admin/dashboard", labelDe: "Reservierungen", labelEn: "Reservations" },
  { href: "/admin/dashboard/menu", labelDe: "Speisekarte", labelEn: "Menu" },
  { href: "/admin/dashboard/gallery", labelDe: "Galerie", labelEn: "Gallery" },
  { href: "/admin/dashboard/images", labelDe: "Bilder / 3D", labelEn: "Images / 3D" },
  { href: "/admin/dashboard/hours", labelDe: "Öffnungszeiten", labelEn: "Hours" },
];

export default function AdminSubNav() {
  const pathname = usePathname();
  const { locale, t } = useLanguage();

  return (
    <div className="mb-10">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-smoke hover:text-gold-bright transition-colors"
        >
          <span aria-hidden>←</span> {t.common.backToMain}
        </Link>
      </div>
      <nav className="flex gap-2 border-b border-gold/15 overflow-x-auto">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-4 py-3 text-xs tracking-[0.15em] uppercase border-b-2 -mb-px transition-colors whitespace-nowrap ${
                active
                  ? "border-gold text-gold-bright"
                  : "border-transparent text-smoke hover:text-cream"
              }`}
            >
              {locale === "de" ? tab.labelDe : tab.labelEn}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}