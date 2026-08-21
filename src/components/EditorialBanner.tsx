"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";

export function EditorialBanner() {
  return (
    <section className="border-b border-line">
      <div className="grid lg:grid-cols-2">
        {/* La foto es vertical y el hueco es apaisado, asi que en reposo se ve
            recortada y al modelo se le va la cabeza. Al acercarse, el panel
            crece y la imagen pasa a entrar completa: el recorte deja de ser un
            defecto y se vuelve el motivo para mirar. */}
        <div className="group relative min-h-[280px] overflow-hidden transition-[min-height] duration-500 ease-out hover:min-h-[560px] sm:min-h-[360px] lg:min-h-[420px] lg:hover:min-h-[640px]">
          <Image
            src="/img/real/atuendo_v_tipo_banner.jpg"
            alt="Campaña Luxury Tracksuits de MAIMBO"
            fill
            className="object-cover object-top transition-all duration-500 ease-out group-hover:scale-[0.98] group-hover:object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-40" />

          <div className="absolute bottom-4 left-4 z-10 sm:bottom-6 sm:left-6">
            <BrandLogo size="sm" className="sm:hidden" href={null} />
            <span className="hidden sm:inline-flex">
              <BrandLogo size="md" href={null} />
            </span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center bg-bg-elevated px-4 py-10 sm:px-6 sm:py-14 lg:px-14"
        >
          <BrandLogo size="sm" href={null} className="mb-4 self-start" />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Campaign
          </p>
          <h2 className="display mt-3 text-4xl text-text sm:text-5xl md:text-6xl lg:text-7xl">
            LUXURY TRACKSUITS
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            Conjuntos densos, insumos premium y diseños disruptivos. No es ropa
            básica: es identidad para romper la calle.
          </p>
          <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap">
            <a
              href="#tracksuits"
              className="cta-chrome display px-6 py-3 text-center text-lg transition sm:text-xl"
            >
              Comprar ahora
            </a>
            <a
              href="#drops"
              className="display border border-line px-6 py-3 text-center text-lg text-text transition hover:border-accent hover:text-accent sm:text-xl"
            >
              Ver más
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
