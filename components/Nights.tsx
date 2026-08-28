"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PHOTOS } from "@/lib/images";
import SectionHeading from "./SectionHeading";

const SCHEDULE = [
  { day: "Thursday", title: "Golden Hour Jazz", time: "7 — 10 PM" },
  { day: "Friday", title: "Live DJ · Deep House", time: "9 PM — 1 AM" },
  { day: "Saturday", title: "Premium Nights", time: "9 PM — 2 AM" },
  { day: "Sunday", title: "Velvet Sessions, Acoustic", time: "6 — 9 PM" },
];

export default function Nights() {
  return (
    <section id="nights" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={PHOTOS.fireplaceLounge}
          alt="Warm fireside lounge seating at Atlantic Lounge Bar"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/88" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <SectionHeading eyebrow="What's On" title="Premium Nights" />

        <div className="mt-16 divide-y divide-gold/15 border-y border-gold/15">
          {SCHEDULE.map((s, i) => (
            <motion.div
              key={s.day}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-7 px-2 hover:bg-gold/5 transition-colors duration-300"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-script text-2xl text-gold-bright w-28 shrink-0">
                  {s.day}
                </span>
                <span className="font-display text-lg sm:text-xl text-cream uppercase tracking-wide group-hover:text-gold-bright transition-colors">
                  {s.title}
                </span>
              </div>
              <span className="text-smoke text-sm tracking-widest sm:pl-8">{s.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
