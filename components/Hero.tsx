"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSiteImages } from "@/app/context/SiteImagesContext";
import { useLanguage } from "@/app/context/LanguageContext";

const LOGO_SRC = "/atlantic-logo-gold.png";

export default function Hero() {
  const { t } = useLanguage();
  const siteImages = useSiteImages();

  return (
    <section id="top" className="relative h-svh min-h-155 w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.18 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={siteImages.hero}
          alt="Atlantic Lounge Bar"
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-b from-obsidian/80 via-obsidian/55 to-obsidian" />
      <div className="absolute inset-0 bg-linear-to-t from-obsidian via-transparent to-obsidian/40" />

      <div className="relative z-10 h-full w-full max-w-350 mx-auto grid grid-cols-1 md:grid-cols-2 items-center pt-24 pb-16 px-6 lg:px-12 overflow-y-auto">
        <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gold/20 pb-10 md:pb-0 md:pr-8 lg:pr-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[320px] sm:max-w-100 md:max-w-120ect-[2.3/1] mb-2"
          >
            <Image
              src={LOGO_SRC}
              alt="Atlantic Lounge Bar"
              fill
              priority
              unoptimized
              className="object-contain"
            />
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-center text-center pt-10 md:pt-0 md:pl-8 lg:pl-12">
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 2.8 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.15em] text-gold-bright mb-6"
          >
            {t.hero.reopenTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 3.0 }}
            className="text-base sm:text-lg text-cream/90 mb-4 font-light tracking-wide"
          >
            {t.hero.reopenSubtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 3.2 }}
            className="text-lg sm:text-xl lg:text-2xl font-medium mb-6 text-white"
          >
            {t.hero.reopenDate}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 3.4 }}
            className="text-[10px] sm:text-xs text-smoke uppercase tracking-[0.25em]"
          >
            {t.hero.reopenFrom}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 3.6 }}
            className="mt-8 border border-gold/40 rounded-lg p-6 w-full max-w-105 bg-obsidian/40 backdrop-blur-sm"
          >
            <h3 className="text-lg md:text-xl font-semibold uppercase tracking-[0.15em] text-gold-bright mb-4">
              {t.hero.offersTitle}
            </h3>
            <p className="text-sm font-serif-alt italic text-cream/90 mb-5">
              {t.hero.offersTagline}
            </p>
            <p className="text-xs md:text-sm text-cream/70 uppercase tracking-wider leading-relaxed mb-6">
              {t.hero.offersBody}
            </p>
            <ul className="space-y-4 text-sm md:text-base text-cream/90 font-medium text-left inline-block w-full px-2 sm:px-6">
              <li>{t.hero.offer1}</li>
              <li>{t.hero.offer2}</li>
              <li>{t.hero.offer3}</li>
            </ul>
            <p className="text-xs text-cream/70 font-semibold mt-6">{t.hero.offersMore}</p>
            <p className="text-[11px] md:text-xs font-serif-alt italic text-gold-faded mt-3 leading-relaxed">
              {t.hero.offersFooter}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}