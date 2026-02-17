"use client";

import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Users, ChevronRight, Building2 } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function OrganigrammePage() {
  const { language } = useLanguage();

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-[#F0F7FF] to-white">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden">
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/lab-video-3.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors">
                  {language === "fr" ? "Accueil" : "Home"}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <Link href="/#about" className="text-white/80 hover:text-white text-sm transition-colors">
                  {language === "fr" ? "À Propos" : "About"}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <span className="text-white text-sm">{language === "fr" ? "Organigramme" : "Organization Chart"}</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <Building2 className="w-12 h-12 text-[#FF8500] drop-shadow-lg" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
                  {language === "fr" ? "Notre Organigramme" : "Our Organization Chart"}
                </h1>
              </div>
              <p className="text-xl text-white/90 mb-6 drop-shadow-md">
                {language === "fr"
                  ? "Structure organisationnelle du Laboratoire d'Analyses Biologiques de Yaoundé"
                  : "Organizational structure of the Yaoundé Biological Analysis Laboratory"
                }
              </p>
              <div className="w-24 h-1.5 bg-[#FF8500] rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Organigramme Image */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-[#FF8500]/10 text-[#1E40AF] text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded-full mb-4 border border-[#FF8500]/20">
                <Users className="w-4 h-4 text-[#FF8500]" />
                {language === "fr" ? "Organisation" : "Organization"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-4">
                {language === "fr" ? "Structure de LABY" : "LABY Structure"}
              </h2>
              <p className="text-lg text-[#1E40AF]/70 max-w-3xl mx-auto">
                {language === "fr"
                  ? "Une organisation structurée pour garantir l'excellence et la qualité de nos services."
                  : "A structured organization to ensure excellence and quality of our services."
                }
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-8 border border-gray-100">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden">
                <Image
                  src="/IMAGE/WhatsApp Image 2026-02-16 at 07.17.29.jpeg"
                  alt={language === "fr" ? "Organigramme LABY" : "LABY Organization Chart"}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E40AF] mb-6">
              {language === "fr" ? "Rejoignez Notre Équipe" : "Join Our Team"}
            </h2>
            <p className="text-lg text-[#1E40AF]/70 mb-8">
              {language === "fr"
                ? "Découvrez les opportunités de carrière au sein de notre laboratoire."
                : "Discover career opportunities within our laboratory."
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/carrieres"
                className="inline-flex items-center gap-2 bg-[#FF8500] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#E87000] transition-all hover:scale-105"
              >
                {language === "fr" ? "Nos Offres d'Emploi" : "Job Offers"}
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/notre-equipe"
                className="inline-flex items-center gap-2 bg-transparent text-[#1E40AF] px-8 py-4 rounded-xl font-semibold border-2 border-[#1E40AF] hover:bg-[#1E40AF] hover:text-white transition-all"
              >
                {language === "fr" ? "Notre Équipe" : "Our Team"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
