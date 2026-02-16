"use client";

import { FlaskConical, Rocket, ShieldCheck } from 'lucide-react';
import React from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useLanguage } from '@/lib/contents/LanguageContext';

const ThreePillars = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { language } = useLanguage();

  const cardData = [
    {
      icon: FlaskConical,
      title: language === 'fr' ? "Expertise" : "Expertise",
      description: language === 'fr'
        ? "Une équipe de biologistes experts pour des analyses précises et un accompagnement personnalisé"
        : "A team of expert biologists for precise analyses and personalized support",
      tags: language === 'fr'
        ? ["Biologistes qualifiés", "Analyses certifiées"]
        : ["Qualified biologists", "Certified analyses"],
    },
    {
      icon: ShieldCheck,
      title: language === 'fr' ? "Confidentialité" : "Confidentiality",
      description: language === 'fr'
        ? "Un laboratoire qui garantit la confidentialité totale de vos données et résultats médicaux"
        : "A laboratory that guarantees complete confidentiality of your data and medical results",
      tags: language === 'fr'
        ? ["Protection des données", "Secret médical"]
        : ["Data protection", "Medical secrecy"],
    },
    {
      icon: Rocket,
      title: language === 'fr' ? "Innovation" : "Innovation",
      description: language === 'fr'
        ? "Des équipements de pointe et des méthodes innovantes pour des résultats fiables et rapides"
        : "Cutting-edge equipment and innovative methods for reliable and fast results",
      tags: language === 'fr'
        ? ["Technologies avancées", "Résultats rapides"]
        : ["Advanced technologies", "Fast results"],
    }
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-20 md:py-28 overflow-hidden">
      {/* Light Blue Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E8F4FC] via-[#F0F7FF] to-[#E8F4FC]"></div>

      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-[#1E40AF]/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[300px] h-[300px] bg-[#FF8500]/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative container mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Orange Badge */}
          <span className="inline-block bg-[#FF8500] text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full mb-6 shadow-lg shadow-[#FF8500]/20">
            {language === 'fr' ? 'NOS ENGAGEMENTS' : 'OUR COMMITMENTS'}
          </span>

          {/* Title - Bleu Roi */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E40AF] leading-tight mb-6">
            {language === 'fr' ? 'Trois piliers qui font notre différence' : 'Three pillars that make our difference'}
          </h2>

          {/* Subtitle - Bleu Roi lighter */}
          <p className="text-lg md:text-xl text-[#1E40AF]/70 leading-relaxed">
            {language === 'fr'
              ? 'Découvrez ce qui fait de LabYaounde un acteur unique dans le domaine de la biologie médicale'
              : 'Discover what makes LabYaounde a unique player in the field of medical biology'}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cardData.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-[#1E40AF]/10 group h-full flex flex-col card-shine">
                  {/* Orange icon with title */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF8500] to-[#E87000] flex items-center justify-center shadow-lg shadow-[#FF8500]/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1E40AF]">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description - Bleu Roi */}
                  <p className="text-[#1E40AF]/70 text-base leading-relaxed flex-grow mb-6">
                    {pillar.description}
                  </p>

                  {/* Tags - Light blue background with Bleu Roi text */}
                  <div className="flex flex-wrap gap-2">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#1E40AF]/10 text-[#1E40AF] rounded-full px-4 py-1.5 text-sm font-medium border border-[#1E40AF]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThreePillars;
