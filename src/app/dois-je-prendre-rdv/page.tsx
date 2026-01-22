"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Check, AlertCircle, Clock, Phone, Calendar, Info, FileText, Droplet, Thermometer, Activity, Users, Home, Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

export default function DoisJePrendreRDV() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.1);
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation(0.1);
  const { ref: greenRef, isVisible: greenVisible } = useScrollAnimation(0.1);
  const { ref: redRef, isVisible: redVisible } = useScrollAnimation(0.1);
  const { ref: yellowRef, isVisible: yellowVisible } = useScrollAnimation(0.1);
  const { ref: examplesRef, isVisible: examplesVisible } = useScrollAnimation(0.1);
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation(0.1);
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation(0.1);
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation(0.1);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section ref={heroRef as React.RefObject<HTMLElement>} className="bg-gradient-to-br from-[#2916F5] via-cyan-800 to-blue-900 text-white py-20 lg:py-32 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/pexels-pixabay-356040.jpg"
              alt="Laboratory background"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#1589FF] rounded-full blur-3xl"></div>
          </div>

          <div className={`max-w-[1200px] mx-auto px-6 relative z-10 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/20">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-semibold">Guide Pratique des Rendez-vous</span>
              </div>

              <h1 className="text-4xl lg:text-7xl font-bold mb-8 leading-tight">
                Dois-je prendre un rendez-vous ?
              </h1>

              <p className="text-xl lg:text-3xl text-white/90 leading-relaxed mb-6">
                La majorité des examens sont réalisables <span className="font-bold text-[#1589FF]">sans rendez-vous</span>.
              </p>

              <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                Certains examens nécessitent une préparation spécifique ou la présence d'un biologiste qualifié.
                Découvrez ci-dessous toutes les informations dont vous avez besoin.
              </p>
            </div>
          </div>
        </section>

        {/* Info rapide */}
        <section ref={infoRef as React.RefObject<HTMLElement>} className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Featured Image */}
            <div className={`mb-12 relative h-[300px] rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ${infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Image
                src="/images/pexels-chokniti-khongchum-1197604-3938022.jpg"
                alt="Modern laboratory equipment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2916F5]/70 to-transparent flex items-center">
                <div className="p-8 text-white max-w-lg">
                  <h3 className="text-3xl font-bold mb-3">Laboratoire moderne et accessible</h3>
                  <p className="text-lg text-white/90">Des équipements de pointe pour des résultats fiables et rapides</p>
                </div>
              </div>
            </div>
            <div className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-gradient-to-br from-[#1589FF]/10 to-[#1589FF]/10 rounded-xl p-6 border-2 border-[#1589FF]/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-[#2916F5] rounded-full flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#2916F5] mb-2">80% Sans RDV</h3>
                <p className="text-gray-700">La plupart des analyses courantes ne nécessitent aucun rendez-vous</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-orange-900 mb-2">Ouvert 7j/7</h3>
                <p className="text-gray-700">Nos laboratoires sont accessibles tous les jours pour votre commodité</p>
              </div>

              <div className="bg-gradient-to-br from-[#1589FF]/10 to-[#1589FF]/10 rounded-xl p-6 border-2 border-[#1589FF]/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-[#1589FF]/100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Service Rapide</h3>
                <p className="text-gray-700">Temps d'attente moyen de 15-20 minutes selon l'affluence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Examens SANS rendez-vous - Version développée */}
        <section ref={greenRef as React.RefObject<HTMLElement>} className="py-20 lg:py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`transition-all duration-700 ${greenVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Section Image */}
              <div className="flex flex-col lg:flex-row gap-8 items-center mb-12">
                <div className="lg:w-1/3 relative h-[250px] w-full rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/pexels-chokniti-khongchum-1197604-2280571.jpg"
                    alt="Blood test analysis"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="lg:w-2/3 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-[#1589FF]/20 text-blue-700 px-6 py-3 rounded-full mb-4">
                    <Check className="w-5 h-5" />
                    <span className="text-sm font-semibold">Accès Libre - Sans Rendez-vous</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-bold text-[#2916F5] mb-4">
                    Analyses Accessibles Sans Rendez-vous
                  </h2>
                  <p className="text-xl text-gray-600">
                    Présentez-vous directement au laboratoire avec votre ordonnance. Vous serez pris en charge rapidement selon votre ordre d'arrivée.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1589FF]/10 to-[#1589FF]/10 rounded-2xl p-8 lg:p-12 shadow-2xl border-l-8 border-[#2916F5] mb-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Analyses de sang courantes */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-[#1589FF]/30">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#2916F5] rounded-full flex items-center justify-center">
                        <Droplet className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#2916F5]">Analyses de Sang Courantes</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        { name: "NFS (Numération Formule Sanguine)", desc: "Compte les globules rouges, blancs et plaquettes" },
                        { name: "Glycémie", desc: "Mesure le taux de sucre dans le sang" },
                        { name: "Créatinine", desc: "Évalue la fonction rénale" },
                        { name: "Bilan lipidique", desc: "Cholestérol et triglycérides" },
                        { name: "Transaminases", desc: "Vérifie la santé du foie" },
                        { name: "TSH", desc: "Fonction de la thyroïde" }
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 group hover:bg-[#1589FF]/10 p-2 rounded-lg transition-all">
                          <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <div>
                            <span className="font-semibold text-gray-900">{item.name}</span>
                            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tests de dépistage */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-[#1589FF]/30">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#2916F5] rounded-full flex items-center justify-center">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#2916F5]">Tests de Dépistage Rapide</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        { name: "Test de grossesse (β-HCG)", desc: "Résultat en quelques heures", time: "2-4h" },
                        { name: "Test de paludisme", desc: "Diagnostic rapide du paludisme", time: "30min" },
                        { name: "Groupe sanguin", desc: "Détermination du groupe ABO et Rhésus", time: "1-2h" },
                        { name: "Test d'urine", desc: "Analyse des urines complète", time: "1h" },
                        { name: "CRP (Protéine C-Réactive)", desc: "Détection de l'inflammation", time: "2-3h" },
                        { name: "Sérologie rapide", desc: "HIV, Hépatite B et C", time: "4-6h" }
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 group hover:bg-[#1589FF]/10 p-2 rounded-lg transition-all">
                          <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <span className="font-semibold text-gray-900">{item.name}</span>
                              <span className="text-xs bg-[#1589FF]/20 text-blue-700 px-2 py-1 rounded-full">{item.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bilans complets */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-[#1589FF]/30">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#2916F5] rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#2916F5]">Bilans Complets</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        { name: "Bilan de santé général", desc: "Check-up complet de votre état de santé" },
                        { name: "Bilan pré-opératoire", desc: "Avant une intervention chirurgicale" },
                        { name: "Bilan d'anémie", desc: "Fer, ferritine, vitamine B12" },
                        { name: "Bilan diabétique", desc: "Glycémie, HbA1c" },
                        { name: "Bilan rénal", desc: "Créatinine, urée, clairance" }
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 group hover:bg-[#1589FF]/10 p-2 rounded-lg transition-all">
                          <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <div>
                            <span className="font-semibold text-gray-900">{item.name}</span>
                            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Autres analyses */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-[#1589FF]/30">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#2916F5] rounded-full flex items-center justify-center">
                        <Search className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#2916F5]">Analyses Spécialisées</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        { name: "Analyses hormonales courantes", desc: "Hormones thyroïdiennes, cortisol" },
                        { name: "Vitamines", desc: "Vitamine D, B12, acide folique" },
                        { name: "Électrolytes", desc: "Sodium, potassium, calcium" },
                        { name: "Coagulation", desc: "TP, INR, TCA" },
                        { name: "Marqueurs cardiaques", desc: "Troponine (si urgence)" }
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 group hover:bg-[#1589FF]/10 p-2 rounded-lg transition-all">
                          <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <div>
                            <span className="font-semibold text-gray-900">{item.name}</span>
                            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-green-100 border-l-4 border-green-500 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-[#2916F5] mb-2 text-lg">💡 Conseil Pratique</h4>
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Venez de préférence le matin à jeun</strong> (entre 7h30 et 10h00) pour éviter l'affluence.
                        Apportez votre carte Vitale, votre mutuelle et votre ordonnance. Les résultats sont généralement disponibles
                        dans les 24-48 heures et accessibles en ligne sur votre espace patient sécurisé.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Examens AVEC rendez-vous - Version développée */}
        <section ref={redRef as React.RefObject<HTMLElement>} className="py-20 lg:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`transition-all duration-700 ${redVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Section Image */}
              <div className="flex flex-col lg:flex-row-reverse gap-8 items-center mb-12">
                <div className="lg:w-1/3 relative h-[250px] w-full rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/pexels-polina-tankilevitch-3735715.jpg"
                    alt="Medical appointment consultation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="lg:w-2/3 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-6 py-3 rounded-full mb-4">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-semibold">Rendez-vous Obligatoire</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-bold text-red-900 mb-4">
                    Examens Nécessitant un Rendez-vous
                  </h2>
                  <p className="text-xl text-gray-600">
                    Ces examens requièrent une préparation spécifique, un équipement particulier ou la présence d'un biologiste spécialisé.
                    Prenez rendez-vous pour garantir votre prise en charge.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 lg:p-12 shadow-2xl border-l-8 border-red-500">
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Tests COVID et respiratoires */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <Thermometer className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-red-900">Tests COVID et Respiratoires</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        {
                          name: "PCR COVID-19",
                          desc: "Test moléculaire par prélèvement nasopharyngé",
                          why: "Nécessite un créneau dédié et un respect strict des protocoles sanitaires",
                          delay: "Résultats en 24h"
                        },
                        {
                          name: "Test antigénique COVID",
                          desc: "Dépistage rapide du coronavirus",
                          why: "Zone dédiée pour éviter les contaminations croisées",
                          delay: "Résultats en 15-30min"
                        }
                      ].map((item, index) => (
                        <li key={index} className="bg-red-50 p-4 rounded-lg border border-red-200">
                          <div className="flex items-start gap-3 mb-2">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <span className="font-bold text-gray-900">{item.name}</span>
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">{item.delay}</span>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{item.desc}</p>
                              <div className="flex items-start gap-2 mt-3 pt-3 border-t border-red-200">
                                <Info className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-gray-600 italic">{item.why}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tests hormonaux spécialisés */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-red-900">Tests Hormonaux Spécialisés</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        {
                          name: "Courbe de glycémie (HGPO)",
                          desc: "Test de tolérance au glucose - 3h de surveillance",
                          why: "Nécessite des prélèvements à intervalles précis (0h, 1h, 2h, 3h)",
                          prep: "Jeûne de 12h requis"
                        },
                        {
                          name: "Test au Synacthène",
                          desc: "Évaluation des glandes surrénales",
                          why: "Injection et surveillance par un biologiste pendant 60min",
                          prep: "À jeun, le matin uniquement"
                        },
                        {
                          name: "Dosage de Prolactine",
                          desc: "Hormone hypophysaire sensible au stress",
                          why: "Repos de 30min avant prélèvement dans une pièce calme",
                          prep: "Entre 8h et 10h du matin"
                        }
                      ].map((item, index) => (
                        <li key={index} className="bg-red-50 p-4 rounded-lg border border-red-200">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <span className="font-bold text-gray-900 block mb-1">{item.name}</span>
                              <p className="text-sm text-gray-700 mb-2">{item.desc}</p>
                              <div className="space-y-2 mt-3 pt-3 border-t border-red-200">
                                <div className="flex items-start gap-2">
                                  <Info className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                  <p className="text-xs text-gray-600"><strong>Pourquoi RDV:</strong> {item.why}</p>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Clock className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                                  <p className="text-xs text-gray-600"><strong>Préparation:</strong> {item.prep}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prélèvements à domicile */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <Home className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-red-900">Prélèvements à Domicile</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-red-50 p-5 rounded-lg border border-red-200">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Check className="w-5 h-5 text-red-600" />
                          Service disponible pour :
                        </h4>
                        <ul className="space-y-2 ml-7">
                          <li className="text-sm text-gray-700">• Personnes à mobilité réduite</li>
                          <li className="text-sm text-gray-700">• Patients âgés ou alités</li>
                          <li className="text-sm text-gray-700">• Hospitalisation à domicile (HAD)</li>
                          <li className="text-sm text-gray-700">• Post-opératoire</li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 p-5 rounded-lg border border-orange-200">
                        <h4 className="font-bold text-orange-900 mb-3">📋 Informations pratiques</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold">•</span>
                            <span><strong>Horaires:</strong> Du lundi au samedi, 7h-11h</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold">•</span>
                            <span><strong>Tarif:</strong> Frais de déplacement selon distance (nous consulter)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold">•</span>
                            <span><strong>Réservation:</strong> 48h à l'avance minimum</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold">•</span>
                            <span><strong>Zone:</strong> Yaoundé et environs (rayon de 25km)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Analyses spéciales */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-red-900">Autres Examens sur RDV</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        {
                          name: "Spermogramme / Spermocytogramme",
                          desc: "Analyse de la fertilité masculine",
                          why: "Nécessite une pièce dédiée et un traitement immédiat de l'échantillon"
                        },
                        {
                          name: "Frottis cervico-utérin",
                          desc: "Dépistage du cancer du col de l'utérus",
                          why: "Présence d'une sage-femme ou gynécologue requise"
                        },
                        {
                          name: "Biopsies et anatomopathologie",
                          desc: "Analyse de tissus prélevés",
                          why: "Coordination avec le médecin prescripteur"
                        }
                      ].map((item, index) => (
                        <li key={index} className="bg-red-50 p-4 rounded-lg border border-red-200">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                            <div>
                              <span className="font-bold text-gray-900 block mb-1">{item.name}</span>
                              <p className="text-sm text-gray-700 mb-2">{item.desc}</p>
                              <div className="flex items-start gap-2 mt-2 pt-2 border-t border-red-200">
                                <Info className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-gray-600 italic">{item.why}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bouton de prise de rendez-vous */}
                <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-red-300">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-red-900 mb-4">Comment prendre rendez-vous ?</h3>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                      Contactez-nous par téléphone ou WhatsApp pour planifier votre examen.
                      Notre équipe vous guidera et répondra à toutes vos questions.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                      >
                        <Calendar className="w-6 h-6" />
                        Prendre rendez-vous maintenant
                      </a>
                      <a
                        href="tel:+237XXXXXXXXX"
                        className="inline-flex items-center gap-3 bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-lg"
                      >
                        <Phone className="w-6 h-6" />
                        Appeler directement
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Préparation avant les examens - Version développée */}
        <section ref={yellowRef as React.RefObject<HTMLElement>} className="py-20 lg:py-24 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`transition-all duration-700 ${yellowVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Section Image Banner */}
              <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-xl mb-12">
                <Image
                  src="/images/pexels-polina-tankilevitch-3735703.jpg"
                  alt="Medical professional preparing for test"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/80 to-yellow-600/60 flex items-center justify-center">
                  <div className="text-center text-white px-6">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-4">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm font-semibold">Préparation Indispensable</span>
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                      Comment bien se préparer avant les tests ?
                    </h2>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                      Une bonne préparation garantit la fiabilité de vos résultats
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 lg:p-12 shadow-2xl border-l-8 border-yellow-500">
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Jeûne */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-yellow-900">À Jeun - Mode d'emploi</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-yellow-50 p-5 rounded-lg border-2 border-yellow-300">
                        <h4 className="font-bold text-yellow-900 mb-3 text-lg">⏰ Durée du jeûne</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <span className="text-2xl">🕐</span>
                            <div>
                              <strong className="text-gray-900">8 à 12 heures</strong>
                              <p className="text-sm text-gray-700 mt-1">Pour la plupart des analyses (glycémie, bilan lipidique)</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-2xl">🕐</span>
                            <div>
                              <strong className="text-gray-900">12 à 14 heures</strong>
                              <p className="text-sm text-gray-700 mt-1">Pour les triglycérides et bilans complets</p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-[#1589FF]/10 p-5 rounded-lg border border-[#1589FF]/30">
                        <h4 className="font-bold text-[#2916F5] mb-3 flex items-center gap-2">
                          <Check className="w-5 h-5" />
                          ✅ Autorisé pendant le jeûne
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#2916F5] rounded-full"></span>
                            <span><strong>Eau plate</strong> - à volonté</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#2916F5] rounded-full"></span>
                            <span><strong>Médicaments habituels</strong> - sauf avis contraire</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#2916F5] rounded-full"></span>
                            <span><strong>Se brosser les dents</strong> - sans avaler</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-red-50 p-5 rounded-lg border border-red-200">
                        <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          ❌ Interdit pendant le jeûne
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            <span>Café, thé (même sans sucre)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            <span>Jus de fruits, sodas, boissons sucrées</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            <span>Cigarettes et tabac</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            <span>Chewing-gum, bonbons</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            <span>Alcool (24-48h avant)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Autres recommandations */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-orange-900">Activité Physique</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                          <p className="text-sm text-gray-700 mb-3">
                            <strong className="text-orange-900">48h avant votre prélèvement :</strong>
                          </p>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                              <span>Évitez les efforts physiques intenses (sport, musculation)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                              <span>Pas de travaux physiques importants</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                              <span>Marche et activités légères autorisées</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-[#1589FF]/10 p-4 rounded-lg border border-[#1589FF]/30">
                          <p className="text-xs text-gray-600 italic flex items-start gap-2">
                            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Pourquoi ?</strong> L'exercice intense peut modifier certains paramètres sanguins (enzymes musculaires, glucose, protéines) et fausser les résultats.</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-purple-900">Documents à Apporter</h3>
                      </div>
                      <ul className="space-y-3">
                        {[
                          { icon: "📋", name: "Ordonnance médicale", desc: "Si prescrite par votre médecin" },
                          { icon: "🪪", name: "Pièce d'identité", desc: "Carte nationale ou passeport" },
                          { icon: "📄", name: "Anciens résultats", desc: "Si analyses de suivi" }
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-all">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <strong className="text-gray-900">{item.name}</strong>
                              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-#1589FF/100 rounded-full flex items-center justify-center">
                          <Info className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-cyan-900">Conseils Généraux</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#2916F5] flex-shrink-0 mt-1" />
                          <span>Venez de préférence <strong>le matin entre 7h30 et 10h</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#2916F5] flex-shrink-0 mt-1" />
                          <span>Portez des <strong>vêtements amples</strong> facilitant le prélèvement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#2916F5] flex-shrink-0 mt-1" />
                          <span>Hydratez-vous bien <strong>la veille</strong> (facilite le prélèvement)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#2916F5] flex-shrink-0 mt-1" />
                          <span>Signalez toute <strong>allergie ou traitement en cours</strong></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Info className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-900 mb-2 text-lg">💡 Vous avez un doute ?</h4>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Chaque analyse peut avoir des exigences spécifiques. <strong>En cas de doute sur la préparation nécessaire</strong>,
                        n'hésitez pas à nous contacter avant votre venue. Notre équipe vous donnera toutes les instructions personnalisées
                        selon vos examens prescrits.
                      </p>
                      <a
                        href="tel:+237XXXXXXXXX"
                        className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-all text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        Nous contacter pour des conseils
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exemples concrets */}
        <section ref={examplesRef as React.RefObject<HTMLElement>} className="py-20 lg:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`transition-all duration-700 ${examplesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-[#1589FF]/20 text-blue-700 px-6 py-3 rounded-full mb-4">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-semibold">Cas Pratiques</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold text-[#2916F5] mb-4">
                  📖 Exemples de Situations Courantes
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Découvrez des scénarios réels pour mieux comprendre comment procéder selon votre situation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Marie, 32 ans - Bilan de santé annuel",
                    icon: "👩",
                    color: "blue",
                    situation: "Marie souhaite faire un check-up complet comme chaque année.",
                    analyses: ["NFS", "Glycémie", "Bilan lipidique", "Créatinine", "TSH"],
                    rdv: false,
                    preparation: [
                      "Jeûne de 12h avant le prélèvement",
                      "Venir le matin entre 7h30 et 9h",
                      "Apporter carte Vitale et mutuelle"
                    ],
                    process: [
                      "Se présenter au laboratoire sans RDV",
                      "Prélèvement sanguin : 5 minutes",
                      "Résultats disponibles en 24-48h en ligne"
                    ]
                  },
                  {
                    title: "Jean, 45 ans - Diabète de type 2",
                    icon: "👨",
                    color: "green",
                    situation: "Jean doit faire une courbe de glycémie prescrite par son diabétologue.",
                    analyses: ["HGPO (Hyperglycémie Provoquée par voie Orale)"],
                    rdv: true,
                    preparation: [
                      "Jeûne strict de 12h",
                      "Pas d'effort physique 48h avant",
                      "Prendre RDV 3-5 jours à l'avance",
                      "Prévoir 3h sur place"
                    ],
                    process: [
                      "Arrivée au laboratoire à l'heure du RDV",
                      "1er prélèvement à jeun (T0)",
                      "Boisson sucrée à consommer",
                      "2e prélèvement après 1h (T60)",
                      "3e prélèvement après 2h (T120)",
                      "Résultats sous 48h"
                    ]
                  },
                  {
                    title: "Fatou, 28 ans - Test de grossesse",
                    icon: "👩‍🦱",
                    color: "pink",
                    situation: "Fatou a un retard de règles et souhaite confirmer une grossesse.",
                    analyses: ["β-HCG (hormone de grossesse)"],
                    rdv: false,
                    preparation: [
                      "Aucune préparation nécessaire",
                      "Pas besoin d'être à jeun",
                      "Venir de préférence le matin"
                    ],
                    process: [
                      "Se présenter directement au laboratoire",
                      "Prélèvement sanguin rapide",
                      "Résultats en 2-4 heures",
                      "Récupération sur place ou en ligne"
                    ]
                  },
                  {
                    title: "Paul, 70 ans - Prélèvement à domicile",
                    icon: "👴",
                    color: "purple",
                    situation: "Paul a des difficultés à se déplacer suite à une opération de la hanche.",
                    analyses: ["NFS", "Ionogramme", "INR (surveillance anticoagulants)"],
                    rdv: true,
                    preparation: [
                      "Appeler 48h à l'avance",
                      "Jeûne si nécessaire (selon analyses)",
                      "Préparer ordonnance et carte Vitale",
                      "Être disponible dans la tranche horaire convenue"
                    ],
                    process: [
                      "Infirmier se déplace au domicile",
                      "Prélèvement dans les conditions optimales",
                      "Transport des échantillons au laboratoire",
                      "Résultats en 24-48h en ligne",
                      "Possibilité d'envoi postal des résultats"
                    ]
                  }
                ].map((example, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-${example.color}-50 to-${example.color}-100 rounded-2xl p-6 lg:p-8 shadow-xl border-2 border-${example.color}-200 hover:scale-105 transition-all duration-300`}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="text-5xl">{example.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{example.title}</h3>
                        <p className="text-gray-700 italic">{example.situation}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          Analyses prescrites
                        </h4>
                        <ul className="space-y-1">
                          {example.analyses.map((analyse, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[#1589FF]/100 rounded-full"></span>
                              {analyse}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`bg-white rounded-lg p-4 border-2 ${example.rdv ? 'border-red-300 bg-red-50/50' : 'border-blue-300 bg-[#1589FF]/10/50'}`}>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          {example.rdv ? <AlertCircle className="w-5 h-5 text-red-600" /> : <Check className="w-5 h-5 text-blue-600" />}
                          {example.rdv ? 'Rendez-vous OBLIGATOIRE' : 'Sans rendez-vous'}
                        </h4>
                      </div>

                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Info className="w-5 h-5 text-orange-600" />
                          Préparation
                        </h4>
                        <ul className="space-y-2">
                          {example.preparation.map((prep, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                              <Check className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                              <span>{prep}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-purple-600" />
                          Déroulement
                        </h4>
                        <ol className="space-y-2">
                          {example.process.map((step, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start gap-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">
                                {i + 1}
                              </span>
                              <span className="pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Processus étape par étape */}
        <section ref={processRef as React.RefObject<HTMLElement>} className="py-20 lg:py-24 bg-gradient-to-br from-[#1589FF]/10 to-[#1589FF]/10">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`transition-all duration-700 ${processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-bold text-[#2916F5] mb-4">
                  🎯 Votre Visite au Laboratoire : Étape par Étape
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Déroulement type d'une visite pour un prélèvement sans rendez-vous
                </p>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#1589FF]"></div>

                <div className="space-y-12">
                  {[
                    {
                      step: 1,
                      title: "Arrivée et Accueil",
                      time: "2-3 minutes",
                      icon: Home,
                      description: "Présentez-vous à l'accueil avec vos documents",
                      details: [
                        "Remettez votre ordonnance, carte Vitale et mutuelle",
                        "L'agent d'accueil vérifie vos informations",
                        "Création ou mise à jour de votre dossier patient",
                        "Vous recevez un ticket avec un numéro d'attente"
                      ]
                    },
                    {
                      step: 2,
                      title: "Salle d'Attente",
                      time: "10-20 minutes",
                      icon: Clock,
                      description: "Attendez d'être appelé selon votre ordre d'arrivée",
                      details: [
                        "Installez-vous confortablement dans la salle d'attente",
                        "Votre numéro s'affiche sur l'écran quand c'est votre tour",
                        "Temps d'attente variable selon l'affluence",
                        "Possibilité de sortir si besoin (gardez votre ticket)"
                      ]
                    },
                    {
                      step: 3,
                      title: "Prélèvement Sanguin",
                      time: "5 minutes",
                      icon: Droplet,
                      description: "Un(e) infirmier(ère) qualifié(e) effectue le prélèvement",
                      details: [
                        "Installation en position assise ou semi-allongée",
                        "Désinfection et pose du garrot",
                        "Prélèvement rapide et peu douloureux",
                        "Étiquetage immédiat des tubes avec votre identité",
                        "Pansement compressif pendant 15 minutes"
                      ]
                    },
                    {
                      step: 4,
                      title: "Fin de Visite",
                      time: "2 minutes",
                      icon: Check,
                      description: "Instructions post-prélèvement et départ",
                      details: [
                        "Informations sur l'accès à vos résultats",
                        "Délais de disponibilité des analyses",
                        "Activation de votre espace patient en ligne",
                        "Code confidentiel pour consulter vos résultats",
                        "Possibilité de retrait papier au laboratoire"
                      ]
                    }
                  ].map((item, index) => (
                    <div key={index} className="relative">
                      <div className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                        {/* Content */}
                        <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border-2 border-[#1589FF]/30 hover:shadow-2xl transition-all">
                            <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'} justify-start`}>
                              <span className="text-sm font-bold text-[#2916F5] bg-[#1589FF]/20 px-3 py-1 rounded-full">
                                {item.time}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#2916F5] mb-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <ul className={`space-y-2 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-left`}>
                              {item.details.map((detail, i) => (
                                <li key={i} className={`flex items-start gap-2 text-sm text-gray-700 ${index % 2 === 0 ? 'lg:flex-row-reverse lg:justify-start' : ''}`}>
                                  <Check className="w-4 h-4 text-[#2916F5] flex-shrink-0 mt-0.5" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Step circle */}
                        <div className="relative z-10 flex-shrink-0">
                          <div className="w-20 h-20 bg-[#2916F5] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                            <item.icon className="w-10 h-10 text-white" />
                          </div>
                          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-[#2916F5] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                            {item.step}
                          </div>
                        </div>

                        {/* Spacer */}
                        <div className="flex-1 hidden lg:block"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl border-2 border-[#1589FF]/30">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#2916F5] mb-4">⏱️ Temps Total Estimé</h3>
                  <div className="text-5xl font-bold text-[#2916F5] mb-2">20-30 min</div>
                  <p className="text-gray-600">Durée moyenne d'une visite complète (hors période de forte affluence)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Interactive */}
        <section ref={faqRef as React.RefObject<HTMLElement>} className="py-20 lg:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full mb-4">
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Questions Fréquentes</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold text-[#2916F5] mb-4">
                  ❓ Vos Questions, Nos Réponses
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Retrouvez les réponses aux questions les plus posées par nos patients
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-4">
                {[
                  {
                    question: "Puis-je venir sans ordonnance ?",
                    answer: "Oui, vous pouvez réaliser des analyses sans ordonnance, mais elles ne seront pas remboursées par la Sécurité Sociale. Le laboratoire vous remettra un devis avant le prélèvement. Certains bilans préventifs (dépistage IST, bilan de santé) peuvent être réalisés sans ordonnance dans le cadre de campagnes spécifiques."
                  },
                  {
                    question: "Comment récupérer mes résultats ?",
                    answer: "Vous avez plusieurs options : \n• **En ligne** : Accès 24h/24 sur votre espace patient sécurisé (recommandé)\n• **Par email** : Envoi crypté à votre adresse email\n• **Au laboratoire** : Retrait papier sur présentation d'une pièce d'identité\n• **Par courrier postal** : Envoi à domicile (délai supplémentaire de 2-3 jours)\n\nVous serez notifié par SMS dès que vos résultats sont disponibles."
                  },
                  {
                    question: "Combien de temps pour avoir les résultats ?",
                    answer: "Les délais varient selon le type d'analyse :\n• **Analyses courantes** : 24 à 48 heures\n• **Tests rapides** (grossesse, paludisme) : 2 à 4 heures\n• **Analyses spécialisées** : 3 à 7 jours\n• **Analyses génétiques** : 2 à 4 semaines\n• **Anatomopathologie** : 7 à 15 jours\n\nEn cas d'urgence médicale, nous pouvons accélérer certaines analyses. Contactez votre médecin qui nous contactera directement."
                  },
                  {
                    question: "Dois-je être à jeun pour tous les examens ?",
                    answer: "Non, le jeûne n'est pas toujours nécessaire. Il est requis pour :\n• **Obligatoire** : Glycémie, bilan lipidique (cholestérol, triglycérides), bilan hépatique complet\n• **Recommandé** : Bilan de santé général, bilan pré-opératoire\n• **Non nécessaire** : NFS, CRP, sérologies, hormones thyroïdiennes, test de grossesse, groupage sanguin\n\nEn cas de doute, consultez votre ordonnance ou contactez-nous. Votre médecin peut préciser sur l'ordonnance si le jeûne est requis."
                  },
                  {
                    question: "Puis-je prendre mes médicaments avant le prélèvement ?",
                    answer: "Oui, continuez votre traitement habituel, sauf indication contraire de votre médecin. Exceptions importantes :\n• **Anticoagulants** : Signalez-le impérativement à l'infirmier(ère)\n• **Insuline/antidiabétiques** : Attendez après le prélèvement si vous êtes à jeun\n• **Hormones thyroïdiennes** : Prenez après le prélèvement pour un dosage de TSH\n• **Biotine (vitamine B8)** : Arrêt 48h avant si dosage hormonal\n\nPensez à signaler tous vos traitements lors de l'accueil."
                  },
                  {
                    question: "Les enfants peuvent-ils être prélevés au laboratoire ?",
                    answer: "Oui, nous accueillons les enfants de tout âge. Notre équipe est formée aux prélèvements pédiatriques :\n• **Nouveau-nés et nourrissons** : Prélèvement au talon ou veine\n• **Enfants** : Techniques adaptées, environnement rassurant\n• **Adolescents** : Possibilité de venir seul avec autorisation parentale écrite\n\nPour les jeunes enfants, nous recommandons de prendre rendez-vous pour éviter l'attente. Vous pouvez utiliser notre crème anesthésiante EMLA (sur ordonnance) 1h avant la venue."
                  },
                  {
                    question: "Comment créer mon espace patient en ligne ?",
                    answer: "La création est simple et sécurisée :\n1. Lors de votre première visite, demandez l'activation de votre espace patient\n2. Vous recevrez un SMS avec un lien d'activation\n3. Créez votre mot de passe personnel\n4. Accédez à tous vos résultats 24h/24\n\nAvantages de l'espace patient :\n• Consultation immédiate des résultats\n• Historique de toutes vos analyses\n• Téléchargement et impression des documents\n• Partage sécurisé avec votre médecin\n• Notifications automatiques par SMS/email"
                  },
                  {
                    question: "Que faire si je ne me sens pas bien pendant le prélèvement ?",
                    answer: "C'est une réaction normale chez certaines personnes (malaise vagal) :\n• **Prévenez immédiatement** l'infirmier(ère) si vous vous sentez mal\n• Nous vous installerons en position allongée\n• Vous pourrez vous reposer le temps nécessaire\n• De l'eau et du sucre sont disponibles\n\nPour éviter le malaise :\n• Ne venez pas à jeun depuis trop longtemps (max 14h)\n• Buvez de l'eau avant de venir\n• Évitez de regarder le prélèvement si vous êtes sensible\n• Prévenez si vous avez déjà fait des malaises\n• Demandez à vous allonger préventivement"
                  }
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl border-2 border-purple-100 overflow-hidden hover:border-purple-300 transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-purple-50/50 transition-all"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-[#2916F5] pr-4">{faq.question}</h3>
                      </div>
                      <div className="flex-shrink-0">
                        {openFaq === index ? (
                          <ChevronUp className="w-6 h-6 text-purple-600" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-purple-600" />
                        )}
                      </div>
                    </button>

                    {openFaq === index && (
                      <div className="px-6 pb-6 pl-20">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center bg-purple-50 rounded-2xl p-8 border-2 border-purple-200">
                <HelpCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#2916F5] mb-3">
                  Vous ne trouvez pas la réponse à votre question ?
                </h3>
                <p className="text-gray-600 mb-6">
                  Notre équipe est à votre disposition pour répondre à toutes vos interrogations
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  Contactez-nous
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Rendez-vous - Version améliorée */}
        <section id="contact" ref={contactRef as React.RefObject<HTMLElement>} className="py-20 lg:py-28 bg-gradient-to-br from-[#2916F5] via-blue-700 to-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1589FF] rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className={`transition-all duration-700 ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 border-4 border-white/30">
                  <Phone className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-3xl lg:text-6xl font-bold mb-6">
                  📞 Contactez-Nous
                </h2>

                <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-12">
                  Notre équipe est à votre écoute pour répondre à vos questions et prendre vos rendez-vous
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 hover:bg-white/15 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#2916F5] rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold mb-1">WhatsApp</h3>
                      <p className="text-white/80 text-sm">Réponse rapide et pratique</p>
                    </div>
                  </div>
                  <a href="https://wa.me/237XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-3xl font-bold hover:text-green-200 transition-colors block mb-4">
                    +237 6XX XX XX XX
                  </a>
                  <p className="text-white/80 text-sm mb-4">
                    Envoyez-nous un message pour vos questions ou pour prendre rendez-vous.
                    Réponse sous 30 minutes pendant nos heures d'ouverture.
                  </p>
                  <a
                    href="https://wa.me/237XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#2916F5] hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Ouvrir WhatsApp
                  </a>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 hover:bg-white/15 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#1589FF]/100 rounded-full flex items-center justify-center">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold mb-1">Téléphone</h3>
                      <p className="text-white/80 text-sm">Appelez-nous directement</p>
                    </div>
                  </div>
                  <a href="tel:+237XXXXXXXXX" className="text-3xl font-bold hover:text-[#1589FF]/30 transition-colors block mb-4">
                    +237 6XX XX XX XX
                  </a>
                  <p className="text-white/80 text-sm mb-4">
                    Disponible du lundi au samedi de 7h30 à 18h00 et le dimanche de 8h00 à 13h00.
                    Pour les urgences médicales, composez le 15.
                  </p>
                  <a
                    href="tel:+237XXXXXXXXX"
                    className="inline-flex items-center gap-3 bg-white text-[#0909FF] px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Phone className="w-5 h-5" />
                    Appeler maintenant
                  </a>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 text-center">
                <h3 className="text-2xl font-bold mb-4">Nos Horaires d'Ouverture</h3>
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div>
                    <p className="text-white/90 mb-2"><strong>Lundi - Vendredi</strong></p>
                    <p className="text-white/80">7h30 - 18h00</p>
                  </div>
                  <div>
                    <p className="text-white/90 mb-2"><strong>Samedi</strong></p>
                    <p className="text-white/80">7h30 - 18h00</p>
                  </div>
                  <div>
                    <p className="text-white/90 mb-2"><strong>Dimanche</strong></p>
                    <p className="text-white/80">8h00 - 13h00</p>
                  </div>
                  <div>
                    <p className="text-white/90 mb-2"><strong>Jours fériés</strong></p>
                    <p className="text-white/80">8h00 - 12h00</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm mt-6 italic">
                  * Prélèvements à jeun recommandés avant 10h00
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
