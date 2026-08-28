"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PHOTOS } from "@/lib/images";
import SectionHeading from "./SectionHeading";

const DRINKS = [
  {
    name: "Gilded Old Fashioned",
    note: "Bourbon, bitters, torched orange oil, single ice sphere.",
    price: "18",
    img: PHOTOS.whiskeyIce,
  },
  {
    name: "Atlantic Amber",
    note: "Aged rum, honey, smoked cinnamon, a slow amber pour.",
    price: "20",
    img: PHOTOS.heroPour,
  },
  {
    name: "Velvet Negroni",
    note: "Barrel-rested gin, sweet vermouth, bitter orange peel.",
    price: "19",
    img: PHOTOS.whiskeyOrange,
  },
];

export default function Cocktails() {
  return (
    <section id="cocktails" className="relative bg-charcoal py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Handcrafted" title="Signature Pours" />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {DRINKS.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="group relative bg-obsidian border border-gold/15 hover:border-gold/50 transition-colors duration-500"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={d.img}
                  alt={d.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gold/10" />
              </div>
              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl text-cream tracking-wide">{d.name}</h3>
                  <span className="font-display text-gold-bright text-lg shrink-0">${d.price}</span>
                </div>
                <p className="text-smoke text-sm mt-3 leading-relaxed">{d.note}</p>
              </div>
              <span className="absolute top-4 right-4 h-8 w-8 rounded-full border border-gold/40 bg-obsidian/60 backdrop-blur flex items-center justify-center text-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                ✦
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
