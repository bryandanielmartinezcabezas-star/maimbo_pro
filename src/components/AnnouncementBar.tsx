"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const messages = [
  "Envío a todo Bolivia",
  "Sucre · Ostria Reyes 555",
  "WhatsApp 75769315",
] as const;

const ROTATE_MS = 3200;

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="announcement-chrome site-announcement relative z-40 border-b"
    >
      <div className="relative z-10 mx-auto flex h-9 max-w-7xl items-center justify-center overflow-hidden px-3 sm:h-10 sm:px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={messages[index]}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] sm:inset-x-4 sm:text-xs sm:tracking-[0.2em]"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
