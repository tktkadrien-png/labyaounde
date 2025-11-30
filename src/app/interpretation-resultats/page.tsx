"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { BookOpen, Globe, Shield, ChevronRight, Users, Award, Sparkles, ExternalLink } from "lucide-react";

export default function InterpretationResultatsPage() {
  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/pexels-rethaferguson-3825578.jpg"
              alt="Interprétation des Résultats"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0891B2]/95 via-[#0891B2]/85 to-[#0891B2]/70"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                  Accueil
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <Link href="/#services" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                  Services
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <span className="text-white text-sm sm:text-base">Interprétation des Résultats</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Interprétation des Résultats
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                Comprendre vos analyses biologiques avec l'aide de nos experts et des ressources internationales
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Users className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Biologiste disponible 24/7</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Globe className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Ressources internationales</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service du Biologiste */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#0891B2]/10 px-4 py-2 rounded-full mb-6">
                  <Users className="w-5 h-5 text-[#0891B2]" />
                  <span className="text-[#0891B2] font-semibold text-sm sm:text-base">Expertise Professionnelle</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Le Biologiste du LABY à Votre Service
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                  <p className="text-base sm:text-lg leading-relaxed">
                    Le Biologiste du LABY est <strong>disposé à répondre à toutes vos questions</strong> relatives à l'interprétation de tous vos résultats d'analyses biologiques.
                  </p>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#0891B2]">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Services d'Interprétation</h3>
                    <ul className="space-y-3 text-base sm:text-lg">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#0891B2] mt-2 flex-shrink-0"></div>
                        <span>Explication détaillée de vos résultats</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#0891B2] mt-2 flex-shrink-0"></div>
                        <span>Mise en perspective avec votre situation clinique</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#0891B2] mt-2 flex-shrink-0"></div>
                        <span>Réponses à vos questions techniques</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#0891B2] mt-2 flex-shrink-0"></div>
                        <span>Conseils sur les analyses complémentaires</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#0891B2] mt-2 flex-shrink-0"></div>
                        <span>Disponibilité 24h/24 et 7j/7</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/pexels-chokniti-khongchum-1197604-2280571.jpg"
                    alt="Biologiste expert"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mt-8">
                  <Image
                    src="/pexels-artempodrez-5726837.jpg"
                    alt="Consultation résultats"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lab Tests Online */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0891B2]/10 px-4 py-2 rounded-full mb-6">
                <Globe className="w-5 h-5 text-[#0891B2]" />
                <span className="text-[#0891B2] font-semibold text-sm sm:text-base">Ressource Internationale</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Lab Tests Online
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Pour une compréhension plus approfondie de vos analyses
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/pexels-karola-g-8539753.jpg"
                    alt="Lab Tests Online"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="text-base sm:text-lg leading-relaxed">
                    Pour une compréhension plus approfondie de vos analyses de <strong>Biochimie clinique, Hormonologie, Marqueurs tumoraux et sérodiagnostics</strong>, nous vous prions de bien vouloir visiter le site web de <strong>Lab Tests Online</strong>.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0891B2] to-[#0E7490] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Fondation et Mission</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Site fondé en 2002 par <strong>The American Association for Clinical Chemistry (AACC)</strong> dans le but d'aider les patients et les professionnels de la santé à mieux comprendre leurs différents tests d'analyses biologiques.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0891B2] to-[#0E7490] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Portée Internationale</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">
                        Lab Tests Online est actuellement <strong>traduit en 14 langues</strong> et utilisé comme outil d'interprétation des résultats biologiques par <strong>17 pays dans le monde</strong>.
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Le <strong>Cameroun sera le 18ème</strong> par notre biais.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Versions Internationales */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Versions Internationales
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Accédez aux ressources dans votre langue
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Version UK */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0891B2] to-[#0E7490] rounded-xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Royaume-Uni</h3>
                    <p className="text-gray-600 text-sm">Version anglaise</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 text-base leading-relaxed">
                    Au Royaume-Uni, le concept fut introduit en 2004 par <strong>The Association for Clinical Biochemistry and Laboratory Medicine (ACB)</strong>.
                  </p>

                  <div className="bg-white p-4 rounded-xl border-l-4 border-[#0891B2]">
                    <p className="text-gray-600 text-sm mb-2">Soutenu par :</p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0891B2] mt-1.5 flex-shrink-0"></div>
                        <span>The Institute of Biomedical Science (IBMS)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0891B2] mt-1.5 flex-shrink-0"></div>
                        <span>The Royal College of Pathologists (RCPath)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <a
                  href="https://www.labtestsonline.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#0891B2] to-[#0E7490] text-white px-6 py-4 rounded-xl font-semibold text-base hover:shadow-xl transition-all hover:scale-105"
                >
                  <Globe className="w-5 h-5" />
                  www.labtestsonline.org.uk
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Version France */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0891B2] to-[#0E7490] rounded-xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">France</h3>
                    <p className="text-gray-600 text-sm">Version française</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 text-base leading-relaxed">
                    En France, Lab Tests Online a été développé par la <strong>Société Française de Biologie Clinique (SFBC)</strong>.
                  </p>

                  <div className="bg-white p-4 rounded-xl border-l-4 border-[#0891B2]">
                    <p className="text-gray-600 text-sm mb-2">Soutenu par :</p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0891B2] mt-1.5 flex-shrink-0"></div>
                        <span>Syndicat de l'Industrie du Diagnostic In Vitro (SIDIV)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0891B2] mt-1.5 flex-shrink-0"></div>
                        <span>The European Diagnostic Manufacturers Association (EDMA)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <a
                  href="https://www.labtestsonline.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#0891B2] to-[#0E7490] text-white px-6 py-4 rounded-xl font-semibold text-base hover:shadow-xl transition-all hover:scale-105"
                >
                  <Globe className="w-5 h-5" />
                  www.labtestsonline.fr
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Domaines Couverts */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Domaines Couverts par Lab Tests Online
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Informations détaillées sur vos analyses
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Biochimie Clinique",
                  description: "Glucose, créatinine, bilirubine, enzymes hépatiques, lipides",
                  icon: BookOpen,
                },
                {
                  title: "Hormonologie",
                  description: "Hormones thyroïdiennes, sexuelles, corticosurrénales",
                  icon: Sparkles,
                },
                {
                  title: "Marqueurs Tumoraux",
                  description: "PSA, CA 125, CA 15-3, CA 19-9, AFP, ACE",
                  icon: Shield,
                },
                {
                  title: "Sérodiagnostics",
                  description: "Sérologies virales, bactériennes, parasitaires",
                  icon: Globe,
                },
              ].map((domain, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#0891B2]/20 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0891B2] to-[#0E7490] rounded-xl flex items-center justify-center mb-4">
                    <domain.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{domain.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{domain.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#0891B2] to-[#0E7490] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Besoin d'Aide pour Comprendre Vos Résultats ?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Notre biologiste est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0891B2] px-8 py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/90 transition-all hover:scale-105"
              >
                Contacter le Biologiste
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="https://www.labtestsonline.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-white hover:bg-white hover:text-[#0891B2] transition-all"
              >
                Visiter Lab Tests Online
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
