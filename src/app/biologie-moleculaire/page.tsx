"use client";

import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Activity, ChevronRight } from "lucide-react";

export default function BiologieMoleculairePage() {
  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/louis-reed-pwcKF7L4-no-unsplash.jpg"
              alt="Laboratoire de Biologie Moléculaire"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/90 to-[#2563EB]/60"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Biologie Moléculaire
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                PCR et analyses génétiques de pointe
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-full">
                  <Activity className="w-5 h-5 text-white" />
                  <span className="text-white text-lg font-medium">PCR temps réel</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-full">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white text-lg font-medium">Résultats rapides</span>
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
                  src="/national-cancer-institute-NFvdKIhxYlU-unsplash.jpg"
                  alt="PCR"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white">PCR Temps Réel</h3>
                </div>
              </div>

              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"
                  alt="Génétique"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white">Analyses Génétiques</h3>
                </div>
              </div>

              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/cdc-D5CqnSYdTjM-unsplash.jpg"
                  alt="Séquençage"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white">Séquençage ADN</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-gradient-to-br from-[#FE5000] to-[#CC4000]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-2">COVID-19</h3>
                <p className="text-white/80">PCR & Antigènes</p>
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-2">VIH</h3>
                <p className="text-white/80">Charge virale</p>
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-2">Hépatites</h3>
                <p className="text-white/80">PCR quantitative</p>
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-2">Génétique</h3>
                <p className="text-white/80">Mutations</p>
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
                  src="/national-cancer-institute-uVnRa6mOLOM-unsplash.jpg"
                  alt="Laboratoire PCR"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/lucas-vasques-9vnACvX2748-unsplash.jpg"
                  alt="Équipement"
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
