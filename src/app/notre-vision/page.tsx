"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Eye, ChevronRight, Target, Users, Award, Microscope, HeartPulse, Shield } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function NotreVisionPage() {
  const { language } = useLanguage();

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/lab-photo-3.jpeg"
              alt={language === 'fr' ? 'Notre Vision' : 'Our Vision'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#5BA3E0]/90 via-[#6BB8E8]/85 to-[#87CEEB]/80"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                  {language === 'fr' ? 'Accueil' : 'Home'}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <Link href="/#about" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                  {language === 'fr' ? 'À Propos' : 'About'}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <span className="text-white text-sm sm:text-base">{language === 'fr' ? 'Notre Vision' : 'Our Vision'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {language === 'fr' ? 'Notre Vision' : 'Our Vision'}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                {language === 'fr'
                  ? "Excellence et innovation au service de la santé"
                  : 'Excellence and innovation in the service of health'
                }
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Eye className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">ISO 15189</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Award className="w-5 h-5 text-white" />
                  <span className="text-white text-sm sm:text-base font-medium">
                    {language === 'fr' ? 'Technologie de pointe' : 'Cutting-edge technology'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Vision Statement */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0A065D]/10 px-4 py-2 rounded-full mb-6">
                <Target className="w-5 h-5 text-[#0A065D]" />
                <span className="text-[#0A065D] font-semibold text-sm sm:text-base">
                  {language === 'fr' ? 'Notre Engagement' : 'Our Commitment'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {language === 'fr' ? 'Un Service de Qualité avec une Technologie de Pointe' : 'Quality Service with Cutting-Edge Technology'}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl border border-gray-100">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
                  {language === 'fr'
                    ? "Nous nous proposons d'offrir un service de qualité avec une technologie de pointe répondant aux exigences internationales en matière d'analyses médicales définies par la norme ISO 15189."
                    : 'We aim to offer quality service with cutting-edge technology meeting international requirements for medical analyses defined by ISO 15189 standard.'
                  }
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {language === 'fr'
                    ? "Cette approche nous permettra :"
                    : 'This approach will enable us to:'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/lab-photo-3.jpeg"
                alt={language === 'fr' ? 'Notre Vision - Laboratoire' : 'Our Vision - Laboratory'}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Two Main Objectives */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* First Objective */}
              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#5BA3E0] to-[#87CEEB] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Microscope className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      {language === 'fr' ? "D'une part" : 'On one hand'}
                    </h3>
                  </div>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                  {language === 'fr'
                    ? "Apporter notre contribution à la lutte contre certaines maladies récurrentes et endémiques dans la sous-région (drépanocytose, hépatites, cancers, maladies sexuellement transmissibles, etc…), en permettant de les dépister précocement par des techniques modernes :"
                    : 'Contribute to the fight against certain recurrent and endemic diseases in the sub-region (sickle cell disease, hepatitis, cancers, sexually transmitted diseases, etc.) by enabling early detection through modern techniques:'
                  }
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#0A065D]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="w-3.5 h-3.5 text-[#0A065D]" />
                    </div>
                    <span className="text-gray-700">
                      {language === 'fr' ? 'Électrophorèse capillaire' : 'Capillary electrophoresis'}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#0A065D]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="w-3.5 h-3.5 text-[#0A065D]" />
                    </div>
                    <span className="text-gray-700">
                      {language === 'fr'
                        ? 'Techniques de biologie moléculaire telle que la PCR en temps réel'
                        : 'Molecular biology techniques such as real-time PCR'
                      }
                    </span>
                  </li>
                </ul>
              </div>

              {/* Second Objective */}
              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#5BA3E0] to-[#87CEEB] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <HeartPulse className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      {language === 'fr' ? "D'autre part" : 'On the other hand'}
                    </h3>
                  </div>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                  {language === 'fr'
                    ? "Mettre à la disposition des praticiens des résultats précis, fiables et stables dans un délai relativement court leur permettant d'être plus efficaces dans la prise en charge des patients."
                    : 'Provide practitioners with accurate, reliable and stable results within a relatively short timeframe, enabling them to be more effective in patient care.'
                  }
                </p>
                <div className="bg-gradient-to-br from-[#0A065D]/5 to-[#0080FF]/5 rounded-xl p-6 border border-[#0A065D]/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-[#0A065D]" />
                    <h4 className="text-lg font-bold text-gray-900">
                      {language === 'fr' ? 'Avantages clés' : 'Key benefits'}
                    </h4>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#0A065D] font-bold">•</span>
                      <span>{language === 'fr' ? 'Résultats précis et fiables' : 'Accurate and reliable results'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0A065D] font-bold">•</span>
                      <span>{language === 'fr' ? 'Délai de rendu rapide' : 'Fast turnaround time'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0A065D] font-bold">•</span>
                      <span>{language === 'fr' ? 'Meilleure prise en charge des patients' : 'Better patient care'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {language === 'fr'
                ? 'Rejoignez Notre Mission'
                : 'Join Our Mission'
              }
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {language === 'fr'
                ? "Ensemble, contribuons à améliorer la santé dans notre région grâce à des analyses médicales de qualité supérieure."
                : 'Together, let\'s contribute to improving health in our region through superior medical analyses.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-[#0A065D] text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#0080FF] transition-all hover:scale-105 shadow-lg"
              >
                {language === 'fr' ? 'Créer un Compte' : 'Create an Account'}
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/nos-standards"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-[#0A065D] px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-[#0A065D] hover:bg-[#0A065D] hover:text-white transition-all"
              >
                {language === 'fr' ? 'Nos Standards' : 'Our Standards'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
