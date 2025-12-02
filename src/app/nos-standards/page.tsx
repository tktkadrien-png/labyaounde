"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Award, ChevronRight, Shield, BookOpen, Globe, Check } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function NosStandardsPage() {
  const { language } = useLanguage();

  const standards = [
    {
      name: "HCPC",
      fullName: "The Health and Care Professions Council",
      fullNameFr: "Health and Care Professions Council",
      description: "UK regulatory body responsible for accreditation and evaluation of healthcare professionals",
      descriptionFr: "Organisme régulateur des professions de santé au Royaume-Uni chargé de l'accréditation et de l'évaluation des professionnels de santé"
    },
    {
      name: "IBMS",
      fullName: "The Institute of Biomedical Science",
      fullNameFr: "Institute of Biomedical Science",
      description: "Professional body for biomedical scientists",
      descriptionFr: "Organisme professionnel pour les scientifiques biomédicaux"
    },
    {
      name: "CLSI",
      fullName: "The Clinical and Laboratory Standards Institute",
      fullNameFr: "Clinical and Laboratory Standards Institute",
      description: "International standards for clinical laboratories",
      descriptionFr: "Normes internationales pour les laboratoires cliniques"
    },
    {
      name: "ISO 15189",
      fullName: "ISO 15189",
      fullNameFr: "ISO 15189",
      description: "International standard for medical laboratories",
      descriptionFr: "Norme internationale pour les laboratoires médicaux"
    },
    {
      name: "GBEA",
      fullName: "Guide de Bonne Exécution des Analyses",
      fullNameFr: "Guide de Bonne Exécution des Analyses",
      description: "Good Laboratory Practice guide",
      descriptionFr: "Guide de Bonne Exécution des Analyses"
    },
    {
      name: "OMS/WHO",
      fullName: "World Health Organization",
      fullNameFr: "Organisation Mondiale de la Santé",
      description: "International health standards and guidelines",
      descriptionFr: "Normes et directives internationales en matière de santé"
    }
  ];

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/standards-hero.png"
              alt={language === 'fr' ? 'Nos Standards' : 'Our Standards'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D5F]/95 via-[#0B3D5F]/85 to-[#0B3D5F]/70"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                  {language === 'fr' ? 'Accueil' : 'Home'}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <Link href="/#about" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                  {language === 'fr' ? 'À Propos' : 'About'}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <span className="text-white text-sm sm:text-base">{language === 'fr' ? 'Nos Standards' : 'Our Standards'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {language === 'fr' ? 'Nos Standards' : 'Our Standards'}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                {language === 'fr'
                  ? "Conformité aux normes internationales les plus exigeantes"
                  : 'Compliance with the most demanding international standards'
                }
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Globe className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">
                    {language === 'fr' ? 'Standards Internationaux' : 'International Standards'}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Award className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">
                    {language === 'fr' ? 'Qualité Certifiée' : 'Certified Quality'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/standards-hero.png"
                alt={language === 'fr' ? 'Nos Standards - Laboratoire' : 'Our Standards - Laboratory'}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-2xl text-white">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                      {language === 'fr' ? 'Nos Standards de Référence' : 'Our Reference Standards'}
                    </h2>
                    <p className="text-white/90 text-lg leading-relaxed">
                      {language === 'fr'
                        ? "Nos standards sont ceux recommandés par The Health and Care Professions Council (HCPC), organisme régulateur des professions de santé au Royaume-Uni chargé de l'accréditation et de l'évaluation des professionnels de santé, qui sont aussi ceux préconisés par The Institute of Biomedical Science (IBMS), The Clinical and Laboratory Standards Institute (CLSI), la norme ISO 15189, le Guide de Bonne Exécution des Analyses (GBEA) et l'Organisation Mondiale de la Santé (OMS)."
                        : 'Our standards are those recommended by The Health and Care Professions Council (HCPC), the UK regulatory body for health professions responsible for accreditation and evaluation of healthcare professionals, which are also those advocated by The Institute of Biomedical Science (IBMS), The Clinical and Laboratory Standards Institute (CLSI), ISO 15189 standard, the Good Laboratory Practice Guide (GBEA) and the World Health Organization (WHO).'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Standards Grid */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {language === 'fr' ? 'Standards Internationaux' : 'International Standards'}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'fr'
                  ? 'Nous adhérons aux normes les plus rigoureuses de la profession'
                  : 'We adhere to the most rigorous standards of the profession'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {standards.map((standard, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-xl flex items-center justify-center flex-shrink-0">
                      {index === 3 ? (
                        <Shield className="w-7 h-7 text-white" />
                      ) : index === 5 ? (
                        <Globe className="w-7 h-7 text-white" />
                      ) : (
                        <Award className="w-7 h-7 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{standard.name}</h3>
                      <p className="text-sm font-semibold text-[#0B3D5F] mb-3">
                        {language === 'fr' ? standard.fullNameFr : standard.fullName}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {language === 'fr' ? standard.descriptionFr : standard.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-semibold">
                        {language === 'fr' ? 'Certifié' : 'Certified'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-10 shadow-xl border border-gray-100">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl mb-6">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  {language === 'fr' ? 'Notre Engagement Qualité' : 'Our Quality Commitment'}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {language === 'fr'
                    ? "En adoptant ces standards internationaux, nous garantissons à nos patients et partenaires une qualité de service irréprochable, des résultats fiables et une conformité totale aux meilleures pratiques mondiales en matière d'analyses médicales."
                    : 'By adopting these international standards, we guarantee our patients and partners impeccable service quality, reliable results and total compliance with global best practices in medical analysis.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {language === 'fr'
                ? 'Excellence et Conformité'
                : 'Excellence and Compliance'
              }
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {language === 'fr'
                ? "Découvrez comment nos standards garantissent la qualité de nos services"
                : 'Discover how our standards guarantee the quality of our services'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-[#0B3D5F] text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#0B4D6F] transition-all hover:scale-105 shadow-lg"
              >
                {language === 'fr' ? 'Créer un Compte' : 'Create an Account'}
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/notre-vision"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-[#0B3D5F] px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-[#0B3D5F] hover:bg-[#0B3D5F] hover:text-white transition-all"
              >
                {language === 'fr' ? 'Notre Vision' : 'Our Vision'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
