"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Briefcase, ChevronRight, ArrowLeft, Mail, FileText, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { supabase } from "@/lib/supabase";

interface JobOffer {
  id: string;
  title: string;
  location: string;
  type: string;
  date: string;
  description: string;
  requirements?: string;
}

export default function OffresEmploiStagesPage() {
  const { language } = useLanguage();
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobOffers();
  }, []);

  const fetchJobOffers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('job_offers')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching job offers:', error);
    } else {
      setJobOffers(data || []);
    }
    setLoading(false);
  };

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/vision-hero.png"
              alt={language === 'fr' ? 'Offres d\'Emploi et Stages' : 'Job Offers and Internships'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D5F]/95 via-[#0B3D5F]/85 to-[#0B3D5F]/70"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                  {language === 'fr' ? 'Accueil' : 'Home'}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <Link href="/carrieres" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                  {language === 'fr' ? 'Carrières' : 'Careers'}
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <span className="text-white text-sm sm:text-base">
                  {language === 'fr' ? 'Offres d\'Emploi et Stages' : 'Job Offers and Internships'}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Link
                  href="/carrieres"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm">{language === 'fr' ? 'Retour' : 'Back'}</span>
                </Link>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {language === 'fr' ? 'Offres d\'Emploi et Stages' : 'Job Offers and Internships'}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                {language === 'fr'
                  ? "Découvrez nos opportunités de carrière"
                  : 'Discover our career opportunities'}
              </p>
            </div>
          </div>
        </section>

        {/* Job Offers Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B3D5F] mx-auto"></div>
                <p className="text-gray-600 mt-4">
                  {language === 'fr' ? 'Chargement des offres...' : 'Loading offers...'}
                </p>
              </div>
            ) : jobOffers.length === 0 ? (
              <>
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#0B3D5F]/10 to-[#0B4D6F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Briefcase className="w-10 h-10 text-[#0B3D5F]" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      {language === 'fr'
                        ? 'Pas d\'offres d\'emploi et stage pour le moment'
                        : 'No job offers or internships at the moment'}
                    </h2>

                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                      {language === 'fr'
                        ? 'Nous n\'avons actuellement aucune offre d\'emploi ou de stage disponible. Cependant, nous sommes toujours à la recherche de talents. N\'hésitez pas à nous envoyer votre candidature spontanée.'
                        : 'We currently have no job or internship offers available. However, we are always looking for talent. Feel free to send us your spontaneous application.'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B3D5F] to-[#0B4D6F] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105 shadow-lg"
                      >
                        <Mail className="w-5 h-5" />
                        {language === 'fr' ? 'Candidature Spontanée' : 'Spontaneous Application'}
                      </Link>

                      <Link
                        href="/carrieres/actualites"
                        className="inline-flex items-center justify-center gap-2 bg-white text-[#0B3D5F] border-2 border-[#0B3D5F] px-8 py-4 rounded-xl font-semibold hover:bg-[#0B3D5F] hover:text-white transition-all"
                      >
                        <FileText className="w-5 h-5" />
                        {language === 'fr' ? 'Voir les Actualités' : 'View News'}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Info Cards */}
                <div className="max-w-4xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-6 mt-12">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {language === 'fr' ? 'Pourquoi nous rejoindre ?' : 'Why join us?'}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-[#0B3D5F] flex-shrink-0 mt-0.5" />
                          <span>{language === 'fr' ? 'Environnement de travail moderne et équipé' : 'Modern and well-equipped work environment'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-[#0B3D5F] flex-shrink-0 mt-0.5" />
                          <span>{language === 'fr' ? 'Équipe passionnée et professionnelle' : 'Passionate and professional team'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-[#0B3D5F] flex-shrink-0 mt-0.5" />
                          <span>{language === 'fr' ? 'Opportunités de formation continue' : 'Continuous training opportunities'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {language === 'fr' ? 'Processus de candidature' : 'Application process'}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-[#0B3D5F] flex-shrink-0 mt-0.5" />
                          <span>{language === 'fr' ? 'Envoyez votre CV et lettre de motivation' : 'Send your CV and cover letter'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-[#0B3D5F] flex-shrink-0 mt-0.5" />
                          <span>{language === 'fr' ? 'Nous vous contacterons pour un entretien' : 'We will contact you for an interview'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-[#0B3D5F] flex-shrink-0 mt-0.5" />
                          <span>{language === 'fr' ? 'Réponse sous 2 semaines maximum' : 'Response within 2 weeks maximum'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                {jobOffers.map((job) => (
                  <div key={job.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-xl flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#0B3D5F]" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#0B3D5F]" />
                                {job.date}
                              </div>
                              <span className="bg-[#0B3D5F]/10 text-[#0B3D5F] px-3 py-1 rounded-full font-medium">
                                {job.type}
                              </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-2">{job.description}</p>
                            {job.requirements && (
                              <p className="text-gray-600 text-sm">
                                <strong>Requis:</strong> {job.requirements}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <Link
                        href="/signup"
                        className="inline-flex items-center justify-center gap-2 bg-[#0B3D5F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0B4D6F] transition-all hover:scale-105 shadow-lg whitespace-nowrap"
                      >
                        {language === 'fr' ? 'Postuler' : 'Apply'}
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
