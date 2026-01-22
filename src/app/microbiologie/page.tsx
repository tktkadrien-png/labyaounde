"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Microscope, Activity, Clock, Shield, ChevronRight, FlaskConical, BookOpen } from "lucide-react";

export default function MicrobiologiePage() {
  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/microbiologie-hero.png"
              alt="Laboratoire de Microbiologie"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2916F5]/95 via-[#2916F5]/85 to-[#2916F5]/70"></div>
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
                <span className="text-white text-sm sm:text-base">Microbiologie</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Microbiologie & Virologie
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                Système de gestion automatisé pour des résultats rapides et fiables
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Activity className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Résultats 24-48h</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Normes UK SMI</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Automatisation Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#059669]/10 px-4 py-2 rounded-full mb-6">
                  <Microscope className="w-5 h-5 text-[#059669]" />
                  <span className="text-[#059669] font-semibold text-sm sm:text-base">Technologies Automatisées</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Gestion Automatisée des Analyses
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-8">
                  <p className="text-base sm:text-lg leading-relaxed">
                    L'<strong>automatisation de notre laboratoire de Microbiologie</strong> avec un <strong>système de gestion automatisé de l'antibiogramme et de l'identification des germes</strong> nous permet de rendre des résultats dans des délais optimaux :
                  </p>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#059669]">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <Clock className="w-6 h-6 text-[#059669]" />
                      Délais de Rendu
                    </h3>
                    <ul className="space-y-3 text-base sm:text-lg">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                        <span><strong>Résultats négatifs ou positifs :</strong> 24 heures</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                        <span><strong>Analyses complexes :</strong> 48 heures maximum</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/microbiologie-hero.png"
                  alt="Microbiologie automatisée"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Additional Images Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/pexels-artempodrez-5726705.jpg"
                    alt="Microbiologie"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mt-8">
                  <Image
                    src="/pexels-artempodrez-5726837.jpg"
                    alt="Identification des germes"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Domaines d'Analyse */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Nos Domaines d'Analyse
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Bactériologie, Parasitologie, Mycologie et Virologie
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-[#059669] to-[#047857] rounded-xl flex items-center justify-center mb-6">
                  <Microscope className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Bactériologie</h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  Identification complète des bactéries pathogènes avec antibiogramme automatisé selon les normes EUCAST/CLSI
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Hémocultures automatisées</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">ECBU et cultures urinaires</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Coprocultures</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Prélèvements génitaux</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">LCR, liquides de ponction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Prélèvements respiratoires</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-[#059669] to-[#047857] rounded-xl flex items-center justify-center mb-6">
                  <FlaskConical className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Parasitologie</h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  Recherche et identification des parasites dans différents types de prélèvements
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Examen parasitologique des selles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Recherche de paludisme (frottis/goutte épaisse)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Tests de diagnostic rapide</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Recherche de filaires</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Analyse d'urines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Recherche dans autres liquides biologiques</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-[#059669] to-[#047857] rounded-xl flex items-center justify-center mb-6">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Mycologie</h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  Identification des champignons pathogènes et levures avec antifongogramme
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Examen mycologique de la peau et des phanères</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Cultures de levures (Candida spp.)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Prélèvements génitaux</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Examen de crachats</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Antifongogramme automatisé</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-[#059669] to-[#047857] rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Virologie</h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  Diagnostic virologique par techniques immunologiques et moléculaires
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Tests antigéniques rapides</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Recherche d'antigènes viraux</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Sérologies virales (voir section Immunologie)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">PCR virale (voir section Biologie Moléculaire)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Normes UK SMI */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/pexels-artempodrez-5726706.jpg"
                    alt="Normes internationales"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-[#059669]/10 px-4 py-2 rounded-full mb-6">
                  <BookOpen className="w-5 h-5 text-[#059669]" />
                  <span className="text-[#059669] font-semibold text-sm sm:text-base">Normes Internationales</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Conformité aux Standards UK SMI
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                  <p className="text-base sm:text-lg leading-relaxed">
                    Nos techniques, protocoles et l'interprétation de nos résultats de Microbiologie (bactériologie, parasitologie, mycologie) et de Virologie sont conformes aux normes recommandées par :
                  </p>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#059669]">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Organismes de Référence</h3>
                    <ul className="space-y-3 text-base sm:text-lg">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                        <span><strong>UK Standards for Microbiology Investigations (SMI)</strong></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                        <span>Produits en association avec <strong>the Health Protection Agency (HPA)</strong></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 flex-shrink-0"></div>
                        <span>Soutenus par toutes les <strong>associations scientifiques et de microbiologistes</strong></span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-[#059669]/5 to-white p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Garantie de Qualité</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Cette conformité garantit que nos analyses suivent les meilleures pratiques internationales en matière de microbiologie médicale, assurant des résultats fiables et une interprétation clinique pertinente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#059669] to-[#047857] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Besoin d'une Analyse Microbiologique ?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Notre laboratoire de microbiologie vous garantit des résultats rapides selon les normes internationales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#059669] px-8 py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/90 transition-all hover:scale-105"
              >
                Créer un Compte
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-white hover:bg-white hover:text-[#059669] transition-all"
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
