"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { drops } from "@/data/catalog";
import { BrandLogo } from "@/components/BrandLogo";

export function DropsSection() {
  return (
    <section id="drops" className="border-b border-line py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <BrandLogo size="sm" href={null} className="mb-3" />
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Cultura
            </p>
            <h2 className="display mt-2 text-5xl text-text sm:text-6xl">DROPS & ARTISTAS</h2>
            <p className="mt-2 max-w-lg text-sm text-muted">
              Colaboraciones que construyen estatus. Primero compra, después redes.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {drops.map((drop, i) => (
            <motion.article
              key={drop.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group overflow-hidden border border-line bg-bg-elevated"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={drop.image}
                  alt={drop.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
              <div className="space-y-3 p-5">
                <h3 className="display text-3xl text-text">{drop.title}</h3>
                <p className="text-sm text-muted">{drop.text}</p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="#tracksuits"
                    className="cta-chrome display px-4 py-2 text-lg transition"
                  >
                    Ver colección
                  </a>
                  <a
                    href="#footer"
                    className="display border border-line px-4 py-2 text-lg text-muted transition hover:border-accent hover:text-accent"
                  >
                    Ver en Instagram
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
