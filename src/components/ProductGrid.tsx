"use client";

import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import type { ProductListProps } from "@/components/product-list";

/**
 * Presenta una coleccion como una grilla quieta.
 *
 * Cumple el mismo contrato que el carrusel, asi que una seccion puede cambiar
 * de una forma a la otra sin tocar el menu ni su ancla. Sirve como respiro:
 * intercalada entre carruseles corta la textura de "todo se desliza" y deja
 * ver la coleccion completa de un vistazo, sin pedirle al usuario que arrastre.
 */
export function ProductGrid({ id, title, subtitle, products }: ProductListProps) {
  return (
    <section id={id} className="section border-b border-line">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeader title={title} subtitle={subtitle} />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard
              key={`${id}-${product.id}`}
              product={product}
              index={i}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
