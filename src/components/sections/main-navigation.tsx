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
      title: t('beforeSampling'),
      links: [
        { href: "/dois-je-prendre-rdv", label: t('needAppointment') },
        { href: "/conseils-et-informations", label: t('adviceInfo') },
        { href: "#", label: t('necessaryDocs') },
        { href: "#", label: t('faq') },
      ],
    },
    {
      title: t('sampling'),
      links: [
        { href: "#", label: t('classicSampling') },
        { href: "#", label: t('pregnancySampling') },
        { href: "#", label: t('selfSampling') },
      ],
    },
    {
      title: t('afterSampling'),
      links: [
        { href: "#", label: t('viewResults') },
        { href: "#", label: t('interpretation') },
        { href: "#", label: t('payment') },
        { href: "#", label: t('complaint') },
      ],
    },
  ];

  const professionalsMenu = {
    columns: [
      { span: 2, title: t('prescriberSpace'), links: [ { href: "#", label: t('patientResultsAccess') }, { href: "#", label: t('prescriberSheets') }, { href: "#", label: t('giveOpinion') } ]},
      { span: 2, title: t('nurseSpace'), links: [ { href: "#", label: t('patientResultsAccess') }, { href: "#", label: t('giveOpinion') } ]},
      { span: 3, title: t('practicalDocs'), links: [ { href: "#", label: t('samplingManuals') }, { href: "#", label: t('consentForms') } ]},
      { span: 3, title: t('information'), links: [ { href: "#", label: t('scientificInfo') }] },
      { span: 2, title: "", links: [ { href: "#", label: t('faq') }, { href: "#", label: t('complaint') } ]},
    ]
  };

  const servicesMenu: MegaMenuColumn[] = [
    {
      title: t('specialties'),
      links: [
        { href: "#", label: t('generalBiology') },
        { href: "#", label: t('infectiousDiseases') },
        { href: "#", label: t('pregnantWomanBiology') },
        { href: "#", label: t('reproductionAssistance') },
        { href: "#", label: t('genetics') },
        { href: "#", label: t('cancerBiology') },
      ],
    },
  ];

  const aboutMenu = {
    columns: [
      {
        span: 4,
        title: t('whoWeAre'),
        links: [
          { href: "#", label: t('ourVision') },
          { href: "#", label: t('ourStandards') },
          { href: "#", label: t('ourStrategy') },
          { href: "#", label: t('ourObjectives') },
        ]
      },
      {
        span: 4,
        title: "",
        links: [
          { href: "#", label: t('organizationalChart') },
        ]
      },
      {
        span: 4,
        title: "",
        links: [
          { href: "#", label: t('qualityAssurance') },
        ]
      },
    ]
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-white transition-all duration-300 font-sans",
          isSticky ? "shadow-md" : ""
        )}
      >
        <div className="container mx-auto max-w-[1200px] px-[30px] py-[15px]">
          <div className="flex h-[110px] items-center justify-between">
            <Link href="/" aria-label="Lab Yaoundé Home" className="flex items-center relative">
              <Image
                src="/images/images.png"
                alt="Lab Yaoundé Logo"
                width={200}
                height={90}
                className="h-[90px] w-auto object-contain hover:opacity-90 transition-opacity"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-x-1 xl:flex">
              <ul className="flex list-none gap-[20px] m-0">
                <MegaMenuItemPro trigger={t('aboutUs')} professionalsMenu={aboutMenu} />
                <MegaMenuItem trigger={t('ourServices')} columns={servicesMenu} itemsInRow={1}/>
                <MegaMenuItemPro trigger={t('healthProfessionals')} professionalsMenu={professionalsMenu} />
                <MegaMenuItem trigger={t('patients')} columns={patientsMenu} itemsInRow={3} />
                <li className="relative">
                  <Link href="#careers" className="inline-flex h-10 items-center justify-center px-4 py-2 text-base font-[500] text-[#333] transition-colors hover:text-[#0a6ed1]">
                    {t('careers')}
                  </Link>
                </li>
              </ul>

              <div className="flex items-center gap-2 ml-4">
                <Button
                  onClick={toggleLanguage}
                  size="sm"
                  variant="ghost"
                  className="h-10 px-3 rounded-md text-[#0B3D5F] hover:bg-[#0B3D5F]/5 hover:text-[#0a6ed1] transition-colors border border-[#E0E0E0] font-medium"
                >
                  <Languages className="h-4 w-4 mr-1.5" />
                  <span className="text-sm">{language.toUpperCase()}</span>
                </Button>

                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 h-10 px-4 rounded-md bg-[#0B3D5F] text-white hover:bg-[#0B4D6F] transition-colors font-medium"
                    >
                      <User className="h-4 w-4" />
                      <span className="text-sm">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
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
                  <div className="flex items-center gap-2">
                    <Link href="/login">
                      <Button size="sm" variant="ghost" className="h-10 px-4 rounded-md text-[#0B3D5F] hover:bg-[#0B3D5F]/5 transition-colors border border-[#E0E0E0] font-medium">
                        <LogIn className="h-4 w-4 mr-1.5" />
                        <span className="text-sm">{language === 'fr' ? 'Connexion' : 'Login'}</span>
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm" className="h-10 px-4 rounded-md bg-[#0B3D5F] text-white hover:bg-[#0B4D6F] transition-colors font-medium">
                        <UserPlus className="h-4 w-4 mr-1.5" />
                        <span className="text-sm">{language === 'fr' ? 'Inscription' : 'Sign Up'}</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            <button
              onClick={toggleMobileMenu}
              className="z-50 rounded p-2 xl:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7 text-[#0B3D5F]" />
              ) : (
                <Menu className="h-7 w-7 text-[#0B3D5F]" />
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
        <div className="container mx-auto h-full overflow-y-auto px-6 pt-24 pb-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <MobileAccordionItemPro trigger={t('aboutUs')} professionalsMenu={aboutMenu} />
              <MobileAccordionItem trigger={t('ourServices')} menu={servicesMenu} />
              <MobileAccordionItemPro trigger={t('healthProfessionals')} professionalsMenu={professionalsMenu} />
              <MobileAccordionItem trigger={t('patients')} menu={patientsMenu} />
            </Accordion>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <Link href="#careers" className="text-lg font-medium text-[#0B3D5F]" onClick={toggleMobileMenu}>
                {t('careers')}
              </Link>
            </div>
            <div className="mt-6 flex flex-col space-y-4 border-t border-gray-200 pt-6">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#0B3D5F]/5 rounded-lg">
                    <User className="h-5 w-5 text-[#0B3D5F]" />
                    <span className="font-medium text-[#0B3D5F]">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                  </div>
                  <Link href="/profile" onClick={toggleMobileMenu}>
                    <Button variant="outline" className="w-full justify-start text-[#0B3D5F] hover:bg-[#0B3D5F]/5">
                      {language === 'fr' ? 'Mon profil' : 'My Profile'}
                    </Button>
                  </Link>
                  <Link href="/mes-resultats" onClick={toggleMobileMenu}>
                    <Button variant="outline" className="w-full justify-start text-[#0B3D5F] hover:bg-[#0B3D5F]/5">
                      {language === 'fr' ? 'Mes résultats' : 'My Results'}
                    </Button>
                  </Link>
                  <Link href="/laisser-un-avis" onClick={toggleMobileMenu}>
                    <Button variant="outline" className="w-full justify-start text-[#0B3D5F] hover:bg-[#0B3D5F]/5">
                      {language === 'fr' ? 'Laisser un avis' : 'Leave a Review'}
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:bg-red-50 border-red-200"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Déconnexion' : 'Logout'}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={toggleMobileMenu}>
                    <Button variant="outline" className="w-full justify-start text-[#0B3D5F] hover:bg-[#0B3D5F]/5">
                      <LogIn className="h-4 w-4 mr-2" />
                      {language === 'fr' ? 'Connexion' : 'Login'}
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={toggleMobileMenu}>
                    <Button className="w-full justify-start bg-[#0B3D5F] text-white hover:bg-[#0B4D6F]">
                      <UserPlus className="h-4 w-4 mr-2" />
                      {language === 'fr' ? 'Inscription' : 'Sign Up'}
                    </Button>
                  </Link>
                </div>
              )}
              <Button
                onClick={toggleLanguage}
                variant="outline"
                className="w-full justify-start text-[#0B3D5F] hover:bg-[#0B3D5F]/5"
              >
                <Languages className="h-4 w-4 mr-2" />
                <span>{t('language')}: {language.toUpperCase()}</span>
              </Button>
            </div>
        </div>
      </div>
    </>
  );
};

const MegaMenuItem = ({ trigger, columns, itemsInRow }: { trigger: string, columns: MegaMenuColumn[], itemsInRow: number }) => {
  const gridCols = itemsInRow === 3 ? 'grid-cols-3' : 'grid-cols-1';
  
  return (
    <li className="relative group">
      <button className="inline-flex h-10 items-center justify-center px-4 py-2 text-base font-[500] text-[#333] transition-colors hover:text-[#0a6ed1]">
        {trigger}
      </button>
      
      <div className="absolute top-full left-0 w-[700px] bg-white p-[20px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-[250ms] ease-[ease] rounded-[8px] shadow-[0_4px_25px_rgba(0,0,0,0.1)] z-50">
        <div className={`grid ${gridCols} gap-[40px]`}>
          {columns.map((col) => (
            <div key={col.title} className="w-full">
              <h3 className="mb-[10px] text-[17px] font-semibold text-[#063f73]">{col.title}</h3>
              <ul className="space-y-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="block py-[5px] text-[15px] text-[#333] no-underline hover:text-[#0a6ed1] transition-colors"
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

const MegaMenuItemPro = ({ trigger, professionalsMenu }: { trigger: string, professionalsMenu: any }) => {
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
      <button className="inline-flex h-10 items-center justify-center px-4 py-2 text-base font-[500] text-[#333] transition-colors hover:text-[#0a6ed1]">
        {trigger}
      </button>

      <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-[250ms] ease-[ease] rounded-[12px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] z-50 overflow-hidden ${isAboutMenu ? 'border-2 border-cyan-100' : ''}`}>
        {isAboutMenu && (
          <div className="bg-gradient-to-r from-[#0B3D5F] to-[#0B4D6F] px-6 py-4">
            <h2 className="text-white font-bold text-lg">Découvrez notre laboratoire</h2>
            <p className="text-cyan-200 text-sm mt-1">Excellence & Innovation depuis 2012</p>
          </div>
        )}

        <div className={`grid grid-cols-12 gap-6 ${isAboutMenu ? 'p-6' : 'p-5'}`}>
          {professionalsMenu.columns.map((col: any, index: number) => (
            <div key={index} className={`${getColSpanClass(col.span)} ${isAboutMenu ? 'relative' : ''}`}>
              {isAboutMenu && index === 0 && (
                <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
              )}

              {col.title && (
                <h3 className={`mb-3 font-bold ${isAboutMenu ? 'text-[17px] text-[#0B3D5F] flex items-center' : 'text-[15px] text-[#063f73]'}`}>
                  {isAboutMenu && index === 0 && (
                    <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
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
                          ? 'text-[15px] text-gray-700 hover:text-[#0B3D5F] hover:translate-x-1'
                          : 'text-[14px] text-[#333] hover:text-[#0a6ed1]'
                      }`}
                    >
                      {isAboutMenu && (
                        <span className="inline-block w-1.5 h-1.5 bg-gray-300 group-hover/link:bg-cyan-400 rounded-full mr-2 transition-colors"></span>
                      )}
                      <span className={isAboutMenu ? 'font-medium' : ''}>{link.label}</span>
                      {isAboutMenu && (
                        <span className="ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity">
                          <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-3 border-t border-cyan-100">
            <p className="text-sm text-gray-600 text-center">
              <span className="font-semibold text-[#0B3D5F]">Besoin d'aide?</span> Contactez-nous au (+237) 242 04 68 50
            </p>
          </div>
        )}
      </div>
    </li>
  );
};

const MobileAccordionItem = ({ trigger, menu }: { trigger: string, menu: MegaMenuColumn[] }) => (
    <AccordionItem value={trigger.toLowerCase()} className="border-b">
        <AccordionTrigger className="text-lg font-medium text-[#0B3D5F] no-underline hover:no-underline">{trigger}</AccordionTrigger>
        <AccordionContent>
            <div className="pl-4 space-y-4">
                {menu.map(col => (
                    <div key={col.title}>
                        <h4 className="mb-2 font-semibold text-[#0B3D5F]">{col.title}</h4>
                        <ul className="space-y-2 pl-2">
                            {col.links.map(link => (
                                <li key={link.label}><Link href={link.href} className="text-[#0B3D5F]">{link.label}</Link></li>
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
      <AccordionTrigger className="text-lg font-medium text-[#0B3D5F] no-underline hover:no-underline">{trigger}</AccordionTrigger>
      <AccordionContent>
          <div className="pl-4 space-y-4">
              {professionalsMenu.columns.map((col: any, index: number) => (
                  <div key={index}>
                      {col.title && <h4 className="mb-2 font-semibold text-[#0B3D5F]">{col.title}</h4>}
                      <ul className="space-y-2 pl-2">
                          {col.links.map((link: any) => (
                              <li key={link.label}><Link href={link.href} className="text-[#0B3D5F]">{link.label}</Link></li>
                          ))}
                      </ul>
                  </div>
              ))}
          </div>
      </AccordionContent>
  </AccordionItem>
);

export default MainNavigation;