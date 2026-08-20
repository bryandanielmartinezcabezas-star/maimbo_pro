"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/data/catalog";
import { formatPrice } from "@/data/catalog";

interface ProductCardProps {
  product: Product;
  /** Escalona la entrada cuando la tarjeta forma parte de una lista. */
  index?: number;
  /** El carrusel necesita ancho fijo; la grilla ocupa su celda. */
  fixedWidth?: boolean;
  sizes?: string;
}

/**
 * Como se ve un producto en toda la tienda.
 *
 * Vive aparte de quien lo ordena en pantalla: el carrusel y la grilla la
 * comparten, asi que un arreglo en la tarjeta llega a las dos y no hay dos
 * versiones del mismo producto conviviendo.
 */
export function ProductCard({
  product,
  index = 0,
  fixedWidth = false,
  sizes = "280px",
}: ProductCardProps) {
  const hasSecondShot = Boolean(product.hoverImage);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: Math.min(index * 0.04, 0.24), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={
        fixedWidth
          ? "group relative w-[72vw] shrink-0 snap-start sm:w-[260px] lg:w-[280px]"
          : "group relative"
      }
    >
      <div className="product-media relative aspect-[3/4] overflow-hidden border border-line/60">
        {/* Primer tiempo: la prenda puesta, que es como el cliente se imagina
            usandola. */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-500 ${
            hasSecondShot ? "group-hover:opacity-0" : "transition-transform group-hover:scale-105"
          }`}
          sizes={sizes}
        />

        {/* Segundo tiempo: la prenda sola, para ver el corte y el detalle.
            Solo aparece si la tienda fotografio esa version. */}
        {hasSecondShot && (
          <Image
            src={product.hoverImage!}
            alt={`${product.name}, prenda sola`}
            fill
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            sizes={sizes}
          />
        )}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80"
          aria-hidden
        />

        {product.tag && (
          <span className="absolute left-3 top-3 z-10 bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
            {product.tag}
          </span>
        )}

        {/* Las tallas se revelan al acercarse, como en las tiendas de
            referencia: en reposo manda la foto, no los controles. */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full bg-black/85 p-3 transition-transform duration-300 group-hover:translate-y-0">
          <div className="mb-2 flex justify-center gap-1.5">
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                type="button"
                className="h-7 w-7 border border-white/25 text-[10px] text-white/80 transition hover:border-accent hover:text-accent"
                aria-label={`Talla ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="display w-full bg-accent py-2 text-lg text-black transition hover:bg-white"
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
            <p className="text-xs text-muted line-through">{formatPrice(product.compareAt)}</p>
          )}
        </div>
      </div>
    </motion.article>
  );
}
