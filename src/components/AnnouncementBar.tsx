"use client";

import { motion } from "framer-motion";

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="announcement-chrome relative z-40 border-b border-white/10"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-3 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.12em] sm:gap-3 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em]">
        <span>Envío a todo Bolivia</span>
        <span className="hidden sm:inline" aria-hidden>
          ·
        </span>
        <span className="hidden sm:inline">Sucre · Ostria Reyes 555</span>
        <span className="hidden md:inline" aria-hidden>
          ·
        </span>
        <span className="hidden md:inline">WhatsApp 75769315</span>
      </div>
    </motion.div>
  );
}
