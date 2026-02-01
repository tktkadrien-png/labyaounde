"use client";

import { Users, Microscope, Check, ArrowRight, Briefcase, Award, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/contents/LanguageContext';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import React from 'react';

interface JobCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
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
  postCount,
  title,
  description,
  features,
  ctaText,
  ctaLink,
}: JobCardProps) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col h-full hover:bg-white/20 transition-all duration-300 shadow-xl">
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-xl ${iconBgColor} shadow-lg`}>
            {icon}
          </div>
          <div className="flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-full text-sm font-semibold text-[#0A065D]">
            <Briefcase className="w-4 h-4 text-[#FE5000]" />
            {postCount} {t('positions')}
          </div>
        </div>
        <h3 className="mt-6 text-2xl font-bold text-white">
          {title}
        </h3>
        <p className="mt-2 text-white/90">{description}</p>
        <ul className="mt-6 space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-white/90">
              <Check className="w-5 h-5 text-[#FE5000] mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-8">
        <a
          href={ctaLink}
          className="w-full text-center bg-[#FE5000] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#CC4000] transition-colors shadow-lg hover:shadow-xl hover:scale-105"
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
      icon: <Users className="w-8 h-8 text-white" />,
      iconBgColor: 'bg-gradient-to-br from-[#FE5000] to-[#CC4000]',
      postCount: 18,
      title: t('nurses'),
      description: 'Prélèvements, accueil patients, gestion administrative',
      features: ['Horaires de journée', 'Pas de travail le dimanche', 'Équilibre vie pro/perso'],
      ctaText: t('viewOffers'),
      ctaLink: '/carrieres/offres-emploi-stages',
    },
    {
      icon: <Microscope className="w-8 h-8 text-white" />,
      iconBgColor: 'bg-gradient-to-br from-[#0A065D] to-[#003380]',
      postCount: 2,
      title: t('technicians'),
      description: 'Analyses des échantillons, utilisation d\'équipements spécialisés',
      features: ['Technologies de pointe', 'Formation continue', 'Expertise technique'],
      ctaText: t('viewOffers'),
      ctaLink: '/carrieres/offres-emploi-stages',
    },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16">
      {/* ONE UNIFIED BLOCK with #60AAE3 background containing everything */}
      <div className="relative overflow-hidden bg-[#60AAE3] py-16 rounded-none md:rounded-3xl md:mx-6 lg:mx-auto lg:max-w-[1400px] shadow-2xl">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0A065D] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FE5000] rounded-full blur-3xl opacity-10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Header Section */}
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block mb-4">
              <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                Carrières
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              {t('jobsTitle')}
            </h2>
            <p className="text-white/90 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              {t('jobsSubtitle')}
            </p>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
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

          {/* Stats Section - Excellence Internationale */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="inline-block mb-4">
                <span className="bg-[#0A065D]/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                  Excellence Internationale
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                Expertise à l&apos;internationale
              </h3>
              <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">
                LabYaounde, votre partenaire de confiance pour des analyses médicales de qualité mondiale
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center group hover:bg-white/25 hover:scale-105 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#FE5000] to-[#CC4000] rounded-xl mb-4 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">27+</p>
                <p className="text-white/90 text-sm font-medium">Postes à pourvoir</p>
              </div>

              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center group hover:bg-white/25 hover:scale-105 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl mb-4 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">24h</p>
                <p className="text-white/90 text-sm font-medium">Délai résultats</p>
              </div>

              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center group hover:bg-white/25 hover:scale-105 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl mb-4 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">100%</p>
                <p className="text-white/90 text-sm font-medium">Certifié qualité</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <a
              href="/carrieres/offres-emploi-stages"
              className="bg-[#0A065D] hover:bg-[#003380] text-white font-bold py-4 px-10 rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              {t('viewAllOffers')}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
