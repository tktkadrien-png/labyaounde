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
    className={`relative rounded-2xl p-6 lg:p-8 text-white flex flex-col overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl min-h-[480px]`}
  >
    <div className="absolute inset-0 z-0">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-85`}></div>
    </div>

    <div className="relative z-10 flex flex-col h-full">
      <div>
        <div className="bg-white/25 backdrop-blur-sm p-3 rounded-lg inline-block mb-4">
          <Icon className="w-7 h-7 text-[#FE5000]" />
        </div>
        <h3 className="text-xl lg:text-2xl font-bold text-white drop-shadow-sm">{title}</h3>
        <p className="text-white/90 mt-1 text-sm lg:text-base">{subtitle}</p>
      </div>

      <ul className="space-y-2.5 mt-5 mb-6">
        {list.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#FE5000]" />
            <span className="text-sm text-white/95">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <Link
          href={buttonLink}
          className={`w-full bg-white font-semibold py-3 px-5 rounded-lg flex items-center justify-center transition-all hover:bg-gray-50 hover:shadow-md group ${buttonTextColor}`}
        >
          {buttonText}
          <span
            className={`ml-3 rounded-full p-1.5 transition-transform duration-300 group-hover:translate-x-1 ${buttonIconBgColor}`}
          >
            <ArrowRight className="w-4 h-4 text-white" />
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
      imageUrl: "/images/cdc-wDxFn_dBEC0-unsplash(1).jpg",
      imageAlt: "Woman looking at her phone while preparing for a medical appointment",
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
      imageUrl: "/images/paul-einerhand-bKd9KEELfmg-unsplash.jpg",
      imageAlt: "Smiling pregnant woman during a medical consultation",
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
      imageUrl: "/images/thisisengineering-bcqDxjddPGk-unsplash.jpg",
      imageAlt: "Man giving a thumbs up after receiving his medical results",
      buttonTextColor: "text-[#FE5000]",
      buttonIconBgColor: "bg-[#FE5000]",
    },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] py-20 lg:py-24">
      <div className="container">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003B5C] leading-tight">
            {t('journeyTitle')}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
