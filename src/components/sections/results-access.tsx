"use client";

import Image from "next/image";
import { FileText, User } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

const ResultsAccess = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-100 py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Column */}
          <div>
            <h2 className="text-[36px] font-bold text-[#2916F5] mb-4">
              {t('resultsTitle')}
            </h2>
            <p className="text-[18px] text-gray-600 leading-[1.6] mb-8">
              {t('resultsSubtitle')}
            </p>
            <div className="grid sm:grid-cols-2 gap-6">

              {/* Card 1: Consulter */}
              <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex flex-col">
                <div>
                  <FileText className="h-12 w-12 text-[#FE5000] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('consultResults')}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {t('consultResults')}
                  </p>
                </div>
                <div className="mt-auto">
                   <a href="#" className="inline-block bg-[#FE5000] text-white font-semibold py-3 px-5 rounded hover:bg-[#CC4000] transition-colors text-center w-full sm:w-auto">
                    {t('getResults')}
                  </a>
                </div>
              </div>

              {/* Card 2: Interpréter */}
              <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex flex-col">
                <div>
                   <User className="h-12 w-12 text-[#FE5000] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('interpretResults')}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {t('interpretResults')}
                  </p>
                </div>
                <div className="mt-auto">
                   <a href="#" className="inline-block bg-[#FE5000] text-white font-semibold py-3 px-5 rounded hover:bg-[#CC4000] transition-colors text-center w-full sm:w-auto">
                    {t('contactBiologist')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden lg:block">
            <Image
              src="/images/swello-k6c96KZj1q4-unsplash.jpg"
              alt="Mains utilisant une tablette dans un contexte médical"
              width={548}
              height={365}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsAccess;
