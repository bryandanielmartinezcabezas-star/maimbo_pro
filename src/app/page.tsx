import { Fragment } from "react";
import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { TrustBar } from "@/components/TrustBar";
import { MarqueeBanner } from "@/components/MarqueeBanner";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductSection } from "@/components/ProductSection";
import { EditorialBanner } from "@/components/EditorialBanner";
import { CategoryTiles } from "@/components/CategoryTiles";
import { DropsSection } from "@/components/DropsSection";
import { StoreLocation } from "@/components/StoreLocation";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { StormAtmosphere } from "@/components/StormAtmosphere";
import { SHOP_SECTIONS } from "@/config/sections";
import { bestSellers, newArrivals } from "@/data/catalog";
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

const catalogSections = SHOP_SECTIONS;

/** Despues de esta seccion entra Drops, a mitad del recorrido del catalogo. */
const MID_BREAK_INDEX = Math.floor(catalogSections.length / 2) - 1;

export default function HomePage() {
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
        id="novedades"
        title="NOVEDADES"
        subtitle="Lo último que entró a la tienda."
        products={newArrivals()}
      />

      {/* Corte editorial entre dos bloques de producto, para que no sean
          cuatro carruseles seguidos. */}
      <EditorialBanner />

      <ProductGrid
        id="mas-vendidos"
        title="MÁS VENDIDOS"
        subtitle="Lo que más se está llevando ahora."
        products={bestSellers()}
      />

      <div className="rest" aria-hidden />

      {/* Las secciones del catalogo salen del registro: la portada declara el
          orden y nada mas. Como se ve cada una, y cual es su ancla, se define
          en config/sections.ts. */}
      {catalogSections.map((section, i) => (
        <Fragment key={section.id}>
          <ProductSection section={section} />
          {/* A mitad del recorrido entra Drops, para que el catalogo no sea una
              tirada continua de secciones iguales. */}
          {i === MID_BREAK_INDEX && <DropsSection />}
        </Fragment>
      ))}

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
