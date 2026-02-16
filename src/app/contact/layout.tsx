import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactez-nous | Lab Yaoundé - Laboratoire d'Analyses Médicales",
  description:
    "Contactez Lab Yaoundé : Cité Verte, Yaoundé. Horaires : Lun-Sam 7h30-18h, Dim 8h-13h. Email: contact@labyaounde.org. Analyses médicales de qualité.",
  keywords: [
    "contact laboratoire Yaoundé",
    "adresse Lab Yaoundé",
    "horaires laboratoire médical",
    "laboratoire Cité Verte",
  ],
  openGraph: {
    title: "Contactez Lab Yaoundé | Laboratoire d'Analyses Médicales",
    description:
      "Trouvez nos coordonnées, horaires d'ouverture et localisation. Cité Verte, Yaoundé.",
    url: "https://laboyaounde.com/contact",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://laboyaounde.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
