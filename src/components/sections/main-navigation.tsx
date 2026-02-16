"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Languages, LogIn, UserPlus, User, LogOut, ChevronDown, ChevronRight } from "lucide-react";

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
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    document.body.style.overflowX = 'hidden';

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflowX = '';
    };
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

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
        { href: "/questions-frequentes", label: t('faq') },
      ],
    },
  ];

  const professionalsMenu = {
    columns: [
      {
        span: 4,
        title: language === 'fr' ? 'Politiques et Chartes' : 'Policies & Charters',
        links: [
          { href: "/politique-de-qualite", label: language === 'fr' ? "Politique de Qualité" : 'Quality Policy' },
          { href: "/charte-de-qualite", label: language === 'fr' ? 'Charte de Qualité' : 'Quality Charter' },
          { href: "/coming-soon", label: language === 'fr' ? "Politique d'Hygiène et Sécurité" : 'Hygiene & Safety Policy' }
        ]
      },
      {
        span: 4,
        title: language === 'fr' ? 'Gestion et Indicateurs' : 'Management & Indicators',
        links: [
          { href: "/coming-soon", label: language === 'fr' ? 'Gestion des Risques' : 'Risk Management' },
          { href: "/reclamations-et-plaintes", label: language === 'fr' ? 'Réclamations et Plaintes' : 'Complaints & Claims' },
          { href: "/coming-soon", label: language === 'fr' ? 'Indicateurs de Qualité' : 'Quality Indicators' }
        ]
      },
      {
        span: 4,
        title: language === 'fr' ? 'Contrôle Qualité' : 'Quality Control',
        links: [
          { href: "/controle-qualite", label: language === 'fr' ? 'Contrôle Qualité Interne et Externe' : 'Internal & External Quality Control' }
        ]
      },
    ]
  };

  const servicesMenu: MegaMenuColumn[] = [
    {
      title: language === 'fr' ? "Notre Engagement" : 'Our Commitment',
      links: [
        { href: "/notre-engagement", label: language === 'fr' ? 'Notre Engagement' : 'Our Commitment' },
      ],
    },
    {
      title: language === 'fr' ? "Domaines d'expertise" : 'Areas of Expertise',
      links: [
        { href: "/biochimie-clinique", label: language === 'fr' ? 'Biochimie Clinique' : 'Clinical Biochemistry' },
        { href: "/hematologie", label: language === 'fr' ? 'Hématologie' : 'Hematology' },
        { href: "/immunologie", label: language === 'fr' ? 'Immunologie' : 'Immunology' },
        { href: "/microbiologie", label: language === 'fr' ? 'Microbiologie' : 'Microbiology' },
        { href: "/biologie-moleculaire", label: language === 'fr' ? 'Biologie Moléculaire' : 'Molecular Biology' },
        { href: "/empreintes-genetiques", label: language === 'fr' ? 'Empreintes Génétiques' : 'Genetic Fingerprinting' },
        { href: "/expertise-genetique", label: language === 'fr' ? 'Expertise Génétique & Moléculaire' : 'Genetic & Molecular Expertise' },
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
          { href: "/nos-strategies", label: language === 'fr' ? 'Nos Stratégies' : 'Our Strategies' },
          { href: "/nos-objectifs", label: language === 'fr' ? 'Nos Objectifs' : 'Our Objectives' },
        ]
      },
      {
        span: 6,
        title: language === 'fr' ? 'Organisation' : 'Organization',
        links: [
          { href: "/organigramme", label: t('organizationalChart') },
          { href: "/notre-equipe", label: language === 'fr' ? 'Notre Équipe' : 'Our Team' },
          { href: "/nos-valeurs", label: language === 'fr' ? 'Nos Valeurs' : 'Our Values' },
        ]
      },
    ]
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500 font-sans",
          isSticky
            ? "shadow-[0_4px_30px_-5px_rgba(30,64,175,0.25)] bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#1E40AF] py-2"
            : "bg-white py-3"
        )}
      >
        <div className="container mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-[30px]">
          <div className={cn(
            "flex items-center justify-between transition-all duration-500",
            isSticky ? "h-20 sm:h-24" : "h-28 sm:h-32 md:h-36 lg:h-[160px]"
          )}>
            <Link href="/" aria-label="Lab Yaoundé Home" className="flex items-center relative">
              <Image
                src="/images/images.png"
                alt="Lab Yaoundé Logo"
                width={350}
                height={150}
                className={cn(
                  "w-auto object-contain hover:opacity-90 transition-all duration-500",
                  isSticky ? "h-16 sm:h-20" : "h-28 sm:h-32 md:h-36 lg:h-[160px]"
                )}
                priority
              />
            </Link>

            <nav className="hidden items-center gap-x-1 xl:flex">
              <ul className="flex list-none gap-[24px] m-0">
                <MegaMenuItemPro trigger={t('aboutUs')} professionalsMenu={aboutMenu} isSticky={isSticky} />
                <MegaMenuItem trigger={t('ourServices')} columns={servicesMenu} itemsInRow={2} isSticky={isSticky} />
                <MegaMenuItemPro trigger={language === 'fr' ? 'Assurance Qualité' : 'Quality Assurance'} professionalsMenu={professionalsMenu} isSticky={isSticky} />
                <MegaMenuItem trigger={t('patients')} columns={patientsMenu} itemsInRow={1} isSticky={isSticky} />
                <li className="relative">
                  <Link
                    href="/carrieres/offres-emploi-stages"
                    className={cn(
                      "inline-flex h-10 items-center justify-center px-4 py-2 text-base font-bold transition-all duration-300 relative group",
                      isSticky ? 'text-white hover:text-[#FF8500]' : 'text-[#1E40AF] hover:text-[#FF8500]'
                    )}
                  >
                    {t('careers')}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#FF8500] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              </ul>

              <div className="flex items-center gap-2 ml-4">
                <Button
                  onClick={toggleLanguage}
                  size="sm"
                  className={cn(
                    "h-10 px-4 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-105 border-0",
                    isSticky
                      ? 'bg-[#FF8500] text-white hover:bg-[#E87000]'
                      : 'bg-[#1E40AF] text-white hover:bg-[#1E3A8A]'
                  )}
                >
                  <Languages className="h-4 w-4 mr-1.5" />
                  <span className="text-sm font-bold">{language.toUpperCase()}</span>
                </Button>

                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className={cn(
                        "flex items-center gap-2 h-10 px-4 rounded-xl font-medium transition-all duration-300",
                        isSticky
                          ? "bg-white/20 text-white hover:bg-white/30"
                          : "bg-[#1E40AF] text-white hover:bg-[#1E3A8A]"
                      )}
                    >
                      <User className="h-4 w-4" />
                      <span className="text-sm truncate max-w-[100px]">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#1E40AF]/10 py-2 z-50 overflow-hidden">
                        <Link href="/profile" className="block px-4 py-3 text-sm text-[#1E40AF] hover:bg-[#1E40AF]/5 transition-colors font-medium">
                          {language === 'fr' ? 'Mon profil' : 'My Profile'}
                        </Link>
                        <Link href="/mes-resultats" className="block px-4 py-3 text-sm text-[#1E40AF] hover:bg-[#1E40AF]/5 transition-colors font-medium">
                          {language === 'fr' ? 'Mes résultats' : 'My Results'}
                        </Link>
                        <Link href="/laisser-un-avis" className="block px-4 py-3 text-sm text-[#1E40AF] hover:bg-[#1E40AF]/5 transition-colors font-medium">
                          {language === 'fr' ? 'Laisser un avis' : 'Leave a Review'}
                        </Link>
                        <hr className="my-2 border-[#1E40AF]/10" />
                        <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-[#FF8500] hover:bg-[#FF8500]/10 transition-colors flex items-center gap-2 font-medium">
                          <LogOut className="h-4 w-4" />
                          {language === 'fr' ? 'Déconnexion' : 'Logout'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/login">
                      <Button
                        size="sm"
                        className={cn(
                          "h-10 px-5 rounded-xl transition-all font-bold shadow-lg hover:shadow-xl hover:scale-105",
                          isSticky
                            ? "bg-white text-[#1E40AF] hover:bg-gray-100"
                            : "bg-white text-[#1E40AF] border-2 border-[#1E40AF] hover:bg-[#1E40AF] hover:text-white"
                        )}
                      >
                        <LogIn className="h-4 w-4 mr-1.5" />
                        <span className="text-sm">{language === 'fr' ? 'Connexion' : 'Login'}</span>
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm" className="h-10 px-5 rounded-xl bg-[#FF8500] text-white hover:bg-[#E87000] transition-all font-bold shadow-lg shadow-[#FF8500]/30 hover:shadow-xl hover:scale-105">
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
              className={cn(
                "z-50 rounded-xl p-3 xl:hidden transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center",
                isSticky ? 'hover:bg-white/10 text-white' : 'hover:bg-[#1E40AF]/10 text-[#1E40AF]'
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 transform bg-white transition-transform duration-300 xl:hidden overflow-hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto h-full overflow-y-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-8">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <MobileAccordionItemPro trigger={t('aboutUs')} professionalsMenu={aboutMenu} onClose={() => setIsMobileMenuOpen(false)} />
            <MobileAccordionItem trigger={t('ourServices')} menu={servicesMenu} onClose={() => setIsMobileMenuOpen(false)} />
            <MobileAccordionItemPro trigger={language === 'fr' ? 'Assurance Qualité' : 'Quality Assurance'} professionalsMenu={professionalsMenu} onClose={() => setIsMobileMenuOpen(false)} />
            <MobileAccordionItem trigger={t('patients')} menu={patientsMenu} onClose={() => setIsMobileMenuOpen(false)} />
          </Accordion>

          <div className="mt-4 border-t border-[#1E40AF]/10 pt-4">
            <Link
              href="/carrieres/offres-emploi-stages"
              className="text-lg font-bold text-[#1E40AF] block py-3 hover:text-[#FF8500] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('careers')}
            </Link>
          </div>

          <div className="mt-6 flex flex-col space-y-3 border-t border-[#1E40AF]/10 pt-6">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 bg-[#1E40AF]/5 rounded-xl">
                  <User className="h-5 w-5 text-[#1E40AF]" />
                  <span className="font-bold text-[#1E40AF]">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                </div>
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start text-[#1E40AF] border-[#1E40AF]/20 hover:bg-[#1E40AF]/5 min-h-[48px] font-medium">
                    {language === 'fr' ? 'Mon profil' : 'My Profile'}
                  </Button>
                </Link>
                <Link href="/mes-resultats" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start text-[#1E40AF] border-[#1E40AF]/20 hover:bg-[#1E40AF]/5 min-h-[48px] font-medium">
                    {language === 'fr' ? 'Mes résultats' : 'My Results'}
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full justify-start text-[#FF8500] hover:bg-[#FF8500]/10 border-[#FF8500]/30 min-h-[48px] font-medium"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {language === 'fr' ? 'Déconnexion' : 'Logout'}
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full justify-center bg-white text-[#1E40AF] border-2 border-[#1E40AF] hover:bg-[#1E40AF] hover:text-white transition-all min-h-[48px] font-bold">
                    <LogIn className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Connexion' : 'Login'}
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full justify-center bg-[#FF8500] text-white hover:bg-[#E87000] transition-all min-h-[48px] font-bold shadow-lg shadow-[#FF8500]/20">
                    <UserPlus className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Inscription' : 'Sign Up'}
                  </Button>
                </Link>
              </div>
            )}
            <Button
              onClick={toggleLanguage}
              className="w-full justify-center bg-[#1E40AF] text-white hover:bg-[#1E3A8A] transition-all duration-300 min-h-[48px] font-bold shadow-lg"
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

// Premium Mega Menu Item
const MegaMenuItem = ({ trigger, columns, itemsInRow, isSticky = false }: { trigger: string, columns: MegaMenuColumn[], itemsInRow: number, isSticky?: boolean }) => {
  const gridCols = itemsInRow === 3 ? 'grid-cols-3' : itemsInRow === 2 ? 'grid-cols-2' : 'grid-cols-1';

  return (
    <li className="relative group">
      <button className={cn(
        "inline-flex h-10 items-center justify-center px-4 py-2 text-base font-bold transition-all duration-300 relative group",
        isSticky ? 'text-white hover:text-[#FF8500]' : 'text-[#1E40AF] hover:text-[#FF8500]'
      )}>
        {trigger}
        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#FF8500] transition-all duration-300 group-hover:w-full"></span>
      </button>

      <div className="absolute top-full left-0 w-[600px] bg-white p-6 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out rounded-2xl shadow-[0_25px_50px_-12px_rgba(30,64,175,0.25)] z-50 border border-[#1E40AF]/10">
        {/* Decorative top bar */}
        <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[#1E40AF] via-[#FF8500] to-[#1E40AF] rounded-full"></div>

        <div className={`grid ${gridCols} gap-8 mt-2`}>
          {columns.map((col) => (
            <div key={col.title} className="w-full">
              <h3 className="mb-4 text-base font-bold text-[#1E40AF] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF8500] rounded-full"></span>
                {col.title}
              </h3>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group/link flex items-center py-2.5 px-3 text-sm text-[#1E40AF]/80 rounded-lg hover:bg-[#1E40AF]/5 hover:text-[#1E40AF] transition-all duration-200"
                    >
                      <ChevronRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all duration-200 text-[#FF8500]" />
                      <span className="font-medium">{link.label}</span>
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

// Premium Mega Menu Item for Professional/About sections
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

  const isAboutMenu = trigger.toLowerCase().includes('propos') || trigger.toLowerCase().includes('about');

  return (
    <li className="relative group">
      <button className={cn(
        "inline-flex h-10 items-center justify-center px-4 py-2 text-base font-bold transition-all duration-300 relative",
        isSticky ? 'text-white hover:text-[#FF8500]' : 'text-[#1E40AF] hover:text-[#FF8500]'
      )}>
        {trigger}
        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#FF8500] transition-all duration-300 group-hover:w-full"></span>
      </button>

      <div className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out rounded-2xl shadow-[0_25px_50px_-12px_rgba(30,64,175,0.25)] z-50 overflow-hidden border border-[#1E40AF]/10",
        isAboutMenu ? 'border-t-4 border-t-[#FF8500]' : ''
      )}>
        {/* Header for About menu */}
        {isAboutMenu && (
          <div className="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] px-6 py-5">
            <h2 className="text-white font-bold text-xl">Découvrez notre laboratoire</h2>
            <p className="text-white/70 text-sm mt-1">Excellence & Innovation depuis 2012</p>
          </div>
        )}

        <div className={`grid grid-cols-12 gap-6 ${isAboutMenu ? 'p-6' : 'p-6'}`}>
          {professionalsMenu.columns.map((col: any, index: number) => (
            <div key={index} className={`${getColSpanClass(col.span)} relative`}>
              {isAboutMenu && index === 0 && (
                <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF8500] to-[#1E40AF] rounded-full"></div>
              )}

              {col.title && (
                <h3 className="mb-4 text-base font-bold text-[#1E40AF] flex items-center gap-2">
                  {isAboutMenu && (
                    <span className="w-2 h-2 bg-[#FF8500] rounded-full"></span>
                  )}
                  {col.title}
                </h3>
              )}

              <ul className="space-y-1">
                {col.links.map((link: any) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group/link flex items-center py-2.5 px-3 rounded-lg hover:bg-[#1E40AF]/5 transition-all duration-200"
                    >
                      <ChevronRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all duration-200 text-[#FF8500]" />
                      <span className="text-sm text-[#1E40AF]/80 group-hover/link:text-[#1E40AF] font-medium">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer for About menu */}
        {isAboutMenu && (
          <div className="bg-gradient-to-r from-[#1E40AF]/5 to-[#FF8500]/5 px-6 py-4 border-t border-[#1E40AF]/10">
            <p className="text-sm text-[#1E40AF]/70 text-center">
              <span className="font-bold text-[#1E40AF]">Besoin d'aide?</span> Contactez-nous au{' '}
              <span className="font-bold text-[#FF8500]">(+237) 242 04 68 50</span>
            </p>
          </div>
        )}
      </div>
    </li>
  );
};

// Mobile Accordion Items
const MobileAccordionItem = ({ trigger, menu, onClose }: { trigger: string, menu: MegaMenuColumn[], onClose: () => void }) => (
  <AccordionItem value={trigger.toLowerCase()} className="border border-[#1E40AF]/10 rounded-xl overflow-hidden mb-2">
    <AccordionTrigger className="text-lg font-bold text-[#1E40AF] no-underline hover:no-underline py-4 px-4 hover:bg-[#1E40AF]/5">
      {trigger}
    </AccordionTrigger>
    <AccordionContent className="bg-[#1E40AF]/5">
      <div className="px-4 py-2 space-y-4">
        {menu.map(col => (
          <div key={col.title}>
            <h4 className="mb-3 font-bold text-[#1E40AF] text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF8500] rounded-full"></span>
              {col.title}
            </h4>
            <ul className="space-y-1 pl-4">
              {col.links.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#1E40AF]/80 text-sm py-2.5 block hover:text-[#FF8500] transition-colors font-medium"
                    onClick={onClose}
                  >
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

const MobileAccordionItemPro = ({ trigger, professionalsMenu, onClose }: { trigger: string, professionalsMenu: any, onClose: () => void }) => (
  <AccordionItem value={trigger.toLowerCase()} className="border border-[#1E40AF]/10 rounded-xl overflow-hidden mb-2">
    <AccordionTrigger className="text-lg font-bold text-[#1E40AF] no-underline hover:no-underline py-4 px-4 hover:bg-[#1E40AF]/5">
      {trigger}
    </AccordionTrigger>
    <AccordionContent className="bg-[#1E40AF]/5">
      <div className="px-4 py-2 space-y-4">
        {professionalsMenu.columns.map((col: any, index: number) => (
          <div key={index}>
            {col.title && (
              <h4 className="mb-3 font-bold text-[#1E40AF] text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#FF8500] rounded-full"></span>
                {col.title}
              </h4>
            )}
            <ul className="space-y-1 pl-4">
              {col.links.map((link: any) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#1E40AF]/80 text-sm py-2.5 block hover:text-[#FF8500] transition-colors font-medium"
                    onClick={onClose}
                  >
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
