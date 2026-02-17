"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { Dna, Shield, FlaskConical, Lock, Award, Microscope, Activity, Fingerprint } from "lucide-react";

const heroImages = [
  "/IMAGE/indra-projects-69mcrR37vZU-unsplash.jpg",
  "/IMAGE/louis-reed-pwcKF7L4-no-unsplash (2).jpg",
  "/IMAGE/marco-j-haenssgen-7mlPdAFXyls-unsplash.jpg",
  "/IMAGE/Medical & Health Education Website Template_ Professional Website Design.jpg",
  "/IMAGE/mezidi-zineb-P6ayjlwUe7c-unsplash.jpg",
];

const ExpertiseGenetique = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-16 md:py-24 overflow-hidden">
      {/* Image Slider Background */}
      <div className="absolute inset-0">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt={`Expertise Génétique - ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-[#FF8500] w-8"
                : "bg-white/50 w-2.5 hover:bg-white/75"
            }`}
            aria-label={`Image ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-white/30">
            <Dna className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-sm tracking-wide">
              {language === "fr" ? "NOS SERVICES" : "OUR SERVICES"}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
            {language === "fr" ? "Expertise Génétique & Moléculaire" : "Genetic & Molecular Expertise"}
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            {language === "fr"
              ? "L'excellence technologique pour une médecine personnalisée."
              : "Technological excellence for personalized medicine."
            }
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Grande Carte - Séquençage (60% - 3 colonnes) */}
          <div className="lg:col-span-3 bg-gradient-to-br from-[#0A065D] via-[#0D1B6D] to-[#050330] rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            {/* DNA Helix Background Pattern */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-5">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path d="M50,0 Q100,50 50,100 Q0,150 50,200" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M150,0 Q100,50 150,100 Q200,150 150,200" stroke="white" strokeWidth="2" fill="none"/>
                <line x1="50" y1="25" x2="150" y2="25" stroke="white" strokeWidth="1"/>
                <line x1="50" y1="75" x2="150" y2="75" stroke="white" strokeWidth="1"/>
                <line x1="50" y1="125" x2="150" y2="125" stroke="white" strokeWidth="1"/>
                <line x1="50" y1="175" x2="150" y2="175" stroke="white" strokeWidth="1"/>
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Microscope className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
                  {language === "fr" ? "Séquençage & Pharmacogénomique" : "Sequencing & Pharmacogenomics"}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Suivi Viral */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group/card">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Activity className="w-5 h-5 text-red-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {language === "fr" ? "Suivi Viral" : "Viral Monitoring"}
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {language === "fr"
                      ? "Charges virales de VIH, HCV et HBV"
                      : "Viral loads for HIV, HCV and HBV"
                    }
                  </p>
                  <div className="flex gap-2 mt-4">
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/80 font-medium">VIH</span>
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/80 font-medium">HCV</span>
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/80 font-medium">HBV</span>
                  </div>
                </div>

                {/* Résistances */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group/card">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5 text-orange-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {language === "fr" ? "Résistances" : "Resistance"}
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {language === "fr"
                      ? "Génotypage et séquençage pour les mécanismes de résistance aux anti-infectieux"
                      : "Genotyping and sequencing for anti-infective resistance mechanisms"
                    }
                  </p>
                </div>

                {/* Précision */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group/card">
                  <div className="w-10 h-10 bg-[#93C5FD]/20 rounded-xl flex items-center justify-center mb-4">
                    <Dna className="w-5 h-5 text-[#93C5FD]" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {language === "fr" ? "Précision" : "Precision"}
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {language === "fr"
                      ? "Adaptation du traitement selon le profil génétique du pathogène"
                      : "Treatment adaptation based on pathogen genetic profile"
                    }
                  </p>
                </div>
              </div>

              {/* Hover text */}
              <p className="mt-8 text-white/50 text-sm italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {language === "fr"
                  ? "L'expertise génétique au service du patient."
                  : "Genetic expertise at the service of the patient."
                }
              </p>
            </div>
          </div>

          {/* Colonne droite - 2 cartes empilées */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Carte PCR - Fond clair */}
            <div className="flex-1 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#0A065D]/10 rounded-xl flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-[#0A065D]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A065D]">
                  {language === "fr" ? "Dépistage de Référence (PCR)" : "Reference Screening (PCR)"}
                </h3>
              </div>

              {/* Tags IST */}
              <div className="mb-6">
                <p className="text-sm text-[#0A065D]/60 font-medium mb-3 uppercase tracking-wide">
                  {language === "fr" ? "Infections Sexuellement Transmissibles" : "Sexually Transmitted Infections"}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-[#0A065D] text-white rounded-full text-sm font-semibold">Chlamydia</span>
                  <span className="px-4 py-2 bg-[#0A065D]/80 text-white rounded-full text-sm font-semibold">N. gonorrhoeae</span>
                  <span className="px-4 py-2 bg-[#0A065D]/60 text-white rounded-full text-sm font-semibold">M. genitalium</span>
                </div>
              </div>

              {/* Pathogènes émergents */}
              <div className="flex items-center gap-2 text-[#0A065D]/70 text-sm">
                <div className="w-2 h-2 bg-[#FF8500] rounded-full animate-pulse"></div>
                <span>{language === "fr" ? "Pathogènes émergents & COVID-19" : "Emerging pathogens & COVID-19"}</span>
              </div>
            </div>

            {/* Carte ADN & Parenté - Fond bleu roi */}
            <div className="flex-1 bg-gradient-to-br from-[#0A065D] to-[#1E3A8A] rounded-3xl p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              {/* Gold accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Fingerprint className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {language === "fr" ? "Tests d'ADN & Parenté" : "DNA & Paternity Tests"}
                    </h3>
                  </div>
                </div>

                {/* Cellmark Logo/Badge */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-6 h-6 text-amber-400" />
                    <span className="text-white font-bold text-lg">Cellmark Orchid UK</span>
                  </div>
                  <p className="text-white/70 text-sm">
                    {language === "fr" ? "Partenariat exclusif" : "Exclusive partnership"}
                  </p>
                </div>

                {/* Exclusion de paternité */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">
                    {language === "fr" ? "Exclusion de paternité" : "Paternity Exclusion"}
                  </h4>
                </div>

                {/* Sécurité */}
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                  <Lock className="w-5 h-5 text-[#93C5FD]" />
                  <div>
                    <p className="text-white text-sm font-medium">
                      {language === "fr" ? "Protocoles de haute sécurité" : "High security protocols"}
                    </p>
                    <p className="text-white/60 text-xs">
                      {language === "fr" ? "Confidentialité & Intégrité totale" : "Complete confidentiality & integrity"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExpertiseGenetique;
