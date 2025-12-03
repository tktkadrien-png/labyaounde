"use client";

import React from "react";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { Headphones, Clock, MapPin, Phone, Mail, MessageCircle, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function AssistancePage() {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Assistance",
      subtitle: "Notre équipe à votre service",
      description: "Nous sommes là pour vous accompagner à chaque étape de votre parcours",
      sections: [
        {
          icon: Phone,
          title: "Support téléphonique",
          description: "Appelez-nous pour une assistance immédiate",
          details: ["(+237) 242 04 68 50", "(+237) 671 37 05 65"],
          action: "Appeler maintenant",
          link: "tel:+237242046850"
        },
        {
          icon: Mail,
          title: "Support par email",
          description: "Envoyez-nous vos questions par email",
          details: ["contact@labyaounde.org", "Réponse sous 24h"],
          action: "Envoyer un email",
          link: "mailto:contact@labyaounde.org"
        },
        {
          icon: MessageCircle,
          title: "Questions fréquentes",
          description: "Trouvez rapidement des réponses dans notre FAQ",
          details: ["Base de connaissances", "Réponses instantanées"],
          action: "Consulter la FAQ",
          link: "/questions-frequentes"
        }
      ],
      schedule: {
        title: "Horaires d'assistance",
        items: [
          { day: "Lundi - Vendredi", hours: "7h30 - 18h00" },
          { day: "Samedi", hours: "7h30 - 18h00" },
          { day: "Dimanche", hours: "8h00 - 13h00" }
        ]
      },
      location: {
        title: "Notre Localisation",
        address: "Cité verte Batiment B01 Yaoundé 2 Rue 2.711",
        action: "Voir sur la carte"
      }
    },
    en: {
      title: "Assistance",
      subtitle: "Our team at your service",
      description: "We are here to support you at every step of your journey",
      sections: [
        {
          icon: Phone,
          title: "Phone support",
          description: "Call us for immediate assistance",
          details: ["(+237) 242 04 68 50", "(+237) 671 37 05 65"],
          action: "Call now",
          link: "tel:+237242046850"
        },
        {
          icon: Mail,
          title: "Email support",
          description: "Send us your questions by email",
          details: ["contact@labyaounde.org", "Response within 24h"],
          action: "Send an email",
          link: "mailto:contact@labyaounde.org"
        },
        {
          icon: MessageCircle,
          title: "Frequently asked questions",
          description: "Quickly find answers in our FAQ",
          details: ["Knowledge base", "Instant answers"],
          action: "View FAQ",
          link: "/questions-frequentes"
        }
      ],
      schedule: {
        title: "Assistance hours",
        items: [
          { day: "Monday - Friday", hours: "7:30 AM - 6:00 PM" },
          { day: "Saturday", hours: "7:30 AM - 6:00 PM" },
          { day: "Sunday", hours: "8:00 AM - 1:00 PM" }
        ]
      },
      location: {
        title: "Our Location",
        address: "Cité verte Building B01 Yaoundé 2 Street 2.711",
        action: "View on map"
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
            <Headphones className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">{currentContent.title}</h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-4">{currentContent.subtitle}</p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">{currentContent.description}</p>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {currentContent.sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#0B3D5F] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h3>
                    <p className="text-gray-600 mb-4">{section.description}</p>
                    <ul className="space-y-2 mb-6">
                      {section.details.map((detail, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[#0B3D5F] rounded-full"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={section.link}
                      className="inline-flex items-center gap-2 text-[#0B3D5F] font-semibold hover:gap-3 transition-all"
                    >
                      {section.action}
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Schedule and Location */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Schedule */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#0B3D5F] rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentContent.schedule.title}</h2>
                </div>
                <div className="space-y-4">
                  {currentContent.schedule.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-4 rounded-xl">
                      <span className="font-semibold text-gray-900">{item.day}</span>
                      <span className="text-[#0B3D5F] font-bold">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#0B3D5F] rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentContent.location.title}</h2>
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">{currentContent.location.address}</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=VFGR%2BMGH%2C+Cite+Verte%2C+Yaound%C3%A9%2C+Cameroon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0B3D5F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0B4D6F] transition-all shadow-lg"
                >
                  <MapPin className="w-5 h-5" />
                  {currentContent.location.action}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
