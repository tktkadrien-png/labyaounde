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
  <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex flex-col text-left">
    <div className="flex items-center gap-4">
      <Icon className="h-9 w-9 text-[#FE5000] flex-shrink-0" />
      <h3 className="text-2xl font-semibold text-[#2916F5] inline-block pb-2 border-b-[3px] border-[#FE5000]">
        {title}
      </h3>
    </div>
    <p className="text-[#4B5563] mt-4 flex-grow">
      {description}
    </p>
    <div className="mt-auto pt-6 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <a
          key={tag}
          href="#"
          className="bg-[#0EA5E9] text-white rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-sky-600"
        >
          {tag}
        </a>
      ))}
    </div>
  </div>
);

const ThreePillars = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-24 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FE5000] to-[#CC4000]"></div>
      </div>

      <div className="relative container mx-auto px-6 max-w-[1200px]">
        <div className={`max-w-4xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-white text-[#FE5000] text-base font-bold uppercase rounded-full px-6 py-2.5 mb-6">
            Notre ADN
          </span>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Trois piliers qui font notre différence
          </h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-[700px] mt-4">
            Découvrez ce qui fait de LabYaounde un acteur unique dans le domaine de la biologie médicale
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
