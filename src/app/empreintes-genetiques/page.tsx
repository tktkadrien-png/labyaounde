"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Dna, Shield, Clock, ChevronRight, FileCheck, Scale, Calendar } from "lucide-react";

export default function EmpreintesGenetiqu esPage() {
  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/trnava-university-_9xRHrMOjeg-unsplash.jpg"
              alt="Empreintes Génétiques"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA]/95 via-[#9333EA]/85 to-[#9333EA]/70"></div>
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
                <span className="text-white text-sm sm:text-base">Empreintes Génétiques</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Empreintes Génétiques
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                Tests de paternité conformes à la législation en vigueur
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Cadre légal respecté</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Résultats sous 15 jours</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#9333EA]/10 px-4 py-2 rounded-full mb-6">
                  <Dna className="w-5 h-5 text-[#9333EA]" />
                  <span className="text-[#9333EA] font-semibold text-sm sm:text-base">Analyse ADN</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Test d'Exclusion de Paternité
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                  <p className="text-base sm:text-lg leading-relaxed">
                    La recherche des <strong>empreintes génétiques</strong>, notamment dans le cadre du <strong>test d'exclusion de paternité</strong>, est effectuée au LABY avec la collaboration de nos confrères du Royaume-Uni dans les <strong>conditions fixées par la loi</strong>.
                  </p>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#9333EA]">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Qu'est-ce qu'un Test de Paternité ?</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                      Le test de paternité est une analyse génétique qui compare l'ADN d'un enfant avec celui du père présumé pour établir ou exclure le lien de filiation biologique.
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Ce test repose sur l'analyse de marqueurs génétiques (profil génétique) qui sont transmis de parents à enfants selon les lois de l'hérédité.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/louis-reed-pwcKF7L4-no-unsplash.jpg"
                    alt="Analyse ADN"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/national-cancer-institute-uVnRa6mOLOM-unsplash.jpg"
                    alt="Empreintes génétiques"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Processus */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Comment Se Déroule le Test ?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Un processus rigoureux conforme aux exigences légales
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  step: "1",
                  title: "Prise de Rendez-vous",
                  description: "Tous les tests sont prélevés sur rendez-vous uniquement",
                  icon: Calendar,
                },
                {
                  step: "2",
                  title: "Prélèvement",
                  description: "Prélèvement salivaire (frottis buccal) simple et indolore pour toutes les personnes concernées",
                  icon: FileCheck,
                },
                {
                  step: "3",
                  title: "Analyse ADN",
                  description: "Analyse des profils génétiques en collaboration avec nos partenaires britanniques",
                  icon: Dna,
                },
                {
                  step: "4",
                  title: "Résultats",
                  description: "Résultats disponibles dans un délai maximum de 15 jours",
                  icon: Clock,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#9333EA]/20 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#9333EA] to-[#7E22CE] rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-[#9333EA] font-bold text-3xl mb-2">Étape {item.step}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cadre Légal */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/julia-koblitz-RlOAwXt2fEA-unsplash (1).jpg"
                    alt="Cadre légal"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-[#9333EA]/10 px-4 py-2 rounded-full mb-6">
                  <Scale className="w-5 h-5 text-[#9333EA]" />
                  <span className="text-[#9333EA] font-semibold text-sm sm:text-base">Conformité Légale</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Conditions Fixées par la Loi
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                  <p className="text-base sm:text-lg leading-relaxed">
                    Les tests de paternité sont encadrés par la législation pour protéger les droits de toutes les parties impliquées.
                  </p>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#9333EA]">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Respect du Cadre Légal</h3>
                    <ul className="space-y-3 text-base sm:text-lg">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#9333EA] mt-2 flex-shrink-0"></div>
                        <span>Consentement écrit de toutes les parties</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#9333EA] mt-2 flex-shrink-0"></div>
                        <span>Vérification de l'identité des personnes testées</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#9333EA] mt-2 flex-shrink-0"></div>
                        <span>Chaîne de traçabilité sécurisée</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#9333EA] mt-2 flex-shrink-0"></div>
                        <span>Confidentialité absolue des résultats</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-[#9333EA]/5 to-white p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Partenariat International</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Notre collaboration avec des laboratoires accrédités au Royaume-Uni garantit la fiabilité et la reconnaissance internationale de nos résultats, conformément aux standards les plus élevés.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fiabilité */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#9333EA] to-[#7E22CE] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold text-sm sm:text-base">Haute Précision</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                  Fiabilité et Précision
                </h2>

                <div className="space-y-6 text-base sm:text-lg text-white/90 leading-relaxed">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">Taux de Fiabilité</h3>
                    <p className="mb-4">
                      Nos tests d'empreintes génétiques offrent une <strong>fiabilité supérieure à 99,9%</strong> pour l'établissement ou l'exclusion de la paternité.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                        <span>Analyse de 16 à 24 marqueurs génétiques</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                        <span>Protocoles validés internationalement</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                        <span>Double vérification des résultats</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">Délai de Rendu</h3>
                    <p className="mb-2">
                      Tous les résultats sont disponibles dans un <strong>délai maximum de 15 jours</strong> après le prélèvement.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">Confidentialité</h3>
                    <p>
                      Toutes les informations et résultats sont traités avec la <strong>plus stricte confidentialité</strong> et ne sont communiqués qu'aux personnes autorisées.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/lucas-vasques-9vnACvX2748-unsplash.jpg"
                  alt="Laboratoire de génétique"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Besoin d'un Test d'Empreintes Génétiques ?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Prenez rendez-vous pour un test de paternité conforme aux exigences légales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#9333EA] to-[#7E22CE] text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Prendre Rendez-vous
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#9333EA] px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-[#9333EA] hover:bg-[#9333EA] hover:text-white transition-all"
              >
                Nous Contacter
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
