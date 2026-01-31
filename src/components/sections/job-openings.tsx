"use client";

import { Users, Microscope, Check, ArrowRight, Briefcase, Award, Clock } from 'lucide-react';
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
            <Briefcase className="w-4 h-4 text-[#FE5000]" />
            {postCount} {t('positions')}
          </div>
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-[#0A065D]">
          {title}
        </h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <ul className="mt-6 space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-slate-600">
              <Check className="w-5 h-5 text-[#FE5000] mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-8">
        <a
          href={ctaLink}
          className="w-full text-center bg-[#0A065D] text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 hover:bg-[#003380] transition-colors shadow-lg"
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
      icon: <Users className="w-8 h-8 text-[#FE5000]" />,
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
      icon: <Microscope className="w-8 h-8 text-[#FE5000]" />,
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
          <h2 className="text-4xl font-bold text-[#0A065D]">
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

        {/* Expertise Internationale Stats - Restyled */}
        <div className="mt-16 relative overflow-hidden bg-gradient-to-br from-[#0A065D] via-[#0a5082] to-[#0078BF] py-16 px-8 rounded-3xl shadow-2xl">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00CED1] rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                  Excellence Internationale
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Expertise à l&apos;internationale
              </h3>
              <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                LabYaounde, votre partenaire de confiance pour des analyses médicales de qualité mondiale
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center group hover:bg-white/15 hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00CED1] to-[#0A065D] rounded-2xl mb-4 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">27+</p>
                <p className="text-white/90 text-sm md:text-base font-medium">Postes à pourvoir</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center group hover:bg-white/15 hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mb-4 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">24h</p>
                <p className="text-white/90 text-sm md:text-base font-medium">Délai résultats</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center group hover:bg-white/15 hover:scale-105 transition-all duration-300 shadow-xl sm:col-span-2 lg:col-span-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl mb-4 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">100%</p>
                <p className="text-white/90 text-sm md:text-base font-medium">Certifié qualité</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="bg-#00CED1/100 hover:bg-[#0A065D] text-white font-semibold py-3.5 px-8 rounded-lg inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            {t('viewAllOffers')}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
