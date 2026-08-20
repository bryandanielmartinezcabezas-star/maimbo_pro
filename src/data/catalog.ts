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

export const heroes = [
  {
    id: "h1",
    eyebrow: "DROP 01",
    title: "SHADOW DIVISION",
    subtitle: "Piezas densas para romper la noche. Stock limitado.",
    cta: "Comprar ahora",
    secondary: "Ver colección",
    image:
      "/img/men-check-shirt.webp",
  },
  {
    id: "h2",
    eyebrow: "CAMPAÑA",
    title: "WAR DRIP",
    subtitle: "Siluetas agresivas. Actitud limpia. Streetwear sin filtro.",
    cta: "Comprar ahora",
    secondary: "Ver novedades",
    image:
      "/img/gray-dress.webp",
  },
  {
    id: "h3",
    eyebrow: "ARTIST MODE",
    title: "CHROME NIGHTS",
    subtitle: "Colaboraciones, drops y flow propio. Bienvenido a MAIMBO.",
    cta: "Explorar drop",
    secondary: "Ver más",
    image:
      "/img/dress-pea.webp",
  },
];

export const benefits = [
  { title: "Envíos a todo Bolivia", detail: "Despacho nacional" },
  { title: "Pago seguro", detail: "Checkout protegido" },
  { title: "Cambios de talla", detail: "Consulta por WhatsApp" },
  { title: "WhatsApp directo", detail: "75769315" },
  { title: "Tienda física", detail: "Sucre · Ostria Reyes 555" },
];

const img = {
  suit1:
    "/img/rolex-cellini-date-black-dial.webp",
  suit2:
    "/img/nike-air-jordan-1-red-and-black.webp",
  suit3:
    "/img/corset-leather-with-skirt.webp",
  suit4:
    "/img/green-and-black-glasses.webp",
  suit5:
    "/img/blue-frock.webp",
  suit6:
    "/img/brown-leather-belt-watch.webp",
  hoodie1:
    "/img/nike-baseball-cleats.webp",
  hoodie2:
    "/img/pampi-shoes.webp",
  hoodie3:
    "/img/rolex-datejust-women.webp",
  hoodie4:
    "/img/man-short-sleeve-shirt.webp",
  jacket:
    "/img/puma-future-rider-trainers.webp",
  tee1:
    "/img/girl-summer-dress.webp",
  tee2:
    "/img/party-glasses.webp",
  tee3:
    "/img/classic-sun-glasses.webp",
  tee4:
    "/img/rolex-cellini-moonphase.webp",
  tee5:
    "/img/rolex-datejust.webp",
  jean1:
    "/img/heshe-women-s-leather-bag.webp",
  jean2:
    "/img/green-oval-earring.webp",
  jean3:
    "/img/black-women-s-gown.webp",
  jean4:
    "/img/red-shoes.webp",
  women1:
    "/img/gigabyte-aorus-men-tshirt.webp",
  women2:
    "/img/black-brown-slipper.webp",
  women3:
    "/img/green-crystal-earring.webp",
  women4:
    "/img/calvin-klein-heel-shoes.webp",
  women5:
    "/img/corset-leather-with-skirt.webp",
  bag:
    "/img/man-plaid-shirt.webp",
  cap:
    "/img/prada-women-bag.webp",
  shoe:
    "/img/iwc-ingenieur-automatic-steel.webp",
  watch:
    "/img/golden-shoes-woman.webp",
};

export const products: Product[] = [
  {
    id: "p1",
    name: "TRACKSUIT SHADOW DIVISION",
    price: 199.9,
    compareAt: 249.9,
    collection: "tracksuits",
    tag: "HOT",
    image: img.suit2,
  },
  {
    id: "p2",
    name: "TRACKSUIT WAR DRIP",
    price: 189.9,
    collection: "tracksuits",
    tag: "NEW",
    image: img.suit1,
  },
  {
    id: "p3",
    name: "TRACKSUIT LUXURY DREAMS",
    price: 209.9,
    collection: "tracksuits",
    image: img.suit4,
  },
  {
    id: "p4",
    name: "TRACKSUIT REFLECTIVE",
    price: 179.9,
    collection: "tracksuits",
    image: img.suit3,
  },
  {
    id: "p5",
    name: "TRACKSUIT CHROME CORE",
    price: 199.9,
    collection: "tracksuits",
    tag: "DROP",
    image: img.suit5,
  },
  {
    id: "p6",
    name: "TRACKSUIT NIGHTFALL",
    price: 169.9,
    collection: "tracksuits",
    image: img.suit6,
  },
  {
    id: "p7",
    name: "HOODIE DEATH DRIP",
    price: 119.9,
    collection: "hoodies",
    tag: "NEW",
    image: img.hoodie1,
  },
  {
    id: "p8",
    name: "ZIP HOODIE LETTERING",
    price: 109.9,
    collection: "hoodies",
    image: img.hoodie2,
  },
  {
    id: "p9",
    name: "PHANTOM ZIP HOODIE",
    price: 129.9,
    collection: "hoodies",
    tag: "HOT",
    image: img.hoodie3,
  },
  {
    id: "p10",
    name: "JACKET NIGHTFALL",
    price: 149.9,
    collection: "hoodies",
    image: img.jacket,
  },
  {
    id: "p11",
    name: "HOODIE DIVINE DRIP",
    price: 114.9,
    collection: "hoodies",
    image: img.hoodie4,
  },
  {
    id: "p12",
    name: "HOODIE CHROME MARK",
    price: 124.9,
    collection: "hoodies",
    image: img.suit1,
  },
  {
    id: "p13",
    name: "T-SHIRT SKULL DRIP",
    price: 75,
    collection: "polos",
    tag: "NEW",
    image: img.tee1,
  },
  {
    id: "p14",
    name: "T-SHIRT DIAMOND FOCUS",
    price: 59.9,
    collection: "polos",
    image: img.tee2,
  },
  {
    id: "p15",
    name: "LONG SLEEVE WAR DRIP",
    price: 79.9,
    collection: "polos",
    image: img.tee3,
  },
  {
    id: "p16",
    name: "T-SHIRT GOTHIC MARK",
    price: 64.9,
    collection: "polos",
    image: img.tee4,
  },
  {
    id: "p17",
    name: "T-SHIRT NEW ORDER",
    price: 54.9,
    collection: "polos",
    image: img.tee5,
  },
  {
    id: "p18",
    name: "LONG SLEEVE CHROME",
    price: 84.9,
    collection: "polos",
    tag: "DROP",
    image: img.tee1,
  },
  {
    id: "p19",
    name: "JEAN BAGGY WAR DRIP",
    price: 99.9,
    collection: "jeans",
    tag: "HOT",
    image: img.jean1,
  },
  {
    id: "p20",
    name: "JEAN FLARED TRILINE",
    price: 109.9,
    collection: "jeans",
    image: img.jean2,
  },
  {
    id: "p21",
    name: "JEAN CARGO ERA",
    price: 119.9,
    collection: "jeans",
    image: img.jean3,
  },
  {
    id: "p22",
    name: "JEAN DIVINE DRIP",
    price: 119.9,
    collection: "jeans",
    image: img.jean4,
  },
  {
    id: "p23",
    name: "JEAN SLIM CALLAO",
    price: 114.9,
    collection: "jeans",
    image: img.jean1,
  },
  {
    id: "p24",
    name: "PANT COTTON FLARE",
    price: 104.9,
    collection: "jeans",
    image: img.jean2,
  },
  {
    id: "p25",
    name: "TOP CHROME",
    price: 49.9,
    collection: "mujer",
    tag: "NEW",
    image: img.women1,
  },
  {
    id: "p26",
    name: "BODY MAIMBO",
    price: 59.9,
    collection: "mujer",
    image: img.women2,
  },
  {
    id: "p27",
    name: "TOP DIAMOND",
    price: 49.9,
    collection: "mujer",
    image: img.women3,
  },
  {
    id: "p28",
    name: "TOP REFLECTIVE",
    price: 54.9,
    collection: "mujer",
    image: img.women4,
  },
  {
    id: "p29",
    name: "TOP BABY DRIP",
    price: 59.9,
    collection: "mujer",
    image: img.women5,
  },
  {
    id: "p30",
    name: "TOP CAMO",
    price: 59.9,
    collection: "mujer",
    image: img.suit5,
  },
  {
    id: "p31",
    name: "SKYMASK NEON",
    price: 35,
    collection: "accesorios",
    tag: "HOT",
    image: img.cap,
  },
  {
    id: "p32",
    name: "SKY MASK CAMO",
    price: 29.9,
    collection: "accesorios",
    image: img.shoe,
  },
  {
    id: "p33",
    name: "BALACLAVA REFLECTIVA",
    price: 35,
    collection: "accesorios",
    image: img.watch,
  },
  {
    id: "p34",
    name: "BANDOLERA CHROME",
    price: 75,
    collection: "accesorios",
    tag: "DROP",
    image: img.bag,
  },
  {
    id: "p35",
    name: "CAP MAIMBO MARK",
    price: 45,
    collection: "accesorios",
    image: img.cap,
  },
  {
    id: "p36",
    name: "GLOVES STREET CORE",
    price: 39.9,
    collection: "accesorios",
    image: img.shoe,
  },
];

export const drops = [
  {
    id: "d1",
    title: "ROA X MAIMBO",
    text: "No todas las piezas nacen para venderse. Colección pensada para romper escena.",
    image:
      "/img/blue-women-s-handbag.webp",
  },
  {
    id: "d2",
    title: "DRIP MUNDIAL",
    text: "Cuando el trap y MAIMBO conectan. Flow propio, rebeldía elegante.",
    image:
      "/img/black-sun-glasses.webp",
  },
  {
    id: "d3",
    title: "CHROME SESSION",
    text: "MAIMBO no sigue modas: las diseña. Piezas para pertenecer.",
    image:
      "/img/corset-with-black-skirt.webp",
  },
];

export function byCollection(collection: string, limit = 8) {
  return products.filter((p) => p.collection === collection).slice(0, limit);
}

export function formatPrice(value: number) {
  return `S/. ${value.toFixed(2)}`;
}
