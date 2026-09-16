"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSiteImages } from "@/app/context/SiteImagesContext";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const siteImages = useSiteImages();
  
  return (
    <section id="top" className="relative h-svh min-h-155 w-full overflow-hidden">
      {/* BACKGROUNDS */}
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
      <div className="absolute inset-0 bg-linear-to-b from-obsidian/80 via-obsidian/55 to-obsidian" />
      <div className="absolute inset-0 bg-linear-to-t from-obsidian via-transparent to-obsidian/40" />

      {/* CONTENT GRID */}
      <div className="relative z-10 h-full w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center pt-24 pb-16 px-6 lg:px-12 overflow-y-auto">
        
        {/* LEFT SIDE: Image Logo & Brand */}
        <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gold/20 pb-10 md:pb-0 md:pr-8 lg:pr-12">
          
          {/* New Image Logo with smooth fade-up transition */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] aspect-[2.3/1] mb-2"
          >
            <Image
              src="/hero-logo-gold.png"
              alt="Atlantic Lounge Bar - Luxury Vibes & Premium Nights"
              fill
              priority
              className="object-contain mix-blend-screen" 
            />
          </motion.div>

          {/* Reserve & Discover Buttons */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] aspect-[2.3/1] mb-2"
          >
            <Image
              src="/hero-logo-gold.png" 
              alt="Atlantic Lounge Bar - Luxury Vibes & Premium Nights"
              fill
              priority
              unoptimized /* <--- ADD THIS EXACTLY HERE */
              className="object-contain" 
            />
          </motion.div>
        </div>

        {/* RIGHT SIDE: Re-Opening Info & Specials Box */}
        <div className="flex flex-col items-center justify-center text-center pt-10 md:pt-0 md:pl-8 lg:pl-12">
          
          {/* Top Text */}
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 2.8 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.15em] text-gold-bright mb-6"
          >
            Weiter für Euch Offen!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 3.0 }}
            className="text-base sm:text-lg text-cream/90 mb-4 font-light tracking-wide"
          >
            ATLANTIC LOUNGE BAR ist wieder da
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 3.2 }}
            className="text-lg sm:text-xl lg:text-2xl font-medium mb-6 text-white"
          >
            Ab <span className="text-gold-bright font-semibold">22.08.2026</span> — Täglich ab <span className="text-gold-bright font-semibold">09:00 Uhr</span>
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 3.4 }}
            className="text-[10px] sm:text-xs text-smoke uppercase tracking-[0.25em]"
          >
            Weiter für Euch offen ab 09:00 Uhr
          </motion.p>

          {/* Offers Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 3.6 }}
            className="mt-8 border border-gold/40 rounded-lg p-6 w-full max-w-[420px] bg-obsidian/40 backdrop-blur-sm"
          >
            <h3 className="text-lg md:text-xl font-semibold uppercase tracking-[0.15em] text-gold-bright mb-4">
              Aktuelle Angebote & Aktionen
            </h3>
            <p className="text-sm font-serif-alt italic text-cream/90 mb-5">
              Luxury Vibes & Premium Nights
            </p>
            <p className="text-xs md:text-sm text-cream/70 uppercase tracking-wider leading-relaxed mb-6">
              MIT VIELEN GUTEN NEUEN ANGEBOTEN FÜR ALLE GETRÄNKE<br />
              UND SPAẞ WIE IMMER zusammen mit gute Vibes
            </p>
            
            <ul className="space-y-4 text-sm md:text-base text-cream/90 font-medium text-left inline-block w-full px-2 sm:px-6">
              <li className="flex items-center gap-3">
                <span className="text-gold-bright font-bold">2 BIER bestellen</span> das 3. von uns!
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold-bright font-bold">1 SHOT plus</span> 1 von uns!
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold-bright font-bold">2 VODKA Mische</span> eine plus!
              </li>
            </ul>
            
            <p className="text-xs text-cream/70 font-semibold mt-6">
              Und viele weitere Angebote noch!
            </p>

            <p className="text-[11px] md:text-xs font-serif-alt italic text-gold-faded mt-3 leading-relaxed">
              Auch wie jedes Mal für die schönste Nächte zusammen zum Erleben.
            </p>
          </motion.div>

        </div>

      </div>

      {/* New Transparent PNG Logo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] aspect-[2.3/1] mb-2"
          >
            <Image
              src="/atlantic-logo-gold.png" /* Make sure this is .png! */
              alt="Atlantic Lounge Bar - Luxury Vibes & Premium Nights"
              fill
              priority
              className="object-contain" 
            />
          </motion.div>
    </section>
  );
}