"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useCustomerAuth } from "@/lib/useCustomerAuth";
import { getClientAuth } from "@/lib/firebaseClient";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Cocktails", href: "#cocktails" },
  { label: "Gallery", href: "#gallery" },
  { label: "Nights", href: "#nights" },
  { label: "Reserve", href: "#reserve" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, loading: authLoading } = useCustomerAuth();

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
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-xs tracking-[0.2em] uppercase text-smoke hover:text-gold-bright transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {!authLoading && (
            user ? (
              <button
                onClick={() => signOut(getClientAuth())}
                className="text-xs tracking-[0.2em] uppercase text-smoke hover:text-gold-bright transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="text-xs tracking-[0.2em] uppercase text-smoke hover:text-gold-bright transition-colors"
              >
                Sign In
              </Link>
            )
          )}
          <a
            href="#reserve"
            className="inline-flex items-center border border-gold/60 px-5 py-2 text-xs tracking-[0.2em] uppercase text-gold-bright hover:bg-gold hover:text-obsidian transition-colors duration-300"
          >
            Reserve
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
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-cream hover:text-gold-bright"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            {user ? (
              <button
                onClick={() => {
                  signOut(getClientAuth());
                  setOpen(false);
                }}
                className="text-sm tracking-[0.2em] uppercase text-cream hover:text-gold-bright"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-cream hover:text-gold-bright"
              >
                Sign In
              </Link>
            )}
          </li>
        </motion.ul>
      )}
    </motion.header>
  );
}
