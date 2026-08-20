export type Product = {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  collection: string;
  tag?: string;
  image: string;
};

export const categories = [
  "Tracksuits",
  "Polos",
  "Hoodies",
  "Jeans",
  "Shorts",
  "Mujer",
  "Accesorios",
  "Drops",
] as const;


/**
 * Fotos reales del catalogo de MAINBO, tomadas de su pagina oficial.
 *
 * Convencion de los archivos originales:
 *   ropaN      la prenda sola sobre el piso de la tienda
 *   ropaN_v    la prenda puesta por un modelo, junto a la foto de producto
 *   *_m        una coleccion completa en una sola foto
 */
const img = {
  // Poleras y polos
  polo1: "/img/real/ropa1.jpg",
  polo1Vestido: "/img/real/ropa1_v.jpg",
  polo2: "/img/real/ropa2.jpg",
  polo2Vestido: "/img/real/ropa2_v.jpg",

  // Conjuntos y prendas de abrigo
  atuendo1: "/img/real/atuendo1.jpg",
  atuendo2: "/img/real/atuendo2.jpg",
  atuendo3: "/img/real/atuendo3.jpg",
  atuendo4: "/img/real/atuendo4.jpg",
  hoodieLlamas: "/img/real/atuendo_v_tipo_banner.jpg",
  abrigo3: "/img/real/ropa3.jpg",
  abrigo3Vestido: "/img/real/ropa3_v.jpg",
  abrigo4: "/img/real/ropa4.jpg",
  abrigo4Vestido: "/img/real/ropa4_v.jpg",
  abrigo5: "/img/real/ropa5.jpg",
  abrigo5Vestido: "/img/real/ropa5_v.jpg",

  // Jeans y pantalones, fotografiados sobre el piso de cemento
  jeanNegro: "/img/real/ropa6.jpg",
  jean7: "/img/real/ropa7.jpg",
  jean8: "/img/real/ropa8.jpg",
  jean9: "/img/real/ropa9.jpg",
  jean10: "/img/real/ropa10.jpg",
  jean11: "/img/real/ropa11.jpg",
  jean12: "/img/real/ropa12.jpg",
  jeansColeccion: "/img/real/ropas_m.jpg",

  // Bolsos
  bolsa1: "/img/real/bolsa1.jpg",
  bolsa2: "/img/real/bolsa2.jpg",
  bolsa3: "/img/real/bolsa3.jpg",
  bolsa4: "/img/real/bolsa4.jpg",
  bolsa5: "/img/real/bolsa5.jpg",
  bolsa6: "/img/real/bolsa6.jpg",
  bolsasColeccion: "/img/real/bolsas_m.jpg",

  // Mochilas
  mochila1: "/img/real/mochila1.jpg",
  mochila2: "/img/real/mochila2.jpg",
  mochila3: "/img/real/mochila3.jpg",
  mochila4: "/img/real/mochila-4.jpg",
  mochila5: "/img/real/mochila-5.jpg",
  mochila6: "/img/real/mochila-6.jpg",

  // Piezas verticales pensadas como banner
  bannerRopa: "/img/real/banner-de-ropa-vertical.jpg",
  bannerVertical: "/img/real/banner-vertical.jpg",
};

/**
 * Portada. Las fotos son de campana de la tienda, no recortes de producto:
 * un recorte estirado a pantalla completa obliga a taparlo con un velo negro
 * para que el texto se lea, y ahi el banner deja de existir.
 */
export const heroes = [
  {
    id: "h1",
    eyebrow: "NUEVA TEMPORADA",
    title: "MAINBO",
    subtitle: "Ropa en tendencia para hombre y mujer. Envíos a toda Bolivia.",
    cta: "Ver catálogo",
    secondary: "Novedades",
    image: img.hoodieLlamas,
  },
  {
    id: "h2",
    eyebrow: "COLECCIÓN",
    title: "LÍNEA DE JEANS",
    subtitle: "Del azul claro al negro, en corte recto y baggy.",
    cta: "Ver jeans",
    secondary: "Ver todo",
    image: img.jeansColeccion,
  },
  {
    id: "h3",
    eyebrow: "ACCESORIOS",
    title: "BOLSOS Y MOCHILAS",
    subtitle: "El detalle que cierra el look.",
    cta: "Ver accesorios",
    secondary: "Novedades",
    image: img.bolsasColeccion,
  },
];

/** Lo que la tienda promete, y se muestra bajo la portada. */
export const benefits = [
  { title: "Envíos a todo Bolivia", detail: "Despacho nacional" },
  { title: "Pago seguro", detail: "Checkout protegido" },
  { title: "Cambios de talla", detail: "Consulta por WhatsApp" },
  { title: "WhatsApp directo", detail: "75769315" },
  { title: "Tienda física", detail: "Sucre · Guillermo Loayza 701" },
];

/**
 * Catalogo real de la tienda. Los precios estan en bolivianos y siguen el
 * rango con el que MAINBO trabaja en Sucre.
 */
export const products: Product[] = [
  // ------------------------------------------------------------------ polos
  {
    id: "p1",
    name: "POLERA BLANCA CUELLO CIERRE",
    price: 150,
    collection: "polos",
    tag: "HOT",
    image: img.polo1Vestido,
  },
  { id: "p2", name: "POLERA BLANCA PREMIUM", price: 150, collection: "polos", image: img.polo1 },
  {
    id: "p3",
    name: "POLERA NEGRA BASICA",
    price: 140,
    collection: "polos",
    tag: "NEW",
    image: img.polo2Vestido,
  },
  { id: "p4", name: "POLERA CORTE RECTO", price: 140, collection: "polos", image: img.polo2 },

  // ---------------------------------------------------------------- hoodies
  {
    id: "h1",
    name: "HOODIE LLAMAS PLATA",
    price: 320,
    compareAt: 380,
    collection: "hoodies",
    tag: "HOT",
    image: img.hoodieLlamas,
  },
  { id: "h2", name: "HOODIE NEGRO OVERSIZE", price: 290, collection: "hoodies", image: img.abrigo3 },
  {
    id: "h3",
    name: "HOODIE NEGRO EN LOOK",
    price: 290,
    collection: "hoodies",
    tag: "NEW",
    image: img.abrigo3Vestido,
  },
  { id: "h4", name: "CAMPERA URBANA", price: 340, collection: "hoodies", image: img.abrigo5 },

  // ------------------------------------------------------------- tracksuits
  {
    id: "t1",
    name: "CONJUNTO MAIMBO NEGRO",
    price: 420,
    collection: "tracksuits",
    tag: "HOT",
    image: img.atuendo1,
  },
  { id: "t2", name: "CONJUNTO URBANO", price: 400, collection: "tracksuits", image: img.atuendo2 },
  {
    id: "t3",
    name: "CONJUNTO STREET",
    price: 390,
    collection: "tracksuits",
    tag: "NEW",
    image: img.atuendo3,
  },
  { id: "t4", name: "CONJUNTO DEPORTIVO", price: 380, collection: "tracksuits", image: img.atuendo4 },

  // ------------------------------------------------------------------ jeans
  {
    id: "j1",
    name: "JEAN NEGRO SLIM",
    price: 250,
    collection: "jeans",
    tag: "HOT",
    image: img.jeanNegro,
  },
  { id: "j2", name: "JEAN AZUL CLARO", price: 250, collection: "jeans", image: img.jean7 },
  { id: "j3", name: "JEAN AZUL MEDIO", price: 250, collection: "jeans", image: img.jean8 },
  {
    id: "j4",
    name: "JEAN GRIS LAVADO",
    price: 260,
    collection: "jeans",
    tag: "NEW",
    image: img.jean9,
  },
  { id: "j5", name: "JEAN BEIGE RECTO", price: 260, collection: "jeans", image: img.jean10 },
  { id: "j6", name: "JEAN NEGRO BAGGY", price: 270, collection: "jeans", image: img.jean11 },
  { id: "j7", name: "JEAN AZUL OSCURO", price: 260, collection: "jeans", image: img.jean12 },
  {
    id: "j8",
    name: "COLECCION DE JEANS",
    price: 250,
    collection: "jeans",
    tag: "DROP",
    image: img.jeansColeccion,
  },

  // ------------------------------------------------------------------ mujer
  {
    id: "m1",
    name: "LOOK COMPLETO MUJER",
    price: 380,
    collection: "mujer",
    tag: "NEW",
    image: img.bannerRopa,
  },
  { id: "m2", name: "CONJUNTO MUJER", price: 360, collection: "mujer", image: img.bannerVertical },
  { id: "m3", name: "PRENDA EN LOOK", price: 300, collection: "mujer", image: img.abrigo4Vestido },
  {
    id: "m4",
    name: "PRENDA DE TEMPORADA",
    price: 300,
    collection: "mujer",
    tag: "HOT",
    image: img.abrigo5Vestido,
  },
  { id: "m5", name: "ABRIGO MUJER", price: 340, collection: "mujer", image: img.abrigo4 },

  // ------------------------------------------------------------- accesorios
  {
    id: "a1",
    name: "BOLSO MAIMBO NEGRO",
    price: 220,
    collection: "accesorios",
    tag: "HOT",
    image: img.bolsa1,
  },
  { id: "a2", name: "BOLSO CRUZADO", price: 210, collection: "accesorios", image: img.bolsa2 },
  { id: "a3", name: "BOLSO DE MANO", price: 230, collection: "accesorios", image: img.bolsa3 },
  {
    id: "a4",
    name: "BOLSO URBANO",
    price: 220,
    collection: "accesorios",
    tag: "NEW",
    image: img.bolsa4,
  },
  { id: "a5", name: "BOLSO COMPACTO", price: 200, collection: "accesorios", image: img.bolsa5 },
  { id: "a6", name: "BOLSO CLASICO", price: 210, collection: "accesorios", image: img.bolsa6 },
  {
    id: "a7",
    name: "COLECCION DE BOLSOS",
    price: 210,
    collection: "accesorios",
    tag: "DROP",
    image: img.bolsasColeccion,
  },
  {
    id: "a8",
    name: "MOCHILA MAIMBO NEGRA",
    price: 280,
    collection: "accesorios",
    tag: "HOT",
    image: img.mochila1,
  },
  { id: "a9", name: "MOCHILA URBANA", price: 270, collection: "accesorios", image: img.mochila2 },
  { id: "a10", name: "MOCHILA REFORZADA", price: 290, collection: "accesorios", image: img.mochila3 },
  { id: "a11", name: "MOCHILA CLASICA", price: 270, collection: "accesorios", image: img.mochila4 },
  { id: "a12", name: "MOCHILA COMPACTA", price: 260, collection: "accesorios", image: img.mochila5 },
  { id: "a13", name: "MOCHILA DE VIAJE", price: 300, collection: "accesorios", image: img.mochila6 },
];

/** Piezas destacadas de la portada, con foto real de la tienda. */
export const drops = [
  {
    id: "d1",
    title: "HOODIE LLAMAS",
    text: "Negro sobre negro con llamas en plata. La pieza que mas sale de la tienda.",
    image: img.hoodieLlamas,
  },
  {
    id: "d2",
    title: "LINEA DE JEANS",
    text: "Del azul claro al negro, en corte recto y baggy. Todos los lavados en un solo lugar.",
    image: img.jeansColeccion,
  },
  {
    id: "d3",
    title: "BOLSOS Y MOCHILAS",
    text: "El detalle que cierra el look, en cuero negro y con herrajes plateados.",
    image: img.bolsasColeccion,
  },
];

export function byCollection(collection: string, limit = 8) {
  return products.filter((p) => p.collection === collection).slice(0, limit);
}

/**
 * Lo ultimo que entro a la tienda.
 *
 * Vive aca y no en la portada porque es una pregunta sobre el catalogo, no
 * sobre como se dibuja la pagina: cambiar que cuenta como novedad no deberia
 * obligar a abrir un componente de interfaz.
 */
export function newArrivals(limit = 8) {
  return products.filter((p) => p.tag === "NEW" || p.tag === "DROP").slice(0, limit);
}

/** Lo mas vendido primero, completando con el resto del catalogo sin repetir. */
export function bestSellers(limit = 8) {
  const hot = products.filter((p) => p.tag === "HOT");
  const seen = new Set(hot.map((p) => p.id));
  const rest = products.filter((p) => !seen.has(p.id));
  return [...hot, ...rest].slice(0, limit);
}

/**
 * Precio en bolivianos: la tienda esta en Sucre y cobra en Bs.
 * Antes se formateaba en soles peruanos.
 */
export function formatPrice(value: number) {
  return `Bs ${value.toFixed(2)}`;
}
