import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes Résultats | Accéder à Vos Analyses Lab Yaoundé",
  description:
    "Consultez vos résultats d'analyses médicales en ligne. Accès sécurisé à votre espace patient Lab Yaoundé. Résultats rapides et confidentiels.",
  keywords: [
    "résultats analyses en ligne",
    "espace patient laboratoire",
    "résultats médicaux Yaoundé",
    "consultation résultats laboratoire",
  ],
  openGraph: {
    title: "Mes Résultats | Lab Yaoundé",
    description:
      "Accédez à vos résultats d'analyses médicales en ligne. Espace patient sécurisé.",
    url: "https://laboyaounde.com/mes-resultats",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://laboyaounde.com/mes-resultats",
  },
};

export default function MesResultatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
