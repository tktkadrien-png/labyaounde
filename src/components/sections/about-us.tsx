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
      description: `Nous sommes une  équipe entièrement dévouée à votre service, et justifiant d'une expertise qui s'appuie sur le respect strict des normes ISO 15189.
Nous nous engageons à répondre avec exigence et professionnalisme à vos attentes et à bâtir ensemble, une relation de confiance solide et durable. Votre bien-être est notre priorité `,
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
      description: `We are a team fully dedicated to serving you, with proven expertise grounded in strict compliance with ISO 15189 standards.
We are committed to meeting your expectations with rigor and professionalism, and to building together a strong and lasting relationship of trust. Your well-being is our priority`,
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
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/95 via-[#16213e]/90 to-[#0f3460]/85"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#FE5000] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FE5000] rounded-full blur-3xl animate-pulse delay-1000"></div>
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
              <p className="text-xl lg:text-2xl text-white font-light mb-8">
                {currentContent.subtitle}
              </p>

              {/* Decorative line */}
              <div className="w-32 h-1.5 bg-gradient-to-r from-[#FE5000] to-[#CC4000] rounded-full mb-10"></div>

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
                    className="px-8 py-4 bg-white text-[#0A1628] font-semibold rounded-lg
                      hover:bg-[#FE5000]/10 hover:shadow-xl hover:shadow-[#FE5000]/30
                      transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                      border-2 border-transparent hover:border-[#FE5000]"
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
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
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FE5000] to-[#CC4000] rounded-2xl mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-[#FE5000] mb-2">{stat.value}</div>
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
