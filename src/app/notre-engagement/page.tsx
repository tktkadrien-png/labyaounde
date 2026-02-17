"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Shield, Target, Users, Zap, Leaf, Scale, Heart, Clock, ChevronRight, Activity } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

const heroImages = [
  "/IMAGE/adam-bezer-k6HAXK61FWw-unsplash.jpg",
  "/IMAGE/adam-bezer-oJnENqfM_H0-unsplash.jpg",
  "/IMAGE/akram-huseyn-fKC9eWRnlGY-unsplash (2).jpg",
  "/IMAGE/cdc-CfS6A4U5g8M-unsplash.jpg",
  "/IMAGE/cdc-wDxFn_dBEC0-unsplash (2).jpg",
  "/IMAGE/4fb4a527-1136-4d24-85fc-46930507195f.jpg",
];

export default function NotreEngagementPage() {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  const engagementCards = [
    {
      icon: Shield,
      title: language === "fr" ? "Sécurité" : "Safety",
      description: language === "fr"
        ? "Protocoles d'hygiène et identitovigilance à zéro risque."
        : "Zero-risk hygiene protocols and identity vigilance.",
    },
    {
      icon: Target,
      title: language === "fr" ? "Efficacité" : "Efficiency",
      description: language === "fr"
        ? "Expertise médicale et technologies de pointe pour un diagnostic sûr."
        : "Medical expertise and cutting-edge technologies for reliable diagnosis.",
    },
    {
      icon: Users,
      title: language === "fr" ? "Patient d'abord" : "Patient First",
      description: language === "fr"
        ? "Service confidentiel fondé sur l'écoute et le respect."
        : "Confidential service based on listening and respect.",
    },
    {
      icon: Zap,
      title: language === "fr" ? "Rapidité" : "Speed",
      description: language === "fr"
        ? "Délais optimisés pour vos prises en charge urgentes."
        : "Optimized timelines for your urgent care needs.",
    },
    {
      icon: Leaf,
      title: language === "fr" ? "Efficience" : "Efficiency",
      description: language === "fr"
        ? "Gestion intelligente des ressources pour un service au juste prix."
        : "Smart resource management for fair-priced service.",
    },
    {
      icon: Scale,
      title: language === "fr" ? "Équité" : "Equity",
      description: language === "fr"
        ? "Accès universel à la haute qualité, sans distinction."
        : "Universal access to high quality, without discrimination.",
    },
  ];

  const urgencyItems = {
    ultraUrgent: [
      {
        name: language === "fr" ? "Gaz du sang complet" : "Complete Blood Gas",
        detail: language === "fr" ? "27 paramètres : pH, gaz, électrolytes, oxymétrie" : "27 parameters: pH, gases, electrolytes, oximetry"
      },
      {
        name: language === "fr" ? "Lactates" : "Lactates",
        detail: language === "fr" ? "Dosage instantané pour le suivi des chocs" : "Instant dosing for shock monitoring"
      }
    ],
    critical: [
      {
        name: language === "fr" ? "Exploration du cœur et des vaisseaux" : "Heart and Vessel Exploration",
        detail: "Troponine, D-Dimères"
      },
      {
        name: language === "fr" ? "Infection sévère & sepsis" : "Severe Infection & Sepsis",
        detail: "Procalcitonine"
      },
      {
        name: language === "fr" ? "Bilan vital & rénal" : "Vital & Renal Assessment",
        detail: language === "fr" ? "Urée, créatinine, glycémie, NFS" : "Urea, creatinine, glucose, CBC"
      },
      {
        name: language === "fr" ? "Transfusion" : "Transfusion",
        detail: language === "fr" ? "Groupe Sanguin / Rhésus" : "Blood Type / Rhesus"
      }
    ],
    rapid: [
      {
        name: language === "fr" ? "Maternité" : "Maternity",
        detail: language === "fr" ? "β-HCG (Grossesse)" : "β-HCG (Pregnancy)"
      },
      {
        name: language === "fr" ? "Fièvres" : "Fevers",
        detail: language === "fr" ? "Goutte épaisse & TDR paludisme" : "Thick smear & malaria RDT"
      }
    ]
  };

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-[#F0F7FF] to-white">
        {/* Hero Section with Image Slider */}
        <section className="relative h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden">
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
                  alt={`Notre Engagement - ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-black/30"></div>
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

          <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors">
                  {language === "fr" ? "Accueil" : "Home"}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <span className="text-white text-sm">{language === "fr" ? "Notre Engagement" : "Our Commitment"}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                {language === "fr" ? "Notre Engagement" : "Our Commitment"}
              </h1>
              <p className="text-xl text-white/90 mb-6 drop-shadow-md">
                {language === "fr"
                  ? "Une expertise certifiée ISO 15189, alliée aux normes de l'OMS."
                  : "ISO 15189 certified expertise, combined with WHO standards."
                }
              </p>
              <div className="w-24 h-1.5 bg-[#FF8500] rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Mot du Biologiste Directeur */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] rounded-3xl p-8 md:p-12 border border-[#E2E8F0] shadow-xl relative overflow-hidden">
              <div className="absolute top-4 left-6 text-[120px] text-[#1E40AF]/10 font-serif leading-none">"</div>
              <div className="absolute bottom-4 right-6 text-[120px] text-[#1E40AF]/10 font-serif leading-none rotate-180">"</div>

              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1E40AF] mb-6">
                  {language === "fr" ? "Mot du Biologiste Directeur" : "Message from the Director Biologist"}
                </h2>
                <p className="text-lg md:text-xl text-[#1E40AF]/90 italic leading-relaxed max-w-4xl">
                  {language === "fr"
                    ? "Derrière chaque échantillon, il y a une vie et une famille qui attendent des réponses. Mon engagement, aux côtés de l'équipe LABY, est de transformer notre rigueur technique conforme à la norme ISO 15189 en une réponse de certitude. Nous ne rendons pas seulement des résultats, mais aussi des réponses fiables, avec la précision nécessaire pour évaluer votre état de santé."
                    : "Behind every sample, there is a life and a family waiting for answers. My commitment, alongside the LABY team, is to transform our technical rigor compliant with ISO 15189 into a response of certainty. We don't just deliver results, but reliable answers with the precision needed to assess your health status."
                  }
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF8500] to-[#E87000] rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1E40AF]">{language === "fr" ? "Direction LABY" : "LABY Management"}</p>
                    <p className="text-[#1E40AF]/70 text-sm">{language === "fr" ? "Laboratoire d'Analyses Biologiques de Yaoundé" : "Yaoundé Biological Analysis Laboratory"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Cartes d'Engagement Qualité */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-[#FF8500]/10 text-[#1E40AF] text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded-full mb-4 border border-[#FF8500]/20">
                <Shield className="w-4 h-4 text-[#FF8500]" />
                {language === "fr" ? "Excellence Certifiée" : "Certified Excellence"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-4">
                {language === "fr" ? "Notre Engagement Qualité" : "Our Quality Commitment"}
              </h2>
              <p className="text-lg text-[#1E40AF]/70 max-w-3xl mx-auto">
                {language === "fr"
                  ? "Une expertise certifiée ISO 15189, alliée aux normes de l'OMS."
                  : "ISO 15189 certified expertise, combined with WHO standards."
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {engagementCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-[#FF8500] rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1E40AF] mb-2">{card.title}</h3>
                    <p className="text-[#1E40AF]/70">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pôle Urgence & Réanimation */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#1E40AF] rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF8500]/10 rounded-full blur-[80px]"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-[#FF8500] rounded-xl flex items-center justify-center shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {language === "fr" ? "Pôle Urgence & Réanimation" : "Emergency & Resuscitation Unit"}
                    </h2>
                    <p className="text-white/80">
                      {language === "fr" ? "La précision médicale à la vitesse de l'urgence vitale." : "Medical precision at the speed of vital emergency."}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Ultra Urgence */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-bold text-white">{language === "fr" ? "Ultra urgence" : "Ultra Emergency"}</h3>
                      <span className="text-red-400 text-sm font-medium">{"< 5 min"}</span>
                    </div>
                    <ul className="space-y-3">
                      {urgencyItems.ultraUrgent.map((item, idx) => (
                        <li key={idx} className="text-white/90">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-white/70 text-sm">{item.detail}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Urgence Critique */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-4 h-4 bg-[#FF8500] rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-bold text-white">{language === "fr" ? "Urgence critique" : "Critical Emergency"}</h3>
                      <span className="text-[#FF8500] text-sm font-medium">20-60 min</span>
                    </div>
                    <ul className="space-y-3">
                      {urgencyItems.critical.map((item, idx) => (
                        <li key={idx} className="text-white/90">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-white/70 text-sm">{item.detail}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Diagnostic Rapide */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-bold text-white">{language === "fr" ? "Diagnostic Rapide" : "Rapid Diagnosis"}</h3>
                    </div>
                    <ul className="space-y-3">
                      {urgencyItems.rapid.map((item, idx) => (
                        <li key={idx} className="text-white/90">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-white/70 text-sm">{item.detail}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E40AF] mb-6">
              {language === "fr" ? "Découvrez Nos Services" : "Discover Our Services"}
            </h2>
            <p className="text-lg text-[#1E40AF]/70 mb-8">
              {language === "fr"
                ? "Explorez notre gamme complète d'analyses médicales de haute qualité."
                : "Explore our complete range of high-quality medical analyses."
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/expertise-genetique"
                className="inline-flex items-center gap-2 bg-[#FF8500] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#E87000] transition-all hover:scale-105"
              >
                {language === "fr" ? "Expertise Génétique" : "Genetic Expertise"}
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/nos-standards"
                className="inline-flex items-center gap-2 bg-transparent text-[#1E40AF] px-8 py-4 rounded-xl font-semibold border-2 border-[#1E40AF] hover:bg-[#1E40AF] hover:text-white transition-all"
              >
                {language === "fr" ? "Nos Standards" : "Our Standards"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
