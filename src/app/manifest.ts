import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    lang: siteConfig.language,
    icons: [
      {
        src: "/logo-maimbo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
