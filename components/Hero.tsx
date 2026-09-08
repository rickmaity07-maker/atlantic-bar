"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSiteImages } from "@/app/context/SiteImagesContext";
import { useLanguage } from "@/app/context/LanguageContext";

const WORD = "ATLANTIC";

export default function Hero() {
  const { t } = useLanguage();
  const siteImages = useSiteImages();
  return (
    <section id="top" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.18 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={siteImages.hero}
          alt="Amber cocktail being poured over ice at Atlantic Lounge Bar"
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/55 to-obsidian" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.svg
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.3 }}
          width="46"
          height="36"
          viewBox="0 0 34 26"
          fill="none"
          className="text-gold mb-4"
        >
          <path
            d="M2 8L9 14L17 3L25 14L32 8L29 22H5L2 8Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </motion.svg>

        <h1 className="font-display font-extrabold uppercase leading-[0.95] text-gradient-gold flex flex-wrap justify-center text-[15vw] sm:text-[10vw] md:text-[7.2vw]">
          {WORD.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.4 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 3.0 }}
          className="font-display uppercase tracking-[0.5em] text-cream/90 text-sm sm:text-lg md:text-xl mt-3 -mb-1"
        >
          Lounge <span className="text-gold">{t.hero.subtitleBar}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 3.25 }}
          className="font-script text-2xl sm:text-3xl md:text-4xl text-gold-bright mt-5"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 3.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#reserve"
            className="group relative overflow-hidden border border-gold px-9 py-3.5 text-xs tracking-[0.3em] uppercase text-obsidian bg-gold"
          >
            <span className="relative z-10">{t.hero.reserveBtn}</span>
            <span className="absolute inset-0 bg-gold-bright scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </a>
          <a
            href="#about"
            className="px-9 py-3.5 text-xs tracking-[0.3em] uppercase text-cream/80 border border-cream/25 hover:border-gold/70 hover:text-gold-bright transition-colors duration-300"
          >
            {t.hero.discoverBtn}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.9, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.35em] uppercase text-smoke">{t.hero.scroll}</span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
