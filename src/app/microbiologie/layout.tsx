import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Microbiologie | Analyses Bactériologiques Lab Yaoundé",
  description:
    "Analyses microbiologiques à Yaoundé : cultures bactériennes, antibiogrammes, ECBU, prélèvements. Identification précise des germes pathogènes. Lab Yaoundé.",
  keywords: [
    "microbiologie Yaoundé",
    "analyse bactériologique Cameroun",
    "ECBU",
    "antibiogramme",
    "culture bactérienne",
    "laboratoire microbiologie",
  ],
  openGraph: {
    title: "Microbiologie | Lab Yaoundé",
    description:
      "Analyses microbiologiques : cultures, antibiogrammes, ECBU. Identification précise des germes.",
    url: "https://laboyaounde.com/microbiologie",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://laboyaounde.com/microbiologie",
  },
};

export default function MicrobiologieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
