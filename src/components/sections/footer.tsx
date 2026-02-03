"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  FileText,
  Facebook,
  Instagram,
  ArrowUp,
  Phone,
  Mail,
  Clock,
  ExternalLink,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FooterLink = {
  href: string;
  text: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

const footerColumns: FooterColumnProps[] = [
  {
    title: "Patients",
    links: [
      { href: "/conseils-et-informations", text: "Avant le prélèvement" },
      { href: "#", text: "Le prélèvement" },
      { href: "#", text: "Après le prélèvement" },
      { href: "#", text: "Mon bilan santé (sans ordonnance)" },
      { href: "/dois-je-prendre-rdv", text: "Questions fréquentes" },
      { href: "#", text: "Donnez votre avis" },
    ],
  },
  {
    title: "Assurance qualité",
    links: [
      { href: "/charte-de-qualite", text: "Charte de qualité" },
      { href: "/controle-qualite", text: "Contrôle qualité" },
      { href: "#", text: "Accréditations" },
      { href: "#", text: "Certifications" },
      { href: "#", text: "Normes & standards" },
    ],
  },
  {
    title: "Carrières",
    links: [
      { href: "/carrieres/offres-emploi-stages", text: "Offres d'emploi" },
      { href: "/carrieres/actualites", text: "Actualités" },
      { href: "/carrieres", text: "Voir toutes les opportunités" },
    ],
  },
  {
    title: "Nos services",
    links: [
      { href: "/nos-services", text: "Analyses médicales" },
      { href: "/nos-services#biologie", text: "Biologie clinique" },
      { href: "/nos-services#immunologie", text: "Immunologie" },
      { href: "/nos-services#microbiologie", text: "Microbiologie" },
      { href: "/nos-services#hematologie", text: "Hématologie" },
    ],
  },
];

const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=VFGR%2BMGH%2C+Cite+Verte%2C+Yaound%C3%A9%2C+Cameroon";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61584110146922",
  tiktok: "https://www.tiktok.com/@laby.cite.vert?_r=1&_t=ZS-91ob0aa4ZUN",
  instagram: "https://www.instagram.com/labyciteverte/",
};

// TikTok Icon Component
const TikTokIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
  </svg>
);

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div>
    <h3 className="text-lg font-bold text-white mb-5 relative">
      <span className="relative">
        {title}
        <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#FE5000]"></span>
      </span>
    </h3>
    <ul className="space-y-3 mt-6">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className="text-sm text-white/80 hover:text-[#FE5000] transition-colors duration-200 flex items-center gap-2 group"
          >
            <span className="w-1.5 h-1.5 bg-[#FE5000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="relative overflow-hidden" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/pexels-polina-tankilevitch-3735716.jpg"
            alt="Laboratory background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A065D]/95 via-[#0A065D]/90 to-[#0A065D]/95"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Top CTA Section */}
          <div className="border-b border-white/10">
            <div className="max-w-[1200px] mx-auto px-6 py-10">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                {/* Logo and tagline */}
                <div className="text-center lg:text-left">
                  <Link href="/" className="inline-block hover:opacity-90 transition-opacity mb-3">
                    <Image
                      src="/images/images.png"
                      alt="Lab Yaoundé Logo"
                      width={220}
                      height={90}
                      className="h-[90px] w-auto object-contain brightness-110"
                    />
                  </Link>
                  <p className="text-white/70 text-sm max-w-xs">
                    Votre partenaire santé de confiance au Cameroun
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FE5000] hover:bg-[#1E90FF] text-white rounded-lg px-6 py-3 font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-[#00CED1]/30 hover:scale-105"
                  >
                    <MapPin size={20} />
                    Trouver mon Laboratoire
                    <ExternalLink size={16} className="opacity-70" />
                  </a>
                  <Link
                    href="#"
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white rounded-lg px-6 py-3 font-semibold flex items-center gap-3 transition-all duration-300"
                  >
                    <FileText size={20} />
                    Mes résultats
                  </Link>
                </div>

                {/* Social Media */}
                <div className="flex items-center gap-4">
                  <span className="text-white/60 text-sm hidden lg:block">Suivez-nous</span>
                  <div className="flex gap-3">
                    <a
                      href={SOCIAL_LINKS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FE5000] flex items-center justify-center transition-all duration-300"
                    >
                      <Facebook size={20} className="text-white" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FE5000] flex items-center justify-center transition-all duration-300"
                    >
                      <TikTokIcon size={20} className="text-white" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FE5000] flex items-center justify-center transition-all duration-300"
                    >
                      <Instagram size={20} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="max-w-[1200px] mx-auto px-6 py-12">
            <div className="grid lg:grid-cols-12 gap-10">
              {/* Contact Info Card */}
              <div className="lg:col-span-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-10 h-10 bg-[#FE5000] rounded-lg flex items-center justify-center">
                      <Phone size={20} />
                    </span>
                    Contactez-nous
                  </h3>

                  <div className="space-y-4">
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-white/80 hover:text-[#FE5000] transition-colors group"
                    >
                      <MapPin size={20} className="text-[#FE5000] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Carrefour Ancien Bâtiments</p>
                        <p className="text-xs text-white/60">Cité verte Batiment B01 Yaounde 2 Rue 2.711</p>
                        <span className="text-xs text-[#FE5000] flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Voir sur Google Maps <ExternalLink size={12} />
                        </span>
                      </div>
                    </a>

                    <a
                      href="tel:+237242046850"
                      className="flex items-center gap-3 text-white hover:text-[#00CED1] transition-colors"
                    >
                      <Phone size={20} className="text-[#00CED1] flex-shrink-0" />
                      <div>
                        <p className="text-lg font-bold text-[#00CED1]">(+237) 242 04 68 50</p>
                        <p className="text-xs text-white/60">Appelez-nous</p>
                      </div>
                    </a>

                    <a
                      href="mailto:contact@labyaounde.cm"
                      className="flex items-center gap-3 text-white/80 hover:text-[#FE5000] transition-colors"
                    >
                      <Mail size={20} className="text-[#FE5000] flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">contact@labyaounde.cm</p>
                        <p className="text-xs text-white/60">Écrivez-nous</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-3 text-white/80">
                      <Clock size={20} className="text-[#FE5000] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Horaires d&apos;ouverture</p>
                        <p className="text-xs text-white/60">Lun-Sam: 7h30-18h00</p>
                        <p className="text-xs text-white/60">Dim: 8h00-13h00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Columns - Desktop */}
              <div className="lg:col-span-8 hidden lg:block">
                <div className="grid grid-cols-4 gap-6">
                  {footerColumns.map((col) => (
                    <FooterColumn key={col.title} title={col.title} links={col.links} />
                  ))}
                </div>
              </div>

              {/* Navigation - Mobile Accordion */}
              <div className="lg:col-span-8 lg:hidden">
                <Accordion type="single" collapsible className="w-full">
                  {footerColumns.map((col) => (
                    <AccordionItem
                      value={col.title}
                      key={col.title}
                      className="border-b border-white/10 last:border-b-0"
                    >
                      <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4 text-white">
                        {col.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3 pt-2 pb-4">
                          {col.links.map((link, index) => (
                            <li key={index}>
                              <Link
                                href={link.href}
                                className="text-sm text-white/70 hover:text-[#FE5000] transition-colors"
                              >
                                {link.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 bg-black/20">
            <div className="max-w-[1200px] mx-auto px-6 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-white/60 text-center md:text-left">
                  © {new Date().getFullYear()} <span className="text-[#FE5000] font-semibold">LABYAOUNDE</span>. Tous droits réservés
                </p>
                <div className="flex gap-x-6 gap-y-2 flex-wrap justify-center">
                  <Link
                    href="#"
                    className="text-sm text-white/60 hover:text-[#FE5000] transition-colors"
                  >
                    Mentions légales
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-white/60 hover:text-[#FE5000] transition-colors"
                  >
                    Politique de confidentialité
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-white/60 hover:text-[#FE5000] transition-colors"
                  >
                    Conditions d&apos;utilisation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Retour en haut"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#00CED1] to-[#0A065D] text-white flex items-center justify-center shadow-lg hover:shadow-[#00CED1]/40 hover:scale-110 transition-all duration-300"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default Footer;
