"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function MarqueeBanner() {
  const items = [
    "DRIP MODE ACTIVATED",
    "STREETWEAR ONLY",
    "MAIMBO",
    "CHROME STORM",
    "SHADOW DIVISION",
    "WAR DRIP",
  ];

  const row = [...items, ...items, ...items, ...items];

  return (
    <section
      className="relative overflow-hidden border-y border-line bg-bg-soft py-4"
      aria-label="Promoción"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["-40%", "140%"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.6 }}
      />
      <div className="marquee-track items-center gap-6 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center gap-6">
            {i % 3 === 0 && (
              <motion.span
                className="relative inline-flex h-8 w-[72px] shrink-0 items-center justify-center sm:h-9 sm:w-[84px]"
                animate={{ filter: ["brightness(1)", "brightness(1.45)", "brightness(1)"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/logo-maimbo.png"
                  alt=""
                  width={84}
                  height={42}
                  className="logo-shine h-full w-auto object-contain"
                />
              </motion.span>
            )}
            <span className="display text-2xl text-chrome/90 sm:text-3xl">{item}</span>
            <span className="inline-block h-3 w-[2px] rotate-12 bg-gradient-to-b from-white to-transparent sm:h-4" />
          </span>
        ))}
      </div>
    </section>
  );
}
