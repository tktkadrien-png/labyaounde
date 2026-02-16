"use client";

import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Dna, Shield, FlaskConical, Lock, Award, Microscope, Activity, Fingerprint, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function ExpertiseGenetiquePage() {
  const { language } = useLanguage();

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0088FF] via-[#0077E6] to-[#0066CC]"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px]"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors">
                  {language === "fr" ? "Accueil" : "Home"}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <Link href="/#services" className="text-white/80 hover:text-white text-sm transition-colors">
                  {language === "fr" ? "Services" : "Services"}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <span className="text-white text-sm">{language === "fr" ? "Expertise Génétique" : "Genetic Expertise"}</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <Dna className="w-12 h-12 text-[#FF8500]" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  {language === "fr" ? "Expertise Génétique & Moléculaire" : "Genetic & Molecular Expertise"}
                </h1>
              </div>
              <p className="text-xl text-white/90 mb-6">
                {language === "fr"
                  ? "L'excellence technologique pour une médecine personnalisée."
                  : "Technological excellence for personalized medicine."
                }
              </p>
              <div className="w-24 h-1.5 bg-[#FF8500] rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* Grande Carte - Séquençage (60% - 3 colonnes) */}
              <div className="lg:col-span-3 bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#0F172A] rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
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
                    <div className="w-14 h-14 bg-[#FF8500] rounded-2xl flex items-center justify-center shadow-lg">
                      <Microscope className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
                      {language === "fr" ? "Séquençage & Pharmacogénomique" : "Sequencing & Pharmacogenomics"}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Suivi Viral */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="w-10 h-10 bg-[#FF8500]/20 rounded-xl flex items-center justify-center mb-4">
                        <Activity className="w-5 h-5 text-[#FF8500]" />
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
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="w-10 h-10 bg-[#FF8500]/20 rounded-xl flex items-center justify-center mb-4">
                        <Shield className="w-5 h-5 text-[#FF8500]" />
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
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="w-10 h-10 bg-[#FF8500]/20 rounded-xl flex items-center justify-center mb-4">
                        <Dna className="w-5 h-5 text-[#FF8500]" />
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
                    <div className="w-12 h-12 bg-[#FF8500] rounded-xl flex items-center justify-center">
                      <FlaskConical className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1E40AF]">
                      {language === "fr" ? "Dépistage de Référence (PCR)" : "Reference Screening (PCR)"}
                    </h3>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-[#1E40AF]/60 font-medium mb-3 uppercase tracking-wide">
                      {language === "fr" ? "Infections Sexuellement Transmissibles" : "Sexually Transmitted Infections"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 bg-[#1E40AF] text-white rounded-full text-sm font-semibold">Chlamydia</span>
                      <span className="px-4 py-2 bg-[#1E40AF]/80 text-white rounded-full text-sm font-semibold">N. gonorrhoeae</span>
                      <span className="px-4 py-2 bg-[#1E40AF]/60 text-white rounded-full text-sm font-semibold">M. genitalium</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#1E40AF]/70 text-sm">
                    <div className="w-2 h-2 bg-[#FF8500] rounded-full animate-pulse"></div>
                    <span>{language === "fr" ? "Pathogènes émergents & COVID-19" : "Emerging pathogens & COVID-19"}</span>
                  </div>
                </div>

                {/* Carte ADN & Parenté - Fond bleu */}
                <div className="flex-1 bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] rounded-3xl p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-full blur-2xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#FF8500] rounded-xl flex items-center justify-center">
                        <Fingerprint className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {language === "fr" ? "Tests d'ADN & Parenté" : "DNA & Paternity Tests"}
                      </h3>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="w-6 h-6 text-[#FF8500]" />
                        <span className="text-white font-bold text-lg">Cellmark Orchid UK</span>
                      </div>
                      <p className="text-white/70 text-sm">
                        {language === "fr" ? "Partenariat exclusif" : "Exclusive partnership"}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">
                        {language === "fr" ? "Exclusion de paternité" : "Paternity Exclusion"}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                      <Lock className="w-5 h-5 text-[#FF8500]" />
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

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-[#F0F7FF] to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E40AF] mb-6">
              {language === "fr" ? "Besoin d'un Test ADN ?" : "Need a DNA Test?"}
            </h2>
            <p className="text-lg text-[#1E40AF]/70 mb-8">
              {language === "fr"
                ? "Contactez-nous pour plus d'informations sur nos services d'expertise génétique."
                : "Contact us for more information about our genetic expertise services."
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#FF8500] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#E87000] transition-all hover:scale-105"
              >
                {language === "fr" ? "Nous Contacter" : "Contact Us"}
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/empreintes-genetiques"
                className="inline-flex items-center gap-2 bg-transparent text-[#1E40AF] px-8 py-4 rounded-xl font-semibold border-2 border-[#1E40AF] hover:bg-[#1E40AF] hover:text-white transition-all"
              >
                {language === "fr" ? "Empreintes Génétiques" : "Genetic Fingerprints"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
