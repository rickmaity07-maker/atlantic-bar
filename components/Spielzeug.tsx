"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSiteImages } from "@/app/context/SiteImagesContext";
import SectionHeading from "./SectionHeading";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Spielzeug() {
  const { t } = useLanguage();
  const siteImages = useSiteImages();

  return (
    <section id="spielzeug" className="relative bg-charcoal py-28 md:py-36">
      <div className="absolute inset-0">
        <Image
          src={siteImages.spielzeug3}
          alt="Cozy fireplace lounge area"
          fill
          unoptimized
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-obsidian/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow={t.spielzeug.eyebrow} title={t.spielzeug.title} align="center" />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            { name: "Vintage Bar Cart", note: "Brass & glass, 1920s French provenance.", price: "2,800", imageUrl: siteImages.spielzeug1 },
            { name: "Crystal Decanter Set", note: "Hand-cut Bohemian crystal, 6 pieces.", price: "1,200", imageUrl: siteImages.spielzeug4 },
            { name: "Leather Dice Cup", note: "Vegetable-tanned leather, brass fittings.", price: "380", imageUrl: siteImages.spielzeug7 },
            { name: "Silver Jigger", note: "Sterling silver, hallmarked London 1952.", price: "650", imageUrl: siteImages.spielzeug5 },
            { name: "Oak Aging Barrel", note: "2L American oak, charred interior.", price: "420", imageUrl: siteImages.spielzeug6 },
            { name: "Absinthe Fountain", note: "4-spout, brass, Belle Époque replica.", price: "1,850", imageUrl: siteImages.spielzeug2 },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="group relative bg-obsidian/80 border border-gold/15 hover:border-gold/50 transition-colors duration-500 backdrop-blur-sm"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gold/10" />
              </div>
              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg text-cream tracking-wide">{item.name}</h3>
                  <span className="font-display text-gold-bright text-lg shrink-0">${item.price}</span>
                </div>
                <p className="text-smoke text-sm mt-3 leading-relaxed">{item.note}</p>
              </div>
              <span className="absolute top-4 right-4 h-8 w-8 rounded-full border border-gold/40 bg-obsidian/60 backdrop-blur flex items-center justify-center text-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                ✦
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/spielzeug"
            className="inline-flex items-center border border-gold/60 px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-gold-bright hover:bg-gold hover:text-obsidian transition-colors duration-300"
          >
            {t.spielzeug.exploreBtn}
          </Link>
        </div>
      </div>
    </section>
  );
}