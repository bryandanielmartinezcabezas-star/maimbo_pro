"use client";

import { useRef } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import type { ProductListProps } from "@/components/product-list";

/**
 * Presenta una coleccion como una fila que se desliza.
 *
 * Recibe su `id` en vez de deducirlo del titulo. Antes lo adivinaba con una
 * cadena de condiciones sobre el texto, de modo que renombrar una seccion
 * rompia su ancla y el enlace del menu dejaba de funcionar sin aviso.
 */
export function ProductCarousel({ id, title, subtitle, products }: ProductListProps) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: number) => {
    scroller.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <section id={id} className="section border-b border-line">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          actions={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                className="border border-line px-3 py-2 text-xs uppercase tracking-widest text-muted transition hover:border-accent hover:text-accent"
                aria-label={`Anterior en ${title}`}
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                className="border border-line px-3 py-2 text-xs uppercase tracking-widest text-muted transition hover:border-accent hover:text-accent"
                aria-label={`Siguiente en ${title}`}
              >
                →
              </button>
            </div>
          }
        />

        <div
          ref={scroller}
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {products.map((product, i) => (
            <ProductCard key={`${id}-${product.id}`} product={product} index={i} fixedWidth />
          ))}
        </div>
      </div>
    </section>
  );
}
