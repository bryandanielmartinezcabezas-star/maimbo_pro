"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroes } from "@/data/catalog";

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % heroes.length);
    }, 5600);
    return () => window.clearInterval(id);
  }, []);

  const slide = heroes[index];

  return (
    <section
      id="inicio"
      className="relative isolate h-[100svh] max-h-[100svh] overflow-hidden border-b border-line sm:h-auto sm:max-h-none sm:min-h-[92vh]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Art direction: retrato en móvil, banner apaisado en desktop */}
          <Image
            src={slide.imageMobile}
            alt=""
            fill
            priority={index === 0}
            className="object-cover object-top sm:hidden"
            style={{ objectPosition: slide.focusMobile }}
            sizes="100vw"
          />
          <Image
            src={slide.image}
            alt=""
            fill
            priority={index === 0}
            className="hidden object-cover sm:block"
            style={{ objectPosition: slide.focusDesktop }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/15 sm:from-black/90 sm:via-black/10 sm:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black via-black/75 to-transparent sm:h-1/3 sm:via-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-[4.75rem] pt-24 sm:min-h-[92vh] sm:px-5 sm:pb-20 sm:pt-24 lg:px-6 lg:pb-24">
        <motion.p
          key={`${slide.id}-eye`}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.7 }}
          className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent sm:mb-3 sm:text-xs sm:tracking-[0.28em]"
        >
          {slide.eyebrow}
        </motion.p>
        <motion.h2
          key={`${slide.id}-title`}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="display max-w-4xl text-[clamp(2.1rem,10.5vw,6.5rem)] leading-[0.9] text-text"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          key={`${slide.id}-sub`}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="mt-3 max-w-xl text-sm leading-snug text-muted sm:mt-5 sm:text-base sm:leading-relaxed md:text-lg"
        >
          {slide.subtitle}
        </motion.p>
        <motion.div
          key={`${slide.id}-cta`}
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.38 }}
          className="mt-4 flex w-full flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
        >
          <motion.a
            href="#tracksuits"
            whileTap={{ scale: 0.98 }}
            className="cta-glow cta-chrome display px-5 py-3 text-center text-base transition sm:px-7 sm:text-xl"
          >
            {slide.cta}
          </motion.a>
          <motion.a
            href="#tienda-video"
            whileTap={{ scale: 0.98 }}
            className="display border border-chrome/40 px-5 py-3 text-center text-base text-text transition hover:border-white hover:text-white sm:px-7 sm:text-xl"
          >
            {slide.secondary}
          </motion.a>
        </motion.div>
      </div>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-6 sm:left-auto sm:right-4 sm:translate-x-0 lg:right-8">
        {heroes.map((h, i) => (
          <button
            key={h.id}
            type="button"
            aria-label={`Ir a slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 touch-manipulation transition-all duration-300 sm:h-1.5 ${
              i === index
                ? "w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)] sm:w-10"
                : "w-5 bg-white/25 sm:w-6"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
