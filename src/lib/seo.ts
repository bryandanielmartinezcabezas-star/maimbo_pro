export const siteConfig = {
  name: "MAIMBO",
  tagline: "Vende Estilo",
  title: "MAIMBO | Streetwear en Sucre — Vende Estilo",
  description:
    "Tienda streetwear MAIMBO en Sucre, Bolivia. Tracksuits, hoodies, jeans y accesorios. Local en Ostria Reyes 555. Envíos a todo Bolivia. Pedidos por WhatsApp 75769315.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maimbo.vercel.app",
  locale: "es_BO",
  language: "es",
  phone: "+59175769315",
  phoneDisplay: "75769315",
  whatsapp: "https://wa.me/59175769315",
  email: "contacto@maimbo.stre",
  address: {
    street: "Ostria Reyes 555",
    city: "Sucre",
    region: "Chuquisaca",
    country: "BO",
    countryName: "Bolivia",
  },
  social: {
    instagram: "https://www.instagram.com/maimbo.stre",
    tiktok: "https://www.tiktok.com/@maimbo.stre",
    facebook: "https://www.facebook.com/maimbo.stre",
  },
  keywords: [
    "MAIMBO",
    "streetwear Sucre",
    "ropa urbana Bolivia",
    "tracksuits Sucre",
    "hoodies Bolivia",
    "jeans baggy",
    "tienda ropa Sucre",
    "Ostria Reyes 555",
    "MAIMBO Vende Estilo",
    "envíos Bolivia",
    "ropa trap",
    "drip Bolivia",
  ],
  ogImage: "/logo-maimbo.png",
} as const;

export function absoluteUrl(path = "") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
