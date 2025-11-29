"use client";

import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Shield } from 'lucide-react';
import { useLanguage } from '@/lib/contents/LanguageContext';
import Link from 'next/link';

const TopNavigationBar = () => {
  const { t } = useLanguage();
  
  return (
    <header className="bg-[#0b467a] border-b border-[#0b467a]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-2 lg:py-1.5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-0 text-xs sm:text-sm text-white text-center lg:text-left">
          {/* Left side - Contact info */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 lg:gap-6 w-full lg:w-auto">
            <span className="flex items-center gap-1.5 text-xs sm:text-sm">
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white flex-shrink-0" />
              <span className="hidden sm:inline">Cité verte Batiment B01</span>
              <span className="sm:hidden">Cité verte B01</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white flex-shrink-0" />
              <span className="hidden md:inline">(+237) 242 04 68 50 / 671 37 05 65 / 694 493 130</span>
              <span className="md:hidden">(+237) 242 04 68 50</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm">
              <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white flex-shrink-0" />
              contact@labyaounde.org
            </span>
          </div>

          {/* Right side - Links and Social Icons */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:mt-0 flex-wrap justify-center lg:justify-end">
            <a href="#" className="text-white no-underline hover:underline font-medium transition-all text-xs sm:text-sm">
              {t('help')}
            </a>
            <span className="text-white text-xs sm:text-sm">/</span>
            <a href="#" className="text-white no-underline hover:underline font-medium transition-all text-xs sm:text-sm">
              {t('assistance')}
            </a>
            <span className="text-white text-xs sm:text-sm">/</span>
            <a href="#" className="text-white no-underline hover:underline font-medium transition-all text-xs sm:text-sm">
              {t('contact')}
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:gap-2.5 ml-2 sm:ml-2.5">
              <a href="#" aria-label="Facebook" className="text-white hover:opacity-80 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center sm:min-w-0 sm:min-h-0">
                <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="text-white hover:opacity-80 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center sm:min-w-0 sm:min-h-0">
                <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="text-white hover:opacity-80 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center sm:min-w-0 sm:min-h-0">
                <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white hover:opacity-80 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center sm:min-w-0 sm:min-h-0">
                <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>

              {/* Admin Access Button */}
              <Link href="/admin-login" aria-label="Admin Login" className="ml-1 sm:ml-2 flex items-center justify-center w-8 h-8 sm:w-6 sm:h-6 bg-red-600 hover:bg-red-700 rounded text-white font-bold text-xs transition-all hover:scale-110">
                L
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigationBar;