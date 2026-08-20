import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { TrustBar } from "@/components/TrustBar";
import { MarqueeBanner } from "@/components/MarqueeBanner";
import { ProductCarousel } from "@/components/ProductCarousel";
import { EditorialBanner } from "@/components/EditorialBanner";
import { CategoryTiles } from "@/components/CategoryTiles";
import { DropsSection } from "@/components/DropsSection";
import { StoreLocation } from "@/components/StoreLocation";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { StormAtmosphere } from "@/components/StormAtmosphere";
import { byCollection, products } from "@/data/catalog";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: absoluteUrl("/"),
  },
};

export default function HomePage() {
  const novedades = products
    .filter((p) => p.tag === "NEW" || p.tag === "DROP")
    .slice(0, 8);

  const seen = new Set<string>();
  const masVendidos = [...products.filter((p) => p.tag === "HOT"), ...products]
    .filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    })
    .slice(0, 8);

  return (
    <main className="relative z-[2]">
      <h1 className="sr-only">
        {siteConfig.name} | {siteConfig.tagline} — Streetwear en Sucre, Bolivia.
        Local Ostria Reyes 555. Envíos a todo Bolivia. WhatsApp {siteConfig.phoneDisplay}.
      </h1>
      <AnnouncementBar />
      <Header />

      {/* La tormenta vive dentro del hero y no sobre toda la pagina: es la
          entrada de marca, no un fondo permanente. Fuera de aqui el ojo
          descansa y lo unico que se mueve es el producto. */}
      <div className="relative overflow-hidden">
        <StormAtmosphere />
        <HeroSlider />
      </div>

      <TrustBar />

      {/* Secciones arriba, como pidio el dueno: despues del banner el cliente
          elige a donde ir antes de que le mostremos producto suelto. */}
      <CategoryTiles />

      <div className="rest" aria-hidden />

      <ProductCarousel
        title="NOVEDADES"
        subtitle="Lo último que entró a la tienda."
        products={novedades}
      />

      {/* Corte editorial entre dos bloques de producto, para que no sean
          cuatro carruseles seguidos. */}
      <EditorialBanner />

      <ProductCarousel
        title="MÁS VENDIDOS"
        subtitle="Lo que más se está llevando ahora."
        products={masVendidos}
      />

      <div className="rest" aria-hidden />

      <ProductCarousel
        title="TRACKSUITS"
        subtitle="El conjunto perfecto para romper la calle."
        products={byCollection("tracksuits")}
      />
      <ProductCarousel
        title="POLOS"
        subtitle="Marcas fuertes. Siluetas limpias."
        products={byCollection("polos")}
      />
      <ProductCarousel
        title="HOODIES"
        subtitle="Piezas densas para clima y actitud."
        products={byCollection("hoodies")}
      />
      <DropsSection />

      <ProductCarousel
        title="MUJER"
        subtitle="Tops y bodies con DNA MAIMBO."
        products={byCollection("mujer")}
      />
      <ProductCarousel
        title="JEANS"
        subtitle="Baggy, flared y cargo para el flow."
        products={byCollection("jeans")}
      />
      <ProductCarousel
        title="ACCESORIOS"
        subtitle="El detalle que cierra el look."
        products={byCollection("accesorios")}
      />

      <div className="rest" aria-hidden />

      {/* Un solo marquee en toda la pagina y cerca del final: mas arriba
          competia con el producto. */}
      <MarqueeBanner />

      <StoreLocation />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}
