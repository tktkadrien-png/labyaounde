"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Shield, Award, ChevronRight, CheckCircle } from "lucide-react";

export default function CharteDeQualitePage() {
  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-[#84BDE3]/10">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/pexels-polina-tankilevitch-3735709.jpg"
              alt="Charte de Qualité"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#84BDE3]/95 via-[#84BDE3]/85 to-[#84BDE3]/70"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="text-[#1034A6]/80 hover:text-[#1034A6] text-sm sm:text-base transition-colors">
                  Accueil
                </Link>
                <ChevronRight className="w-4 h-4 text-[#1034A6]/60" />
                <Link href="/#services" className="text-[#1034A6]/80 hover:text-[#1034A6] text-sm sm:text-base transition-colors">
                  Assurance Qualité
                </Link>
                <ChevronRight className="w-4 h-4 text-[#1034A6]/60" />
                <span className="text-[#1034A6] text-sm sm:text-base">Charte de Qualité</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1034A6] mb-4 sm:mb-6 leading-tight">
                Charte de Qualité
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-[#1034A6]/90 mb-6 sm:mb-8 leading-relaxed">
                Notre engagement envers l'excellence et la qualité de service
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-[#1034A6]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#1034A6]/20">
                  <Shield className="w-5 h-5 text-[#1034A6]" />
                  <span className="text-[#1034A6] text-sm sm:text-base font-medium">Excellence garantie</span>
                </div>
                <div className="flex items-center gap-2 bg-[#1034A6]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#1034A6]/20">
                  <Award className="w-5 h-5 text-[#1034A6]" />
                  <span className="text-[#1034A6] text-sm sm:text-base font-medium">Normes internationales</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Charte Image Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5 text-[#1E40AF]" />
                <span className="text-[#1E40AF] font-semibold text-sm sm:text-base">Notre Charte</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E40AF] mb-4">
                Charte de Qualité Lab Yaounde
              </h2>
              <p className="text-lg sm:text-xl text-[#1E40AF]/70 max-w-3xl mx-auto">
                Nos engagements envers nos patients et partenaires
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#1E40AF]/10">
                <Image
                  src="/IMAGE/ChatGPT Image Feb 19, 2026, 02_53_44 PM.png"
                  alt="Charte de Qualité Lab Yaounde"
                  width={1200}
                  height={1600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nos Engagements */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#84BDE3]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E40AF] mb-4">
                Nos Engagements Qualité
              </h2>
              <p className="text-lg sm:text-xl text-[#1E40AF]/70 max-w-3xl mx-auto">
                Des standards d'excellence pour votre santé
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: "Exactitude des Résultats",
                  description: "Analyses précises et fiables conformes aux standards internationaux",
                },
                {
                  title: "Confidentialité",
                  description: "Protection totale de vos données personnelles et médicales",
                },
                {
                  title: "Rapidité de Service",
                  description: "Délais de rendu optimisés sans compromis sur la qualité",
                },
                {
                  title: "Compétence du Personnel",
                  description: "Équipe qualifiée et formée en continu aux dernières techniques",
                },
                {
                  title: "Équipements Modernes",
                  description: "Technologies de pointe régulièrement mises à jour",
                },
                {
                  title: "Amélioration Continue",
                  description: "Évaluation constante et optimisation de nos processus",
                },
              ].map((engagement, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#84BDE3]/30 hover:border-[#1E40AF]/20 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#1E40AF] mb-2">{engagement.title}</h3>
                      <p className="text-[#1E40AF]/70 text-sm sm:text-base leading-relaxed">{engagement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#84BDE3] text-[#1034A6]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Une Qualité de Service Exceptionnelle
            </h2>
            <p className="text-lg sm:text-xl text-[#1034A6]/90 mb-8 max-w-2xl mx-auto">
              Notre charte de qualité reflète notre engagement indéfectible envers votre santé et votre bien-être.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1E40AF] px-8 py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/90 transition-all hover:scale-105"
              >
                Créer un Compte
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-white hover:bg-white hover:text-[#1E40AF] transition-all"
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
