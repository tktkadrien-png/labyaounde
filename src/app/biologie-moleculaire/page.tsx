"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Dna, Activity, Clock, Shield, ChevronRight, FlaskConical, Sparkles } from "lucide-react";

export default function BiologieMoleculairePage() {
  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/louis-reed-pwcKF7L4-no-unsplash.jpg"
              alt="Laboratoire de Biologie Moléculaire"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/95 via-[#2563EB]/85 to-[#2563EB]/70"></div>
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
                <span className="text-white text-sm sm:text-base">Biologie Moléculaire</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Biologie Moléculaire
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                PCR en temps réel pour la détection et le suivi des infections virales et bactériennes
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Dna className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">PCR en temps réel</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Haute sensibilité</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Principal */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 px-4 py-2 rounded-full mb-6">
                  <Dna className="w-5 h-5 text-[#2563EB]" />
                  <span className="text-[#2563EB] font-semibold text-sm sm:text-base">Technologie PCR</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Détection des Génomes Viraux et Bactériens
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-8">
                  <p className="text-base sm:text-lg leading-relaxed">
                    Notre service de biologie moléculaire est <strong>entièrement dédié à la détection des génomes viraux ou bactériens</strong>.
                  </p>

                  <p className="text-base sm:text-lg leading-relaxed">
                    Le laboratoire dispose d'une <strong>plateforme technique de biologie moléculaire utilisant la PCR en temps réel</strong> permettant :
                  </p>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#2563EB]">
                    <ul className="space-y-3 text-base sm:text-lg">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-2 flex-shrink-0"></div>
                        <span><strong>La confirmation</strong> des infections</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-2 flex-shrink-0"></div>
                        <span><strong>Le suivi des charges virales</strong></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-2 flex-shrink-0"></div>
                        <span><strong>Le génotypage</strong> de nombreux virus</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/national-cancer-institute-uVnRa6mOLOM-unsplash.jpg"
                    alt="PCR en temps réel"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mt-8">
                  <Image
                    src="/lucas-vasques-9vnACvX2748-unsplash.jpg"
                    alt="Biologie moléculaire"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analyses Virales */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Détection et Suivi Viral
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                PCR en temps réel pour les virus les plus courants
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: "Hépatite C (VHC)",
                  description: "Détection qualitative et quantitative, génotypage pour adapter le traitement",
                  icon: Activity,
                },
                {
                  title: "Hépatite B (VHB)",
                  description: "Charge virale pour le suivi thérapeutique et évaluation de la réplication",
                  icon: FlaskConical,
                },
                {
                  title: "VIH",
                  description: "Charge virale plasmatique pour le suivi de l'efficacité du traitement antirétroviral",
                  icon: Shield,
                },
                {
                  title: "Cytomégalovirus (CMV)",
                  description: "Détection et quantification chez les immunodéprimés et nouveau-nés",
                  icon: Activity,
                },
                {
                  title: "Epstein-Barr Virus (EBV)",
                  description: "Charge virale pour diagnostic et suivi, notamment chez les transplantés",
                  icon: FlaskConical,
                },
                {
                  title: "Human Papillomavirus (HPV)",
                  description: "Recherche sur prélèvement endocol pour le dépistage du cancer du col de l'utérus",
                  icon: Shield,
                },
              ].map((virus, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#2563EB]/20 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-xl flex items-center justify-center mb-4">
                    <virus.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{virus.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{virus.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HPV et Cancer du Col */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/cdc-UBJJuAv9os-unsplash.jpg"
                    alt="Dépistage HPV"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 px-4 py-2 rounded-full mb-6">
                  <Shield className="w-5 h-5 text-[#2563EB]" />
                  <span className="text-[#2563EB] font-semibold text-sm sm:text-base">Prévention Cancer</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Dépistage du Cancer du Col de l'Utérus
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                  <p className="text-base sm:text-lg leading-relaxed">
                    La recherche du <strong>Human Papillomavirus (HPV)</strong> sur prélèvement de l'endocol vient compléter le dépistage du cancer du col de l'utérus.
                  </p>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-[#2563EB]">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Tests HPV par PCR</h3>
                    <ul className="space-y-3 text-base sm:text-lg">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-2 flex-shrink-0"></div>
                        <span>Détection des génotypes à haut risque oncogène</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-2 flex-shrink-0"></div>
                        <span>Identification des HPV 16 et 18 (les plus fréquents)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-2 flex-shrink-0"></div>
                        <span>Complément au frottis cervico-vaginal</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-2 flex-shrink-0"></div>
                        <span>Surveillance post-traitement</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-[#2563EB]/5 to-white p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Importance du Dépistage</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Le dépistage précoce du HPV permet d'identifier les femmes à risque et de mettre en place une surveillance adaptée pour prévenir le développement du cancer du col de l'utérus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recherches Bactériennes */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 px-4 py-2 rounded-full mb-6">
                  <FlaskConical className="w-5 h-5 text-[#2563EB]" />
                  <span className="text-[#2563EB] font-semibold text-sm sm:text-base">Détection Bactérienne</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Amplification Génétique par PCR
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                  <p className="text-base sm:text-lg leading-relaxed">
                    Nous effectuons également des recherches par <strong>techniques d'amplification génétique par PCR en temps réel</strong> :
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-[#2563EB]">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Chlamydia trachomatis</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Dépistage des infections génitales à Chlamydia, première cause d'IST bactérienne. Détection précoce essentielle pour prévenir les complications (stérilité, grossesse extra-utérine).
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-[#2563EB]">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Neisseria gonorrhoeae</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Détection moléculaire du gonocoque, agent de la gonorrhée (blennorragie). PCR plus sensible que la culture, particulièrement pour les prélèvements extra-génitaux.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#2563EB]/5 to-white p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Avantages de la PCR</h3>
                    <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 flex-shrink-0"></div>
                        <span>Haute sensibilité et spécificité</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 flex-shrink-0"></div>
                        <span>Résultats rapides (quelques heures)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 flex-shrink-0"></div>
                        <span>Détection même avec faible charge bactérienne</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 flex-shrink-0"></div>
                        <span>Prélèvement non invasif possible (urine)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/pexels-artempodrez-5726788.jpg"
                    alt="PCR bactérienne"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/pexels-artempodrez-5726706.jpg"
                    alt="Amplification génétique"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Besoin d'une Analyse en Biologie Moléculaire ?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Notre laboratoire de biologie moléculaire utilise la PCR en temps réel pour des diagnostics précis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#2563EB] px-8 py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/90 transition-all hover:scale-105"
              >
                Créer un Compte
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-white hover:bg-white hover:text-[#2563EB] transition-all"
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
