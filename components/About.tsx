"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PHOTOS } from "@/lib/images";

const STATS = [
  { n: "12", l: "Years Pouring" },
  { n: "48", l: "Signature Pours" },
  { n: "200", l: "Seats of Velvet" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-obsidian py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={PHOTOS.barFloor}
              alt="The dimly lit bar counter and wooden floor of Atlantic Lounge"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 90vw"
            />
            <div className="absolute inset-0 border border-gold/25 m-4 pointer-events-none" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden sm:block absolute -bottom-10 -right-6 md:-right-10 bg-charcoal border border-gold/30 px-8 py-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
          >
            <p className="font-script text-3xl text-gold-bright">Est.</p>
            <p className="font-display text-2xl tracking-widest text-cream">2013</p>
          </motion.div>
        </motion.div>

        <div>
          <p className="font-script text-2xl md:text-3xl text-gold-bright/90 mb-1">Our Story</p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-cream"
          >
            A Sanctuary <span className="text-gold">After Dark</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 text-smoke leading-relaxed max-w-xl"
          >
            Tucked behind an unmarked door, Atlantic Lounge Bar was built for
            long conversations and slow-poured drinks. Brass fixtures catch
            the candlelight, the vinyl runs low and warm, and every seat is
            close enough to hear the shaker but far enough to keep your
            secrets. This is where the city comes to be still.
          </motion.p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {STATS.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              >
                <p className="font-display text-3xl md:text-4xl text-gold-bright">{s.n}</p>
                <p className="text-[11px] tracking-[0.15em] uppercase text-smoke mt-1">
                  {s.l}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
