"use client";

import { Phone, Mail, MapPin, Facebook, Instagram, Shield, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '@/lib/contents/LanguageContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61584110146922",
  tiktok: "https://www.tiktok.com/@laby.cite.vert?_r=1&_t=ZS-91ob0aa4ZUN",
  instagram: "https://www.instagram.com/labyciteverte/",
};

// TikTok Icon Component
const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
  </svg>
);

const TopNavigationBar = () => {
  const { t } = useLanguage();

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-[#1034A6] border-b border-white/[0.08] hidden sm:block"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-2">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2.5 lg:gap-0 text-white">
          {/* Left side - Contact info */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full lg:w-auto">
            <span className="flex items-center gap-2 text-xs text-white/70 hover:text-white/90 transition-colors cursor-pointer">
              <MapPin className="h-3.5 w-3.5 text-white/40 flex-shrink-0" />
              <span className="hidden md:inline">Cité verte Batiment B01 Yaoundé 2 Rue 2.711</span>
              <span className="md:hidden">Cité verte B01</span>
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-2 text-xs text-white/70 hover:text-white/90 transition-colors cursor-pointer">
              <Phone className="h-3.5 w-3.5 text-white/40 flex-shrink-0" />
              <span className="hidden lg:inline">(+237) 242 04 68 50 / 671 37 05 65</span>
              <span className="lg:hidden">(+237) 242 04 68 50</span>
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:flex items-center gap-2 text-xs text-white/70 hover:text-white/90 transition-colors cursor-pointer">
              <Mail className="h-3.5 w-3.5 text-white/40 flex-shrink-0" />
              <span>contact@labyaounde.org</span>
            </span>
          </div>

          {/* Right side - Links and Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center lg:justify-end">
            <div className="flex items-center gap-3">
              <Link href="/aide" className="text-white/60 no-underline hover:text-white/90 transition-colors text-xs">
                {t('help')}
              </Link>
              <span className="text-white/20">|</span>
              <Link href="/assistance" className="text-white/60 no-underline hover:text-white/90 transition-colors text-xs">
                {t('assistance')}
              </Link>
              <span className="text-white/20">|</span>
              <Link href="/contact" className="text-white/60 no-underline hover:text-white/90 transition-colors text-xs">
                {t('contact')}
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-1.5 ml-2 pl-3 border-l border-white/[0.08]">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/40 hover:text-white/80 transition-colors w-7 h-7 flex items-center justify-center">
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/40 hover:text-white/80 transition-colors w-7 h-7 flex items-center justify-center">
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white/40 hover:text-white/80 transition-colors w-7 h-7 flex items-center justify-center">
                <TikTokIcon className="h-3.5 w-3.5" />
              </a>

              {/* Divider */}
              <span className="text-white/20 mx-1">|</span>

              {/* Admin Login */}
              <Link
                href="/admin-login"
                aria-label="Admin Login"
                title="Connexion Admin"
                className="flex items-center justify-center w-7 h-7 text-white/40 hover:text-white/80 transition-colors"
              >
                <Shield className="h-3.5 w-3.5" />
              </Link>

              {/* Admin Dashboard — direct access icon */}
              <Link
                href="/admin-dashboard"
                aria-label="Admin Dashboard"
                title="Tableau de bord Admin"
                className="flex items-center justify-center w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default TopNavigationBar;
