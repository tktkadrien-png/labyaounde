import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biologie Moléculaire | PCR et Diagnostics Avancés Lab Yaoundé",
  description:
    "Analyses de biologie moléculaire à Yaoundé : PCR, détection d'agents infectieux, diagnostics génétiques. Technologies de pointe. Lab Yaoundé, laboratoire de référence.",
  keywords: [
    "biologie moléculaire Yaoundé",
    "PCR Cameroun",
    "diagnostic moléculaire",
    "test génétique",
    "laboratoire PCR",
  ],
  openGraph: {
    title: "Biologie Moléculaire | Lab Yaoundé",
    description:
      "Analyses de biologie moléculaire : PCR, diagnostics génétiques. Technologies de pointe.",
    url: "https://laboyaounde.com/biologie-moleculaire",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://laboyaounde.com/biologie-moleculaire",
  },
};

export default function BiologieMoleculaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
