"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const tiles = [
  {
    title: "TRACKSUITS",
    text: "El conjunto perfecto para romper la calle.",
    href: "#tracksuits",
    image:
      "/img/real/atuendo2.jpg",
  },
  {
    title: "ACCESORIOS",
    text: "El detalle que cierra el look.",
    href: "#accesorios",
    image:
      "/img/real/bolsas_m.jpg",
  },
];

export function CategoryTiles() {
  return (
    <section className="border-b border-line bg-bg-soft py-10 sm:py-14 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:gap-4 lg:px-6">
        {tiles.map((tile, i) => (
          <motion.a
            key={tile.title}
            href={tile.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative min-h-[200px] overflow-hidden sm:min-h-[280px] md:min-h-[320px]"
          >
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <h3 className="display text-3xl text-text sm:text-4xl md:text-5xl">{tile.title}</h3>
              <p className="mt-2 max-w-sm text-sm text-muted">{tile.text}</p>
              <span className="mt-4 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                Ver colección →
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
