import type { Product } from "@/data/catalog";

/**
 * Contrato unico de toda forma de listar productos.
 *
 * Vive en su propio modulo y no junto al despachador a proposito: si el
 * contrato viviera ahi, cada layout tendria que importar al despachador y el
 * despachador a cada layout, un ciclo que rompe la compilacion. Depender de la
 * abstraccion, y no unos de otros, es lo que mantiene los layouts
 * intercambiables.
 */
export interface ProductListProps {
  /** Ancla de la seccion. Se recibe, nunca se deduce del titulo. */
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
}
