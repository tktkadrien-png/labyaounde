"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Briefcase, Calendar, MapPin, ChevronRight, Newspaper, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { supabase } from "@/lib/supabase";

interface JobOffer {
  id: string;
  title: string;
  location: string;
  type: string;
  date: string;
  description: string;
}

interface Actualite {
  id: string;
  title: string;
  excerpt: string;
  image_url?: string;
  date: string;
}

export default function CarrieresPage() {
  const { language } = useLanguage();
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [news, setNews] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    // Fetch job offers
    const { data: jobsData } = await supabase
      .from('job_offers')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(3);

    // Fetch actualités
    const { data: newsData } = await supabase
      .from('actualites')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(3);

    setJobOffers(jobsData || []);
    setNews(newsData || []);
    setLoading(false);
  };

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/vision-hero.png"
              alt={language === 'fr' ? 'Carrières' : 'Careers'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0047AB]/95 via-[#0047AB]/85 to-[#0047AB]/70"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                  {language === 'fr' ? 'Accueil' : 'Home'}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <span className="text-white text-sm sm:text-base">{language === 'fr' ? 'Carrières' : 'Careers'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {language === 'fr' ? 'Carrières & Actualités' : 'Careers & News'}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                {language === 'fr'
                  ? "Rejoignez notre équipe et suivez nos actualités"
                  : 'Join our team and follow our news'}
              </p>
            </div>
          </div>
        </section>

        {/* Actualités Section */}
        <section id="actualites" className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0047AB]/10 px-4 py-2 rounded-full mb-4">
                <Newspaper className="w-5 h-5 text-[#0047AB]" />
                <span className="text-[#0047AB] font-semibold text-sm">
                  {language === 'fr' ? 'Actualités' : 'News'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {language === 'fr' ? 'Nos Dernières Actualités' : 'Our Latest News'}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'fr'
                  ? 'Restez informé des dernières nouvelles de notre laboratoire'
                  : 'Stay informed about our laboratory latest news'}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0047AB] mx-auto"></div>
              </div>
            ) : news.length === 0 ? (
              <div className="text-center py-12">
                <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'fr' ? 'Aucune actualité pour le moment' : 'No news at the moment'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {news.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    {item.image_url && (
                      <div className="relative h-48">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center">
              <Link
                href="/carrieres/actualites"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0047AB] to-[#0080FF] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105 shadow-lg"
              >
                {language === 'fr' ? 'Voir toutes nos actualités' : 'View all our news'}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Job Offers Section */}
        <section id="offres-emploi-stages" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0047AB]/10 px-4 py-2 rounded-full mb-4">
                <Briefcase className="w-5 h-5 text-[#0047AB]" />
                <span className="text-[#0047AB] font-semibold text-sm">
                  {language === 'fr' ? 'Emploi & Stages' : 'Jobs & Internships'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {language === 'fr' ? 'Offres d\'Emploi et Stages' : 'Job Offers and Internships'}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'fr'
                  ? 'Découvrez nos opportunités de carrière et rejoignez une équipe passionnée'
                  : 'Discover our career opportunities and join a passionate team'}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0047AB] mx-auto"></div>
              </div>
            ) : jobOffers.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'fr' ? 'Aucune offre pour le moment' : 'No offers at the moment'}
                </p>
              </div>
            ) : (
              <div className="space-y-6 mb-12">
                {jobOffers.map((job) => (
                  <div key={job.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#0047AB] to-[#0080FF] rounded-xl flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-[#0047AB]" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-[#0047AB]" />
                              {job.date}
                            </div>
                            <span className="bg-[#0047AB]/10 text-[#0047AB] px-3 py-1 rounded-full font-medium">
                              {job.type}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{job.description}</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/signup"
                      className="inline-flex items-center justify-center gap-2 bg-[#0047AB] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0080FF] transition-all hover:scale-105 shadow-lg whitespace-nowrap"
                    >
                      {language === 'fr' ? 'Postuler' : 'Apply'}
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
              </div>
            )}

            <div className="text-center">
              <Link
                href="/carrieres/offres-emploi-stages"
                className="inline-flex items-center gap-2 bg-white border-2 border-[#0047AB] text-[#0047AB] px-8 py-4 rounded-xl font-semibold hover:bg-[#0047AB] hover:text-white transition-all hover:scale-105 shadow-lg"
              >
                {language === 'fr' ? 'Voir toutes les offres' : 'View all offers'}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-[#0047AB] to-[#0080FF] rounded-2xl p-8 sm:p-12 text-white">
              <TrendingUp className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                {language === 'fr' ? 'Vous ne trouvez pas ce que vous cherchez ?' : 'Can\'t find what you\'re looking for?'}
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {language === 'fr'
                  ? 'Envoyez-nous votre candidature spontanée, nous sommes toujours à la recherche de talents'
                  : 'Send us your spontaneous application, we are always looking for talent'}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0047AB] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
              >
                {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
