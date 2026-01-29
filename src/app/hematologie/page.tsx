"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Droplet, Activity, Clock, Shield, ChevronRight, FlaskConical, Heart } from "lucide-react";

export default function HematologiePage() {
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
              alt="Laboratoire d'Hématologie"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#DC2626]/95 via-[#DC2626]/85 to-[#DC2626]/70"></div>
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
                <span className="text-white text-sm sm:text-base">Hématologie</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Hématologie de Routine & Spécialisée
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                Analyses hématologiques complètes avec technologies automatisées de pointe
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Activity className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">80+ numérations/heure</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Résultats en 4 heures</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hématologie de Routine */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#DC2626]/10 px-4 py-2 rounded-full mb-6">
                  <Droplet className="w-5 h-5 text-[#DC2626]" />
                  <span className="text-[#DC2626] font-semibold text-sm sm:text-base">Analyses de Routine</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Numérations Sanguines Complètes
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-8">
                  <p className="text-base sm:text-lg leading-relaxed">
                    Notre laboratoire d'hématologie prend en charge les <strong>analyses d'hématologie de routine</strong> et dispose d'un automate capable d'exécuter <strong>plus de 80 numérations sanguines par heure avec formule complète</strong>.
                  </p>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#DC2626] space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Nos Analyses Incluent :</h3>
                    <ul className="space-y-3 text-base sm:text-lg">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#DC2626] mt-2 flex-shrink-0"></div>
                        <span>Numération globulaire complète (NFS)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#DC2626] mt-2 flex-shrink-0"></div>
                        <span>Formule leucocytaire automatisée</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#DC2626] mt-2 flex-shrink-0"></div>
                        <span>Plaquettes et réticulocytes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#DC2626] mt-2 flex-shrink-0"></div>
                        <span>Tests de coagulation (TP, TCA, fibrinogène)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#DC2626] mt-2 flex-shrink-0"></div>
                        <span>Vitesse de sédimentation (VS)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/pexels-chokniti-khongchum-1197604-2280571.jpg"
                    alt="Analyse sanguine"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mt-8">
                  <Image
                    src="/pexels-rethaferguson-3825527.jpg"
                    alt="Équipement hématologie"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hématologie Spécialisée */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Hématologie Spécialisée
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                De la cytologie oncologique à l'hémostase spécialisée
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/national-cancer-institute-rb8hr3cXD4A-unsplash.jpg"
                    alt="Cytologie oncologique"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl flex items-center justify-center flex-shrink-0">
                      <FlaskConical className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Cytologie Oncologique</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Analyse microscopique spécialisée pour le dépistage et le diagnostic des pathologies malignes hématologiques
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Hémostase Spécialisée</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Dosage des facteurs de coagulation (II, V, VII, VIII, IX, X, XI, XII), recherche d'anticoagulants circulants
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Droplet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Tests de Thrombophilie</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Recherche de mutations génétiques, déficits en protéine C, S et antithrombine III
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Transfusion Sanguine</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Bilan pré-transfusionnel complet, compatibilité croisée, suivi post-transfusionnel et recherche d'anticorps anti-érythrocytaires
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Immuno-Hématologie */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#DC2626]/10 px-4 py-2 rounded-full mb-6">
                  <Shield className="w-5 h-5 text-[#DC2626]" />
                  <span className="text-[#DC2626] font-semibold text-sm sm:text-base">Automatisation Complète</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Immuno-Hématologie Automatisée
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                  <p className="text-base sm:text-lg leading-relaxed">
                    Notre secteur immuno-hématologie est <strong>entièrement automatisé</strong> et permet une identification <strong>fiable, rapide et complète</strong> de :
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-[#DC2626]/5 to-white p-6 rounded-xl border-l-4 border-[#DC2626]">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Groupes Sanguins</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Détermination ABO, Rhésus complet (D, C, c, E, e) et autres systèmes
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-[#DC2626]/5 to-white p-6 rounded-xl border-l-4 border-[#DC2626]">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Anticorps Irréguliers</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Recherche et identification (RAI) avec panel de cellules complètes
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-[#DC2626]/5 to-white p-6 rounded-xl border-l-4 border-[#DC2626]">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Phénotypes Étendus</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Phénotypage complet pour transfusions complexes et incompatibilités
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/national-cancer-institute-uVnRa6mOLOM-unsplash.jpg"
                    alt="Immuno-hématologie"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/louis-reed-pwcKF7L4-no-unsplash.jpg"
                    alt="Groupe sanguin"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Qualité et Délais */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold text-sm sm:text-base">Excellence et Traçabilité</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                  Qualité et Rapidité Garanties
                </h2>

                <div className="space-y-6 text-base sm:text-lg text-white/90 leading-relaxed">
                  <p>
                    La <strong>connexion bidirectionnelle</strong> de tous nos automates à notre système de gestion informatique central nous permet de gérer d'une façon optimale nos analyses et résultats, garantissant un <strong>excellent niveau de qualité et de traçabilité</strong>.
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-3">
                      <Clock className="w-7 h-7" />
                      Délais de Rendu
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                        <span><strong>Résultats d'hématologie :</strong> Maximum 4 heures</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                        <span><strong>Urgences :</strong> Dans l'heure qui suit leur arrivée</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">Disponibilité Permanente</h3>
                    <p className="mb-4">
                      Notre biologiste est disponible pour vos urgences et leur interprétation <strong>7 jours sur 7 et 24 heures sur 24</strong>.
                    </p>
                    <p className="mb-4">
                      Pour une interprétation plus exhaustive de vos résultats, visitez le site web de <strong>LabTests Online</strong>.
                    </p>
                    <a
                      href="https://www.labtestsonline.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-[#DC2626] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all"
                    >
                      Visiter LabTests Online
                      <ChevronRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/lucas-vasques-9vnACvX2748-unsplash.jpg"
                  alt="Laboratoire moderne"
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
              Besoin d'une Analyse Hématologique ?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Notre laboratoire d'hématologie vous garantit des résultats rapides et fiables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Créer un Compte
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#DC2626] px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-[#DC2626] hover:bg-[#DC2626] hover:text-white transition-all"
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
