"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PHOTOS } from "@/lib/images";
import SectionHeading from "./SectionHeading";

const SHOTS = [
  { img: PHOTOS.emptyRoom, label: "The Main Room", span: "md:col-span-2 md:row-span-2" },
  { img: PHOTOS.cocktailOlives, label: "Aperitivo Hour", span: "" },
  { img: PHOTOS.pendantLamps, label: "Brass & Light", span: "" },
  { img: PHOTOS.chairsTables, label: "Fireside Corner", span: "" },
  { img: PHOTOS.redChairs, label: "Private Booths", span: "md:col-span-2" },
  { img: PHOTOS.eatery, label: "Late Seating", span: "" },
  { img: PHOTOS.whiskeyWoodTable, label: "The Pour", span: "" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-obsidian py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Inside the Room" title="Gallery" />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[160px] gap-4">
          {SHOTS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className={`group relative overflow-hidden ${s.span}`}
            >
              <Image
                src={s.img}
                alt={s.label}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/50 transition-colors duration-500" />
              <p className="absolute bottom-3 left-4 font-display text-xs sm:text-sm tracking-[0.2em] uppercase text-cream translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
