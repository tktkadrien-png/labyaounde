import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://laboyaounde.com";
  const currentDate = new Date().toISOString();

  // Pages principales avec haute priorité
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mes-resultats`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // Services médicaux
  const services = [
    "biochimie-clinique",
    "hematologie",
    "immunologie",
    "microbiologie",
    "biologie-moleculaire",
    "empreintes-genetiques",
  ].map((service) => ({
    url: `${baseUrl}/${service}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Pages informatives
  const infoPages = [
    "questions-frequentes",
    "conseils-et-informations",
    "interpretation-resultats",
    "dois-je-prendre-rdv",
    "charte-de-qualite",
    "politique-de-qualite",
    "controle-qualite",
    "notre-vision",
    "nos-standards",
  ].map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Pages carrières
  const careerPages = [
    {
      url: `${baseUrl}/carrieres`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/carrieres/offres-emploi-stages`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/carrieres/actualites`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
  ];

  // Pages secondaires
  const secondaryPages = [
    "laisser-un-avis",
    "reclamations-et-plaintes",
    "aide",
    "assistance",
  ].map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...mainPages, ...services, ...infoPages, ...careerPages, ...secondaryPages];
}
