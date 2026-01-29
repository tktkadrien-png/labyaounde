"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface Article {
  id: number;
  title: string;
  image: string;
  size: 'large' | 'small';
  link: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Lancement d'un test PCR respiratoire avec résultats en 24h",
    image: "/images/national-institute-of-allergy-and-infectious-diseases-Cdt3s_jp1OY-unsplash.jpg",
    size: 'large',
    link: '#'
  },
  {
    id: 2,
    title: "Le laboratoire est désormais ouvert 24h/24 – 7j/7",
    image: "/images/ChatGPT Image Nov 19, 2025, 01_48_32 AM.png",
    size: 'large',
    link: '#'
  },
  {
    id: 3,
    title: "Installation d'un nouvel automate pour des résultats plus rapides",
    image: "/images/national-cancer-institute-rb8hr3cXD4A-unsplash.jpg",
    size: 'small',
    link: '#'
  },
  {
    id: 4,
    title: "Campagne spéciale de dépistage du diabète à tarif réduit",
    image: "/images/cdc-hOHzIsuOblE-unsplash.jpg",
    size: 'small',
    link: '#'
  },
  {
    id: 5,
    title: "Vos résultats sont maintenant disponibles sur une plateforme sécurisée",
    image: "/images/neil-soni-6wdRuK7bVTE-unsplash.jpg",
    size: 'small',
    link: '#'
  },
];

const ArticleCard = ({ article }: { article: Article }) => (
  <a
    href={article.link}
    className={`
      group block relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full
      ${article.size === 'large' ? 'aspect-[8/5]' : 'aspect-square'}
    `}
  >
    <Image
      src={article.image}
      alt={article.title}
      fill
      className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0047AB]/80 via-[#0047AB]/20 to-transparent"></div>
    <div className="absolute top-4 left-4 z-10 bg-#00CED1/100 text-white text-xs font-bold py-1.5 px-3 rounded-md shadow-md">
      LabYaounde
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <h3 className="text-lg font-bold text-white drop-shadow-lg leading-tight">{article.title}</h3>
    </div>
  </a>
);

const NewsArticles = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-gradient-to-b from-[#f1f5f9] via-[#e2e8f0] to-[#cbd5e1] py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-[#00CED1]/20 text-[#0909FF] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Dernières nouvelles
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0047AB]">
            Actualités
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Restez informé des dernières nouvelles et événements de LabYaounde
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {articles.map((article, index) => (
            <div
              key={article.id}
              className={`${article.size === 'large' ? 'lg:col-span-3' : 'lg:col-span-2'} transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <a
            href="/carrieres/actualites"
            className="inline-flex items-center justify-center gap-2 bg-#00CED1/100 hover:bg-[#0047AB] text-white font-semibold py-3.5 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Voir toutes nos actualités
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsArticles;
