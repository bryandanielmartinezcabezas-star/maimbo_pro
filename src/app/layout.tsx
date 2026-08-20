import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Archivo, Cormorant_Garamond } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const editorial = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: absoluteUrl() }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "shopping",
  classification: "Streetwear Clothing Store",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: true,
    email: false,
    address: true,
  },
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "es-BO": absoluteUrl("/"),
      es: absoluteUrl("/"),
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/"),
    siteName: `${siteConfig.name} | ${siteConfig.tagline}`,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 971,
        height: 345,
        alt: `${siteConfig.name} logo chrome streetwear`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  icons: {
    icon: [{ url: "/logo-maimbo.png", type: "image/png" }],
    apple: [{ url: "/logo-maimbo.png", type: "image/png" }],
    shortcut: ["/logo-maimbo.png"],
  },
  other: {
    "geo.region": "BO-H",
    "geo.placename": "Sucre",
    "geo.position": "-19.0333;-65.2627",
    ICBM: "-19.0333, -65.2627",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#050505" },
  ],
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${display.variable} ${body.variable} ${editorial.variable} antialiased`}>
        <JsonLd />
        <div className="noise" aria-hidden />
        {children}
      </body>
    </html>
  );
}
