"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/seo";

const infoLines = [
  "Local en Sucre — Ostria Reyes 555",
  "Enviamos a todo Bolivia",
  "Escríbenos para pedidos",
];

const facades = [
  {
    src: "/img/store/fachada-01.png",
    alt: "Fachada de MAIMBO en Ostria Reyes 555, vista frontal",
  },
  {
    src: "/img/store/fachada-02.png",
    alt: "Local MAIMBO desde la calle — toldo rojo y letrero cromado",
  },
  {
    src: "/img/store/fachada-03.png",
    alt: "Entrada de MAIMBO con vitrinas de streetwear y sneakers",
  },
] as const;

const SLIDE_MS = 4200;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 + i * 0.06,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function StoreLocation() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % facades.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  const shot = facades[index];

  return (
    <section
      id="tienda"
      className="relative scroll-mt-24 overflow-hidden border-b border-line bg-gradient-to-b from-bg via-bg-elevated to-black py-12 sm:py-16 md:py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.04] to-transparent sm:h-40"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
        <div className="mb-7 sm:mb-9 lg:mb-12">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent sm:text-[11px] sm:tracking-[0.36em]"
          >
            Nos encontramos en
          </motion.p>

          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="editorial mt-3 text-[clamp(1.75rem,8vw,4.5rem)] leading-[1.08] text-text sm:mt-4"
          >
            MAIMBO
            <span className="mx-1 text-accent sm:mx-2">|</span>
            <span className="italic text-chrome">Vende Estilo</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 h-px w-28 origin-left bg-gradient-to-r from-accent via-accent/50 to-transparent sm:mt-6 sm:w-44"
          />
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-stretch md:gap-4 lg:gap-5">
          {/* Video 9:16 — ancho acotado en móvil para no comer toda la pantalla */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            id="tienda-video"
            className="relative mx-auto w-fit max-w-full shrink-0 overflow-hidden border border-line/80 bg-black md:mx-0 scroll-mt-24"
          >
            <div className="relative aspect-[9/16] h-[min(68svh,34rem)] w-auto max-w-[min(100vw-2rem,20rem)] sm:max-w-[min(100vw-2.5rem,22rem)] md:h-auto md:w-[min(42vw,22rem)] md:max-w-none lg:w-[min(38vw,24rem)]">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/img/store/lugar-tienda.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/img/store/fachada-02.png"
                aria-label="Recorrido del local MAIMBO en Sucre"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:gap-3 sm:p-5">
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-[10px] sm:tracking-[0.22em]">
                    El lugar
                  </p>
                  <p className="mt-1 display text-[1.35rem] leading-none text-text sm:text-[1.65rem] md:text-3xl">
                    Ostria Reyes 555
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-1">
                  <span className="bg-black/85 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white sm:px-2.5 sm:text-[9px] sm:tracking-[0.18em]">
                    Sucre
                  </span>
                  <span className="bg-black/85 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white sm:px-2.5 sm:text-[9px] sm:tracking-[0.18em]">
                    Bolivia
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Panel fotos + datos — ocupa el resto y se estira al alto del video en md+ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full min-h-[22rem] flex-1 overflow-hidden border border-line/80 bg-black sm:aspect-[5/4] sm:min-h-[26rem] md:aspect-auto md:min-h-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={shot.src}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 62vw"
                />
              </motion.div>
            </AnimatePresence>

            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent"
              aria-hidden
            />

            <div className="absolute inset-0 z-10 flex flex-col justify-between gap-4 p-4 sm:gap-5 sm:p-6 md:p-7 lg:p-8">
              <div className="max-w-md">
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent sm:mb-4 sm:tracking-[0.24em]">
                  Visítanos
                </p>
                <div className="space-y-2 sm:space-y-3">
                  {infoLines.map((line) => (
                    <p
                      key={line}
                      className="text-[13px] leading-snug tracking-[0.03em] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] sm:text-sm sm:leading-relaxed md:text-base"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                  <a
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-glow cta-chrome display w-full px-4 py-3 text-center text-base transition sm:w-auto sm:px-6 sm:text-xl"
                  >
                    WhatsApp {siteConfig.phoneDisplay}
                  </a>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="display w-full border border-white/40 bg-black/45 px-4 py-3 text-center text-base text-text backdrop-blur-sm transition hover:border-accent hover:text-accent sm:w-auto sm:px-6 sm:text-xl"
                  >
                    @maimbo.streetwear
                  </a>
                </div>

                <div className="flex items-center gap-2" aria-label="Fotos del local">
                  {facades.map((item, i) => (
                    <button
                      key={item.src}
                      type="button"
                      aria-label={`Ver foto ${i + 1}`}
                      aria-current={i === index}
                      onClick={() => setIndex(i)}
                      className={`h-2 min-w-0 touch-manipulation transition-all duration-300 sm:h-1.5 ${
                        i === index
                          ? "w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.45)] sm:w-9"
                          : "w-5 bg-white/30 hover:bg-white/55"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
