"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Menu, X, Languages, LogIn, UserPlus, User, LogOut,
  ChevronDown, ChevronRight, Search, ArrowRight, Globe,
  FlaskConical, Shield, Heart, Briefcase, Dna, Fingerprint,
  Microscope, FileText, Bug, Stethoscope, BookOpen, ClipboardCheck,
  HelpCircle, Calendar, Award, Users, Eye, Target, Building2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { supabase } from "@/lib/supabase";

// ─── Types ───────────────────────────────────────────────────────────
interface NavLink {
  href: string;
  label: string;
  icon?: any;
  description?: string;
}

interface MenuColumn {
  title: string;
  links: NavLink[];
}

interface MenuConfig {
  id: string;
  label: string;
  columns: MenuColumn[];
  width?: string;
  footer?: { label: string; href: string };
}

// ─── Animation Configs ───────────────────────────────────────────────
const megaMenuVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 4, scale: 0.99 },
};

const megaMenuTransition = {
  duration: 0.2,
  ease: [0.25, 0.46, 0.45, 0.94],
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const staggerChild = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
};

const mobileStagger = {
  closed: {},
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const mobileChild = {
  closed: { opacity: 0, x: 20 },
  open: { opacity: 1, x: 0 },
};

// ─── Main Component ──────────────────────────────────────────────────
const MainNavigation = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { language, setLanguage, t } = useLanguage();

  // State
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Auth
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setShowUserMenu(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hover intent
  const handleMenuEnter = useCallback((menuId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveMenu(menuId), 80);
  }, []);

  const handleMenuLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 250);
  }, []);

  const toggleLanguage = () => setLanguage(language === "fr" ? "en" : "fr");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowUserMenu(false);
  };

  // Active page detection
  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");
  const isMenuActive = (config: MenuConfig) =>
    config.columns.some(col => col.links.some(link => isActive(link.href)));

  // ─── Menu Data ───────────────────────────────────────────────────
  const aboutMenu: MenuConfig = {
    id: "about",
    label: t("aboutUs"),
    width: "w-[520px]",
    columns: [
      {
        title: t("whoWeAre"),
        links: [
          { href: "/notre-engagement", label: language === "fr" ? "Notre Engagement" : "Our Commitment", icon: Award },
          { href: "/notre-vision", label: t("ourVision"), icon: Eye },
          { href: "/nos-standards", label: t("ourStandards"), icon: Target },
          { href: "/nos-strategies", label: language === "fr" ? "Nos Stratégies" : "Our Strategies", icon: Target },
          { href: "/nos-objectifs", label: language === "fr" ? "Nos Objectifs" : "Our Objectives", icon: Target },
        ],
      },
      {
        title: language === "fr" ? "Organisation" : "Organization",
        links: [
          { href: "/organigramme", label: t("organizationalChart"), icon: Building2 },
          { href: "/notre-equipe", label: language === "fr" ? "Notre Équipe" : "Our Team", icon: Users },
          { href: "/nos-valeurs", label: language === "fr" ? "Nos Valeurs" : "Our Values", icon: Heart },
        ],
      },
    ],
  };

  const servicesMenu: MenuConfig = {
    id: "services",
    label: t("ourServices"),
    width: "w-[580px]",
    columns: [
      {
        title: language === "fr" ? "Analyses" : "Tests",
        links: [
          { href: "/biochimie-clinique", label: language === "fr" ? "Biochimie Clinique" : "Clinical Biochemistry", icon: FlaskConical },
          { href: "/hematologie", label: language === "fr" ? "Hématologie" : "Hematology", icon: Heart },
          { href: "/immunologie", label: language === "fr" ? "Immunologie" : "Immunology", icon: Shield },
          { href: "/microbiologie", label: language === "fr" ? "Microbiologie" : "Microbiology", icon: Bug },
        ],
      },
      {
        title: language === "fr" ? "Expertise" : "Expertise",
        links: [
          { href: "/biologie-moleculaire", label: language === "fr" ? "Biologie Moléculaire" : "Molecular Biology", icon: Dna },
          { href: "/empreintes-genetiques", label: language === "fr" ? "Empreintes Génétiques" : "Genetic Fingerprinting", icon: Fingerprint },
          { href: "/expertise-genetique", label: language === "fr" ? "Expertise Génétique & Moléculaire" : "Genetic & Molecular Expertise", icon: Microscope },
          { href: "/interpretation-resultats", label: language === "fr" ? "Interprétation des Résultats" : "Results Interpretation", icon: FileText },
        ],
      },
    ],
  };

  const qualityMenu: MenuConfig = {
    id: "quality",
    label: language === "fr" ? "Assurance Qualité" : "Quality Assurance",
    width: "w-[600px]",
    columns: [
      {
        title: language === "fr" ? "Politiques et Chartes" : "Policies & Charters",
        links: [
          { href: "/politique-de-qualite", label: language === "fr" ? "Politique de Qualité" : "Quality Policy", icon: ClipboardCheck },
          { href: "/charte-de-qualite", label: language === "fr" ? "Charte de Qualité" : "Quality Charter", icon: BookOpen },
          { href: "/coming-soon", label: language === "fr" ? "Politique d'Hygiène et Sécurité" : "Hygiene & Safety Policy", icon: Shield },
        ],
      },
      {
        title: language === "fr" ? "Gestion et Contrôle" : "Management & Control",
        links: [
          { href: "/coming-soon", label: language === "fr" ? "Gestion des Risques" : "Risk Management", icon: Target },
          { href: "/reclamations-et-plaintes", label: language === "fr" ? "Réclamations et Plaintes" : "Complaints & Claims", icon: FileText },
          { href: "/controle-qualite", label: language === "fr" ? "Contrôle Qualité Interne et Externe" : "Internal & External Quality Control", icon: Award },
        ],
      },
    ],
  };

  const patientsMenu: MenuConfig = {
    id: "patients",
    label: t("patients"),
    width: "w-[400px]",
    columns: [
      {
        title: language === "fr" ? "Prélèvement" : "Sampling",
        links: [
          { href: "/dois-je-prendre-rdv", label: t("needAppointment"), icon: Calendar },
          { href: "/conseils-et-informations", label: t("adviceInfo"), icon: Stethoscope },
          { href: "/coming-soon", label: t("necessaryDocs"), icon: FileText },
          { href: "/questions-frequentes", label: t("faq"), icon: HelpCircle },
        ],
      },
    ],
  };

  const allMenus: MenuConfig[] = [aboutMenu, servicesMenu, qualityMenu, patientsMenu];

  // ─── Render ────────────────────────────────────────────────────────
  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#1E40AF] focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
      >
        {language === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>

      <motion.header
        ref={navRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "sticky top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-out",
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]"
            : "bg-white border-b border-transparent"
        )}
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* ─── Logo ─── */}
            <Link href="/" aria-label="Lab Yaoundé Home" className="flex items-center flex-shrink-0">
              <motion.div
                animate={{ height: isScrolled ? 48 : 64 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative"
              >
                <Image
                  src="/images/images.png"
                  alt="Lab Yaoundé Logo"
                  width={200}
                  height={80}
                  className="h-full w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* ─── Desktop Nav ─── */}
            <nav className="hidden xl:flex items-center gap-1">
              {allMenus.map((menu) => (
                <div
                  key={menu.id}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(menu.id)}
                  onMouseLeave={handleMenuLeave}
                >
                  <button
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]/30 focus-visible:ring-offset-2",
                      activeMenu === menu.id
                        ? "text-slate-900 bg-slate-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/50"
                    )}
                    aria-expanded={activeMenu === menu.id}
                    aria-haspopup="true"
                  >
                    {menu.label}
                    <motion.span
                      animate={{ rotate: activeMenu === menu.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-3.5 w-3.5 opacity-40" />
                    </motion.span>
                  </button>

                  {/* Active page indicator */}
                  {isMenuActive(menu) && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-[#1E40AF] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {activeMenu === menu.id && (
                      <MegaMenuPanel
                        menu={menu}
                        isActive={isActive}
                        onMouseEnter={() => handleMenuEnter(menu.id)}
                        onMouseLeave={handleMenuLeave}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Careers - Direct Link */}
              <Link
                href="/carrieres/offres-emploi-stages"
                className={cn(
                  "inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 relative",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]/30 focus-visible:ring-offset-2",
                  isActive("/carrieres")
                    ? "text-[#1E40AF]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/50"
                )}
              >
                {t("careers")}
                {isActive("/carrieres") && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-[#1E40AF] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </nav>

            {/* ─── Right Side Actions ─── */}
            <div className="hidden xl:flex items-center gap-1.5">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]/30"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{language === "fr" ? "FR" : "EN"}</span>
              </button>

              <div className="w-px h-5 bg-slate-200 mx-1" />

              {/* Auth */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]/30"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center flex-shrink-0">
                      <span className="text-[11px] font-bold text-white">
                        {(user.user_metadata?.full_name || user.email)?.[0]?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <ChevronDown className="h-3 w-3 text-slate-400" />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 2, scale: 0.99 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-50"
                      >
                        <div className="px-3 py-2.5 border-b border-slate-100">
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {user.user_metadata?.full_name || user.email?.split("@")[0]}
                          </p>
                          <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link href="/profile" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                            <User className="h-3.5 w-3.5" />
                            {language === "fr" ? "Mon profil" : "My Profile"}
                          </Link>
                          <Link href="/mes-resultats" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                            <FileText className="h-3.5 w-3.5" />
                            {language === "fr" ? "Mes résultats" : "My Results"}
                          </Link>
                          <Link href="/laisser-un-avis" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                            <Award className="h-3.5 w-3.5" />
                            {language === "fr" ? "Laisser un avis" : "Leave a Review"}
                          </Link>
                        </div>
                        <div className="border-t border-slate-100 pt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="h-3.5 w-3.5" />
                            {language === "fr" ? "Déconnexion" : "Logout"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Link href="/login">
                    <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors">
                      {language === "fr" ? "Connexion" : "Login"}
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-[#1E40AF] hover:bg-[#1E3A8A] rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                      {language === "fr" ? "Inscription" : "Sign Up"}
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* ─── Mobile Hamburger ─── */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden p-2.5 rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]/30"
              aria-label="Open menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className="block h-0.5 w-5 bg-slate-700 rounded-full" />
                <span className="block h-0.5 w-3.5 bg-slate-700 rounded-full" />
                <span className="block h-0.5 w-5 bg-slate-700 rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ─── Mobile Menu ─── */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-l-0 flex flex-col">
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
            <SheetTitle className="text-left text-lg font-semibold text-slate-900">
              Menu
            </SheetTitle>
          </SheetHeader>

          <div className="px-6 py-4 overflow-y-auto flex-1">
            <motion.nav
              initial="closed"
              animate="open"
              variants={mobileStagger}
            >
              {allMenus.map((menu) => (
                <motion.div
                  key={menu.id}
                  variants={mobileChild}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <MobileMenuSection
                    menu={menu}
                    isActive={isActive}
                    onClose={() => setIsMobileMenuOpen(false)}
                  />
                </motion.div>
              ))}

              {/* Careers mobile */}
              <motion.div
                variants={mobileChild}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <Link
                  href="/carrieres/offres-emploi-stages"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 py-4 text-base font-medium border-b border-slate-100 transition-colors",
                    isActive("/carrieres") ? "text-[#1E40AF]" : "text-slate-900 hover:text-[#1E40AF]"
                  )}
                >
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  {t("careers")}
                </Link>
              </motion.div>
            </motion.nav>
          </div>

          <SheetFooter className="border-t border-slate-100 p-6 gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-3 bg-slate-50 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">
                      {(user.user_metadata?.full_name || user.email)?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {user.user_metadata?.full_name || user.email?.split("@")[0]}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                    <button className="w-full py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      {language === "fr" ? "Profil" : "Profile"}
                    </button>
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="flex-1 py-2.5 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    {language === "fr" ? "Déconnexion" : "Logout"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                  <button className="w-full py-2.5 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    {language === "fr" ? "Connexion" : "Login"}
                  </button>
                </Link>
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                  <button className="w-full py-2.5 text-sm font-medium text-white bg-[#1E40AF] rounded-lg hover:bg-[#1E3A8A] transition-colors">
                    {language === "fr" ? "Inscription" : "Sign Up"}
                  </button>
                </Link>
              </div>
            )}
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Globe className="h-4 w-4" />
              {language === "fr" ? "English" : "Français"}
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

// ─── Mega Menu Panel ─────────────────────────────────────────────────
const MegaMenuPanel = ({
  menu,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: {
  menu: MenuConfig;
  isActive: (href: string) => boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const cols = menu.columns.length;

  return (
    <motion.div
      ref={menuRef}
      variants={megaMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={megaMenuTransition}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 mt-1",
        menu.width || "w-[520px]",
        "bg-white/95 backdrop-blur-xl",
        "rounded-xl border border-slate-200/80",
        "shadow-[0_16px_70px_-12px_rgba(0,0,0,0.12)]",
        "p-1.5"
      )}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className={cn(
          "grid gap-x-0",
          cols === 2 ? "grid-cols-2" : "grid-cols-1"
        )}
      >
        {menu.columns.map((col, colIndex) => (
          <div key={colIndex} className={cn("p-3", colIndex > 0 && "border-l border-slate-100")}>
            <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {col.title}
            </p>
            <div className="space-y-0.5">
              {col.links.map((link) => (
                <motion.div key={link.href} variants={staggerChild}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group/link flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150",
                      isActive(link.href)
                        ? "bg-[#1E40AF]/5 text-[#1E40AF]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {link.icon && (
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-150",
                        isActive(link.href)
                          ? "bg-[#1E40AF]/10 text-[#1E40AF]"
                          : "bg-slate-100 text-slate-400 group-hover/link:bg-[#1E40AF]/10 group-hover/link:text-[#1E40AF]"
                      )}>
                        <link.icon className="h-4 w-4" />
                      </div>
                    )}
                    <span className="text-sm font-medium flex-1">{link.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-30 group-hover/link:translate-x-0 transition-all duration-200" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {menu.footer && (
        <div className="border-t border-slate-100 mt-1 pt-1 px-3 pb-2">
          <Link
            href={menu.footer.href}
            className="flex items-center gap-2 px-3 py-2 text-sm text-[#1E40AF] hover:text-[#1E3A8A] font-medium rounded-lg hover:bg-[#1E40AF]/5 transition-colors"
          >
            {menu.footer.label}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </motion.div>
  );
};

// ─── Mobile Menu Section ─────────────────────────────────────────────
const MobileMenuSection = ({
  menu,
  isActive,
  onClose,
}: {
  menu: MenuConfig;
  isActive: (href: string) => boolean;
  onClose: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full py-4 text-base font-medium text-slate-900 hover:text-[#1E40AF] transition-colors"
      >
        <span>{menu.label}</span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-4">
              {menu.columns.map((col, i) => (
                <div key={i}>
                  <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {col.title}
                  </p>
                  <div className="space-y-0.5">
                    {col.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 py-2.5 px-3 text-sm rounded-lg transition-colors",
                          isActive(link.href)
                            ? "text-[#1E40AF] bg-[#1E40AF]/5 font-medium"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                        )}
                      >
                        {link.icon && (
                          <link.icon className={cn(
                            "h-4 w-4 flex-shrink-0",
                            isActive(link.href) ? "text-[#1E40AF]" : "text-slate-400"
                          )} />
                        )}
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainNavigation;
