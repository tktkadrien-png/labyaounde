"use client";

import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Activity, Clock, ChevronRight, Beaker, Heart, Droplets, Microscope } from "lucide-react";

export default function BiochimieClinikPage() {
  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen">
        {/* Hero Section - Full Screen with Overlay */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/lab-photo-1.jpeg"
              alt="Laboratoire de Biochimie Clinique"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A065D] via-[#0A065D]/80 to-transparent"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#FF6B00] px-4 py-2 rounded-full mb-6">
                <Beaker className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Excellence Diagnostique</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Biochimie<br/>Clinique
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Technologies de pointe pour des diagnostics précis et fiables
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                  <Activity className="w-6 h-6 text-[#FF6B00]" />
                  <div>
                    <p className="text-white font-bold text-lg">250+</p>
                    <p className="text-white/70 text-sm">Tests/heure</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                  <Clock className="w-6 h-6 text-[#FF6B00]" />
                  <div>
                    <p className="text-white font-bold text-lg">24/7</p>
                    <p className="text-white/70 text-sm">Disponibilité</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white/70 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Services Cards */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#FF6B00] font-bold text-lg uppercase tracking-wider">Nos Spécialités</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0A065D] mt-4">Domaines d'Expertise</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Heart, title: "Diabète", desc: "Glycémie, HbA1c, Courbes" },
                { icon: Droplets, title: "Lipides", desc: "Cholestérol, HDL, LDL" },
                { icon: Activity, title: "Cardiaque", desc: "Troponines, BNP" },
                { icon: Microscope, title: "Rénal", desc: "Créatinine, Urée" },
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A065D] mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Gallery - Masonry Style */}
        <section className="py-20 bg-[#0A065D]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#FF6B00] font-bold text-lg uppercase tracking-wider">Notre Laboratoire</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-4">Équipements Modernes</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group col-span-2 md:col-span-1">
                <Image src="/lab-photo-2.jpeg" alt="Équipement" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">Automates</h3>
                  <p className="text-white/70">Dernière génération</p>
                </div>
              </div>

              <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group">
                <Image src="/lab-photo-3.jpeg" alt="Analyses" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-xl font-bold text-white">Précision</h3>
                </div>
              </div>

              <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group">
                <Image src="/lab-photo-4.jpeg" alt="Résultats" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-xl font-bold text-white">Rapidité</h3>
                </div>
              </div>

              <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group col-span-2">
                <Image src="/lab-photo-5.jpeg" alt="Laboratoire" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">Environnement Contrôlé</h3>
                  <p className="text-white/70">Qualité garantie</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              Besoin d'une Analyse ?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Notre équipe d'experts est disponible 24h/24 pour répondre à vos besoins
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#FF6B00] px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
              >
                Créer un Compte
                <ChevronRight className="w-6 h-6" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-transparent text-white px-10 py-5 rounded-2xl font-bold text-xl border-2 border-white hover:bg-white hover:text-[#FF6B00] transition-all"
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
