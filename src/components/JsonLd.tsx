import { absoluteUrl, siteConfig } from "@/lib/seo";

export function JsonLd() {
  const graph = [
    {
      "@type": "ClothingStore",
      "@id": `${absoluteUrl()}/#store`,
      name: siteConfig.name,
      alternateName: `${siteConfig.name} | ${siteConfig.tagline}`,
      description: siteConfig.description,
      url: absoluteUrl(),
      image: absoluteUrl(siteConfig.ogImage),
      logo: absoluteUrl(siteConfig.ogImage),
      telephone: siteConfig.phone,
      email: siteConfig.email,
      priceRange: "$$",
      currenciesAccepted: "BOB",
      paymentAccepted: "Cash, Transfer, QR",
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -19.0333,
        longitude: -65.2627,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "20:00",
        },
      ],
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.tiktok,
        siteConfig.social.facebook,
        siteConfig.whatsapp,
      ],
      areaServed: {
        "@type": "Country",
        name: siteConfig.address.countryName,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        availableLanguage: ["Spanish"],
        areaServed: "BO",
      },
    },
    {
      "@type": "Organization",
      "@id": `${absoluteUrl()}/#organization`,
      name: siteConfig.name,
      url: absoluteUrl(),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.ogImage),
      },
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.tiktok,
        siteConfig.social.facebook,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl()}/#website`,
      url: absoluteUrl(),
      name: `${siteConfig.name} | ${siteConfig.tagline}`,
      description: siteConfig.description,
      publisher: { "@id": `${absoluteUrl()}/#organization` },
      inLanguage: siteConfig.language,
      potentialAction: {
        "@type": "SearchAction",
        target: `${absoluteUrl()}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
