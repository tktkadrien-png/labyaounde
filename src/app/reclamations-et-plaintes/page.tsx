"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { AlertCircle, FileText, ChevronRight, CheckCircle, UserCheck, Shield } from "lucide-react";

export default function ReclamationsEtPlaintesPage() {
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
              alt="Réclamations et Plaintes"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0047AB]/95 via-[#0047AB]/85 to-[#0047AB]/70"></div>
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
                <span className="text-white text-sm sm:text-base">Réclamations et Plaintes</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Réclamations et Plaintes
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                Votre satisfaction est notre priorité - Nous sommes à votre écoute
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <FileText className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Traitement rapide</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">Confidentialité garantie</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Objectif Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0047AB]/10 px-4 py-2 rounded-full mb-6">
                <AlertCircle className="w-5 h-5 text-[#0047AB]" />
                <span className="text-[#0047AB] font-semibold text-sm sm:text-base">Notre Objectif</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Objectif de notre Politique de Réclamations
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
                  Donner aux patients et clients l&apos;opportunité d&apos;exprimer leur insatisfaction et de faire connaître leurs préoccupations au laboratoire, afin qu&apos;elles puissent être traitées de manière équitable, efficace et rapide.
                </p>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  Ceci permet au laboratoire d&apos;identifier les domaines dans lesquels le service doit être amélioré et d&apos;aider le personnel à maintenir et améliorer les normes de service.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-[#0047AB] to-[#0080FF] rounded-2xl p-8 text-white shadow-xl">
                <FileText className="w-12 h-12 mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Expression Libre</h3>
                <p className="text-white/90 leading-relaxed">
                  Chaque patient a le droit d&apos;exprimer ses préoccupations et insatisfactions de manière claire et respectueuse.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#0047AB] to-[#0080FF] rounded-2xl p-8 text-white shadow-xl">
                <Shield className="w-12 h-12 mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Amélioration Continue</h3>
                <p className="text-white/90 leading-relaxed">
                  Vos retours nous permettent d&apos;identifier les axes d&apos;amélioration et d&apos;optimiser nos services en permanence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement du Laboratoire */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Engagement du Laboratoire
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Nos garanties pour un traitement juste et efficace de vos réclamations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: "Traitement Équitable",
                  description: "Toutes les réclamations sont traitées de manière équitable, confidentielle et avec le plus grand respect.",
                },
                {
                  title: "Résolution Rapide",
                  description: "Le laboratoire s'engage à résoudre les problèmes rapidement et de manière appropriée.",
                },
                {
                  title: "Procédures Simples",
                  description: "Des procédures claires et accessibles sont en place pour la gestion des réclamations.",
                },
                {
                  title: "Suivi Personnalisé",
                  description: "Chaque réclamation fait l'objet d'un suivi personnalisé jusqu'à sa résolution complète.",
                },
                {
                  title: "Transparence Totale",
                  description: "Information claire sur les étapes de traitement et les délais de résolution prévus.",
                },
                {
                  title: "Responsabilité Assumée",
                  description: "Le laboratoire assume pleinement ses responsabilités et s'engage à corriger ses erreurs.",
                },
                {
                  title: "Apprentissage Continu",
                  description: "Chaque réclamation est analysée pour améliorer nos processus et prévenir sa récurrence.",
                },
              ].map((engagement, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#0047AB]/20 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0047AB] to-[#0080FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{engagement.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{engagement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Responsabilités Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0047AB]/10 px-4 py-2 rounded-full mb-6">
                <UserCheck className="w-5 h-5 text-[#0047AB]" />
                <span className="text-[#0047AB] font-semibold text-sm sm:text-base">Organisation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Les Responsabilités
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Notre équipe dédiée au traitement de vos réclamations
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl border border-gray-100">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0047AB] to-[#0080FF] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                      Personne Responsable Désignée
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      Le laboratoire désigne une personne responsable pour gérer toutes les réclamations et plaintes. Cette personne qualifiée et formée est votre interlocuteur privilégié.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#0047AB] flex-shrink-0 mt-1" />
                        <span className="text-gray-700">Formation spécialisée en gestion de réclamations</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#0047AB] flex-shrink-0 mt-1" />
                        <span className="text-gray-700">Compétence en communication et médiation</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#0047AB] flex-shrink-0 mt-1" />
                        <span className="text-gray-700">Disponibilité et réactivité garanties</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#0047AB] flex-shrink-0 mt-1" />
                        <span className="text-gray-700">Pouvoir décisionnel pour résoudre les problèmes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comment déposer une réclamation */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Comment Déposer une Réclamation
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Plusieurs moyens sont à votre disposition pour nous faire part de vos préoccupations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0047AB] to-[#0080FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">En Personne</h3>
                <p className="text-gray-600 leading-relaxed">
                  Rendez-vous directement au laboratoire et demandez à parler à la personne responsable des réclamations.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0047AB] to-[#0080FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Par Téléphone</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Contactez-nous directement pour exposer votre réclamation à notre équipe.
                </p>
                <p className="text-[#0047AB] font-semibold">+237 659 000 666</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0047AB] to-[#0080FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Par Email</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Envoyez-nous un email détaillant votre réclamation.
                </p>
                <p className="text-[#0047AB] font-semibold break-all">contact@labyaounde.com</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#0047AB] to-[#0080FF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Votre Avis Compte pour Nous
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              N&apos;hésitez pas à nous contacter. Chaque réclamation est une opportunité d&apos;améliorer nos services et de mieux vous servir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0047AB] px-8 py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/90 transition-all hover:scale-105"
              >
                Nous Contacter
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/charte-de-qualite"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-white hover:bg-white hover:text-[#0047AB] transition-all"
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
