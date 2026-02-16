import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Immunologie | Analyses Immunitaires Lab Yaoundé",
  description:
    "Analyses immunologiques à Yaoundé : sérologies, tests d'immunité, allergies, auto-immunité. Diagnostic précis des pathologies immunitaires. Lab Yaoundé Cameroun.",
  keywords: [
    "immunologie Yaoundé",
    "sérologie Cameroun",
    "test immunité",
    "allergies",
    "auto-immunité",
    "laboratoire immunologie",
  ],
  openGraph: {
    title: "Immunologie | Lab Yaoundé",
    description:
      "Analyses immunologiques : sérologies, tests d'immunité, allergies. Diagnostic précis.",
    url: "https://laboyaounde.com/immunologie",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://laboyaounde.com/immunologie",
  },
};

export default function ImmunologieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
