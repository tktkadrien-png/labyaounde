import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions Fréquentes (FAQ) | Lab Yaoundé",
  description:
    "Trouvez les réponses à vos questions sur les analyses médicales : préparation aux examens, délais des résultats, prélèvements, tarifs. FAQ Lab Yaoundé.",
  keywords: [
    "FAQ laboratoire Yaoundé",
    "questions analyses médicales",
    "préparation prise de sang",
    "délai résultats laboratoire",
    "prélèvement sanguin",
  ],
  openGraph: {
    title: "FAQ | Questions Fréquentes Lab Yaoundé",
    description:
      "Réponses à vos questions sur les analyses médicales, préparation, délais et prélèvements.",
    url: "https://laboyaounde.com/questions-frequentes",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://laboyaounde.com/questions-frequentes",
  },
};

export default function QuestionFrequentesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
