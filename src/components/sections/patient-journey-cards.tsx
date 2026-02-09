"use client";

import { CalendarDays, User, FileText, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface JourneyCardProps {
  title: string;
  subtitle: string;
  gradient: string;
  icon: React.ElementType;
  list: string[];
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  imageAlt: string;
  buttonTextColor: string;
  buttonIconBgColor: string;
}

const JourneyCard: React.FC<JourneyCardProps> = ({
  title,
  subtitle,
  gradient,
  icon: Icon,
  list,
  buttonText,
  buttonLink,
  imageUrl,
  imageAlt,
  buttonTextColor,
  buttonIconBgColor,
}) => (
  <div
    className={`group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 text-white flex flex-col overflow-hidden shadow-lg transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-2xl min-h-[420px] sm:min-h-[480px]`}
  >
    {/* Background Image with Parallax-like effect */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-85 transition-opacity duration-300 group-hover:opacity-90`}></div>
    </div>

    {/* Animated corner decoration */}
    <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-bl-full transition-transform duration-500 group-hover:scale-150 group-hover:bg-white/15"></div>

    <div className="relative z-10 flex flex-col h-full">
      <div>
        <div className="bg-white/25 backdrop-blur-sm p-2.5 sm:p-3 rounded-lg sm:rounded-xl inline-block mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/35">
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#FE5000]" />
        </div>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white drop-shadow-sm">{title}</h3>
        <p className="text-white/90 mt-1 text-xs sm:text-sm lg:text-base">{subtitle}</p>
      </div>

      <ul className="space-y-2 sm:space-y-2.5 mt-4 sm:mt-5 mb-5 sm:mb-6">
        {list.map((item, i) => (
          <li key={i} className="flex items-start gap-2 sm:gap-2.5 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#FE5000]" />
            <span className="text-xs sm:text-sm text-white/95">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-3 sm:pt-4">
        <Link
          href={buttonLink}
          className={`w-full bg-white font-semibold py-2.5 sm:py-3 px-4 sm:px-5 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-lg group/btn ${buttonTextColor} text-sm sm:text-base`}
        >
          {buttonText}
          <span
            className={`ml-2 sm:ml-3 rounded-full p-1 sm:p-1.5 transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110 ${buttonIconBgColor}`}
          >
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </span>
        </Link>
      </div>
    </div>
  </div>
);

const PatientJourneyCards = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.1);

  const journeyData: JourneyCardProps[] = [
    {
      title: t('prepareTitle'),
      subtitle: t('prepareSubtitle'),
      gradient: "from-[#0891B2] to-[#0369A1]",
      icon: CalendarDays,
      list: [
        t('needAppointment'),
        t('adviceInfo'),
        t('necessaryDocs'),
        t('findMyLab'),
      ],
      buttonText: t('prepareButton'),
      buttonLink: "/conseils-et-informations",
      imageUrl: "/lab-photo-4.jpeg",
      imageAlt: "Laboratoire moderne - Préparation",
      buttonTextColor: "text-[#FE5000]",
      buttonIconBgColor: "bg-[#FE5000]",
    },
    {
      title: t('duringTitle'),
      subtitle: t('duringSubtitle'),
      gradient: "from-[#1E3A8A] to-[#0F172A]",
      icon: User,
      list: [
        t('classicSampling'),
        t('pregnancySampling'),
        t('selfSampling'),
        t('hpvSampling'),
      ],
      buttonText: t('duringButton'),
      buttonLink: "/conseils-et-informations",
      imageUrl: "/lab-photo-6.jpeg",
      imageAlt: "Laboratoire - Pendant le prélèvement",
      buttonTextColor: "text-[#FE5000]",
      buttonIconBgColor: "bg-[#FE5000]",
    },
    {
      title: t('afterTitle'),
      subtitle: t('afterSubtitle'),
      gradient: "from-[#0EA5E9] to-[#0369A1]",
      icon: FileText,
      list: [
        t('viewResults'),
        t('interpretation'),
        t('payment'),
        t('giveOpinion'),
      ],
      buttonText: t('afterButton'),
      buttonLink: "/conseils-et-informations",
      imageUrl: "/lab-photo-2.jpeg",
      imageAlt: "Laboratoire - Après les analyses",
      buttonTextColor: "text-[#FE5000]",
      buttonIconBgColor: "bg-[#FE5000]",
    },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] py-12 sm:py-16 lg:py-24 overflow-hidden">
      <div className="container px-4 sm:px-6">
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-[#FE5000]/10 text-[#FE5000] text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-4">
            {t('journeySubtitle') || 'Votre parcours patient'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#003B5C] leading-tight">
            {t('journeyTitle')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {journeyData.map((card, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <JourneyCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientJourneyCards;
