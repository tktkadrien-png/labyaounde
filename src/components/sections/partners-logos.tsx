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
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#0A2540] via-[#0D3B66] to-[#0A2540] relative overflow-hidden">
      {/* Premium Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A8E8]/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#48CAE4]/15 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <span className="inline-block bg-gradient-to-r from-[#00A8E8]/30 to-[#48CAE4]/30 text-[#00A8E8] text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded-full mb-6 border border-[#00A8E8]/30 backdrop-blur-sm shadow-lg shadow-[#00A8E8]/10">
            {currentContent.subtitle}
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            {currentContent.title}
          </h2>
          <p className="text-white/70 text-lg md:text-xl font-medium">
            {currentContent.count}
          </p>
        </div>

        {/* Scrolling logos container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Premium Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#0A2540] via-[#0A2540]/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#0A2540] via-[#0A2540]/80 to-transparent z-10 pointer-events-none"></div>

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
                <div className="w-[160px] h-[100px] md:w-[200px] md:h-[120px] lg:w-[240px] lg:h-[140px] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center p-4 md:p-6 transition-all duration-500 hover:shadow-[0_20px_60px_-10px_rgba(254,80,0,0.3)] hover:scale-110 hover:-translate-y-3 border border-white/50">
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

        {/* Premium Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-16 md:mt-20 pt-10 md:pt-14 border-t border-white/10">
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-black text-[#00A8E8] group-hover:scale-110 transition-transform duration-300">{partners.length}+</div>
            <div className="text-white/70 text-sm md:text-base font-medium mt-2">
              {language === "fr" ? "Partenaires" : "Partners"}
            </div>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-black text-[#48CAE4] group-hover:scale-110 transition-transform duration-300">10+</div>
            <div className="text-white/70 text-sm md:text-base font-medium mt-2">
              {language === "fr" ? "Années d'expérience" : "Years of experience"}
            </div>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-black text-white group-hover:scale-110 transition-transform duration-300">100%</div>
            <div className="text-white/70 text-sm md:text-base font-medium mt-2">
              {language === "fr" ? "Satisfaction" : "Satisfaction"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
