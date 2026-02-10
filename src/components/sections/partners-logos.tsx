"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { useEffect, useRef, useState } from "react";

const partners = [
  { src: "/IMAGE/download (2).png", alt: "Partenaire", name: "Partenaire" },
  { src: "/IMAGE/partner-2.png", alt: "Partenaire 2", name: "Partenaire 2" },
  { src: "/IMAGE/partner-3.jpg", alt: "Partenaire 3", name: "Partenaire 3" },
  { src: "/IMAGE/partner-4.png", alt: "Partenaire 4", name: "Partenaire 4" },
  { src: "/IMAGE/CellmarkLogoFullColour.JPG", alt: "Cellmark", name: "Cellmark" },
  { src: "/IMAGE/partner-6.png", alt: "Partenaire 6", name: "Partenaire 6" },
  { src: "/IMAGE/partner-chracerh.jpg", alt: "CHRACERH", name: "CHRACERH" },
  { src: "/IMAGE/CNPS-scaled-1.jpg", alt: "CNPS", name: "CNPS" },
  { src: "/IMAGE/download (3).png", alt: "Partenaire", name: "Partenaire" },
];

export default function PartnersLogos() {
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const content = {
    fr: {
      title: "Nos Partenaires",
      subtitle: "Ils nous font confiance",
      count: `${partners.length}+ Partenaires de confiance`,
    },
    en: {
      title: "Our Partners",
      subtitle: "They trust us",
      count: `${partners.length}+ Trusted Partners`,
    },
  };

  const currentContent = content[language];

  // Auto-scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;

        // Reset when we've scrolled through half (since we duplicate the logos)
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Double the partners array for infinite scroll effect
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#0A065D] via-[#0A065D] to-[#1a1080] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FE5000]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00CED1]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-[#FE5000]/20 text-[#FE5000] text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-4">
            {currentContent.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            {currentContent.title}
          </h2>
          <p className="text-white/60 text-lg">
            {currentContent.count}
          </p>
        </div>

        {/* Scrolling logos container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0A065D] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0A065D] to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling track */}
          <div
            ref={scrollRef}
            className="flex gap-6 md:gap-8 overflow-x-hidden py-4"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 group"
              >
                <div className="w-[160px] h-[100px] md:w-[200px] md:h-[120px] lg:w-[240px] lg:h-[140px] bg-white rounded-2xl shadow-lg flex items-center justify-center p-4 md:p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={180}
                    height={100}
                    className="object-contain w-full h-full transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Static grid for mobile (fallback) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:hidden gap-4 mt-8">
          {partners.map((partner, index) => (
            <div
              key={`mobile-${index}`}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={120}
                height={70}
                className="object-contain w-full h-auto max-h-[60px]"
              />
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/10">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-[#FE5000]">{partners.length}+</div>
            <div className="text-white/60 text-sm md:text-base">
              {language === "fr" ? "Partenaires" : "Partners"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-[#00CED1]">10+</div>
            <div className="text-white/60 text-sm md:text-base">
              {language === "fr" ? "Années d'expérience" : "Years of experience"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-white">100%</div>
            <div className="text-white/60 text-sm md:text-base">
              {language === "fr" ? "Satisfaction" : "Satisfaction"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
