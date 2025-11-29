"use client";

import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Shield } from 'lucide-react';
import { useLanguage } from '@/lib/contents/LanguageContext';
import Link from 'next/link';

const TopNavigationBar = () => {
  const { t } = useLanguage();
  
  return (
    <header className="hidden lg:block bg-[#0b467a] border-b border-[#0b467a]">
      <div className="max-w-[1200px] mx-auto px-10 py-1.5">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white md:text-center lg:text-left">
          {/* Left side - Contact info */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-white" />
              Cité verte Batiment B01
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-white" />
              (+237) 242 04 68 50 / 671 37 05 65 / 694 493 130
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-white" />
              contact@labyaounde.org
            </span>
          </div>

          {/* Right side - Links and Social Icons */}
          <div className="flex items-center gap-2.5 mt-2 md:mt-0">
            <a href="#" className="text-white no-underline hover:underline font-medium transition-all">
              {t('help')}
            </a>
            <span className="text-white">/</span>
            <a href="#" className="text-white no-underline hover:underline font-medium transition-all">
              {t('assistance')}
            </a>
            <span className="text-white">/</span>
            <a href="#" className="text-white no-underline hover:underline font-medium transition-all">
              {t('contact')}
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 ml-2.5">
              <a href="#" aria-label="Facebook" className="text-white hover:opacity-80 transition-opacity">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="text-white hover:opacity-80 transition-opacity">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="text-white hover:opacity-80 transition-opacity">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white hover:opacity-80 transition-opacity">
                <Linkedin className="h-4 w-4" />
              </a>

              {/* Admin Access Button */}
              <Link href="/admin-login" aria-label="Admin Login" className="ml-2 flex items-center justify-center w-6 h-6 bg-red-600 hover:bg-red-700 rounded text-white font-bold text-xs transition-all hover:scale-110">
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