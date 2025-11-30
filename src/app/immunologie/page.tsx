"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Shield, Activity, Clock, FlaskConical, ChevronRight, Sparkles } from "lucide-react";

export default function ImmunologiePage() {
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
              alt="Laboratoire d'Immunologie"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/95 via-[#7C3AED]/85 to-[#7C3AED]/70"></div>
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
                <span className="text-white text-sm sm:text-base">Immunologie</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Immunologie & Sérologie
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                Plateforme technique automatisée pour analyses immunologiques complètes
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Techniques automatisées</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Résultats 4-8 heures</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plateforme Technique */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#7C3AED]/10 px-4 py-2 rounded-full mb-6">
                  <Shield className="w-5 h-5 text-[#7C3AED]" />
                  <span className="text-[#7C3AED] font-semibold text-sm sm:text-base">Technologie Avancée</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Gamme Variée d'Analyses Immunologiques
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-8">
                  <p className="text-base sm:text-lg leading-relaxed">
                    La plateforme technique de notre laboratoire d'immunologie est <strong>connectée en interface avec notre réseau informatique central</strong> et grâce à l'usage de <strong>techniques automatisées</strong>, elle prend en charge une gamme très variée d'analyses.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/julia-koblitz-RlOAwXt2fEA-unsplash (1).jpg"
                    alt="Analyses immunologiques"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mt-8">
                  <Image
                    src="/pexels-artempodrez-5726788.jpg"
                    alt="Laboratoire automatisé"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types d'Analyses */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Nos Analyses Immunologiques
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Des bilans complets pour tous vos besoins diagnostiques
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: "Bilans Hormonaux Complets",
                  items: ["Hormones thyroïdiennes", "Hormones sexuelles", "Cortisol et ACTH", "Hormone de croissance"],
                  icon: Activity,
                },
                {
                  title: "Fertilité",
                  items: ["FSH, LH, Prolactine", "Testostérone", "AMH", "Inhibine B"],
                  icon: FlaskConical,
                },
                {
                  title: "Bilan Thyroïdien",
                  items: ["TSH, T3, T4", "Anticorps anti-TPO", "Anticorps anti-thyroglobuline", "Thyroglobuline"],
                  icon: Shield,
                },
                {
                  title: "Régulation Hydrominérale",
                  items: ["PTH", "Vitamine D", "Calcitonine", "Électrolytes"],
                  icon: Activity,
                },
                {
                  title: "Remodelage Osseux",
                  items: ["Ostéocalcine", "CTX", "P1NP", "Phosphatase alcaline osseuse"],
                  icon: FlaskConical,
                },
                {
                  title: "Marqueurs Tumoraux",
                  items: ["PSA", "CA 15-3, CA 19-9, CA 125", "AFP, ACE", "Bêta-HCG"],
                  icon: Shield,
                },
                {
                  title: "Allergologie",
                  items: ["IgE totales", "IgE spécifiques", "Panel allergènes respiratoires", "Panel allergènes alimentaires"],
                  icon: Activity,
                },
                {
                  title: "Auto-immunité",
                  items: ["ANA, Anti-DNA", "Facteur rhumatoïde", "Anti-CCP", "ANCA"],
                  icon: FlaskConical,
                },
                {
                  title: "Sérologies Infectieuses",
                  items: ["Parasitaires", "Bactériennes", "Virales", "Dépistage complet"],
                  icon: Shield,
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#7C3AED]/20 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-xl flex items-center justify-center mb-4">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sérologies Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/pexels-edward-jenner-4033148.jpg"
                      alt="Sérologie virale"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/national-institute-of-allergy-and-infectious-diseases-Cdt3s_jp1OY-unsplash.jpg"
                      alt="Analyses sérologiques"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-[#7C3AED]/10 px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-5 h-5 text-[#7C3AED]" />
                  <span className="text-[#7C3AED] font-semibold text-sm sm:text-base">Sérologies Complètes</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Sérologies Infectieuses
                </h2>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#7C3AED]">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Sérologies Virales</h3>
                    <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                        <span>VIH 1 & 2, Hépatites A, B, C</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                        <span>Rubéole, Toxoplasmose, CMV</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                        <span>Herpès (HSV 1 & 2), EBV</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                        <span>COVID-19 (anticorps IgG/IgM)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#7C3AED]">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Sérologies Bactériennes</h3>
                    <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                        <span>Syphilis (TPHA, VDRL)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                        <span>Helicobacter pylori</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                        <span>Mycoplasma pneumoniae</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                        <span>ASLO, Widal et Félix</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#7C3AED]">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Sérologies Parasitaires</h3>
                    <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                        <span>Toxoplasmose</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                        <span>Amibiase, Bilharziose</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                        <span>Paludisme (anticorps)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Délais et Disponibilité */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/national-cancer-institute-uVnRa6mOLOM-unsplash.jpg"
                  alt="Laboratoire d'immunologie"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold text-sm sm:text-base">Rapidité et Efficacité</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                  Délais de Rendu Optimisés
                </h2>

                <div className="space-y-6 text-base sm:text-lg text-white/90 leading-relaxed">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-3">
                      <Clock className="w-7 h-7" />
                      Délais Standards
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                        <span><strong>Majorité des résultats :</strong> Entre 4 et 8 heures après arrivée au laboratoire</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                        <span><strong>Résultats urgents :</strong> Disponibles dans l'heure qui suit leur dépôt</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">Service 24h/24 - 7j/7</h3>
                    <p className="mb-4">
                      Notre biologiste est disponible pour vos urgences et leur interprétation à tout moment, tous les jours de la semaine.
                    </p>
                    <p className="mb-4">
                      Pour une interprétation plus exhaustive de vos résultats, nous vous prions de bien vouloir visiter le site web de <strong>LabTests Online</strong>.
                    </p>
                    <a
                      href="https://www.labtestsonline.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-[#7C3AED] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all"
                    >
                      Visiter LabTests Online
                      <ChevronRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Besoin d'une Analyse Immunologique ?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Notre laboratoire d'immunologie vous offre une gamme complète d'analyses automatisées.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Créer un Compte
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#7C3AED] px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-all"
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
