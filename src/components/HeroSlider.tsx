"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroes } from "@/data/catalog";
import { BrandLogo } from "@/components/BrandLogo";

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [boltKey, setBoltKey] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % heroes.length);
    }, 5600);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setBoltKey((k) => k + 1);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  const slide = heroes[index];

  return (
    <section
      id="inicio"
      className="relative isolate min-h-[100svh] overflow-hidden border-b border-line sm:min-h-[92vh]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={index === 0}
            className="object-cover object-[center_20%] sm:object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40 sm:via-black/82 sm:to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.svg
          key={boltKey}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-[2] hidden h-full w-full opacity-80 sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.2, 0.9, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, times: [0, 0.12, 0.28, 0.4, 1] }}
          aria-hidden
        >
          <motion.path
            d="M58 0 L46 38 L56 38 L40 100 L62 48 L50 48 Z"
            fill="url(#boltGrad)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0.6] }}
            transition={{ duration: 0.35 }}
            style={{ filter: "drop-shadow(0 0 12px rgba(255,255,255,0.8))" }}
          />
          <defs>
            <linearGradient id="boltGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#bdbdbd" stopOpacity="0.35" />
            </linearGradient>
          </defs>
        </motion.svg>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-20 pt-28 sm:min-h-[92vh] sm:px-4 sm:pb-16 sm:pt-24 lg:justify-center lg:px-6 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 flex w-full max-w-full justify-start sm:mb-6"
        >
          <BrandLogo size="md" className="sm:hidden" href={null} priority />
          <span className="hidden sm:inline-flex">
            <BrandLogo size="lg" href={null} priority />
          </span>
        </motion.div>

        <motion.p
          key={`${slide.id}-eye`}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.7 }}
          className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent sm:mb-3 sm:text-xs sm:tracking-[0.28em]"
        >
          {slide.eyebrow}
        </motion.p>
        <motion.h2
          key={`${slide.id}-title`}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="display max-w-4xl text-[2.6rem] leading-[0.92] text-text sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          key={`${slide.id}-sub`}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg"
        >
          {slide.subtitle}
        </motion.p>
        <motion.div
          key={`${slide.id}-cta`}
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.38 }}
          className="mt-6 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center"
        >
          <motion.a
            href="#tracksuits"
            whileTap={{ scale: 0.98 }}
            className="cta-glow cta-chrome display px-6 py-3 text-lg transition sm:px-7 sm:text-xl"
          >
            {slide.cta}
          </motion.a>
          <motion.a
            href="#tienda"
            whileTap={{ scale: 0.98 }}
            className="display border border-chrome/40 px-6 py-3 text-center text-lg text-text transition hover:border-white hover:text-white sm:px-7 sm:text-xl"
          >
            {slide.secondary}
          </motion.a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-5 max-w-[18rem] text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted sm:mt-6 sm:max-w-none sm:text-[11px] sm:tracking-[0.2em]"
        >
          Streetwear · Sucre · Envíos a Bolivia · WhatsApp
        </motion.p>
      </div>

      <div className="absolute bottom-4 left-4 z-10 flex gap-2 sm:bottom-6 sm:left-auto sm:right-4 lg:right-8">
        {heroes.map((h, i) => (
          <button
            key={h.id}
            type="button"
            aria-label={`Ir a slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 transition-all duration-300 ${
              i === index ? "w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)] sm:w-10" : "w-5 bg-white/25 sm:w-6"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
