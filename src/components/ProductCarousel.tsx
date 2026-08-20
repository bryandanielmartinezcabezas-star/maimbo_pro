"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/data/catalog";
import { formatPrice } from "@/data/catalog";

type Props = {
  title: string;
  subtitle: string;
  products: Product[];
};

export function ProductCarousel({ title, subtitle, products }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const anchor = title.toLowerCase().includes("tracksuit")
    ? "tracksuits"
    : title.toLowerCase().includes("hoodie")
      ? "hoodies"
      : title.toLowerCase().includes("polo")
        ? "polos"
        : title.toLowerCase().includes("jean")
          ? "jeans"
          : title.toLowerCase().includes("mujer")
            ? "mujer"
            : title.toLowerCase().includes("accesorio")
              ? "accesorios"
              : title.toLowerCase().replace(/\s+/g, "-");

  const scrollBy = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id={anchor} className="border-b border-line py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="display text-4xl text-text sm:text-5xl md:text-6xl"
            >
              {title}
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="mt-3 h-px w-20 origin-left bg-gradient-to-r from-white via-chrome to-transparent sm:w-24"
            />
            <p className="mt-3 max-w-md text-sm text-muted">{subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="border border-line px-3 py-2 text-xs uppercase tracking-widest text-muted transition hover:border-accent hover:text-accent"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="border border-line px-3 py-2 text-xs uppercase tracking-widest text-muted transition hover:border-accent hover:text-accent"
              aria-label="Siguiente"
            >
              →
            </button>
            <a
              href="#tienda"
              className="ml-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent transition hover:text-white sm:ml-2"
            >
              Ver colección
            </a>
          </div>
        </div>

        <div
          ref={scroller}
          className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:gap-4 sm:px-0"
        >
          {products.map((product, i) => (
            <motion.article
              key={`${anchor}-${product.id}-${i}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: Math.min(i * 0.04, 0.24) }}
              whileHover={{ y: -6 }}
              className="group relative w-[78vw] max-w-[280px] shrink-0 snap-start sm:w-[240px] lg:w-[280px]"
            >
              <div className="product-media relative aspect-[3/4] overflow-hidden border border-line/60 transition group-hover:border-white/35 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="280px"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full"
                  aria-hidden
                />
                {product.tag && (
                  <span className="absolute left-3 top-3 z-10 border border-white/30 bg-gradient-to-r from-white to-[#bdbdbd] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                    {product.tag}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full bg-black/85 p-3 transition duration-300 group-hover:translate-y-0">
                  <button
                    type="button"
                    className="cta-chrome display w-full py-2 text-lg transition"
                  >
                    Ver producto
                  </button>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-text">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-chrome">{formatPrice(product.price)}</p>
                  {product.compareAt && (
                    <p className="text-xs text-muted line-through">
                      {formatPrice(product.compareAt)}
                    </p>
                  )}
                </div>
                <div className="flex gap-1.5 pt-1">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className="h-7 w-7 border border-line text-[10px] text-muted transition hover:border-accent hover:text-accent"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
