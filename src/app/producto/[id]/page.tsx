import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import { ProductPurchase } from "@/components/pdp/ProductPurchase";
import { SHOP_SECTIONS } from "@/config/sections";
import {
  descriptionFor,
  findProduct,
  formatPrice,
  products,
  relatedTo,
  sizesFor,
} from "@/data/catalog";
import { absoluteUrl, siteConfig } from "@/lib/seo";

/** Se generan todas las fichas en el build: abren al instante y las indexa Google. */
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) return { title: "Producto no encontrado" };

  const title = `${product.name} · ${formatPrice(product.price)} | ${siteConfig.name}`;
  const description = descriptionFor(product);

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/producto/${product.id}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/producto/${product.id}`),
      images: [absoluteUrl(product.image)],
    },
  };
}

/** Nombre legible de la seccion a la que pertenece, para la miga de pan. */
function sectionOf(collection: string) {
  return SHOP_SECTIONS.find((s) => s.collection === collection);
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();

  const section = sectionOf(product.collection);
  const sizes = sizesFor(product);
  const singleSize = sizes.length === 1;

  /* Todas las tomas que tiene la pieza, sin repetir: la principal y, cuando
     existe, la version suelta o la espalda. */
  const shots = [...new Set([product.image, product.hoverImage].filter(Boolean))] as string[];

  const related = relatedTo(product);

  return (
    <main className="relative z-[2]">
      <AnnouncementBar />
      <Header />

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        {/* Miga de pan: donde estoy y como vuelvo. */}
        <nav aria-label="Ruta" className="mb-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em]">
          <Link href="/" className="text-muted transition hover:text-accent">
            Inicio
          </Link>
          <span className="text-line">/</span>
          {section && (
            <>
              <Link href={`/#${section.id}`} className="text-muted transition hover:text-accent">
                {section.navLabel}
              </Link>
              <span className="text-line">/</span>
            </>
          )}
          <span className="text-text">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          <ProductGallery name={product.name} shots={shots} />

          <div className="flex flex-col gap-7 lg:pt-2">
            <header>
              {product.tag && (
                <span className="mb-3 inline-block bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                  {product.tag}
                </span>
              )}
              <h1 className="display text-4xl leading-none text-text sm:text-5xl">
                {product.name}
              </h1>
              <div className="mt-4 flex items-baseline gap-3">
                <p className="text-2xl text-chrome">{formatPrice(product.price)}</p>
                {product.compareAt && (
                  <p className="text-base text-muted line-through">
                    {formatPrice(product.compareAt)}
                  </p>
                )}
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">
                Envío calculado al finalizar la compra
              </p>
            </header>

            <p className="max-w-prose text-sm leading-relaxed text-muted">
              {descriptionFor(product)}
            </p>

            <ProductPurchase
              name={product.name}
              price={product.price}
              sizes={sizes}
              singleSize={singleSize}
            />

            {/* Datos que responden las dudas de siempre, sin ocupar la vista. */}
            <dl className="divide-y divide-line border-y border-line text-sm">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Código</dt>
                <dd className="text-text">{product.id.toUpperCase()}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Envíos</dt>
                <dd className="text-text">A todo Bolivia</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Cambios</dt>
                <dd className="text-text">7 días con boleta</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Retiro en tienda</dt>
                <dd className="text-right text-text">Sucre · Ostria Reyes 555</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="rest" aria-hidden />

      {/* Similares: la misma fila que ya usa la portada, sin componente nuevo. */}
      <ProductCarousel
        id="similares"
        title="TAMBIÉN TE PUEDE GUSTAR"
        subtitle="Más piezas de la tienda."
        products={related}
      />

      <Footer />
      <WhatsAppFab />
    </main>
  );
}
