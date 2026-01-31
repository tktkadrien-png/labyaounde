"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

const slides = [
  {
    imageSrc: "/images/ChatGPT Image Nov 19, 2025, 01_48_32 AM.png",
    title: "Laboratoires de biologie médicale",
    subtitle:
      "Des laboratoires proches de vous, une expertise médicale reconnue pour prévenir et soigner.",
    buttonText: "Trouver un laboratoire",
    buttonLink: "/laboratoires",
  },
  {
    imageSrc: "/images/cdc-qs8wUhpN1gs-unsplash.jpg",
    title: "Excellence en analyses médicales",
    subtitle:
      "LABYAOUNDE s'engage pour votre santé avec des équipements à la pointe de la technologie.",
    buttonText: "En savoir plus",
    buttonLink: "#",
  },
  {
    imageSrc: "/images/navy-medicine-JqfxntbYPms-unsplash.jpg",
    title: "Dépistage IST : Gratuits & sans ordonnance",
    subtitle:
      "Mon Test IST, LABYAOUNDE se joint à la lutte contre les infections sexuellement transmissibles (IST).",
    buttonText: "Me faire dépister",
    buttonLink: "#",
  },
  {
    imageSrc: "/images/adam-bezer-z_w9KovAwYk-unsplash.jpg",
    title: "Une démarche simple & préventive",
    subtitle:
      "Prenez votre santé en main avec nos bilans de santé sans ordonnance et sans rendez-vous.",
    buttonText: "Découvrir nos bilans",
    buttonLink: "/patients/mon-bilan-sante-sans-ordonnance",
  },
  {
    imageSrc: "/images/cdc-WCEOtVmk2VY-unsplash.jpg",
    title: "Professionnels de santé dévoués",
    subtitle:
      "Une équipe qualifiée à votre service pour des résultats fiables et rapides.",
    buttonText: "Nos services",
    buttonLink: "#",
  },
];

export default function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <section className="relative w-full" aria-label="Hero Carousel">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current, Fade()]}
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="transition-opacity ease-in-out duration-[800ms]"
            >
              <div className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] h-[70vh] sm:h-[80vh] md:h-screen max-h-[880px] overflow-hidden">
                <Image
                  src={slide.imageSrc}
                  alt={slide.title}
                  fill
                  className="object-cover object-center scale-105 transition-transform duration-[8000ms] ease-out group-hover:scale-100"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A065D]/80 via-[#0080FF]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center">
                  <div className="container px-4 sm:px-6 md:px-8">
                    <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
                      <div className="w-12 h-1 sm:w-16 bg-[#FE5000] mb-4 sm:mb-6 rounded-full" />

                      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white drop-shadow-lg">
                        {slide.title}
                      </h1>

                      {slide.subtitle && (
                        <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-md drop-shadow-md">
                          {slide.subtitle}
                        </p>
                      )}

                      <Link href={slide.buttonLink} passHref>
                        <Button
                          asChild
                          className="mt-5 sm:mt-8 bg-[#00CED1] hover:bg-[#0080FF] text-white border-none rounded-lg px-5 py-5 sm:px-8 sm:py-6 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[44px]"
                        >
                          <a>
                            {slide.buttonText}
                            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 rounded-full" />
        <CarouselNext className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 rounded-full" />
      </Carousel>

      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-2 sm:gap-3 bg-black/30 backdrop-blur-md rounded-full px-3 py-2 sm:px-4 sm:py-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`relative transition-all duration-500 ease-out ${
                current === index
                  ? "w-8 h-2.5 sm:w-10 sm:h-3"
                  : "w-2.5 h-2.5 sm:w-3 sm:h-3 hover:scale-110"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  current === index
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-10 hidden md:flex items-center gap-2 text-white/80 text-sm font-medium">
        <span className="text-white text-base sm:text-lg font-bold">{String(current + 1).padStart(2, '0')}</span>
        <span className="text-white/50">/</span>
        <span className="text-sm sm:text-base">{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}
