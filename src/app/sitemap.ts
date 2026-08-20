import type { MetadataRoute } from "next";
import { products } from "@/data/catalog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    /* Cada ficha entra al sitemap: son las paginas por las que la gente busca
       una prenda concreta, y sin listarlas Google tarda mucho mas en verlas. */
    ...products.map((product) => ({
      url: absoluteUrl(`/producto/${product.id}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
