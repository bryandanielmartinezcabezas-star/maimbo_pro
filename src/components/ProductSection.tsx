import type { ComponentType } from "react";
import type { ShopSection, SectionLayout } from "@/config/sections";
import type { ProductListProps } from "@/components/product-list";
import { byCollection } from "@/data/catalog";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProductGrid } from "@/components/ProductGrid";

/**
 * Layouts disponibles.
 *
 * Sumar una forma nueva de presentar productos, por ejemplo un mosaico o una
 * lista editorial, es agregar una entrada a este mapa y una opcion al tipo
 * `SectionLayout`. Ni la portada ni el menu se enteran.
 */
const LAYOUTS: Record<SectionLayout, ComponentType<ProductListProps>> = {
  carousel: ProductCarousel,
  grid: ProductGrid,
};

/**
 * Renderiza una seccion del catalogo a partir de su definicion.
 *
 * La portada solo dice que seccion va; como se ve lo decide el registro.
 */
export function ProductSection({ section }: { section: ShopSection }) {
  const Layout = LAYOUTS[section.layout];

  return (
    <Layout
      id={section.id}
      title={section.title}
      subtitle={section.subtitle}
      products={byCollection(section.collection)}
    />
  );
}
