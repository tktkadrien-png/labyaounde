"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Shield, FileText, ChevronRight, CheckCircle, Users, Award, Target, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function PolitiqueDeQualitePage() {
  const { language } = useLanguage();

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/pexels-polina-tankilevitch-3735709.jpg"
              alt="Politique de Qualité"
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
                <Link href="/#services" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                  {language === 'fr' ? 'Assurance Qualité' : 'Quality Assurance'}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <span className="text-white text-sm sm:text-base">{language === 'fr' ? 'Politique de Qualité' : 'Quality Policy'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {language === 'fr' ? 'Politique de Qualité' : 'Quality Policy'}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                {language === 'fr'
                  ? "Notre engagement stratégique pour l'excellence et la qualité de service"
                  : 'Our strategic commitment to excellence and quality of service'
                }
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">ISO 15189</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Award className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">{language === 'fr' ? 'Excellence certifiée' : 'Certified Excellence'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scope Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0B3D5F]/10 px-4 py-2 rounded-full mb-6">
                <Target className="w-5 h-5 text-[#0B3D5F]" />
                <span className="text-[#0B3D5F] font-semibold text-sm sm:text-base">{language === 'fr' ? 'Portée' : 'Scope'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {language === 'fr' ? "Champ d'Application" : 'Scope of Application'}
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  {language === 'fr'
                    ? "Cette politique de qualité s'applique à toutes les activités réalisées par le laboratoire, y compris les phases pré-analytiques, analytiques et post-analytiques des analyses."
                    : 'This quality policy applies to all activities carried out by the laboratory, including pre-analytical, analytical, and post-analytical phases of testing.'
                  }
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl p-8 text-white shadow-xl text-center">
                <BookOpen className="w-12 h-12 mb-4 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{language === 'fr' ? 'Pré-analytique' : 'Pre-analytical'}</h3>
                <p className="text-white/90 leading-relaxed">
                  {language === 'fr'
                    ? 'Prélèvement, identification, transport et réception des échantillons'
                    : 'Sample collection, identification, transport and reception'
                  }
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl p-8 text-white shadow-xl text-center">
                <Shield className="w-12 h-12 mb-4 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{language === 'fr' ? 'Analytique' : 'Analytical'}</h3>
                <p className="text-white/90 leading-relaxed">
                  {language === 'fr'
                    ? 'Réalisation des analyses avec contrôle qualité rigoureux'
                    : 'Performing analyses with rigorous quality control'
                  }
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl p-8 text-white shadow-xl text-center">
                <FileText className="w-12 h-12 mb-4 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{language === 'fr' ? 'Post-analytique' : 'Post-analytical'}</h3>
                <p className="text-white/90 leading-relaxed">
                  {language === 'fr'
                    ? 'Validation, transmission et archivage des résultats'
                    : 'Validation, transmission and archiving of results'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Responsibilities Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0B3D5F]/10 px-4 py-2 rounded-full mb-6">
                <Users className="w-5 h-5 text-[#0B3D5F]" />
                <span className="text-[#0B3D5F] font-semibold text-sm sm:text-base">{language === 'fr' ? 'Responsabilités' : 'Responsibilities'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {language === 'fr' ? 'Responsabilités' : 'Responsibilities'}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'fr'
                  ? "Une organisation claire pour garantir l'excellence à tous les niveaux"
                  : 'Clear organization to ensure excellence at all levels'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      {language === 'fr' ? 'Directeur du Laboratoire' : 'Laboratory Director'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {language === 'fr'
                        ? "Le Directeur du Laboratoire est responsable de s'assurer que cette politique de qualité est mise en œuvre et maintenue."
                        : 'The Laboratory Director is responsible for ensuring that this quality policy is implemented and maintained.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      {language === 'fr' ? 'Tout le Personnel' : 'All Personnel'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {language === 'fr'
                        ? 'Tout le personnel du laboratoire est responsable de comprendre et de respecter cette politique de qualité.'
                        : 'All laboratory personnel are responsible for understanding and adhering to this quality policy.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commitments Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {language === 'fr' ? 'Nos Engagements Qualité' : 'Our Quality Commitments'}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'fr'
                  ? 'Le laboratoire est engagé dans les engagements qualité suivants'
                  : 'The laboratory is committed to the following quality commitments'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  title: "Accurate and Reliable Results",
                  titleFr: "Résultats Précis et Fiables",
                  description: "We ensure that all test results are accurate, reliable, and delivered in a timely manner.",
                  descriptionFr: "Nous garantissons que tous les résultats d'analyses sont précis, fiables et délivrés dans les délais.",
                },
                {
                  title: "Customer Satisfaction",
                  titleFr: "Satisfaction Client",
                  description: "We strive to meet and exceed the expectations of our customers through excellent service.",
                  descriptionFr: "Nous nous efforçons de répondre et de dépasser les attentes de nos clients grâce à un service excellent.",
                },
                {
                  title: "Competent Personnel",
                  titleFr: "Personnel Compétent",
                  description: "We employ qualified and competent personnel who are trained and continuously developed.",
                  descriptionFr: "Nous employons un personnel qualifié et compétent qui est formé et développé en continu.",
                },
                {
                  title: "Quality Management System",
                  titleFr: "Système de Management de la Qualité",
                  description: "We maintain a robust quality management system that complies with ISO 15189 standards.",
                  descriptionFr: "Nous maintenons un système de management de la qualité robuste conforme aux normes ISO 15189.",
                },
                {
                  title: "Continuous Improvement",
                  titleFr: "Amélioration Continue",
                  description: "We are committed to continually improving the effectiveness of our quality management system.",
                  descriptionFr: "Nous nous engageons à améliorer continuellement l'efficacité de notre système de management de la qualité.",
                },
                {
                  title: "Confidentiality",
                  titleFr: "Confidentialité",
                  description: "We protect the confidentiality of patient information and ensure data security.",
                  descriptionFr: "Nous protégeons la confidentialité des informations patients et assurons la sécurité des données.",
                },
              ].map((commitment, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#0B3D5F]/20 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                        {language === 'fr' ? commitment.titleFr : commitment.title}
                      </h3>
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {language === 'fr' ? commitment.descriptionFr : commitment.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standards and Compliance */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0B3D5F]/10 px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5 text-[#0B3D5F]" />
                <span className="text-[#0B3D5F] font-semibold text-sm sm:text-base">
                  {language === 'fr' ? 'Normes & Conformité' : 'Standards & Compliance'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {language === 'fr' ? 'Normes et Conformité' : 'Standards and Compliance'}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'fr'
                  ? 'Respect des standards internationaux les plus exigeants'
                  : 'Compliance with the most demanding international standards'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Shield,
                  title: "ISO 15189",
                  description: "Medical laboratories - Requirements for quality and competence",
                  descriptionFr: "Laboratoires de biologie médicale - Exigences concernant la qualité et la compétence",
                },
                {
                  icon: Award,
                  title: "Good Laboratory Practice",
                  description: "Adherence to international GLP standards and guidelines",
                  descriptionFr: "Respect des normes et directives internationales BPL",
                },
                {
                  icon: FileText,
                  title: "Regulatory Compliance",
                  description: "Full compliance with national and international regulations",
                  descriptionFr: "Conformité totale aux réglementations nationales et internationales",
                },
              ].map((standard, index) => {
                const Icon = standard.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{standard.title}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {language === 'fr' ? standard.descriptionFr : standard.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Policy Review */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-2xl text-white">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                      {language === 'fr' ? 'Révision de la Politique' : 'Policy Review'}
                    </h2>
                    <p className="text-white/90 text-lg leading-relaxed">
                      {language === 'fr'
                        ? "Cette politique de qualité sera révisée annuellement ou au besoin pour s'assurer qu'elle demeure pertinente et efficace."
                        : 'This quality policy will be reviewed annually or as needed to ensure it remains relevant and effective.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {language === 'fr'
                ? 'Excellence et Qualité au Cœur de Notre Mission'
                : 'Excellence and Quality at the Heart of Our Mission'
              }
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {language === 'fr'
                ? "Notre politique de qualité guide toutes nos actions pour vous garantir un service d'excellence conforme aux standards internationaux les plus exigeants."
                : 'Our quality policy guides all our actions to guarantee you an excellent service compliant with the most demanding international standards.'
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
                href="/charte-de-qualite"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-[#0B3D5F] px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-[#0B3D5F] hover:bg-[#0B3D5F] hover:text-white transition-all"
              >
                {language === 'fr' ? 'Notre Charte de Qualité' : 'Our Quality Charter'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
