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
          {/* El velo se ancla abajo y deja la imagen a la vista.
              Antes cubria el ancho entero al 85% de negro: el texto se leia,
              pero el banner desaparecia. En ARIA, galoidrip y Nude Project la
              foto es la protagonista y el texto se acomoda a ella, no al reves.
              Aca solo se oscurece la franja baja donde apoya el titulo. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* El rayo cruzaba la foto de punta a punta y partia el producto al
          medio. La marca ya se presenta en la barra superior; el banner es
          para la prenda. */}

      {/* El contenido se apoya abajo a la izquierda, sobre la franja oscura,
          y deja libre el resto de la imagen. Es la posicion que usan galoidrip
          y Nude Project: el titulo acompana la foto en vez de taparla.
          Tampoco se repite el logo, que ya vive en la barra superior. */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-20 pt-28 sm:min-h-[92vh] sm:px-4 sm:pb-20 sm:pt-24 lg:px-6 lg:pb-24">
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
        {/* La franja "Streetwear · Sucre · Envios" se saco de aca: ya esta en
            la barra de anuncios de arriba y repetirla sumaba una septima linea
            de texto sobre la foto. */}
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
