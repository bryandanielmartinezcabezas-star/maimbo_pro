"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  name: string;
  /** Todas las tomas disponibles de la pieza, la principal primero. */
  shots: string[];
}

/**
 * Galeria de la ficha: miniaturas al costado y la toma grande al centro.
 *
 * La tienda fotografia cada pieza puesta y suelta, y las sudaderas ademas de
 * espalda. Aca esas tomas dejan de ser un truco de la tarjeta y pasan a ser lo
 * que son: el recorrido completo de la prenda antes de comprarla.
 */
export function ProductGallery({ name, shots }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const current = shots[active] ?? shots[0];

  const step = (direction: number) => {
    setActive((i) => (i + direction + shots.length) % shots.length);
  };

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row">
      {/* Miniaturas. En movil van debajo y se deslizan en horizontal. */}
      {shots.length > 1 && (
        <div className="hide-scrollbar flex gap-3 overflow-x-auto lg:w-20 lg:flex-col lg:overflow-visible">
          {shots.map((shot, i) => (
            <button
              key={shot}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver toma ${i + 1} de ${name}`}
              aria-current={i === active}
              className={`relative aspect-[3/4] w-16 shrink-0 overflow-hidden border transition lg:w-full ${
                i === active
                  ? "border-accent"
                  : "border-line/60 opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={shot} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}

      {/* Toma principal */}
      <div className="product-media relative aspect-[3/4] flex-1 overflow-hidden border border-line/60">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current}
              alt={name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </motion.div>
        </AnimatePresence>

        {shots.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Toma anterior"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 border border-white/25 bg-black/50 px-3 py-2 text-sm text-white backdrop-blur-sm transition hover:border-accent hover:text-accent"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Toma siguiente"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 border border-white/25 bg-black/50 px-3 py-2 text-sm text-white backdrop-blur-sm transition hover:border-accent hover:text-accent"
            >
              →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
