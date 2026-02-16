import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hématologie | Analyse de Sang Complète Lab Yaoundé",
  description:
    "Analyses hématologiques à Yaoundé : NFS, numération globulaire, groupe sanguin, hémostase, coagulation. Expertise reconnue depuis plus de 10 ans. Lab Yaoundé.",
  keywords: [
    "hématologie Yaoundé",
    "NFS Cameroun",
    "numération formule sanguine",
    "groupe sanguin",
    "analyse hématologique",
    "laboratoire hématologie",
  ],
  openGraph: {
    title: "Hématologie | Lab Yaoundé",
    description:
      "Analyses hématologiques complètes : NFS, groupe sanguin, hémostase. Expertise depuis 10+ ans.",
    url: "https://laboyaounde.com/hematologie",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://laboyaounde.com/hematologie",
  },
};

export default function HematologieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
