"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CurtainIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 2400);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-101%" }}
            transition={{ duration: 1.1, delay: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-[#0a0806] via-[#15100a] to-[#1d1610] border-r border-gold/40"
          />
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "101%" }}
            transition={{ duration: 1.1, delay: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#0a0806] via-[#15100a] to-[#1d1610] border-l border-gold/40"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 0.96] }}
              transition={{ duration: 1.5, times: [0, 0.35, 0.75, 1], ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <svg width="34" height="26" viewBox="0 0 34 26" fill="none" className="text-gold">
                <path
                  d="M2 8L9 14L17 3L25 14L32 8L29 22H5L2 8Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <p className="font-display tracking-[0.35em] text-xs sm:text-sm text-gold-bright uppercase">
                Atlantic Lounge
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
