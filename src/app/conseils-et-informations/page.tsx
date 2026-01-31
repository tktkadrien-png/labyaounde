"use client";

import React from 'react';
import Image from 'next/image';
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import Link from "next/link";
import { Info, BookOpen, Clock, Heart, ShieldCheck, Lightbulb, AlertTriangle, Check, ArrowRight, Phone, FileText, Users, Droplet, Activity } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useLanguage } from '@/lib/contents/LanguageContext';

export default function ConseilsEtInformations() {
  const { t } = useLanguage();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.1);
  const { ref: section1Ref, isVisible: section1Visible } = useScrollAnimation(0.1);
  const { ref: section2Ref, isVisible: section2Visible } = useScrollAnimation(0.1);
  const { ref: section3Ref, isVisible: section3Visible } = useScrollAnimation(0.1);
  const { ref: section4Ref, isVisible: section4Visible } = useScrollAnimation(0.1);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation(0.1);

  const dayBeforeTips = [
    { title: t('lightDinner'), desc: t('lightDinnerDesc'), icon: "🍽️" },
    { title: t('hydrateWell'), desc: t('hydrateWellDesc'), icon: "💧" },
    { title: t('noAlcohol'), desc: t('noAlcoholDesc'), icon: "🚫" },
    { title: t('enoughRest'), desc: t('enoughRestDesc'), icon: "😴" },
    { title: t('noIntenseExercise'), desc: t('noIntenseExerciseDesc'), icon: "🏋️" }
  ];

  const samplingDayTips = [
    { title: t('comeOnEmptyStomach'), desc: t('comeOnEmptyStomachDesc'), icon: "⏰" },
    { title: t('morningRecommended'), desc: t('morningRecommendedDesc'), icon: "🌅" },
    { title: t('bringDocuments'), desc: t('bringDocumentsDesc'), icon: "📋" },
    { title: t('comfortableClothing'), desc: t('comfortableClothingDesc'), icon: "👕" },
    { title: t('informUs'), desc: t('informUsDesc'), icon: "⚕️" }
  ];

  const qualityItems = [
    { title: t('modernEquipment'), desc: t('modernEquipmentDesc') },
    { title: t('qualifiedStaff'), desc: t('qualifiedStaffDesc') },
    { title: t('strictStandards'), desc: t('strictStandardsDesc') },
    { title: t('qualityControls'), desc: t('qualityControlsDesc') },
    { title: t('cofracAccreditation'), desc: t('cofracAccreditationDesc') }
  ];

  const confidentialityItems = [
    { title: t('medicalSecret'), desc: t('medicalSecretDesc') },
    { title: t('secureAccess'), desc: t('secureAccessDesc') },
    { title: t('encryptedData'), desc: t('encryptedDataDesc') },
    { title: t('gdprCompliant'), desc: t('gdprCompliantDesc') },
    { title: t('yourControl'), desc: t('yourControlDesc') }
  ];

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section ref={heroRef as React.RefObject<HTMLElement>} className="bg-gradient-to-br from-[#0A065D] via-cyan-800 to-blue-900 text-white py-20 lg:py-32 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/pexels-edward-jenner-4033148.jpg"
              alt="Medical laboratory research"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00CED1] rounded-full blur-3xl"></div>
          </div>

          <div className={`max-w-[1200px] mx-auto px-6 relative z-10 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/20">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-semibold">{t('essentialInfo')}</span>
              </div>

              <h1 className="text-4xl lg:text-7xl font-bold mb-8 leading-tight">
                {t('advicePageTitle')}
              </h1>

              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                {t('advicePageSubtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction & Quick Links */}
        <section ref={section1Ref as React.RefObject<HTMLElement>} className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`transition-all duration-700 ${section1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Featured Image Banner */}
              <div className="mb-12 relative h-[280px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/pexels-karola-g-4226894.jpg"
                  alt="Healthcare professional consultation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A065D]/80 to-transparent flex items-center">
                  <div className="p-8 text-white max-w-xl">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                      {t('welcomeGuide')}
                    </h2>
                    <p className="text-lg text-white/90">
                      {t('welcomeGuideDesc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <Link href="/dois-je-prendre-rdv" className="group">
                  <div className="bg-gradient-to-br from-[#00CED1]/10 to-[#00CED1]/10 rounded-2xl p-8 border-2 border-[#00CED1]/30 hover:border-blue-400 hover:shadow-xl transition-all h-full">
                    <div className="w-16 h-16 bg-[#00CED1]/100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Info className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-3">{t('needAppointmentQuestion')}</h3>
                    <p className="text-gray-700 mb-4">
                      {t('needAppointmentDesc')}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                      {t('learnMore')}
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>

                <Link href="/dois-je-prendre-rdv#preparation" className="group">
                  <div className="bg-gradient-to-br from-[#FE5000]/10 to-[#FE5000]/15 rounded-2xl p-8 border-2 border-[#FE5000]/30 hover:border-[#FE5000] hover:shadow-xl transition-all h-full">
                    <div className="w-16 h-16 bg-[#FE5000] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#FE5000] mb-3">{t('essentialPreparation')}</h3>
                    <p className="text-gray-700 mb-4">
                      {t('essentialPreparationDesc')}
                    </p>
                    <div className="flex items-center gap-2 text-[#FE5000] font-semibold group-hover:gap-3 transition-all">
                      {t('seeFullGuide')}
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>

                <Link href="/contact" className="group">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all h-full">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-900 mb-3">{t('contactUsTitle')}</h3>
                    <p className="text-gray-700 mb-4">
                      {t('contactUsDesc')}
                    </p>
                    <div className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                      {t('contactCtaButton')}
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Conseils Avant le Prelevement */}
        <section ref={section2Ref as React.RefObject<HTMLElement>} className="py-20 lg:py-24 bg-gradient-to-br from-[#00CED1]/10 to-[#00CED1]/10">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`transition-all duration-700 ${section2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Section Header with Image */}
              <div className="flex flex-col lg:flex-row gap-8 items-center mb-12">
                <div className="lg:w-1/3 relative h-[220px] w-full rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/pexels-mediocrememories-954585.jpg"
                    alt="Patient preparing for medical test"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="lg:w-2/3 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-[#00CED1]/20 text-blue-700 px-6 py-3 rounded-full mb-4">
                    <Lightbulb className="w-5 h-5" />
                    <span className="text-sm font-semibold">{t('beforeYourVisit')}</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-bold text-[#0A065D] mb-4">
                    {t('beforeSamplingAdvice')}
                  </h2>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* La Veille */}
                <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#00CED1]/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-[#00CED1]/100 rounded-full flex items-center justify-center">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900">{t('dayBeforeSampling')}</h3>
                  </div>

                  <ul className="space-y-4">
                    {dayBeforeTips.map((item, index) => (
                      <li key={index} className="flex items-start gap-4 p-4 bg-[#00CED1]/10 rounded-lg hover:bg-[#00CED1]/20 transition-all">
                        <span className="text-3xl flex-shrink-0">{item.icon}</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-700">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Le Jour J */}
                <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#00CED1]/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-#00CED1/100 rounded-full flex items-center justify-center">
                      <Activity className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-cyan-900">{t('samplingDay')}</h3>
                  </div>

                  <ul className="space-y-4">
                    {samplingDayTips.map((item, index) => (
                      <li key={index} className="flex items-start gap-4 p-4 bg-#00CED1/10 rounded-lg hover:bg-[#00CED1]/20 transition-all">
                        <span className="text-3xl flex-shrink-0">{item.icon}</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-700">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Preparation */}
              <div className="mt-12 bg-gradient-to-r from-blue-600 to-[#0A065D] rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">{t('fullPrepGuide')}</h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  {t('fullPrepGuideDesc')}
                </p>
                <Link
                  href="/dois-je-prendre-rdv#preparation"
                  className="inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  <FileText className="w-6 h-6" />
                  {t('accessPrepGuide')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comprendre vos Analyses */}
        <section ref={section3Ref as React.RefObject<HTMLElement>} className="py-20 lg:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`transition-all duration-700 ${section3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Section Header with Image */}
              <div className="flex flex-col lg:flex-row-reverse gap-8 items-center mb-12">
                <div className="lg:w-1/3 relative h-[220px] w-full rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/pexels-polina-tankilevitch-3735709.jpg"
                    alt="Laboratory analysis results"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="lg:w-2/3 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full mb-4">
                    <Droplet className="w-5 h-5" />
                    <span className="text-sm font-semibold">{t('medicalInfo')}</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-bold text-[#0A065D] mb-4">
                    {t('understandAnalysis')}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {t('understandAnalysisDesc')}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "NFS - Numeration Formule Sanguine", icon: "🩸", what: "Compte et analyse les cellules sanguines : globules rouges, blancs et plaquettes.", why: "Detecte les anemies, infections, troubles de la coagulation et maladies du sang." },
                  { name: "Glycemie", icon: "🍬", what: "Mesure le taux de sucre (glucose) dans le sang.", why: "Depiste et surveille le diabete. Valeurs normales : 0,70 a 1,10 g/L a jeun." },
                  { name: "Bilan Lipidique", icon: "❤️", what: "Mesure les graisses : cholesterol total, HDL, LDL et triglycerides.", why: "Evalue le risque cardiovasculaire (infarctus, AVC) et surveille le traitement." },
                  { name: "Creatinine", icon: "🫘", what: "Dechet metabolique elimine par les reins.", why: "Evalue la fonction renale. Un taux eleve indique un probleme renal." },
                  { name: "TSH - Thyreostimuline", icon: "🦋", what: "Hormone qui regule la glande thyroide.", why: "Detecte l'hypothyroidie (TSH elevee) ou l'hyperthyroidie (TSH basse)." },
                  { name: "Transaminases (ALAT/ASAT)", icon: "🫀", what: "Enzymes presentes dans le foie et les muscles.", why: "Detecte les maladies du foie (hepatite, cirrhose) ou problemes cardiaques." },
                  { name: "CRP - Proteine C-Reactive", icon: "🔥", what: "Marqueur de l'inflammation dans l'organisme.", why: "Detecte et surveille les infections, inflammations et maladies auto-immunes." },
                  { name: "Vitamine D", icon: "☀️", what: "Vitamine essentielle pour les os et l'immunite.", why: "Previent l'osteoporose, la fatigue et les infections. Carence frequente." },
                  { name: "Ferritine", icon: "⚙️", what: "Proteine qui stocke le fer dans l'organisme.", why: "Detecte les carences en fer (anemie) ou les surcharges (hemochromatose)." }
                ].map((analyse, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-6 border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all"
                  >
                    <div className="text-4xl mb-4">{analyse.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{analyse.name}</h3>

                    <div className="space-y-3">
                      <div className="bg-[#00CED1]/10 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-blue-900 mb-1">{t('whatIsIt')}</p>
                        <p className="text-sm text-gray-700">{analyse.what}</p>
                      </div>

                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-green-900 mb-1">{t('whyAnalysis')}</p>
                        <p className="text-sm text-gray-700">{analyse.why}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-purple-50 rounded-2xl p-8 border-2 border-purple-200">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">{t('importantNotice')}</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {t('importantNoticeText')}
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      {t('valuesVary')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Securite et Confidentialite */}
        <section ref={section4Ref as React.RefObject<HTMLElement>} className="py-20 lg:py-24 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`transition-all duration-700 ${section4Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Section Image Banner */}
              <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-xl mb-12">
                <Image
                  src="/images/pexels-rethaferguson-3825578.jpg"
                  alt="Medical confidentiality and security"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-600/60 flex items-center justify-center">
                  <div className="text-center text-white px-6">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-4">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="text-sm font-semibold">{t('yourSecurity')}</span>
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                      {t('securityConfidentiality')}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-900">{t('qualitySecurity')}</h3>
                  </div>

                  <ul className="space-y-4">
                    {qualityItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-700">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#00CED1]/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-[#00CED1]/100 rounded-full flex items-center justify-center">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900">{t('confidentialityTitle')}</h3>
                  </div>

                  <ul className="space-y-4">
                    {confidentialityItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-[#00CED1]/10 rounded-lg">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-700">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section ref={ctaRef as React.RefObject<HTMLElement>} className="py-20 lg:py-28 bg-gradient-to-br from-[#0A065D] via-blue-700 to-blue-900 text-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`text-center transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Users className="w-20 h-20 mx-auto mb-6 text-white/90" />
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                {t('needHelpInfo')}
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
                {t('teamAvailable')}
              </p>

              <div className="flex flex-wrap gap-6 justify-center">
                <Link
                  href="/dois-je-prendre-rdv"
                  className="inline-flex items-center gap-3 bg-white text-[#0909FF] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  <Info className="w-6 h-6" />
                  {t('appointmentGuide')}
                </Link>

                <Link
                  href="/dois-je-prendre-rdv#preparation"
                  className="inline-flex items-center gap-3 bg-[#FE5000] hover:bg-[#CC4000] text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  <Clock className="w-6 h-6" />
                  {t('preparationGuide')}
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-all text-lg"
                >
                  <Phone className="w-6 h-6" />
                  {t('contactCtaButton')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
