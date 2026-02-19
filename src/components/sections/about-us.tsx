"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { Award, Target, TrendingUp, Users } from "lucide-react";

const AboutUs = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { language } = useLanguage();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Video URLs - local files in public folder
  const videos = [
    "/videos/004c1ffa-bb86-45f6-9773-006274bec081.mp4",
    "/videos/f8c03bc4-4522-4b07-b248-aaaa0bca55ac.mp4"
  ];

  // Auto-slide videos every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [videos.length]);

  const content = {
    fr: {
      title: "A PROPOS DE NOUS",
      subtitle: "",
      description: `Nous sommes une  équipe entièrement dévouée à votre service, et justifiant d'une expertise qui s'appuie sur le respect strict des normes ISO 15189.
Nous nous engageons à répondre avec exigence et professionnalisme à vos attentes et à bâtir ensemble, une relation de confiance solide et durable. Votre bien-être est notre priorité `,
      stats: [
        { icon: Users, value: "10+", label: "Années d'expérience" },
        { icon: Award, value: "ISO", label: "Certifié" },
        { icon: Target, value: "1000+", label: "Patients par mois" },
        { icon: TrendingUp, value: "98%", label: "Taux de satisfaction" },
      ],
      buttons: [
        { text: "Nos Standards", href: "/nos-standards" },
        { text: "Notre Vision", href: "/notre-vision" },
      ],
    },
    en: {
      title: "ABOUT US",
      subtitle: "",
      description: `We are a team fully dedicated to serving you, with proven expertise grounded in strict compliance with ISO 15189 standards.
We are committed to meeting your expectations with rigor and professionalism, and to building together a strong and lasting relationship of trust. Your well-being is our priority`,
      stats: [
        { icon: Users, value: "10+", label: "Years of Experience" },
        { icon: Award, value: "ISO", label: "Certified" },
        { icon: Target, value: "1000+", label: "Patients per month" },
        { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
      ],
      buttons: [
        { text: "Our Standards", href: "/nos-standards" },
        { text: "Our Vision", href: "/notre-vision" },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden bg-white"
    >
      {/* Hero Section with Video Background */}
      <div className="relative h-[600px] lg:h-[700px]">
        {/* Video Background with Auto-Slide */}
        <div className="absolute inset-0">
          {videos.map((video, index) => (
            <video
              key={index}
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentVideoIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src={video} type="video/mp4" />
            </video>
          ))}
          {/* Bright Blue Gradient Overlay - like the reference image */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#84BDE3]/90 via-[#84BDE3]/85 to-[#84BDE3]/90"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        {/* Video Indicators - Orange active indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentVideoIndex
                  ? "bg-[#FF8500] w-10"
                  : "bg-white/50 w-3 hover:bg-white/75"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 w-full">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              {/* Title - White text */}
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-[#1034A6] mb-4 tracking-tight">
                {currentContent.title}
              </h1>

              {/* Subtitle - White text */}
              <p className="text-xl lg:text-2xl text-white/90 font-semibold mb-8">
                {currentContent.subtitle}
              </p>

              {/* Decorative line - Orange */}
              <div className="w-32 h-1.5 bg-[#FF8500] rounded-full mb-10"></div>

              {/* Description - White text */}
              <p className="text-lg lg:text-xl text-white/95 leading-relaxed max-w-3xl mb-12 font-medium">
                {currentContent.description}
              </p>

              {/* Buttons - Orange */}
              <div className="flex flex-wrap gap-4">
                {currentContent.buttons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.href}
                    className="px-8 py-4 bg-[#FF8500] text-white font-bold text-lg rounded-lg
                      hover:bg-[#E87000] hover:shadow-xl hover:shadow-[#FF8500]/30
                      transition-all duration-300 transform hover:scale-105
                      min-w-[160px] text-center"
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Stats Section - White background with orange icons */}
      <div className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {currentContent.stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`text-center p-4 sm:p-6 rounded-2xl bg-[#73C2FB] shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group border border-gray-100 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Orange icon circle */}
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#FF8500] rounded-full mb-3 sm:mb-4 shadow-lg shadow-[#FF8500]/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E40AF] mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-[#1E40AF]/70 font-medium">{stat.label}</div>
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
