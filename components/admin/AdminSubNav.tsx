"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin/dashboard", label: "Reservations" },
  { href: "/admin/dashboard/menu", label: "Menu" },
  { href: "/admin/dashboard/gallery", label: "Gallery" },
];

export default function AdminSubNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 mb-10 border-b border-gold/15">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-3 text-xs tracking-[0.15em] uppercase border-b-2 -mb-px transition-colors ${
              active
                ? "border-gold text-gold-bright"
                : "border-transparent text-smoke hover:text-cream"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}