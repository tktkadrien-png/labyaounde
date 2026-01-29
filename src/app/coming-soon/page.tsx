"use client";

import React from "react";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Construction, ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function ComingSoonPage() {
  const { language } = useLanguage();

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#0047AB] to-[#0080FF] rounded-full flex items-center justify-center shadow-xl">
              <Construction className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {language === 'fr' ? 'Page en Construction' : 'Page Under Construction'}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            {language === 'fr'
              ? 'Cette page est actuellement en cours de développement. Nous travaillons activement pour vous offrir une meilleure expérience.'
              : 'This page is currently under development. We are actively working to bring you a better experience.'
            }
          </p>

          <div className="bg-gradient-to-br from-[#0047AB]/5 to-[#0080FF]/5 rounded-2xl p-8 border border-[#0047AB]/10 mb-8">
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              {language === 'fr'
                ? 'Cette page sera bientôt disponible avec:'
                : 'This page will soon be available with:'
              }
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0047AB] rounded-full"></span>
                {language === 'fr' ? 'Contenu détaillé et informatif' : 'Detailed and informative content'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0047AB] rounded-full"></span>
                {language === 'fr' ? 'Design moderne et responsive' : 'Modern and responsive design'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0047AB] rounded-full"></span>
                {language === 'fr' ? 'Informations à jour' : 'Up-to-date information'}
              </li>
            </ul>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#0047AB] text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#0080FF] transition-all hover:scale-105 shadow-lg"
          >
            <Home className="w-5 h-5" />
            {language === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
