"use client";

import Script from "next/script";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": "https://laboyaounde.com/#organization",
  name: "Lab Yaoundé",
  alternateName: "LABY - Laboratoire d'Analyses de Biologie Yaoundé",
  description:
    "Laboratoire d'analyses médicales de référence au Cameroun. Biochimie, hématologie, microbiologie, immunologie, biologie moléculaire, empreintes génétiques.",
  url: "https://laboyaounde.com",
  logo: {
    "@type": "ImageObject",
    url: "https://laboyaounde.com/logo.png",
    width: 200,
    height: 200,
  },
  image: "https://laboyaounde.com/og-image.jpg",
  telephone: "+237-XXX-XXX-XXX",
  email: "contact@labyaounde.org",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cité Verte Batiment B01 Rue 2.711",
    addressLocality: "Yaoundé",
    addressRegion: "Centre",
    postalCode: "00000",
    addressCountry: "CM",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 3.857826,
    longitude: 11.540782,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:30",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "08:00",
      closes: "13:00",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "XAF",
  paymentAccepted: "Cash, Credit Card, Mobile Money",
  areaServed: [
    {
      "@type": "City",
      name: "Yaoundé",
    },
    {
      "@type": "Country",
      name: "Cameroun",
    },
  ],
  medicalSpecialty: [
    "Clinical Biochemistry",
    "Hematology",
    "Microbiology",
    "Immunology",
    "Molecular Biology",
    "Genetic Testing",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services d'analyses médicales",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Biochimie Clinique",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalTest",
              name: "Bilan lipidique",
              description: "Analyse du cholestérol et triglycérides",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalTest",
              name: "Glycémie",
              description: "Dosage du glucose sanguin",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Hématologie",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalTest",
              name: "NFS (Numération Formule Sanguine)",
              description: "Analyse complète des cellules sanguines",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Empreintes Génétiques",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalTest",
              name: "Test de Paternité",
              description: "Test ADN d'exclusion de paternité conforme à la législation",
            },
          },
        ],
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61584110146922",
    "https://www.instagram.com/labyciteverte/",
    "https://www.tiktok.com/@laby.cite.vert",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://laboyaounde.com/#website",
  url: "https://laboyaounde.com",
  name: "Lab Yaoundé",
  description: "Laboratoire d'analyses médicales de référence au Cameroun",
  publisher: {
    "@id": "https://laboyaounde.com/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://laboyaounde.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: ["fr-CM", "en-CM"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://laboyaounde.com",
    },
  ],
};

export default function LocalBusinessSchema() {
  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
