"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function NotreReferentiel() {
  const { language } = useLanguage();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#2916F5]/5 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side - Content */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-[#2916F5]/10 px-4 py-2 rounded-full mb-6 w-fit">
                <BookOpen className="w-5 h-5 text-[#FE5000]" />
                <span className="text-[#FE5000] font-semibold text-sm">
                  {language === 'fr' ? 'Ressources' : 'Resources'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {language === 'fr' ? 'Notre Référentiel' : 'Our Reference'}
              </h2>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
                {language === 'fr'
                  ? "Pour une compréhension plus approfondie de vos résultats d'analyses, nous vous recommandons de vous rendre sur le site web de Labtest Online."
                  : 'For a deeper understanding of your test results, we recommend visiting the Labtest Online website.'
                }
              </p>

              <a
                href="https://labtestsonline.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#2916F5] to-[#157DEC] text-white px-8 py-4 rounded-xl font-semibold text-base hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-fit group"
              >
                <span>{language === 'fr' ? 'Visiter Labtest Online' : 'Visit Labtest Online'}</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right Side - Logo */}
            <div className="relative h-[300px] lg:h-full min-h-[400px] bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-8">
              <div className="relative w-full h-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2916F5]/5 to-transparent rounded-2xl"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Labtest Online Logo Placeholder */}
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                    <div className="absolute inset-0 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-[#2916F5]/10">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#2916F5] to-[#157DEC] rounded-full flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#2916F5] mb-2">
                          Lab Tests
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 font-semibold">
                          Online
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-[#FE5000]/10 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-[#FE5000]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Informations Détaillées' : 'Detailed Information'}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {language === 'fr'
                ? 'Accédez à des explications complètes sur vos tests médicaux'
                : 'Access comprehensive explanations about your medical tests'
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-[#FE5000]/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#FE5000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Fiable et Certifié' : 'Reliable and Certified'}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {language === 'fr'
                ? 'Informations validées par des professionnels de santé'
                : 'Information validated by healthcare professionals'
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-[#FE5000]/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#FE5000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Accès Gratuit' : 'Free Access'}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {language === 'fr'
                ? 'Ressource gratuite disponible 24/7'
                : 'Free resource available 24/7'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
