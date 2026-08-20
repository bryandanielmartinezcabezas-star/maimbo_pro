"use client";

import { motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";

const lines = [
  "Local en Sucre — Ostria Reyes 555",
  "Enviamos a todo Bolivia",
  "Escríbenos para pedidos",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 + i * 0.08,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function StoreLocation() {
  return (
    <section
      id="tienda"
      className="relative overflow-hidden border-b border-line bg-gradient-to-b from-bg via-bg-elevated to-black py-14 sm:py-20 lg:py-28"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        animate={{ opacity: [0.2, 0.55, 0.2], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent"
        animate={{ opacity: [0.15, 0.45, 0.15] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex justify-center sm:mb-8"
        >
          <BrandLogo size="md" className="sm:hidden" href={null} />
          <span className="hidden sm:inline-flex">
            <BrandLogo size="lg" href={null} />
          </span>
        </motion.div>

        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent sm:text-[11px] sm:tracking-[0.36em]"
        >
          Nos encontramos en
        </motion.p>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="editorial mt-3 px-1 text-[2rem] leading-[1.08] text-text sm:mt-4 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          MAIMBO
          <motion.span
            className="mx-1 inline-block text-accent sm:mx-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            |
          </motion.span>
          <span className="italic text-chrome">Vende Estilo</span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 h-px w-40 origin-center bg-gradient-to-r from-transparent via-accent to-transparent"
        />

        <div className="mt-8 space-y-3">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="text-sm tracking-[0.04em] text-muted sm:text-base"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-8 flex w-full flex-col items-stretch gap-3 px-1 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
        >
          <motion.a
            href="https://wa.me/59175769315"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            className="cta-glow cta-chrome display px-6 py-3 text-lg transition sm:px-7 sm:text-xl"
          >
            WhatsApp 75769315
          </motion.a>
          <motion.a
            href="https://www.instagram.com/maimbo.stre"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            className="display border border-chrome/35 px-6 py-3 text-center text-lg text-text transition hover:border-accent hover:text-accent sm:px-7 sm:text-xl"
          >
            @maimbo.stre
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
