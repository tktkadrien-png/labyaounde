"use client";

import React from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { Shield, Target, Users, Zap, Leaf, Scale, Heart, Clock, Droplets } from "lucide-react";

const NotreEngagement = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { language } = useLanguage();

  const engagementCards = [
    {
      icon: Shield,
      title: language === "fr" ? "Sécurité" : "Safety",
      description: language === "fr"
        ? "Protocoles d'hygiène et identitovigilance à zéro risque."
        : "Zero-risk hygiene protocols and identity vigilance.",
      color: "from-[#0A065D] to-[#1E3A8A]"
    },
    {
      icon: Target,
      title: language === "fr" ? "Efficacité" : "Efficiency",
      description: language === "fr"
        ? "Expertise médicale et technologies de pointe pour un diagnostic sûr."
        : "Medical expertise and cutting-edge technologies for reliable diagnosis.",
      color: "from-[#FF8500] to-[#E87000]"
    },
    {
      icon: Users,
      title: language === "fr" ? "Patient d'abord" : "Patient First",
      description: language === "fr"
        ? "Service confidentiel fondé sur l'écoute et le respect."
        : "Confidential service based on listening and respect.",
      color: "from-[#0A065D] to-[#1E3A8A]"
    },
    {
      icon: Zap,
      title: language === "fr" ? "Rapidité" : "Speed",
      description: language === "fr"
        ? "Délais optimisés pour vos prises en charge urgentes."
        : "Optimized timelines for your urgent care needs.",
      color: "from-[#FF8500] to-[#E87000]"
    },
    {
      icon: Leaf,
      title: language === "fr" ? "Efficience" : "Efficiency",
      description: language === "fr"
        ? "Gestion intelligente des ressources pour un service au juste prix."
        : "Smart resource management for fair-priced service.",
      color: "from-[#0A065D] to-[#1E3A8A]"
    },
    {
      icon: Scale,
      title: language === "fr" ? "Équité" : "Equity",
      description: language === "fr"
        ? "Accès universel à la haute qualité, sans distinction."
        : "Universal access to high quality, without discrimination.",
      color: "from-[#FF8500] to-[#E87000]"
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
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 md:py-24 bg-gradient-to-b from-[#F0F7FF] to-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mot du Biologiste Directeur */}
        <div className={`mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] rounded-3xl p-8 md:p-12 border border-[#E2E8F0] shadow-xl relative overflow-hidden">
            {/* Decorative quote marks */}
            <div className="absolute top-4 left-6 text-[120px] text-[#0A065D]/10 font-serif leading-none">"</div>
            <div className="absolute bottom-4 right-6 text-[120px] text-[#0A065D]/10 font-serif leading-none rotate-180">"</div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A065D] mb-6">
                {language === "fr" ? "Mot du Biologiste Directeur" : "Message from the Director Biologist"}
              </h2>
              <p className="text-lg md:text-xl text-[#0A065D]/90 italic leading-relaxed max-w-4xl">
                {language === "fr"
                  ? "Derrière chaque échantillon, il y a une vie et une famille qui attendent des réponses. Mon engagement, aux côtés de l'équipe LABY, est de transformer notre rigueur technique conforme à la norme ISO 15189 en une réponse de certitude. Nous ne rendons pas seulement des résultats, mais aussi des réponses fiables, avec la précision nécessaire pour évaluer votre état de santé."
                  : "Behind every sample, there is a life and a family waiting for answers. My commitment, alongside the LABY team, is to transform our technical rigor compliant with ISO 15189 into a response of certainty. We don't just deliver results, but reliable answers with the precision needed to assess your health status."
                }
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0A065D] to-[#1E3A8A] rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#0A065D]">{language === "fr" ? "Direction LABY" : "LABY Management"}</p>
                  <p className="text-[#0A065D]/70 text-sm">{language === "fr" ? "Laboratoire d'Analyses Biologiques de Yaoundé" : "Yaoundé Biological Analysis Laboratory"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notre Engagement Qualité */}
        <div className={`mb-20 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-12">
            <span className="inline-block bg-[#0A065D]/10 text-[#0A065D] text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded-full mb-4 border border-[#0A065D]/20">
              {language === "fr" ? "Excellence Certifiée" : "Certified Excellence"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0A065D] mb-4">
              {language === "fr" ? "Notre Engagement Qualité" : "Our Quality Commitment"}
            </h2>
            <p className="text-lg text-[#0A065D]/80 max-w-3xl mx-auto">
              {language === "fr"
                ? "Une expertise certifiée ISO 15189, alliée aux normes de l'OMS."
                : "ISO 15189 certified expertise, combined with WHO standards."
              }
            </p>
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engagementCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${card.color} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A065D] mb-2">{card.title}</h3>
                  <p className="text-[#0A065D]/70">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pôle Urgence & Réanimation */}
        <div className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="bg-gradient-to-br from-[#0A065D] via-[#0D1B6D] to-[#0A065D] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF8500]/10 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF8500] to-[#E87000] rounded-xl flex items-center justify-center shadow-lg">
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
                    <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-bold text-white">{language === "fr" ? "Urgence critique" : "Critical Emergency"}</h3>
                    <span className="text-orange-400 text-sm font-medium">20-60 min</span>
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

        {/* Organigramme Section */}
        <div className={`mt-20 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A065D] mb-4">
              {language === "fr" ? "Notre Organigramme" : "Our Organization Chart"}
            </h2>
            <p className="text-lg text-[#0A065D]/80">
              {language === "fr" ? "Structure organisationnelle de LABY" : "LABY organizational structure"}
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

      </div>
    </section>
  );
};

export default NotreEngagement;
