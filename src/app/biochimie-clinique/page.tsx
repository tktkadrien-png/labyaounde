"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Microscope, FlaskConical, Activity, Clock, Shield, ChevronRight } from "lucide-react";

export default function BiochimieClinikPage() {
  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/pexels-ivan-s-9629721.jpg"
              alt="Laboratoire de Biochimie Clinique"
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
                <span className="text-white text-sm sm:text-base">Biochimie Clinique</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Biochimie Clinique & Immunochimie
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                Excellence technologique et précision diagnostique pour votre santé
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Activity className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">250+ tests/heure</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Service 24h/24 - 7j/7</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#2916F5]/10 px-4 py-2 rounded-full mb-6">
                  <Microscope className="w-5 h-5 text-[#2916F5]" />
                  <span className="text-[#2916F5] font-semibold text-sm sm:text-base">Technologies de Pointe</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Équipement Moderne et Automatisé
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-8">
                  <p className="text-base sm:text-lg leading-relaxed">
                    Notre laboratoire de biochimie clinique et d'Immunochimie dispose d'une gamme d'<strong>automates capables d'exécuter plus de 250 tests par heure</strong> en utilisant des techniques de pointe telles que :
                  </p>

                  <ul className="space-y-3 text-base sm:text-lg">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#2916F5] mt-2 flex-shrink-0"></div>
                      <span>Cinétique enzymatique</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#2916F5] mt-2 flex-shrink-0"></div>
                      <span>Colorimétrie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#2916F5] mt-2 flex-shrink-0"></div>
                      <span>Turbidimétrie et néphélémetrie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#2916F5] mt-2 flex-shrink-0"></div>
                      <span>Techniques immunoenzymatiques automatisées</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#2916F5] mt-2 flex-shrink-0"></div>
                      <span>Électrophorèse capillaire</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/pexels-artempodrez-5726837.jpg"
                    alt="Équipement de laboratoire"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mt-8">
                  <Image
                    src="/pexels-karola-g-8539753.jpg"
                    alt="Analyse biochimique"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Domaines d'Expertise */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Domaines d'Expertise
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Dépistage et suivi complet pour votre santé
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  title: "Diabète",
                  description: "Dépistage et suivi du diabète avec tests de glycémie, HbA1c et courbes glycémiques",
                  icon: Activity,
                },
                {
                  title: "Dyslipoprotéinémies",
                  description: "Bilan lipidique complet : cholestérol total, HDL, LDL, triglycérides",
                  icon: FlaskConical,
                },
                {
                  title: "Maladies Cardio-vasculaires",
                  description: "Marqueurs cardiaques spécialisés et profils de risque cardiovasculaire",
                  icon: Activity,
                },
                {
                  title: "Maladies Rénales",
                  description: "Fonction rénale complète : créatinine, urée, acide urique, électrolytes",
                  icon: FlaskConical,
                },
              ].map((domain, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#2916F5]/20 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2916F5] to-[#157DEC] rounded-xl flex items-center justify-center mb-4">
                    <domain.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{domain.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{domain.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Analyses Spécialisées */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/pexels-artempodrez-5726705.jpg"
                    alt="Analyses spécialisées"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-[#2916F5]/10 px-4 py-2 rounded-full mb-6">
                  <FlaskConical className="w-5 h-5 text-[#2916F5]" />
                  <span className="text-[#2916F5] font-semibold text-sm sm:text-base">Analyses Avancées</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Tests Très Spécialisés
                </h2>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#2916F5]">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Vitaminologie</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Dosage complet des vitamines essentielles pour identifier les carences
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#2916F5]">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Marqueurs Cardiaques</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Troponines, BNP et autres marqueurs pour le diagnostic cardiaque
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#2916F5]">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Variants de l'Hémoglobine</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Dépistage des hémoglobinopathies par électrophorèse capillaire
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#2916F5]">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Protéines par Immunofixation</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Identification précise des gammapathies monoclonales
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Qualité et Traçabilité */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#2916F5] to-[#157DEC] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold text-sm sm:text-base">Qualité Garantie</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                  Système de Gestion Informatique Central
                </h2>

                <div className="space-y-6 text-base sm:text-lg text-white/90 leading-relaxed">
                  <p>
                    Tous nos automates sont <strong>connectés en bidirectionnel</strong> à notre système de gestion informatique central, ce qui assure un <strong>niveau optimal de qualité et de traçabilité</strong>.
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">Disponibilité 24h/24 - 7j/7</h3>
                    <p className="mb-4">
                      Le biologiste du laboratoire est disponible pour vos urgences et leur interprétation à tout moment.
                    </p>
                    <div className="flex items-center gap-2 text-white">
                      <Clock className="w-5 h-5 flex-shrink-0" />
                      <span className="font-semibold">Service d'urgence permanent</span>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">Interprétation des Résultats</h3>
                    <p className="mb-4">
                      Pour une interprétation plus exhaustive de vos résultats, visitez le site web de <strong>LabTests Online</strong>.
                    </p>
                    <a
                      href="https://www.labtestsonline.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-[#2916F5] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all"
                    >
                      Visiter LabTests Online
                      <ChevronRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/pexels-artempodrez-5726788.jpg"
                    alt="Système informatique"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/pexels-artempodrez-5726706.jpg"
                    alt="Contrôle qualité"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Besoin d'une Analyse en Biochimie Clinique ?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Notre équipe d'experts est à votre disposition pour tous vos besoins en analyses biochimiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2916F5] to-[#157DEC] text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Créer un Compte
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#2916F5] px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-[#2916F5] hover:bg-[#2916F5] hover:text-white transition-all"
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
