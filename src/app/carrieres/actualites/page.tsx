"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Calendar, ChevronRight, Newspaper, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function ActualitesPage() {
  const { language } = useLanguage();

  const news = [
    {
      title: "Nouvelle technologie PCR en temps réel",
      date: "15 Novembre 2025",
      image: "/images/pexels-artempodrez-5726705.jpg",
      excerpt: "Notre laboratoire s'équipe d'une nouvelle technologie PCR permettant des analyses plus rapides et précises.",
      category: "Technologie",
    },
    {
      title: "Certification ISO 15189 renouvelée",
      date: "10 Novembre 2025",
      image: "/images/pexels-artempodrez-5726837.jpg",
      excerpt: "Lab Yaoundé renouvelle sa certification ISO 15189, témoignant de notre engagement qualité.",
      category: "Certification",
    },
    {
      title: "Journée portes ouvertes",
      date: "5 Novembre 2025",
      image: "/images/pexels-artempodrez-5726706.jpg",
      excerpt: "Retrouvez-nous le 20 décembre pour découvrir nos installations et rencontrer notre équipe.",
      category: "Événement",
    },
  ];

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/vision-hero.png"
              alt={language === 'fr' ? 'Actualités' : 'News'}
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
                  {language === 'fr' ? 'Accueil' : 'Home'}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <Link href="/carrieres" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                  {language === 'fr' ? 'Carrières' : 'Careers'}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <span className="text-white text-sm sm:text-base">{language === 'fr' ? 'Actualités' : 'News'}</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Link
                  href="/carrieres"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm">{language === 'fr' ? 'Retour' : 'Back'}</span>
                </Link>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {language === 'fr' ? 'Toutes nos Actualités' : 'All our News'}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                {language === 'fr'
                  ? "Restez informé des dernières nouvelles de notre laboratoire"
                  : 'Stay informed about our laboratory latest news'}
              </p>
            </div>
          </div>
        </section>

        {/* News Grid Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-56">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#0B3D5F] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{item.excerpt}</p>
                    <button className="inline-flex items-center gap-2 text-[#0B3D5F] font-semibold hover:gap-3 transition-all">
                      {language === 'fr' ? 'Lire plus' : 'Read more'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State - Can be shown when no news */}
            {news.length === 0 && (
              <div className="text-center py-20">
                <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {language === 'fr' ? 'Aucune actualité pour le moment' : 'No news at the moment'}
                </h3>
                <p className="text-gray-600">
                  {language === 'fr'
                    ? 'Revenez bientôt pour découvrir nos dernières actualités'
                    : 'Come back soon to discover our latest news'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl p-8 sm:p-12 text-white">
              <Newspaper className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                {language === 'fr' ? 'Restez connecté' : 'Stay connected'}
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {language === 'fr'
                  ? 'Suivez-nous sur nos réseaux sociaux pour ne rien manquer de nos actualités'
                  : 'Follow us on social media to stay updated'}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0B3D5F] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
              >
                {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
