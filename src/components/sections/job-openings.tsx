"use client";

import { Users, Microscope, Check, ArrowRight, Briefcase, Globe, Award, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/contents/LanguageContext';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import React from 'react';

interface JobCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  cardBgColor: string;
  postCount: number;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

const JobCard = ({
  icon,
  iconBgColor,
  cardBgColor,
  postCount,
  title,
  description,
  features,
  ctaText,
  ctaLink,
}: JobCardProps) => {
  const { t } = useLanguage();

  return (
    <div className={`rounded-xl p-8 flex flex-col h-full ${cardBgColor}`}>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-lg ${iconBgColor}`}>
            {icon}
          </div>
          <div className="flex items-center gap-2 bg-white/70 px-3 py-1.5 rounded-full text-sm font-semibold text-gray-700">
            <Briefcase className="w-4 h-4 text-gray-500" />
            {postCount} {t('positions')}
          </div>
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-[#0B3D5F]">
          {title}
        </h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <ul className="mt-6 space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-slate-600">
              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-8">
        <a
          href={ctaLink}
          className="w-full text-center bg-[#0078BF] text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 hover:bg-[#005f99] transition-colors"
        >
          {ctaText}
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default function JobOpenings() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.1);

  const jobCards = [
    {
      icon: <Users className="w-8 h-8 text-[#0078BF]" />,
      iconBgColor: 'bg-[#D6EFFF]',
      cardBgColor: 'bg-[#EFF8FF]',
      postCount: 18,
      title: t('nurses'),
      description: 'Prélèvements, accueil patients, gestion administrative',
      features: ['Horaires de journée', 'Pas de travail le dimanche', 'Équilibre vie pro/perso'],
      ctaText: t('viewOffers'),
      ctaLink: '#',
    },
    {
      icon: <Microscope className="w-8 h-8 text-[#2d8659]" />,
      iconBgColor: 'bg-[#D9F5E9]',
      cardBgColor: 'bg-[#F0FAF7]',
      postCount: 2,
      title: t('technicians'),
      description: 'Analyses des échantillons, utilisation d\'équipements spécialisés',
      features: ['Technologies de pointe', 'Formation continue', 'Expertise technique'],
      ctaText: t('viewOffers'),
      ctaLink: '#',
    },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-white py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-bold text-[#0B3D5F]">
            {t('jobsTitle')}
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            {t('jobsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {jobCards.map((card, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <JobCard {...card} />
            </div>
          ))}
        </div>

        {/* Expertise Internationale Stats */}
        <div className="mt-16 bg-gradient-to-br from-[#0B3D5F] to-cyan-800 py-12 px-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Expertise à l&apos;internationale
            </h3>
            <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto">
              LabYaounde, votre partenaire de confiance pour des analyses médicales de qualité mondiale
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl mb-3 group-hover:bg-white/20 transition-colors">
                <Briefcase className="w-7 h-7 text-cyan-400" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white">27+</p>
              <p className="text-white/70 text-sm mt-1">Postes à pourvoir</p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl mb-3 group-hover:bg-white/20 transition-colors">
                <Clock className="w-7 h-7 text-cyan-400" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white">24h</p>
              <p className="text-white/70 text-sm mt-1">Délai résultats</p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl mb-3 group-hover:bg-white/20 transition-colors">
                <Award className="w-7 h-7 text-cyan-400" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white">100%</p>
              <p className="text-white/70 text-sm mt-1">Certifié qualité</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3.5 px-8 rounded-lg inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            {t('viewAllOffers')}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
