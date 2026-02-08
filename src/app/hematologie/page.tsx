"use client";

import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { ChevronRight, Droplet, Heart, Syringe, TestTube, Clock, CheckCircle, ArrowRight } from "lucide-react";

export default function HematologiePage() {
  const services = [
    { icon: Droplet, title: "NFS", desc: "Numération Formule Sanguine complète" },
    { icon: Heart, title: "Coagulation", desc: "TP, TCA, Fibrinogène, D-Dimères" },
    { icon: Syringe, title: "Groupage", desc: "ABO, Rhésus complet, Phénotype" },
    { icon: TestTube, title: "Transfusion", desc: "Bilan pré-transfusionnel complet" },
  ];

  const galleryImages = [
    { src: "/lab-photo-7.jpeg", title: "Analyse Sanguine", subtitle: "Précision maximale" },
    { src: "/lab-photo-1.jpeg", title: "Équipements Spécialisés", subtitle: "Technologie de pointe" },
    { src: "/lab-photo-2.jpeg", title: "Cytologie", subtitle: "Expertise cellulaire" },
    { src: "/lab-photo-3.jpeg", title: "Automatisation", subtitle: "Rapidité garantie" },
    { src: "/lab-photo-4.jpeg", title: "Contrôle Qualité", subtitle: "Fiabilité assurée" },
    { src: "/lab-photo-5.jpeg", title: "Laboratoire Moderne", subtitle: "Excellence continue" },
  ];

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-white">
        {/* Hero Section with Video Background */}
        <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/lab-video-2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
            <nav className="absolute top-8 left-6 flex items-center gap-2 text-white/80 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/#services" className="hover:text-white transition-colors">Nos Services</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Hématologie</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 text-lg font-medium">Analyses Sanguines</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Hématologie
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl">
                Numération complète et hémostase spécialisée. Expertise en analyses du sang et coagulation.
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">4h</p>
                    <p className="text-white/70 text-sm">Résultats NFS</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">80+</p>
                    <p className="text-white/70 text-sm">NFS/heure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-[#0A065D]/10 text-[#0A065D] text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-4">
                Nos Analyses
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                Services Hématologiques
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-[#0A065D]/20"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0A065D] to-[#0A065D]/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-[#FF6B00]/10 text-[#FF6B00] text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-4">
                Notre Expertise
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                Laboratoire de Pointe
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.map((image, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                    i === 0 ? 'col-span-2 row-span-2 h-[400px] md:h-[500px]' : 'h-[200px] md:h-[240px]'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#0A065D]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Besoin d'une Analyse ?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Résultats rapides et fiables pour toutes vos analyses hématologiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-3 bg-[#FF6B00] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#FF8C00] transition-all hover:scale-105"
              >
                Créer un Compte
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/30 hover:bg-white hover:text-[#0A065D] transition-all"
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
