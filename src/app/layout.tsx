import type { Metadata } from "next";
import "./global.css";
import { LanguageProvider } from "@/lib/contents/LanguageContext";
import GlobalLoadingProvider from "@/components/GlobalLoadingProvider";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

export const metadata: Metadata = {
  metadataBase: new URL("https://laboyaounde.com"),
  title: {
    default: "Lab Yaoundé | Laboratoire d'Analyses Médicales à Yaoundé, Cameroun",
    template: "%s | Lab Yaoundé - Analyses Médicales",
  },
  description:
    "Lab Yaoundé : votre laboratoire d'analyses médicales de référence au Cameroun. Biochimie, hématologie, microbiologie, tests ADN, bilans de santé. Résultats rapides et fiables. Plus de 10 ans d'expertise médicale.",
  keywords: [
    "laboratoire analyses médicales Yaoundé",
    "analyses de sang Cameroun",
    "test ADN Yaoundé",
    "bilan de santé Cameroun",
    "laboratoire médical Yaoundé",
    "biochimie clinique",
    "hématologie",
    "microbiologie",
    "empreintes génétiques",
    "Lab Yaoundé",
    "analyses biologiques Cameroun",
  ],
  authors: [{ name: "Lab Yaoundé" }],
  creator: "Lab Yaoundé",
  publisher: "Lab Yaoundé",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_CM",
    alternateLocale: "en_CM",
    url: "https://laboyaounde.com",
    siteName: "Lab Yaoundé",
    title: "Lab Yaoundé | Laboratoire d'Analyses Médicales à Yaoundé",
    description:
      "Votre laboratoire d'analyses médicales de confiance au Cameroun. Tests sanguins, ADN, bilans de santé avec des résultats rapides et fiables.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lab Yaoundé - Laboratoire d'Analyses Médicales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lab Yaoundé | Laboratoire d'Analyses Médicales",
    description:
      "Votre laboratoire d'analyses médicales de confiance au Cameroun. Résultats rapides et fiables.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  alternates: {
    canonical: "https://laboyaounde.com",
    languages: {
      "fr-CM": "https://laboyaounde.com",
      "en-CM": "https://laboyaounde.com/en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <LocalBusinessSchema />
        <LanguageProvider>
          <GlobalLoadingProvider>
            {children}
          </GlobalLoadingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}