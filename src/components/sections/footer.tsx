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
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-[#FF8500]/15 flex items-center justify-center group-hover:bg-[#FF8500]/25 transition-colors">
            <Icon className="w-4.5 h-4.5 text-[#FF8500]" />
          </div>
          <h3 className="text-base font-semibold text-white">
            {column.title}
          </h3>
        </div>
        <ul className="space-y-2.5">
          {column.links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-sm text-slate-400 hover:text-[#FF8500] transition-all duration-200 flex items-center gap-2 group/link"
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
        {/* Professional Dark Background */}
        <div className="absolute inset-0 bg-[#0B1121]"></div>

        {/* Subtle gradient accent */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF8500]/30 to-transparent"></div>
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#1E40AF]/[0.03] rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#FF8500]/[0.02] rounded-full blur-[120px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Top CTA Section */}
          <div className="border-b border-white/[0.06]">
            <div className="max-w-[1200px] mx-auto px-6 py-10">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                {/* Logo and tagline */}
                <div className="text-center lg:text-left">
                  <Link href="/" className="inline-block hover:opacity-90 transition-opacity mb-4">
                    <Image
                      src="/images/images.png"
                      alt="Lab Yaoundé Logo"
                      width={220}
                      height={90}
                      className="h-[80px] w-auto object-contain brightness-110"
                    />
                  </Link>
                  <p className="text-white font-semibold text-lg">
                    Laboratoire d&apos;Analyses Biologiques de Yaoundé
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    {language === 'fr' ? 'Votre partenaire santé de confiance au Cameroun' : 'Your trusted health partner in Cameroon'}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FF8500] hover:bg-[#E87000] text-white rounded-xl px-7 py-3.5 font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg shadow-[#FF8500]/20 hover:shadow-[#FF8500]/40 hover:scale-[1.02]"
                  >
                    <MapPin size={18} />
                    {language === 'fr' ? 'Trouver mon Laboratoire' : 'Find my Lab'}
                    <ExternalLink size={14} className="opacity-60" />
                  </a>
                  <Link
                    href="/mes-resultats"
                    className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white rounded-xl px-7 py-3.5 font-semibold flex items-center gap-3 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <FileText size={18} />
                    {language === 'fr' ? 'Mes résultats' : 'My Results'}
                  </Link>
                </div>

                {/* Social Media */}
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 text-sm hidden lg:block">{language === 'fr' ? 'Suivez-nous' : 'Follow us'}</span>
                  <div className="flex gap-2.5">
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
                        className="w-10 h-10 rounded-lg bg-white/[0.06] hover:bg-[#FF8500] flex items-center justify-center transition-all duration-300 hover:scale-105 border border-white/[0.06] hover:border-[#FF8500]"
                      >
                        <social.icon size={18} className="text-slate-400 group-hover:text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="max-w-[1200px] mx-auto px-6 py-14">
            <div className="grid lg:grid-cols-12 gap-10">
              {/* Contact Info Card */}
              <div className="lg:col-span-4">
                <div className="bg-white/[0.03] rounded-2xl p-7 border border-white/[0.06]">
                  <h3 className="text-xl font-semibold text-white mb-7 flex items-center gap-3">
                    <span className="w-10 h-10 bg-[#FF8500] rounded-lg flex items-center justify-center">
                      <Phone size={18} className="text-white" />
                    </span>
                    {language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
                  </h3>

                  <div className="space-y-4">
                    {/* Address */}
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3.5 text-slate-400 hover:text-white transition-colors group p-3 rounded-xl hover:bg-white/[0.03]"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                        <MapPin size={16} className="text-[#FF8500]" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-300 text-sm">Carrefour Ancien Bâtiments</p>
                        <p className="text-xs text-slate-500 mt-0.5">Cité Verte Bâtiment B01, Yaoundé 2</p>
                        <p className="text-xs text-slate-500">Rue 2.711</p>
                        <span className="text-xs text-[#FF8500] flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {language === 'fr' ? 'Voir sur Google Maps' : 'View on Google Maps'} <ExternalLink size={10} />
                        </span>
                      </div>
                    </a>

                    {/* Phone */}
                    <a
                      href="tel:+237242046850"
                      className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                        <Phone size={16} className="text-[#FF8500]" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#FF8500]">(+237) 242 04 68 50</p>
                        <p className="text-xs text-slate-500">{language === 'fr' ? 'Appelez-nous' : 'Call us'}</p>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:contact@labyaounde.cm"
                      className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                        <Mail size={16} className="text-[#FF8500]" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-300 text-sm">contact@labyaounde.cm</p>
                        <p className="text-xs text-slate-500">{language === 'fr' ? 'Écrivez-nous' : 'Write to us'}</p>
                      </div>
                    </a>

                    {/* Hours */}
                    <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#FF8500]/[0.06] border border-[#FF8500]/10">
                      <div className="w-9 h-9 rounded-lg bg-[#FF8500]/15 flex items-center justify-center flex-shrink-0">
                        <Clock size={16} className="text-[#FF8500]" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-300 text-sm">{language === 'fr' ? "Horaires d'ouverture" : 'Opening Hours'}</p>
                        <p className="text-sm font-bold text-[#FF8500]">
                          {language === 'fr' ? 'Laboratoire ouvert 24h/24 - 7j/7' : 'Laboratory open 24/7'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Columns - Desktop */}
              <div className="lg:col-span-8 hidden lg:block">
                <div className="grid grid-cols-4 gap-8">
                  <FooterColumn columnKey="patients" />
                  <FooterColumn columnKey="quality" />
                  <FooterColumn columnKey="careers" />
                  <FooterColumn columnKey="services" />
                </div>
              </div>

              {/* Navigation - Mobile Accordion */}
              <div className="lg:col-span-8 lg:hidden">
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(footerColumns).map(([key, column]) => {
                    const Icon = column.icon;
                    return (
                      <AccordionItem
                        value={key}
                        key={key}
                        className="border-b border-white/[0.06] last:border-b-0"
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
                                  className="text-sm text-slate-400 hover:text-[#FF8500] transition-colors"
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

          {/* Bottom Bar */}
          <div className="border-t border-white/[0.06] bg-black/20">
            <div className="max-w-[1200px] mx-auto px-6 py-5">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-slate-500 text-center md:text-left">
                  © {new Date().getFullYear()} <span className="text-[#FF8500] font-semibold">LABYAOUNDE</span>. {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}
                </p>
                <div className="flex gap-x-6 gap-y-2 flex-wrap justify-center">
                  {[
                    { href: "#", text: language === 'fr' ? "Mentions légales" : "Legal Notice" },
                    { href: "#", text: language === 'fr' ? "Politique de confidentialité" : "Privacy Policy" },
                    { href: "#", text: language === 'fr' ? "Conditions d'utilisation" : "Terms of Use" },
                  ].map((link) => (
                    <Link
                      key={link.text}
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-[#FF8500] transition-colors"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Designer signature */}
              <div className="mt-3 pt-3 border-t border-white/[0.03] text-center">
                <small className="text-[11px] text-slate-600 tracking-wide">
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
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#FF8500] hover:bg-[#E87000] text-white flex items-center justify-center shadow-lg shadow-[#FF8500]/30 hover:shadow-[#FF8500]/50 hover:scale-105 transition-all duration-300"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default Footer;
