"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Shield, Award, ChevronRight, CheckCircle, Activity, Target } from "lucide-react";

export default function ControleQualitePage() {
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
              alt="Contrôle Qualité"
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
                  Accueil
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <Link href="/#services" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                  Assurance Qualité
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <span className="text-white text-sm sm:text-base">Contrôle Qualité</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Contrôle Qualité Interne et Externe
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                Garantir la fiabilité et la précision de nos analyses biologiques
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Activity className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Contrôle continu</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Target className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Excellence validée</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0B3D5F]/10 px-4 py-2 rounded-full mb-6">
                <Shield className="w-5 h-5 text-[#0B3D5F]" />
                <span className="text-[#0B3D5F] font-semibold text-sm sm:text-base">Excellence Analytique</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Notre Système de Contrôle Qualité
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Le contrôle qualité interne et externe est au cœur de notre démarche d&apos;assurance qualité. Il garantit la fiabilité, la reproductibilité et la précision de nos résultats d&apos;analyses biologiques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl p-8 text-white shadow-xl">
                <Activity className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Contrôle Qualité Interne (CQI)</h3>
                <p className="text-white/90 leading-relaxed">
                  Surveillance quotidienne de nos processus analytiques pour assurer la constance et la fiabilité de nos résultats au fil du temps.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl p-8 text-white shadow-xl">
                <Target className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Contrôle Qualité Externe (EQA)</h3>
                <p className="text-white/90 leading-relaxed">
                  Évaluation régulière de nos performances par comparaison avec d&apos;autres laboratoires de référence au niveau international.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Control Image Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0B3D5F]/10 px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5 text-[#0B3D5F]" />
                <span className="text-[#0B3D5F] font-semibold text-sm sm:text-base">Processus de Contrôle</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Système de Contrôle Qualité Lab Yaounde
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Notre méthodologie rigoureuse pour garantir l&apos;excellence de nos analyses
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#0B3D5F]/10">
                <Image
                  src="/ChatGPT Image Dec 1, 2025, 01_51_35 AM.png"
                  alt="Contrôle Qualité Interne et Externe Lab Yaounde"
                  width={1200}
                  height={1600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contrôle Qualité Interne Details */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Contrôle Qualité Interne (CQI)
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Surveillance continue de la qualité de nos analyses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: "Échantillons de Contrôle",
                  description: "Utilisation quotidienne d'échantillons de référence avec des valeurs connues pour vérifier la précision de nos équipements.",
                },
                {
                  title: "Cartes de Contrôle",
                  description: "Suivi graphique des résultats pour détecter rapidement toute dérive ou anomalie dans nos processus analytiques.",
                },
                {
                  title: "Validation Continue",
                  description: "Vérification systématique de chaque série d'analyses avant la validation des résultats patients.",
                },
                {
                  title: "Documentation Rigoureuse",
                  description: "Enregistrement et archivage de tous les contrôles effectués pour assurer la traçabilité complète.",
                },
                {
                  title: "Actions Correctives",
                  description: "Mise en place immédiate de mesures correctives en cas de résultats hors normes acceptables.",
                },
                {
                  title: "Formation du Personnel",
                  description: "Formation continue de notre équipe aux bonnes pratiques de contrôle qualité et aux nouvelles méthodologies.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#0B3D5F]/20 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contrôle Qualité Externe Details */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Contrôle Qualité Externe (EQA)
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Évaluation externe de nos performances analytiques
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: "Programmes Internationaux",
                  description: "Participation régulière à des programmes d'évaluation externe de qualité reconnus internationalement.",
                },
                {
                  title: "Comparaison Inter-laboratoires",
                  description: "Analyse d'échantillons communs et comparaison de nos résultats avec ceux d'autres laboratoires de référence.",
                },
                {
                  title: "Évaluation Indépendante",
                  description: "Vérification objective de notre performance analytique par des organismes externes accrédités.",
                },
                {
                  title: "Détection des Biais",
                  description: "Identification et correction des éventuels biais systématiques dans nos méthodes d'analyse.",
                },
                {
                  title: "Amélioration Continue",
                  description: "Utilisation des résultats EQA pour améliorer constamment nos pratiques et nos performances.",
                },
                {
                  title: "Conformité aux Normes",
                  description: "Respect des standards internationaux ISO 15189 et des recommandations des autorités sanitaires.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#0B3D5F]/20 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Les Bénéfices pour Nos Patients
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Ce que notre système de contrôle qualité vous garantit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: CheckCircle,
                  title: "Résultats Fiables",
                  description: "Des analyses précises et reproductibles sur lesquelles vous et votre médecin pouvez compter en toute confiance.",
                },
                {
                  icon: Shield,
                  title: "Sécurité Diagnostique",
                  description: "Réduction des risques d'erreurs analytiques grâce à notre surveillance constante et rigoureuse.",
                },
                {
                  icon: Target,
                  title: "Comparabilité",
                  description: "Des résultats comparables avec ceux d'autres laboratoires de référence, facilitant le suivi médical.",
                },
                {
                  icon: Award,
                  title: "Excellence Certifiée",
                  description: "Conformité aux normes internationales les plus exigeantes en matière de qualité analytique.",
                },
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              La Qualité au Service de Votre Santé
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Notre engagement pour le contrôle qualité vous assure des résultats d&apos;analyses fiables et précis, essentiels pour votre diagnostic et votre suivi médical.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0B3D5F] px-8 py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/90 transition-all hover:scale-105"
              >
                Créer un Compte
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/charte-de-qualite"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-white hover:bg-white hover:text-[#0B3D5F] transition-all"
              >
                Notre Charte de Qualité
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
