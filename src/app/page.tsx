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
      <StormAtmosphere />
      <AnnouncementBar />
      <Header />
      <HeroSlider />
      <TrustBar />
      <MarqueeBanner />
      <ProductCarousel
        title="TRACKSUITS"
        subtitle="El conjunto perfecto para romper la calle."
        products={byCollection("tracksuits")}
      />
      <ProductCarousel
        title="NEW ARRIVALS"
        subtitle="Drop nuevo. Curaduría sin repetición."
        products={novedades}
      />
      <EditorialBanner />
      <ProductCarousel
        title="MÁS VENDIDOS"
        subtitle="Lo que más se está llevando ahora."
        products={masVendidos}
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
      <CategoryTiles />
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
      <DropsSection />
      <ProductCarousel
        title="ACCESORIOS"
        subtitle="El detalle que cierra el look."
        products={byCollection("accesorios")}
      />
      <StoreLocation />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}
