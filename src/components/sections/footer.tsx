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
  ChevronRight,
  Stethoscope,
  Shield,
  Briefcase,
  FlaskConical,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/contents/LanguageContext";

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

const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=VFGR%2BMGH%2C+Cite+Verte%2C+Yaound%C3%A9%2C+Cameroon";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61584110146922",
  tiktok: "https://www.tiktok.com/@laby.cite.vert?_r=1&_t=ZS-91ob0aa4ZUN",
  instagram: "https://www.instagram.com/labyciteverte/",
};

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerColumns = {
    patients: {
      icon: Stethoscope,
      title: language === 'fr' ? "Patients" : "Patients",
      links: [
        { href: "/conseils-et-informations", text: language === 'fr' ? "Avant le prélèvement" : "Before sampling" },
        { href: "/coming-soon", text: language === 'fr' ? "Le prélèvement" : "The sampling" },
        { href: "/coming-soon", text: language === 'fr' ? "Après le prélèvement" : "After sampling" },
        { href: "/coming-soon", text: language === 'fr' ? "Mon bilan santé (sans ordonnance)" : "My health check (no prescription)" },
        { href: "/questions-frequentes", text: language === 'fr' ? "Questions fréquentes" : "FAQ" },
        { href: "/laisser-un-avis", text: language === 'fr' ? "Donnez votre avis" : "Give your feedback" },
      ],
    },
    quality: {
      icon: Shield,
      title: language === 'fr' ? "Assurance qualité" : "Quality Assurance",
      links: [
        { href: "/charte-de-qualite", text: language === 'fr' ? "Charte de qualité" : "Quality Charter" },
        { href: "/controle-qualite", text: language === 'fr' ? "Contrôle qualité" : "Quality Control" },
        { href: "/coming-soon", text: language === 'fr' ? "Accréditations" : "Accreditations" },
        { href: "/coming-soon", text: language === 'fr' ? "Certifications" : "Certifications" },
        { href: "/nos-standards", text: language === 'fr' ? "Normes & standards" : "Standards & norms" },
      ],
    },
    careers: {
      icon: Briefcase,
      title: language === 'fr' ? "Carrières" : "Careers",
      links: [
        { href: "/carrieres/offres-emploi-stages", text: language === 'fr' ? "Offres d'emploi" : "Job Offers" },
        { href: "/carrieres/actualites", text: language === 'fr' ? "Actualités" : "News" },
        { href: "/carrieres", text: language === 'fr' ? "Voir toutes les opportunités" : "See all opportunities" },
      ],
    },
    services: {
      icon: FlaskConical,
      title: language === 'fr' ? "Nos services" : "Our Services",
      links: [
        { href: "/biochimie-clinique", text: language === 'fr' ? "Biochimie Clinique" : "Clinical Biochemistry" },
        { href: "/hematologie", text: language === 'fr' ? "Hématologie" : "Hematology" },
        { href: "/immunologie", text: language === 'fr' ? "Immunologie" : "Immunology" },
        { href: "/microbiologie", text: language === 'fr' ? "Microbiologie" : "Microbiology" },
        { href: "/biologie-moleculaire", text: language === 'fr' ? "Biologie Moléculaire" : "Molecular Biology" },
      ],
    },
  };

  const FooterColumn = ({ columnKey }: { columnKey: keyof typeof footerColumns }) => {
    const column = footerColumns[columnKey];
    const Icon = column.icon;
    return (
      <div className="group">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#FF8500]/20 transition-colors">
            <Icon className="w-4 h-4 text-[#FF8500]" />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white">
            {column.title}
          </h3>
        </div>
        <ul className="space-y-2 sm:space-y-2.5">
          {column.links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-xs sm:text-sm text-blue-200/70 hover:text-[#FF8500] transition-all duration-200 flex items-center gap-2 group/link"
              >
                <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all duration-200 text-[#FF8500]" />
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      {/* Website designed by Zang Mekinda Adrien | 2026 */}
      <footer className="relative overflow-hidden" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {/* Bleu Roi Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E40AF] to-[#162F80]"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF8500] via-[#FFB347] to-[#FF8500]"></div>
          <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 -right-20 w-[400px] h-[400px] bg-[#FF8500]/[0.04] rounded-full blur-[100px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Top CTA Section */}
          <div className="border-b border-white/10">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8">
                {/* Logo and tagline */}
                <div className="text-center lg:text-left w-full lg:w-auto">
                  <Link href="/" className="inline-block hover:opacity-90 transition-opacity mb-3 sm:mb-4">
                    <Image
                      src="/images/images.png"
                      alt="Lab Yaoundé Logo"
                      width={220}
                      height={90}
                      className="h-[60px] sm:h-[70px] lg:h-[80px] w-auto object-contain brightness-110 mx-auto lg:mx-0"
                    />
                  </Link>
                  <p className="text-white font-semibold text-base sm:text-lg">
                    Laboratoire d&apos;Analyses Biologiques de Yaoundé
                  </p>
                  <p className="text-blue-200/50 text-xs sm:text-sm mt-1">
                    {language === 'fr' ? 'Votre partenaire santé de confiance au Cameroun' : 'Your trusted health partner in Cameroon'}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FF8500] hover:bg-[#E87000] text-white rounded-xl px-5 sm:px-7 py-3 sm:py-3.5 font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 shadow-lg shadow-[#FF8500]/25 hover:shadow-[#FF8500]/40 hover:scale-[1.02] text-sm sm:text-base"
                  >
                    <MapPin size={18} />
                    {language === 'fr' ? 'Trouver mon Laboratoire' : 'Find my Lab'}
                    <ExternalLink size={14} className="opacity-60 hidden sm:block" />
                  </a>
                  <Link
                    href="/mes-resultats"
                    className="bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl px-5 sm:px-7 py-3 sm:py-3.5 font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-[1.02] text-sm sm:text-base"
                  >
                    <FileText size={18} />
                    {language === 'fr' ? 'Mes résultats' : 'My Results'}
                  </Link>
                </div>

                {/* Social Media */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-blue-200/50 text-sm hidden lg:block">{language === 'fr' ? 'Suivez-nous' : 'Follow us'}</span>
                  <div className="flex gap-2 sm:gap-2.5">
                    {[
                      { href: SOCIAL_LINKS.facebook, icon: Facebook, label: "Facebook" },
                      { href: SOCIAL_LINKS.tiktok, icon: TikTokIcon, label: "TikTok" },
                      { href: SOCIAL_LINKS.instagram, icon: Instagram, label: "Instagram" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#FF8500] flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10 hover:border-[#FF8500] hover:shadow-lg hover:shadow-[#FF8500]/25"
                      >
                        <social.icon size={18} className="text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <div className="grid lg:grid-cols-12 gap-8 sm:gap-10">
              {/* Contact Info Card */}
              <div className="lg:col-span-4">
                <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-5 sm:p-7 border border-white/10">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-5 sm:mb-7 flex items-center gap-3">
                    <span className="w-10 h-10 bg-[#FF8500] rounded-lg flex items-center justify-center shadow-md shadow-[#FF8500]/25">
                      <Phone size={18} className="text-white" />
                    </span>
                    {language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-blue-200/70 hover:text-white transition-colors group p-2.5 sm:p-3 rounded-xl hover:bg-white/[0.04]"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                        <MapPin size={16} className="text-[#FF8500]" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-white text-sm">Carrefour Ancien Bâtiments</p>
                        <p className="text-xs text-blue-200/50 mt-0.5">Cité Verte Bâtiment B01, Yaoundé 2</p>
                        <p className="text-xs text-blue-200/50">Rue 2.711</p>
                        <span className="text-xs text-[#FF8500] flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {language === 'fr' ? 'Voir sur Google Maps' : 'View on Google Maps'} <ExternalLink size={10} />
                        </span>
                      </div>
                    </a>

                    <a
                      href="tel:+237242046850"
                      className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#FF8500]/15 flex items-center justify-center flex-shrink-0">
                        <Phone size={16} className="text-[#FF8500]" />
                      </div>
                      <div>
                        <p className="text-base sm:text-lg font-bold text-[#FF8500]">(+237) 242 04 68 50</p>
                        <p className="text-xs text-blue-200/50">{language === 'fr' ? 'Appelez-nous' : 'Call us'}</p>
                      </div>
                    </a>

                    <a
                      href="mailto:contact@labyaounde.cm"
                      className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                        <Mail size={16} className="text-[#FF8500]" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-white text-sm truncate">contact@labyaounde.cm</p>
                        <p className="text-xs text-blue-200/50">{language === 'fr' ? 'Écrivez-nous' : 'Write to us'}</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-[#FF8500]/[0.08] border border-[#FF8500]/15">
                      <div className="w-9 h-9 rounded-lg bg-[#FF8500]/20 flex items-center justify-center flex-shrink-0">
                        <Clock size={16} className="text-[#FF8500]" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-xs sm:text-sm">{language === 'fr' ? "Horaires d'ouverture" : 'Opening Hours'}</p>
                        <p className="text-xs sm:text-sm font-bold text-[#FF8500]">
                          {language === 'fr' ? 'Ouvert 24h/24 - 7j/7' : 'Open 24/7'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Columns - Desktop */}
              <div className="lg:col-span-8 hidden lg:block">
                <div className="grid grid-cols-4 gap-6 xl:gap-8">
                  <FooterColumn columnKey="patients" />
                  <FooterColumn columnKey="quality" />
                  <FooterColumn columnKey="careers" />
                  <FooterColumn columnKey="services" />
                </div>
              </div>

              {/* Navigation - Mobile/Tablet */}
              <div className="lg:col-span-8 lg:hidden">
                {/* Tablet: 2-column grid */}
                <div className="hidden sm:grid sm:grid-cols-2 gap-8 lg:hidden">
                  <FooterColumn columnKey="patients" />
                  <FooterColumn columnKey="quality" />
                  <FooterColumn columnKey="careers" />
                  <FooterColumn columnKey="services" />
                </div>
                {/* Mobile: Accordion */}
                <div className="sm:hidden">
                  <Accordion type="single" collapsible className="w-full">
                    {Object.entries(footerColumns).map(([key, column]) => {
                      const Icon = column.icon;
                      return (
                        <AccordionItem
                          value={key}
                          key={key}
                          className="border-b border-white/10 last:border-b-0"
                        >
                          <AccordionTrigger className="text-base font-semibold hover:no-underline py-4 text-white">
                            <div className="flex items-center gap-3">
                              <Icon className="w-4 h-4 text-[#FF8500]" />
                              {column.title}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2.5 pt-2 pb-4 pl-7">
                              {column.links.map((link, index) => (
                                <li key={index}>
                                  <Link
                                    href={link.href}
                                    className="text-sm text-blue-200/70 hover:text-[#FF8500] transition-colors"
                                  >
                                    {link.text}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 bg-[#152D6B]/60">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                <p className="text-xs sm:text-sm text-blue-200/50 text-center sm:text-left">
                  © {new Date().getFullYear()} <span className="text-[#FF8500] font-semibold">LABYAOUNDE</span>. {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}
                </p>
                <div className="flex gap-x-4 sm:gap-x-6 gap-y-1 flex-wrap justify-center">
                  {[
                    { href: "#", text: language === 'fr' ? "Mentions légales" : "Legal Notice" },
                    { href: "#", text: language === 'fr' ? "Confidentialité" : "Privacy" },
                    { href: "#", text: language === 'fr' ? "Conditions" : "Terms" },
                  ].map((link) => (
                    <Link
                      key={link.text}
                      href={link.href}
                      className="text-xs sm:text-sm text-blue-200/40 hover:text-[#FF8500] transition-colors"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Designer signature */}
              <div className="mt-3 pt-3 border-t border-white/[0.04] text-center">
                <small className="text-[11px] text-blue-300/20 tracking-wide">
                  Designed by Zang Mekinda Adrien
                </small>
              </div>
            </div>
          </div>
          {/* Website designed by Zang Mekinda Adrien | 2026 */}
        </div>
      </footer>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Retour en haut"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FF8500] hover:bg-[#E87000] text-white flex items-center justify-center shadow-lg shadow-[#FF8500]/30 hover:shadow-[#FF8500]/50 hover:scale-105 transition-all duration-300"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default Footer;
