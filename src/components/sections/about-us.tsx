"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { Award, Target, TrendingUp, Users } from "lucide-react";

const AboutUs = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "A PROPOS DE NOUS",
      subtitle: "Laboratoire d'Analyses Biologiques de Yaoundé",
      description: `Le Laboratoire d'Analyses Biologiques de Yaoundé (LABY) est une entreprise privée, créée en juin 2012, dans le souci d'apporter au Cameroun et dans la sous région, un service de qualité en analyses médicales et biologiques conformément aux normes internationales.`,
      stats: [
        { icon: Users, value: "10+", label: "Années d'expérience" },
        { icon: Award, value: "ISO", label: "Certifié" },
        { icon: Target, value: "1000+", label: "Patients par mois" },
        { icon: TrendingUp, value: "98%", label: "Taux de satisfaction" },
      ],
      buttons: [
        { text: "Nos Standards", href: "#standards" },
        { text: "Notre Vision", href: "#vision" },
        { text: "Nos Stratégies", href: "#strategies" },
      ],
    },
    en: {
      title: "ABOUT US",
      subtitle: "Yaoundé Biological Analysis Laboratory",
      description: `The Yaoundé Biological Analysis Laboratory (LABY) is a private company, created in June 2012, with the aim of providing Cameroon and the sub-region with quality medical and biological analysis services in accordance with international standards.`,
      stats: [
        { icon: Users, value: "10+", label: "Years of Experience" },
        { icon: Award, value: "ISO", label: "Certified" },
        { icon: Target, value: "1000+", label: "Patients per month" },
        { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
      ],
      buttons: [
        { text: "Our Standards", href: "#standards" },
        { text: "Our Vision", href: "#vision" },
        { text: "Our Strategies", href: "#strategies" },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden bg-white"
    >
      {/* Hero Section with Image */}
      <div className="relative h-[600px] lg:h-[700px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/pexels-polina-tankilevitch-3735716.jpg"
            alt="Laboratory background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D5F]/95 via-[#0B4D6F]/90 to-[#063251]/95"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 w-full">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              {/* Title */}
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 tracking-tight">
                {currentContent.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-cyan-300 font-light mb-8">
                {currentContent.subtitle}
              </p>

              {/* Decorative line */}
              <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-10"></div>

              {/* Description */}
              <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mb-12">
                {currentContent.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                {currentContent.buttons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.href}
                    className="px-8 py-4 bg-white text-[#0B3D5F] font-semibold rounded-lg
                      hover:bg-cyan-50 hover:shadow-xl hover:shadow-cyan-500/30
                      transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                      border-2 border-transparent hover:border-cyan-400"
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`text-center transition-all duration-700 delay-${index * 100} ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-cyan-300" />
                  </div>
                  <div className="text-4xl font-bold text-[#0B3D5F] mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
