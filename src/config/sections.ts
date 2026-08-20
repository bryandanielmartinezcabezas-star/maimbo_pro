/**
 * Registro de secciones de la tienda: una sola fuente de verdad.
 *
 * El menu, los anclajes y el orden de la portada salen todos de aqui. Antes
 * cada carrusel deducia su propio ancla a partir del titulo, asi que cambiar
 * un texto o un layout rompia la navegacion en silencio. Ahora la identidad de
 * la seccion (su `id`) es un dato, no algo que un componente adivine.
 *
 * Cambiar como se ve una seccion es cambiar `layout` aqui. Agregar una seccion
 * es agregar una entrada. En ningun caso hay que tocar el menu ni la portada.
 */

export type SectionLayout = "carousel" | "grid";

export interface ShopSection {
  /** Ancla en la URL. Es contrato publico: no se cambia sin migrar enlaces. */
  id: string;
  /** Como se llama en el menu superior. */
  navLabel: string;
  /** Titulo grande de la seccion. */
  title: string;
  subtitle: string;
  /** Coleccion del catalogo de la que toma productos. */
  collection: string;
  /** Como se presenta. Cambiarlo no afecta al menu ni a los anclajes. */
  layout: SectionLayout;
}

/**
 * El orden del arreglo es el orden en la portada.
 *
 * Los layouts se alternan a proposito: siete carruseles seguidos se leen como
 * una sola textura larga y el ojo deja de distinguir donde termina uno y
 * empieza el otro. Intercalar grillas da un punto de reposo sin sacar nada
 * del catalogo ni romper un solo enlace.
 */
export const SHOP_SECTIONS: ShopSection[] = [
  {
    id: "tracksuits",
    navLabel: "Tracksuits",
    title: "TRACKSUITS",
    subtitle: "El conjunto perfecto para romper la calle.",
    collection: "tracksuits",
    layout: "carousel",
  },
  {
    id: "polos",
    navLabel: "Polos",
    title: "POLOS",
    subtitle: "Marcas fuertes. Siluetas limpias.",
    collection: "polos",
    layout: "grid",
  },
  {
    id: "hoodies",
    navLabel: "Hoodies",
    title: "HOODIES",
    subtitle: "Piezas densas para clima y actitud.",
    collection: "hoodies",
    layout: "carousel",
  },
  {
    id: "mujer",
    navLabel: "Mujer",
    title: "MUJER",
    subtitle: "Tops y bodies con DNA MAIMBO.",
    collection: "mujer",
    layout: "grid",
  },
  {
    id: "jeans",
    navLabel: "Jeans",
    title: "JEANS",
    subtitle: "Baggy, flared y cargo para el flow.",
    collection: "jeans",
    layout: "carousel",
  },
  {
    id: "accesorios",
    navLabel: "Accesorios",
    title: "ACCESORIOS",
    subtitle: "El detalle que cierra el look.",
    collection: "accesorios",
    layout: "grid",
  },
];

/** Secciones que no son de catalogo pero si viven en el menu. */
export const EXTRA_NAV_LINKS = [{ id: "drops", navLabel: "Drops" }] as const;

/** Lo que consume el menu. No sabe nada de layouts ni de productos. */
export const NAV_LINKS = [
  ...SHOP_SECTIONS.map((s) => ({ id: s.id, navLabel: s.navLabel })),
  ...EXTRA_NAV_LINKS,
];
