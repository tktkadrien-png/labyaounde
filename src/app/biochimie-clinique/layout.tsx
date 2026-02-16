import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biochimie Clinique | Analyses Sanguines Lab Yaoundé",
  description:
    "Analyses de biochimie clinique à Yaoundé : glycémie, cholestérol, bilan hépatique, bilan rénal, enzymes. Résultats fiables et rapides. Lab Yaoundé, votre laboratoire de confiance.",
  keywords: [
    "biochimie clinique Yaoundé",
    "analyse de sang Cameroun",
    "glycémie",
    "cholestérol",
    "bilan hépatique",
    "bilan rénal",
    "laboratoire analyses",
  ],
  openGraph: {
    title: "Biochimie Clinique | Lab Yaoundé",
    description:
      "Analyses de biochimie clinique : glycémie, cholestérol, bilan hépatique et rénal. Résultats fiables.",
    url: "https://laboyaounde.com/biochimie-clinique",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://laboyaounde.com/biochimie-clinique",
  },
};

export default function BiochimieCliniqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
