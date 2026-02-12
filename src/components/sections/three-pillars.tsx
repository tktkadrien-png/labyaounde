"use client";

import { FlaskConical, Rocket, ShieldCheck } from 'lucide-react';
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
    icon: ShieldCheck,
    title: "Confidentialité",
    description: "Un laboratoire qui garantit la confidentialité totale de vos données et résultats médicaux",
    tags: ["Protection des données", "Secret médical", "Sécurité"],
  }
];

interface PillarCardData {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
}

const PillarCard = ({ icon: Icon, title, description, tags }: PillarCardData) => (
  <div className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(10,6,93,0.2)] flex flex-col text-left hover:shadow-[0_30px_80px_-15px_rgba(10,6,93,0.3)] transition-all duration-500 hover:-translate-y-3 border border-gray-100 group">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FE5000] to-[#CC4000] flex items-center justify-center shadow-lg shadow-[#FE5000]/30 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-8 w-8 text-white" />
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
          className="bg-gradient-to-r from-[#0A065D]/10 to-[#1E3A8A]/10 text-[#0A065D] rounded-full px-4 py-2 text-sm font-bold border border-[#0A065D]/10"
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
      {/* Premium Orange Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FE5000] via-[#FF7A33] to-[#FE5000]"></div>

      {/* Premium decorative elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[#CC4000]/30 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>

      <div className="relative container mx-auto px-6 max-w-[1200px]">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-bold uppercase tracking-wider px-6 py-2 rounded-full mb-6 border border-white/30">
            Excellence & Innovation
          </span>
          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-6 drop-shadow-lg">
            Trois piliers qui font notre différence
          </h2>
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed font-medium">
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
