"use client";

import React from "react";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { MapPin, Clock, Mail, Facebook, Instagram, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61584110146922",
  tiktok: "https://www.tiktok.com/@laby.cite.vert?_r=1&_t=ZS-91ob0aa4ZUN",
  instagram: "https://www.instagram.com/labyciteverte/",
};

const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=VFGR%2BMGH%2C+Cite+Verte%2C+Yaound%C3%A9%2C+Cameroon";

// TikTok Icon Component
const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
  </svg>
);

export default function ContactPage() {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Contactez-nous",
      subtitle: "Nous sommes là pour vous aider",
      description: "N'hésitez pas à nous contacter pour toute question ou demande d'information",
      contactInfo: {
        title: "Informations de contact",
        address: {
          title: "Adresse",
          details: "Cité verte Batiment B01 Yaoundé 2 Rue 2.711"
        },
        email: {
          title: "Email",
          details: "contact@labyaounde.org"
        },
        hours: {
          title: "Horaires d'ouverture",
          items: [
            "Lun-Sam: 7h30-18h00",
            "Dimanche: 8h00-13h00"
          ]
        }
      },
      social: {
        title: "Suivez-nous sur les réseaux sociaux",
        description: "Restez informé de nos actualités et nouveautés"
      },
      mapButton: "Voir sur Google Maps"
    },
    en: {
      title: "Contact us",
      subtitle: "We are here to help",
      description: "Feel free to contact us for any questions or information requests",
      contactInfo: {
        title: "Contact information",
        address: {
          title: "Address",
          details: "Cité verte Building B01 Yaoundé 2 Street 2.711"
        },
        email: {
          title: "Email",
          details: "contact@labyaounde.org"
        },
        hours: {
          title: "Opening hours",
          items: [
            "Mon-Sat: 7:30 AM-6:00 PM",
            "Sunday: 8:00 AM-1:00 PM"
          ]
        }
      },
      social: {
        title: "Follow us on social media",
        description: "Stay informed about our news and updates"
      },
      mapButton: "View on Google Maps"
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
            <Mail className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">{currentContent.title}</h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-4">{currentContent.subtitle}</p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">{currentContent.description}</p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              {currentContent.contactInfo.title}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Address */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#0B3D5F] hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.contactInfo.address.title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {currentContent.contactInfo.address.details}
                </p>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#0B3D5F] font-semibold hover:gap-3 transition-all"
                >
                  {currentContent.mapButton}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#0B3D5F] hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-xl flex items-center justify-center mb-6">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.contactInfo.email.title}</h3>
                <a
                  href={`mailto:${currentContent.contactInfo.email.details}`}
                  className="text-[#0B3D5F] text-lg font-semibold hover:underline"
                >
                  {currentContent.contactInfo.email.details}
                </a>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#0B3D5F] hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-xl flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.contactInfo.hours.title}</h3>
                <ul className="space-y-2">
                  {currentContent.contactInfo.hours.items.map((item, index) => (
                    <li key={index} className="text-gray-700 text-lg">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {currentContent.social.title}
            </h2>
            <p className="text-lg text-gray-600 mb-12">{currentContent.social.description}</p>

            <div className="flex justify-center gap-6">
              {/* Facebook */}
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-20 h-20 rounded-full bg-[#1877F2] hover:bg-[#145dbf] flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              >
                <Facebook className="w-10 h-10 text-white" />
              </a>

              {/* Instagram */}
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              >
                <Instagram className="w-10 h-10 text-white" />
              </a>

              {/* TikTok */}
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-20 h-20 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              >
                <TikTokIcon className="w-10 h-10 text-white" />
              </a>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.863823091544!2d11.540782!3d3.857826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTEnMjguMiJOIDExwrAzMicyNi44IkU!5e0!3m2!1sen!2scm!4v1234567890!5m2!1sen!2scm"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lab Yaounde Location"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
