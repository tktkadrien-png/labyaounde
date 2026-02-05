"use client";

import { FlaskConical, Rocket, Scale } from 'lucide-react';
import React from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

const cardData = [
  {
    icon: FlaskConical,
    title: "Expertise",
    description: "Une équipe de biologistes experts pour des analyses précises et un accompagnement personnalisé",
    tags: ["Biologistes experts", "Analyses spécialisées", "Conseil patient"],
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Des équipements de pointe et des méthodes innovantes pour des résultats fiables et rapides",
    tags: ["Technologies avancées", "Résultats rapides", "R&D continue"],
  },
  {
    icon: Scale,
    title: "Indépendance",
    description: "Un laboratoire indépendant qui place l'éthique et la qualité au cœur de ses priorités",
    tags: ["Éthique médicale", "Proximité", "Qualité"],
  }
];

interface PillarCardData {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
}

const PillarCard = ({ icon: Icon, title, description, tags }: PillarCardData) => (
  <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col text-left hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] flex items-center justify-center shadow-lg">
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-[#0A065D]">
        {title}
      </h3>
    </div>
    <p className="text-gray-600 text-lg leading-relaxed flex-grow">
      {description}
    </p>
    <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-[#FF6B00]/10 text-[#FF6B00] rounded-full px-4 py-2 text-sm font-semibold"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const ThreePillars = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-28 text-white overflow-hidden">
      {/* Bright Orange Background */}
      <div className="absolute inset-0 bg-[#FF6B00]"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/10 rounded-full"></div>

      <div className="relative container mx-auto px-6 max-w-[1200px]">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-white text-[#FF6B00] text-lg font-bold uppercase rounded-full px-8 py-3 mb-8 shadow-xl">
            Notre ADN
          </span>
          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-6 drop-shadow-lg">
            Trois piliers qui font notre différence
          </h2>
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed">
            Découvrez ce qui fait de LabYaounde un acteur unique dans le domaine de la biologie médicale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <PillarCard
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
                tags={pillar.tags}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePillars;
