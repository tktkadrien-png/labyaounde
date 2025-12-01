"use client";

import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Shield } from 'lucide-react';
import { useLanguage } from '@/lib/contents/LanguageContext';
import Link from 'next/link';

const TopNavigationBar = () => {
  const { t } = useLanguage();
  
  return (
    <header className="bg-gradient-to-r from-[#0b467a] to-[#0B3D5F] border-b border-[#0b467a]/20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-2.5 lg:py-2">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-0 text-white">
          {/* Left side - Contact info */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 lg:gap-5 w-full lg:w-auto">
            <span className="flex items-center gap-2 text-xs sm:text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white flex-shrink-0" />
              <span className="hidden md:inline font-medium">Cité verte Batiment B01 Yaoundé 2 Rue 2.711</span>
              <span className="md:hidden font-medium">Cité verte B01</span>
            </span>
            <span className="flex items-center gap-2 text-xs sm:text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white flex-shrink-0" />
              <span className="hidden lg:inline font-medium">(+237) 242 04 68 50 / 671 37 05 65</span>
              <span className="lg:hidden font-medium">(+237) 242 04 68 50</span>
            </span>
            <span className="hidden sm:flex items-center gap-2 text-xs sm:text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white flex-shrink-0" />
              <span className="font-medium">contact@labyaounde.org</span>
            </span>
          </div>

          {/* Right side - Links and Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center lg:justify-end">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/coming-soon" className="text-white/90 no-underline hover:text-white hover:underline font-medium transition-all text-xs sm:text-sm">
                {t('help')}
              </Link>
              <span className="text-white/50">•</span>
              <Link href="/coming-soon" className="text-white/90 no-underline hover:text-white hover:underline font-medium transition-all text-xs sm:text-sm">
                {t('assistance')}
              </Link>
              <span className="text-white/50">•</span>
              <Link href="/#contact" className="text-white/90 no-underline hover:text-white hover:underline font-medium transition-all text-xs sm:text-sm">
                {t('contact')}
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:gap-2.5 ml-2 sm:ml-3 pl-2 sm:pl-3 border-l border-white/20">
              <a href="#" aria-label="Facebook" className="text-white/80 hover:text-white transition-all hover:scale-110 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="text-white/80 hover:text-white transition-all hover:scale-110 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="text-white/80 hover:text-white transition-all hover:scale-110 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white/80 hover:text-white transition-all hover:scale-110 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
                <Linkedin className="h-4 w-4" />
              </a>

              {/* Admin Access Button */}
              <Link href="/admin-login" aria-label="Admin Login" className="ml-1 sm:ml-2 flex items-center justify-center w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full text-white font-bold text-xs transition-all hover:scale-110 shadow-lg">
                <Shield className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigationBar;