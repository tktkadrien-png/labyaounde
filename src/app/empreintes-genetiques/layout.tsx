import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test ADN & Empreintes Génétiques | Test de Paternité Cameroun",
  description:
    "Test de paternité et empreintes génétiques à Yaoundé. Analyse ADN fiable à 99,9%, résultats sous 15 jours. Cadre légal respecté. Partenariat laboratoires britanniques.",
  keywords: [
    "test de paternité Cameroun",
    "test ADN Yaoundé",
    "empreintes génétiques",
    "analyse ADN",
    "test de filiation",
    "laboratoire génétique Cameroun",
  ],
  openGraph: {
    title: "Test ADN & Empreintes Génétiques | Lab Yaoundé",
    description:
      "Test de paternité fiable à 99,9% conforme à la législation. Résultats sous 15 jours.",
    url: "https://laboyaounde.com/empreintes-genetiques",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://laboyaounde.com/empreintes-genetiques",
  },
};

export default function EmpreintesGenetiquesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
