"use client";

import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Activity, Clock, ChevronRight } from "lucide-react";

export default function BiochimieClinikPage() {
  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/pexels-ivan-s-9629721.jpg"
              alt="Laboratoire de Biochimie Clinique"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A065D]/90 to-[#0A065D]/60"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Biochimie Clinique
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Excellence technologique et précision diagnostique
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-full">
                  <Activity className="w-5 h-5 text-white" />
                  <span className="text-white text-lg font-medium">250+ tests/heure</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-full">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white text-lg font-medium">24h/24 - 7j/7</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Images Gallery */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/pexels-artempodrez-5726837.jpg"
                  alt="Équipement moderne"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white">Équipement Moderne</h3>
                </div>
              </div>

              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/pexels-karola-g-8539753.jpg"
                  alt="Analyses précises"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white">Analyses Précises</h3>
                </div>
              </div>

              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/pexels-artempodrez-5726705.jpg"
                  alt="Résultats rapides"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white">Résultats Rapides</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services rapides */}
        <section className="py-16 bg-gradient-to-br from-[#FE5000] to-[#CC4000]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-2">Diabète</h3>
                <p className="text-white/80">Dépistage & Suivi</p>
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-2">Cœur</h3>
                <p className="text-white/80">Marqueurs cardiaques</p>
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-2">Reins</h3>
                <p className="text-white/80">Fonction rénale</p>
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-2">Lipides</h3>
                <p className="text-white/80">Bilan complet</p>
              </div>
            </div>
          </div>
        </section>

        {/* More Images */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/pexels-artempodrez-5726788.jpg"
                  alt="Système informatique"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/pexels-artempodrez-5726706.jpg"
                  alt="Contrôle qualité"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#0A065D]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Besoin d'une Analyse ?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-[#FE5000] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#CC4000] transition-all"
              >
                Créer un Compte
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0A065D] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all"
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
