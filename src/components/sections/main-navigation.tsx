"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Languages, LogIn, UserPlus, User, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { supabase } from "@/lib/supabase";

interface NavLink {
  href: string;
  label: string;
}

interface MegaMenuColumn {
  title: string;
  links: NavLink[];
}

const MainNavigation = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    document.body.style.overflowX = 'hidden';

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflowX = '';
    };
  }, []);

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleLanguage = () => {
    const newLang = language === "fr" ? "en" : "fr";
    setLanguage(newLang);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowUserMenu(false);
  };

  const patientsMenu: MegaMenuColumn[] = [
    {
      title: language === 'fr' ? 'Prélèvement' : 'Sampling',
      links: [
        { href: "/dois-je-prendre-rdv", label: t('needAppointment') },
        { href: "/conseils-et-informations", label: t('adviceInfo') },
        { href: "/coming-soon", label: t('necessaryDocs') },
        { href: "/coming-soon", label: t('faq') },
      ],
    },
  ];

  const professionalsMenu = {
    columns: [
      { span: 4, title: language === 'fr' ? 'Politiques et Chartes' : 'Policies & Charters', links: [ { href: "/politique-de-qualite", label: language === 'fr' ? "Politique de Qualité" : 'Quality Policy' }, { href: "/charte-de-qualite", label: language === 'fr' ? 'Charte de Qualité' : 'Quality Charter' }, { href: "/coming-soon", label: language === 'fr' ? "Politique d'Hygiène et Sécurité" : 'Hygiene & Safety Policy' } ]},
      { span: 4, title: language === 'fr' ? 'Gestion et Indicateurs' : 'Management & Indicators', links: [ { href: "/coming-soon", label: language === 'fr' ? 'Gestion des Risques' : 'Risk Management' }, { href: "/reclamations-et-plaintes", label: language === 'fr' ? 'Réclamations et Plaintes' : 'Complaints & Claims' }, { href: "/coming-soon", label: language === 'fr' ? 'Indicateurs de Qualité' : 'Quality Indicators' } ]},
      { span: 4, title: language === 'fr' ? 'Contrôle Qualité' : 'Quality Control', links: [ { href: "/controle-qualite", label: language === 'fr' ? 'Contrôle Qualité Interne et Externe' : 'Internal & External Quality Control' } ]},
    ]
  };

  const servicesMenu: MegaMenuColumn[] = [
    {
      title: language === 'fr' ? "Domaines d'expertise" : 'Areas of Expertise',
      links: [
        { href: "/biochimie-clinique", label: language === 'fr' ? 'Biochimie Clinique' : 'Clinical Biochemistry' },
        { href: "/hematologie", label: language === 'fr' ? 'Hématologie' : 'Hematology' },
        { href: "/immunologie", label: language === 'fr' ? 'Immunologie' : 'Immunology' },
        { href: "/microbiologie", label: language === 'fr' ? 'Microbiologie' : 'Microbiology' },
        { href: "/biologie-moleculaire", label: language === 'fr' ? 'Biologie Moléculaire' : 'Molecular Biology' },
        { href: "/empreintes-genetiques", label: language === 'fr' ? 'Empreintes Génétiques' : 'Genetic Fingerprinting' },
        { href: "/interpretation-resultats", label: language === 'fr' ? 'Interprétation des Résultats' : 'Results Interpretation' },
      ],
    },
  ];

  const aboutMenu = {
    columns: [
      {
        span: 6,
        title: t('whoWeAre'),
        links: [
          { href: "/notre-vision", label: t('ourVision') },
          { href: "/nos-standards", label: t('ourStandards') },
          { href: "/coming-soon", label: t('ourStrategy') },
          { href: "/coming-soon", label: t('ourObjectives') },
        ]
      },
      {
        span: 6,
        title: language === 'fr' ? 'Organisation' : 'Organization',
        links: [
          { href: "/coming-soon", label: t('organizationalChart') },
          { href: "/coming-soon", label: language === 'fr' ? 'Notre Équipe' : 'Our Team' },
          { href: "/coming-soon", label: language === 'fr' ? 'Nos Valeurs' : 'Our Values' },
        ]
      },
    ]
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 font-sans",
          isSticky ? "shadow-lg bg-[#60AAE3]" : "bg-white"
        )}
      >
        <div className="container mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-[30px] py-3 md:py-[15px]">
          <div className="flex h-24 sm:h-28 md:h-32 lg:h-[160px] items-center justify-between">
            <Link href="/" aria-label="Lab Yaoundé Home" className="flex items-center relative">
              <Image
                src="/images/images.png"
                alt="Lab Yaoundé Logo"
                width={350}
                height={150}
                className="h-24 sm:h-28 md:h-32 lg:h-[180px] w-auto object-contain hover:opacity-90 transition-opacity"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-x-1 xl:flex">
              <ul className="flex list-none gap-[20px] m-0">
                <MegaMenuItemPro trigger={t('aboutUs')} professionalsMenu={aboutMenu} isSticky={isSticky} />
                <MegaMenuItem trigger={t('ourServices')} columns={servicesMenu} itemsInRow={1} isSticky={isSticky} />
                <MegaMenuItemPro trigger={language === 'fr' ? 'Assurance Qualité' : 'Quality Assurance'} professionalsMenu={professionalsMenu} isSticky={isSticky} />
                <MegaMenuItem trigger={t('patients')} columns={patientsMenu} itemsInRow={1} isSticky={isSticky} />
                <li className="relative">
                  <Link href="/carrieres/offres-emploi-stages" className={`inline-flex h-10 items-center justify-center px-4 py-2 text-base font-bold transition-colors ${isSticky ? 'text-white hover:text-[#FE5000]' : 'text-black hover:text-[#0A065D]'}`}>
                    {t('careers')}
                  </Link>
                </li>
              </ul>

              <div className="flex items-center gap-1.5 md:gap-2 ml-2 md:ml-4">
                <Button
                  onClick={toggleLanguage}
                  size="sm"
                  className={`h-9 md:h-10 px-2 md:px-3 rounded-md transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 border-0 ${
                    isSticky
                      ? 'bg-[#FE5000] text-white hover:bg-[#CC4000]'
                      : 'bg-gradient-to-r from-[#00CED1] via-[#0080FF] to-[#0A065D] text-white hover:from-[#1E90FF] hover:via-[#1589FF] hover:to-[#0909FF]'
                  }`}
                >
                  <Languages className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1 md:mr-1.5" />
                  <span className="text-xs md:text-sm font-bold">{language.toUpperCase()}</span>
                </Button>

                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-1.5 md:gap-2 h-9 md:h-10 px-2 md:px-4 rounded-md bg-[#0A065D] text-white hover:bg-[#0080FF] transition-colors font-medium"
                    >
                      <User className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      <span className="text-xs md:text-sm truncate max-w-[100px] md:max-w-none">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                          {language === 'fr' ? 'Mon profil' : 'My Profile'}
                        </Link>
                        <Link href="/mes-resultats" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                          {language === 'fr' ? 'Mes résultats' : 'My Results'}
                        </Link>
                        <Link href="/laisser-un-avis" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                          {language === 'fr' ? 'Laisser un avis' : 'Leave a Review'}
                        </Link>
                        <hr className="my-2 border-gray-200" />
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                          <LogOut className="h-4 w-4" />
                          {language === 'fr' ? 'Déconnexion' : 'Logout'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Link href="/login">
                      <Button size="sm" className="h-9 md:h-10 px-2 md:px-4 rounded-md bg-white text-[#FE5000] border-2 border-[#FE5000] hover:bg-[#FE5000] hover:text-white transition-all font-medium shadow-sm">
                        <LogIn className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1 md:mr-1.5" />
                        <span className="text-xs md:text-sm">{language === 'fr' ? 'Connexion' : 'Login'}</span>
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm" className="h-9 md:h-10 px-2 md:px-4 rounded-md bg-[#FE5000] text-white hover:bg-[#CC4000] transition-all font-medium shadow-sm">
                        <UserPlus className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1 md:mr-1.5" />
                        <span className="text-xs md:text-sm">{language === 'fr' ? 'Inscription' : 'Sign Up'}</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            <button
              onClick={toggleMobileMenu}
              className={`z-50 rounded p-2 xl:hidden transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${isSticky ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={`h-6 w-6 md:h-7 md:w-7 ${isSticky ? 'text-white' : 'text-[#0A065D]'}`} />
              ) : (
                <Menu className={`h-6 w-6 md:h-7 md:w-7 ${isSticky ? 'text-white' : 'text-[#0A065D]'}`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 transform bg-white transition-transform duration-300 xl:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto h-full overflow-y-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-8">
            <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
              <MobileAccordionItemPro trigger={t('aboutUs')} professionalsMenu={aboutMenu} />
              <MobileAccordionItem trigger={t('ourServices')} menu={servicesMenu} />
              <MobileAccordionItemPro trigger={language === 'fr' ? 'Assurance Qualité' : 'Quality Assurance'} professionalsMenu={professionalsMenu} />
              <MobileAccordionItem trigger={t('patients')} menu={patientsMenu} />
            </Accordion>
            <div className="mt-4 sm:mt-6 border-t border-gray-200 pt-4 sm:pt-6">
              <Link href="/carrieres/offres-emploi-stages" className="text-base sm:text-lg font-medium text-[#0A065D] block py-2" onClick={toggleMobileMenu}>
                {t('careers')}
              </Link>
            </div>
            <div className="mt-4 sm:mt-6 flex flex-col space-y-3 sm:space-y-4 border-t border-gray-200 pt-4 sm:pt-6">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 sm:px-4 py-3 bg-[#0A065D]/5 rounded-lg">
                    <User className="h-5 w-5 text-[#0A065D] flex-shrink-0" />
                    <span className="font-medium text-[#0A065D] text-sm sm:text-base truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                  </div>
                  <Link href="/profile" onClick={toggleMobileMenu}>
                    <Button variant="outline" className="w-full justify-start text-[#0A065D] hover:bg-[#0080FF]/5 min-h-[44px] text-sm sm:text-base">
                      {language === 'fr' ? 'Mon profil' : 'My Profile'}
                    </Button>
                  </Link>
                  <Link href="/mes-resultats" onClick={toggleMobileMenu}>
                    <Button variant="outline" className="w-full justify-start text-[#0A065D] hover:bg-[#0080FF]/5 min-h-[44px] text-sm sm:text-base">
                      {language === 'fr' ? 'Mes résultats' : 'My Results'}
                    </Button>
                  </Link>
                  <Link href="/laisser-un-avis" onClick={toggleMobileMenu}>
                    <Button variant="outline" className="w-full justify-start text-[#0A065D] hover:bg-[#0080FF]/5 min-h-[44px] text-sm sm:text-base">
                      {language === 'fr' ? 'Laisser un avis' : 'Leave a Review'}
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:bg-red-50 border-red-200 min-h-[44px] text-sm sm:text-base"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Déconnexion' : 'Logout'}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={toggleMobileMenu}>
                    <Button className="w-full justify-start bg-white text-[#FE5000] border-2 border-[#FE5000] hover:bg-[#FE5000] hover:text-white transition-all min-h-[44px] text-sm sm:text-base shadow-sm">
                      <LogIn className="h-4 w-4 mr-2" />
                      {language === 'fr' ? 'Connexion' : 'Login'}
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={toggleMobileMenu}>
                    <Button className="w-full justify-start bg-[#FE5000] text-white hover:bg-[#CC4000] transition-all min-h-[44px] text-sm sm:text-base shadow-sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      {language === 'fr' ? 'Inscription' : 'Sign Up'}
                    </Button>
                  </Link>
                </div>
              )}
              <Button
                onClick={toggleLanguage}
                className="w-full justify-start bg-gradient-to-r from-[#00CED1] via-[#0080FF] to-[#0A065D] text-white hover:from-[#1E90FF] hover:via-[#1589FF] hover:to-[#0909FF] transition-all duration-300 min-h-[44px] text-sm sm:text-base shadow-lg font-medium"
              >
                <Languages className="h-4 w-4 mr-2" />
                <span className="font-bold">{t('language')}: {language.toUpperCase()}</span>
              </Button>
            </div>
        </div>
      </div>
    </>
  );
};

const MegaMenuItem = ({ trigger, columns, itemsInRow, isSticky = false }: { trigger: string, columns: MegaMenuColumn[], itemsInRow: number, isSticky?: boolean }) => {
  const gridCols = itemsInRow === 3 ? 'grid-cols-3' : 'grid-cols-1';

  return (
    <li className="relative group">
      <button className={`inline-flex h-10 items-center justify-center px-4 py-2 text-base font-bold transition-colors ${isSticky ? 'text-white hover:text-[#FE5000]' : 'text-black hover:text-[#0A065D]'}`}>
        {trigger}
      </button>
      
      <div className="absolute top-full left-0 w-[700px] bg-white p-[20px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-[250ms] ease-[ease] rounded-[8px] shadow-[0_4px_25px_rgba(0,0,0,0.1)] z-50">
        <div className={`grid ${gridCols} gap-[40px]`}>
          {columns.map((col) => (
            <div key={col.title} className="w-full">
              <h3 className="mb-[10px] text-[17px] font-semibold text-[#0A065D]">{col.title}</h3>
              <ul className="space-y-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="block py-[5px] text-[15px] text-[#333] no-underline hover:text-[#0A065D] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};

const MegaMenuItemPro = ({ trigger, professionalsMenu, isSticky = false }: { trigger: string, professionalsMenu: any, isSticky?: boolean }) => {
  const getColSpanClass = (span: number) => {
    const spanClasses: { [key: number]: string } = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5',
      6: 'col-span-6',
    };
    return spanClasses[span] || 'col-span-2';
  };

  // Check if this is the About Us menu (has specific structure)
  const isAboutMenu = trigger.toLowerCase().includes('propos') || trigger.toLowerCase().includes('about');

  return (
    <li className="relative group">
      <button className={`inline-flex h-10 items-center justify-center px-4 py-2 text-base font-bold transition-colors ${isSticky ? 'text-white hover:text-[#FE5000]' : 'text-black hover:text-[#0A065D]'}`}>
        {trigger}
      </button>

      <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-[250ms] ease-[ease] rounded-[12px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] z-50 overflow-hidden ${isAboutMenu ? 'border-2 border-[#1589FF]/30' : ''}`}>
        {isAboutMenu && (
          <div className="bg-gradient-to-r from-[#2916F5] to-[#157DEC] px-6 py-4">
            <h2 className="text-white font-bold text-lg">Découvrez notre laboratoire</h2>
            <p className="text-[#1589FF]/70 text-sm mt-1">Excellence & Innovation depuis 2012</p>
          </div>
        )}

        <div className={`grid grid-cols-12 gap-6 ${isAboutMenu ? 'p-6' : 'p-5'}`}>
          {professionalsMenu.columns.map((col: any, index: number) => (
            <div key={index} className={`${getColSpanClass(col.span)} ${isAboutMenu ? 'relative' : ''}`}>
              {isAboutMenu && index === 0 && (
                <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00CED1] to-[#0A065D] rounded-full"></div>
              )}

              {col.title && (
                <h3 className={`mb-3 font-bold ${isAboutMenu ? 'text-[17px] text-[#0A065D] flex items-center' : 'text-[15px] text-[#0A065D]'}`}>
                  {isAboutMenu && index === 0 && (
                    <span className="inline-block w-2 h-2 bg-[#1589FF] rounded-full mr-2"></span>
                  )}
                  {col.title}
                </h3>
              )}

              <ul className={`space-y-0 ${isAboutMenu ? 'space-y-1' : ''}`}>
                {col.links.map((link: any, linkIndex: number) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`group/link flex items-center py-2 no-underline transition-all ${
                        isAboutMenu
                          ? 'text-[15px] text-gray-700 hover:text-[#0A065D] hover:translate-x-1'
                          : 'text-[14px] text-[#333] hover:text-[#0A065D]'
                      }`}
                    >
                      {isAboutMenu && (
                        <span className="inline-block w-1.5 h-1.5 bg-gray-300 group-hover/link:bg-[#1589FF] rounded-full mr-2 transition-colors"></span>
                      )}
                      <span className={isAboutMenu ? 'font-medium' : ''}>{link.label}</span>
                      {isAboutMenu && (
                        <span className="ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity">
                          <svg className="w-4 h-4 text-[#1589FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {isAboutMenu && (
          <div className="bg-gradient-to-r from-[#00CED1]/10 to-[#0A065D]/10 px-6 py-3 border-t border-[#1589FF]/30">
            <p className="text-sm text-gray-600 text-center">
              <span className="font-semibold text-[#0A065D]">Besoin d'aide?</span> Contactez-nous au (+237) 242 04 68 50
            </p>
          </div>
        )}
      </div>
    </li>
  );
};

const MobileAccordionItem = ({ trigger, menu }: { trigger: string, menu: MegaMenuColumn[] }) => (
    <AccordionItem value={trigger.toLowerCase()} className="border-b">
        <AccordionTrigger className="text-base sm:text-lg font-medium text-[#0A065D] no-underline hover:no-underline py-3">{trigger}</AccordionTrigger>
        <AccordionContent>
            <div className="pl-3 sm:pl-4 space-y-3 sm:space-y-4">
                {menu.map(col => (
                    <div key={col.title}>
                        <h4 className="mb-2 font-semibold text-[#0A065D] text-sm sm:text-base">{col.title}</h4>
                        <ul className="space-y-2 pl-2">
                            {col.links.map(link => (
                                <li key={link.label} className="min-h-[44px] flex items-center">
                                    <Link href={link.href} className="text-[#0A065D] text-sm sm:text-base py-2 block w-full hover:text-[#0A065D] transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </AccordionContent>
    </AccordionItem>
);

const MobileAccordionItemPro = ({ trigger, professionalsMenu }: { trigger: string, professionalsMenu: any }) => (
  <AccordionItem value={trigger.toLowerCase()} className="border-b">
      <AccordionTrigger className="text-base sm:text-lg font-medium text-[#0A065D] no-underline hover:no-underline py-3">{trigger}</AccordionTrigger>
      <AccordionContent>
          <div className="pl-3 sm:pl-4 space-y-3 sm:space-y-4">
              {professionalsMenu.columns.map((col: any, index: number) => (
                  <div key={index}>
                      {col.title && <h4 className="mb-2 font-semibold text-[#0A065D] text-sm sm:text-base">{col.title}</h4>}
                      <ul className="space-y-2 pl-2">
                          {col.links.map((link: any) => (
                              <li key={link.label} className="min-h-[44px] flex items-center">
                                  <Link href={link.href} className="text-[#0A065D] text-sm sm:text-base py-2 block w-full hover:text-[#0A065D] transition-colors">
                                      {link.label}
                                  </Link>
                              </li>
                          ))}
                      </ul>
                  </div>
              ))}
          </div>
      </AccordionContent>
  </AccordionItem>
);

export default MainNavigation;