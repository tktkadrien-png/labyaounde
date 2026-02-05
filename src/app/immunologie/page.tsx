"use client";

import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Activity, Clock, ChevronRight, Shield, Virus, Scan, AlertCircle } from "lucide-react";

export default function ImmunologiePage() {
  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/trnava-university-_9xRHrMOjeg-unsplash.jpg"
              alt="Laboratoire d'Immunologie"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] via-[#7C3AED]/80 to-transparent"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6">
                <Shield className="w-5 h-5 text-[#7C3AED]" />
                <span className="text-[#7C3AED] font-semibold">Système Immunitaire</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Immunologie
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Sérologie infectieuse et auto-immunité
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                  <Activity className="w-6 h-6 text-white" />
                  <div>
                    <p className="text-white font-bold text-lg">100+</p>
                    <p className="text-white/70 text-sm">Tests/jour</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                  <Clock className="w-6 h-6 text-white" />
                  <div>
                    <p className="text-white font-bold text-lg">24/7</p>
                    <p className="text-white/70 text-sm">Service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Cards */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#7C3AED] font-bold text-lg uppercase tracking-wider">Nos Tests</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0A065D] mt-4">Analyses Immunologiques</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Virus, title: "VIH", desc: "Dépistage & Suivi" },
                { icon: Shield, title: "Hépatites", desc: "A, B, C, D, E" },
                { icon: Scan, title: "Auto-Ac", desc: "Anticorps auto-immuns" },
                { icon: AlertCircle, title: "Allergies", desc: "IgE spécifiques" },
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#7C3AED] to-[#9333EA] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A065D] mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="py-20 bg-[#0A065D]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#7C3AED] font-bold text-lg uppercase tracking-wider">Notre Expertise</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-4">Technologie Avancée</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group col-span-2 md:col-span-1">
                <Image src="/cdc-w9KEokhajKw-unsplash.jpg" alt="Sérologie" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">Sérologie</h3>
                </div>
              </div>

              <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group">
                <Image src="/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg" alt="Auto-immunité" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-xl font-bold text-white">Auto-immunité</h3>
                </div>
              </div>

              <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group">
                <Image src="/national-cancer-institute-NFvdKIhxYlU-unsplash.jpg" alt="Allergologie" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-xl font-bold text-white">Allergologie</h3>
                </div>
              </div>

              <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group col-span-2">
                <Image src="/cdc-D5CqnSYdTjM-unsplash.jpg" alt="Laboratoire" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">Plateforme Automatisée</h3>
                  <p className="text-white/70">Résultats fiables</p>
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
              Dépistage et diagnostic immunologique complet
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
