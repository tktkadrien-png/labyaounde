"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Languages } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/contents/LanguageContext";

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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleLanguage = () => {
    const newLang = language === "fr" ? "en" : "fr";
    setLanguage(newLang);
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

  const expertiseMenu: MegaMenuColumn[] = [
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

  const simpleNavLinks: NavLink[] = [
    { href: "#", label: t('careers') },
  ];

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
              <ul className="flex list-none gap-[30px] m-0">
                <MegaMenuItem trigger={t('patients')} columns={patientsMenu} itemsInRow={3} />
                <MegaMenuItemPro trigger={t('healthProfessionals')} professionalsMenu={professionalsMenu} />
                <MegaMenuItem trigger={t('expertise')} columns={expertiseMenu} itemsInRow={1}/>
                {simpleNavLinks.map((link) => (
                  <li key={link.label} className="relative">
                    <Link 
                      href={link.href} 
                      className="inline-flex h-10 items-center justify-center px-4 py-2 text-base font-medium text-[#0B3D5F] transition-colors hover:text-[#0a6ed1]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={toggleLanguage}
                size="sm"
                variant="ghost"
                className="ml-2 h-10 px-3 rounded-md text-[#0B3D5F] hover:bg-[#0B3D5F]/5 hover:text-[#0a6ed1] transition-colors border border-[#E0E0E0] font-medium"
              >
                <Languages className="h-4 w-4 mr-1.5" />
                <span className="text-sm">{language.toUpperCase()}</span>
              </Button>
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
              <MobileAccordionItem trigger={t('patients')} menu={patientsMenu} />
              <MobileAccordionItemPro trigger={t('healthProfessionals')} professionalsMenu={professionalsMenu} />
              <MobileAccordionItem trigger={t('expertise')} menu={expertiseMenu} />
            </Accordion>
            <div className="mt-6 flex flex-col space-y-4 border-t border-gray-200 pt-6">
              {simpleNavLinks.map((link) => (
                <Link href={link.href} key={link.label} className="text-lg font-medium text-[#0B3D5F]" onClick={toggleMobileMenu}>
                  {link.label}
                </Link>
              ))}
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

  return (
    <li className="relative group">
      <button className="inline-flex h-10 items-center justify-center px-4 py-2 text-base font-[500] text-[#333] transition-colors hover:text-[#0a6ed1]">
        {trigger}
      </button>

      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white p-[20px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-[250ms] ease-[ease] rounded-[8px] shadow-[0_4px_25px_rgba(0,0,0,0.1)] z-50">
        <div className="grid grid-cols-12 gap-4">
          {professionalsMenu.columns.map((col: any, index: number) => (
            <div key={index} className={getColSpanClass(col.span)}>
              {col.title && <h3 className="mb-[10px] text-[15px] font-semibold text-[#063f73]">{col.title}</h3>}
              <ul className="space-y-0">
                {col.links.map((link: any) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block py-[5px] text-[14px] text-[#333] no-underline hover:text-[#0a6ed1] transition-colors"
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