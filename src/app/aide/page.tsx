"use client";

import React from "react";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { HelpCircle, FileText, Calendar, Phone, Mail, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function AidePage() {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Aide",
      subtitle: "Comment pouvons-nous vous aider?",
      description: "Trouvez rapidement les réponses à vos questions et accédez aux ressources dont vous avez besoin.",
      sections: [
        {
          icon: FileText,
          title: "Prendre un rendez-vous",
          description: "Découvrez si vous avez besoin d'un rendez-vous pour vos analyses",
          link: "/dois-je-prendre-rdv"
        },
        {
          icon: Calendar,
          title: "Préparer ma visite",
          description: "Consultez les documents nécessaires et les consignes de préparation",
          link: "/documents-necessaires"
        },
        {
          icon: HelpCircle,
          title: "Questions fréquentes",
          description: "Consultez notre FAQ pour des réponses rapides",
          link: "/questions-frequentes"
        },
        {
          icon: Phone,
          title: "Contactez-nous",
          description: "Notre équipe est disponible pour vous aider",
          link: "/contact"
        }
      ],
      contactSection: {
        title: "Besoin d'aide personnalisée?",
        description: "Notre équipe est là pour répondre à toutes vos questions",
        button: "Contacter notre équipe"
      }
    },
    en: {
      title: "Help",
      subtitle: "How can we help you?",
      description: "Quickly find answers to your questions and access the resources you need.",
      sections: [
        {
          icon: FileText,
          title: "Make an appointment",
          description: "Find out if you need an appointment for your tests",
          link: "/dois-je-prendre-rdv"
        },
        {
          icon: Calendar,
          title: "Prepare my visit",
          description: "Check required documents and preparation instructions",
          link: "/documents-necessaires"
        },
        {
          icon: HelpCircle,
          title: "Frequently asked questions",
          description: "Check our FAQ for quick answers",
          link: "/questions-frequentes"
        },
        {
          icon: Phone,
          title: "Contact us",
          description: "Our team is available to help you",
          link: "/contact"
        }
      ],
      contactSection: {
        title: "Need personalized help?",
        description: "Our team is here to answer all your questions",
        button: "Contact our team"
      }
    }
  };

  const currentContent = content[language];

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0B3D5F] via-[#0B4D6F] to-[#063251] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HelpCircle className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">{currentContent.title}</h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-4">{currentContent.subtitle}</p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">{currentContent.description}</p>
          </div>
        </section>

        {/* Help Sections */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {currentContent.sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Link
                    key={index}
                    href={section.link}
                    className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#0B3D5F] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#0B3D5F] transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">{section.description}</p>
                        <div className="flex items-center gap-2 text-[#0B3D5F] font-semibold">
                          <span>{language === 'fr' ? 'En savoir plus' : 'Learn more'}</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-2xl p-8 lg:p-12 text-white shadow-2xl">
              <Mail className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{currentContent.contactSection.title}</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">{currentContent.contactSection.description}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-[#0B3D5F] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                {currentContent.contactSection.button}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
