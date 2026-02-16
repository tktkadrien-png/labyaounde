import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrières | Offres d'Emploi Lab Yaoundé",
  description:
    "Rejoignez l'équipe Lab Yaoundé ! Découvrez nos offres d'emploi et de stages en laboratoire d'analyses médicales. Carrières en biologie, technique de laboratoire.",
  keywords: [
    "emploi laboratoire Yaoundé",
    "carrières analyses médicales",
    "stage laboratoire Cameroun",
    "recrutement Lab Yaoundé",
    "technicien laboratoire emploi",
  ],
  openGraph: {
    title: "Carrières | Rejoignez Lab Yaoundé",
    description:
      "Offres d'emploi et stages en laboratoire d'analyses médicales. Construisez votre carrière avec nous.",
    url: "https://laboyaounde.com/carrieres",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://laboyaounde.com/carrieres",
  },
};

export default function CarrieresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
