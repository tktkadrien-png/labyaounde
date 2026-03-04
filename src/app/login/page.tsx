"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Eye, EyeOff, AlertCircle, CheckCircle, Loader2,
  Facebook, Instagram, ArrowLeft, LayoutDashboard, UserCircle2, UserPlus,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

const translations = {
  fr: {
    signIn: "Connexion",
    signUp: "Inscription",
    fullName: "Nom complet",
    email: "Adresse email",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    loginButton: "Se connecter",
    registerButton: "Créer mon compte",
    loggingIn: "Connexion...",
    registering: "Création...",
    noAccount: "Pas encore de compte ?",
    hasAccount: "Déjà un compte ?",
    tagline: "Votre santé, notre priorité",
    description: "Accédez à vos résultats d'analyses en toute sécurité depuis n'importe où.",
    backToHome: "Retour à l'accueil",
    adminAccess: "Accès Admin",
    errors: {
      emailRequired: "Veuillez entrer votre adresse email",
      emailInvalid: "Adresse email invalide",
      passwordRequired: "Veuillez entrer votre mot de passe",
      invalidCredentials: "Email ou mot de passe incorrect",
      emailNotConfirmed: "Confirmez votre email avant de vous connecter",
      networkError: "Problème de connexion. Réessayez.",
      tooManyAttempts: "Trop de tentatives. Attendez quelques minutes.",
    },
    success: "Connexion réussie ! Redirection...",
    reset: {
      title: "Mot de passe oublié",
      subtitle: "Entrez votre email pour recevoir un lien de réinitialisation",
      sendButton: "Envoyer le lien",
      sending: "Envoi...",
      back: "Retour",
      success: "Email envoyé ! Vérifiez votre boîte de réception.",
      error: "Impossible d'envoyer l'email. Vérifiez l'adresse.",
    },
  },
  en: {
    signIn: "Sign In",
    signUp: "Sign Up",
    fullName: "Full Name",
    email: "Email address",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot password?",
    loginButton: "Sign In",
    registerButton: "Create Account",
    loggingIn: "Signing in...",
    registering: "Creating...",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    tagline: "Your health, our priority",
    description: "Access your test results securely from anywhere.",
    backToHome: "Back to home",
    adminAccess: "Admin Access",
    errors: {
      emailRequired: "Please enter your email address",
      emailInvalid: "Invalid email address",
      passwordRequired: "Please enter your password",
      invalidCredentials: "Invalid email or password",
      emailNotConfirmed: "Please confirm your email before signing in",
      networkError: "Connection issue. Please try again.",
      tooManyAttempts: "Too many attempts. Please wait a few minutes.",
    },
    success: "Login successful! Redirecting...",
    reset: {
      title: "Forgot Password",
      subtitle: "Enter your email to receive a reset link",
      sendButton: "Send Link",
      sending: "Sending...",
      back: "Back",
      success: "Email sent! Check your inbox.",
      error: "Unable to send email. Check the address.",
    },
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.push("/mes-resultats");
    });
  }, [router]);

  const isValidEmail = useCallback((v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!email.trim()) return setError(t.errors.emailRequired);
    if (!isValidEmail(email)) return setError(t.errors.emailInvalid);
    if (!password) return setError(t.errors.passwordRequired);
    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (authError) {
        const msg = authError.message?.toLowerCase() || "";
        if (msg.includes("email not confirmed")) setError(t.errors.emailNotConfirmed);
        else if (msg.includes("rate limit") || msg.includes("too many")) setError(t.errors.tooManyAttempts);
        else setError(t.errors.invalidCredentials);
        return;
      }
      if (data?.user) {
        setSuccess(t.success);
        setTimeout(() => { router.push("/mes-resultats"); router.refresh(); }, 800);
      }
    } catch {
      setError(t.errors.networkError);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!email.trim()) return setError(t.errors.emailRequired);
    if (!isValidEmail(email)) return setError(t.errors.emailInvalid);
    if (!password) return setError(t.errors.passwordRequired);
    if (password !== confirmPassword) return setError(language === "fr" ? "Les mots de passe ne correspondent pas." : "Passwords do not match.");
    setLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: { data: { full_name: fullName.trim() } },
      });
      if (signUpError) { setError(signUpError.message); return; }
      setSuccess(language === "fr" ? "Compte créé ! Vérifiez votre email." : "Account created! Check your email.");
    } catch {
      setError(t.errors.networkError);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!resetEmail.trim() || !isValidEmail(resetEmail)) return setError(t.errors.emailInvalid);
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSuccess(t.reset.success);
      setTimeout(() => { setShowReset(false); setResetEmail(""); setSuccess(""); }, 4000);
    } catch {
      setError(t.reset.error);
    } finally {
      setResetLoading(false);
    }
  };

  const switchTab = (tab: "signin" | "signup") => {
    setActiveTab(tab);
    setError(""); setSuccess("");
    setEmail(""); setPassword(""); setFullName(""); setConfirmPassword("");
  };

  // Input class — rounded bordered style
  const inputClass = "w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-[#1034A6] focus:ring-2 focus:ring-[#1034A6]/10 outline-none transition-all text-gray-800 placeholder-gray-300 bg-white";

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#E8F0FE] to-[#dce8ff] flex items-center justify-center p-4">

      {/* Back to home */}
      <Link
        href="/"
        className="fixed top-5 left-5 z-20 flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors bg-[#1034A6]/70 hover:bg-[#1034A6] px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {t.backToHome}
      </Link>

      {/* Admin dashboard button — top right */}
      <Link
        href="/admin-dashboard"
        className="fixed top-5 right-5 z-20 flex items-center gap-2 text-xs font-semibold text-[#1034A6] hover:text-white bg-white/90 hover:bg-[#1034A6] border border-[#1034A6]/20 hover:border-[#1034A6] px-3.5 py-1.5 rounded-full backdrop-blur-sm shadow-md transition-all duration-200"
      >
        <LayoutDashboard className="w-3.5 h-3.5" />
        {t.adminAccess}
      </Link>

      {/* Main card — split layout */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-[600px]">

        {/* ── LEFT PANEL — branded ── */}
        <div className="hidden md:flex md:w-[44%] relative flex-col justify-between p-10 overflow-hidden"
          style={{ background: "linear-gradient(145deg, #0A1F6E 0%, #1034A6 45%, #2563EB 80%, #60A5FA 100%)" }}>

          {/* Decorative circles */}
          <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full bg-white/8" />
          <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 rounded-full bg-[#84BDE3]/15" />

          {/* Logo */}
          <div className="relative z-10">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 inline-block border border-white/25 shadow-lg">
              <Image
                src="/images/images.png"
                alt="Lab Yaoundé Logo"
                width={160}
                height={64}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Center — Logo showcase */}
          <div className="relative z-10 flex-1 flex items-center justify-center my-6">
            {/* Outer glow ring */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-56 h-56 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute w-44 h-44 rounded-full border border-white/10" />
              <div className="absolute w-56 h-56 rounded-full border border-white/5" />
              {/* Spinning dashed ring */}
              <div className="absolute w-52 h-52 rounded-full border-2 border-dashed border-white/15 animate-spin" style={{ animationDuration: "18s" }} />

              {/* Logo card */}
              <div className="relative w-40 h-40 rounded-3xl bg-white shadow-2xl shadow-black/40 flex items-center justify-center border border-white/80">
                <Image
                  src="/images/images.png"
                  alt="Lab Yaoundé Logo"
                  width={130}
                  height={130}
                  className="w-28 h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute top-0 -right-2 bg-white/15 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/25 shadow-xl">
              <div className="text-xl font-black text-white leading-none">24h</div>
              <div className="text-white/60 text-[10px] font-medium">Résultats</div>
            </div>
            <div className="absolute bottom-0 -left-2 bg-white/15 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/25 shadow-xl">
              <div className="text-xl font-black text-[#93C5FD] leading-none">ISO</div>
              <div className="text-white/60 text-[10px] font-medium">Certifié</div>
            </div>
          </div>

          {/* Tagline + socials */}
          <div className="relative z-10">
            <p className="text-white font-bold text-lg leading-snug">{t.tagline}</p>
            <p className="text-white/55 text-xs mt-2 leading-relaxed">{t.description}</p>

            <div className="flex items-center gap-2.5 mt-5">
              <a href="https://www.facebook.com/profile.php?id=61584110146922" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/60 hover:text-white transition-all border border-white/15">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="https://www.instagram.com/labyciteverte/" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/60 hover:text-white transition-all border border-white/15">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://www.tiktok.com/@laby.cite.vert" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/60 hover:text-white transition-all border border-white/15">
                <TikTokIcon />
              </a>
            </div>

            <p className="text-white/25 text-[10px] mt-4">© {new Date().getFullYear()} Lab Yaounde. Tous droits réservés.</p>
          </div>
        </div>

        {/* ── RIGHT PANEL — form ── */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-12 bg-white">

          {/* Mobile logo */}
          <div className="md:hidden mb-6 flex justify-center">
            <Image src="/images/images.png" alt="Lab Yaoundé Logo" width={140} height={56} className="h-14 w-auto object-contain" priority />
          </div>

          {!showReset ? (
            <>
              {/* ── TABS ── */}
              <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-2xl">
                <button
                  onClick={() => switchTab("signin")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    activeTab === "signin"
                      ? "bg-[#1034A6] text-white shadow-md shadow-[#1034A6]/25"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <UserCircle2 className="w-4 h-4" />
                  {t.signIn}
                </button>
                <button
                  onClick={() => switchTab("signup")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    activeTab === "signup"
                      ? "bg-[#1034A6] text-white shadow-md shadow-[#1034A6]/25"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  {t.signUp}
                </button>
              </div>

              {/* Alert messages */}
              {error && (
                <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-100 rounded-xl mb-4">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              {success && (
                <div className="flex items-start gap-2.5 p-3 bg-emerald-50 border border-emerald-100 rounded-xl mb-4">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-600">{success}</p>
                </div>
              )}

              {/* ── SIGN IN FORM ── */}
              {activeTab === "signin" && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.email}</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="exemple@email.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{t.password}</label>
                      <button
                        type="button"
                        onClick={() => { setShowReset(true); setError(""); setSuccess(""); }}
                        className="text-[11px] text-[#1034A6]/60 hover:text-[#1034A6] font-medium transition-colors"
                      >
                        {t.forgotPassword}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(""); }}
                        placeholder="••••••••"
                        className={inputClass + " pr-11"}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#1034A6] transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-[#1034A6] to-[#2563EB] hover:from-[#0A2480] hover:to-[#1034A6] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-lg shadow-[#1034A6]/20 hover:shadow-[#1034A6]/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
                  >
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" />{t.loggingIn}</> : <><UserCircle2 className="w-4 h-4" />{t.loginButton}</>}
                  </button>

                  <p className="text-center text-xs text-gray-400 pt-1">
                    {t.noAccount}{" "}
                    <button type="button" onClick={() => switchTab("signup")} className="text-[#1034A6] font-bold hover:underline">
                      {t.signUp}
                    </button>
                  </p>
                </form>
              )}

              {/* ── SIGN UP FORM ── */}
              {activeTab === "signup" && (
                <form onSubmit={handleSignup} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.fullName}</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={language === "fr" ? "Votre nom complet" : "Your full name"}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.email}</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="exemple@email.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.password}</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={inputClass + " pr-11"}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#1034A6] transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.confirmPassword}</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={inputClass + " pr-11"}
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#1034A6] transition-colors">
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-[#1034A6] to-[#2563EB] hover:from-[#0A2480] hover:to-[#1034A6] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-lg shadow-[#1034A6]/20 hover:shadow-[#1034A6]/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
                  >
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" />{t.registering}</> : <><UserPlus className="w-4 h-4" />{t.registerButton}</>}
                  </button>

                  <p className="text-center text-xs text-gray-400 pt-1">
                    {t.hasAccount}{" "}
                    <button type="button" onClick={() => switchTab("signin")} className="text-[#1034A6] font-bold hover:underline">
                      {t.signIn}
                    </button>
                  </p>
                </form>
              )}
            </>
          ) : (
            /* ── RESET PASSWORD ── */
            <>
              <button
                onClick={() => { setShowReset(false); setError(""); setSuccess(""); }}
                className="flex items-center gap-1.5 text-sm text-[#1034A6]/60 hover:text-[#1034A6] transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.reset.back}
              </button>

              <div className="mb-7">
                <h2 className="text-xl font-bold text-[#1034A6]">{t.reset.title}</h2>
                <p className="text-sm text-gray-400 mt-1">{t.reset.subtitle}</p>
              </div>

              {error && (
                <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-100 rounded-xl mb-4">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              {success && (
                <div className="flex items-start gap-2.5 p-3 bg-emerald-50 border border-emerald-100 rounded-xl mb-4">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-600">{success}</p>
                </div>
              )}

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.email}</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => { setResetEmail(e.target.value); setError(""); }}
                    placeholder="exemple@email.com"
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-[#1034A6] to-[#2563EB] hover:from-[#0A2480] hover:to-[#1034A6] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-lg shadow-[#1034A6]/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {resetLoading ? <><Loader2 className="w-4 h-4 animate-spin" />{t.reset.sending}</> : t.reset.sendButton}
                </button>
              </form>
            </>
          )}

          {/* Mobile social + admin */}
          <div className="md:hidden flex flex-col items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/profile.php?id=61584110146922" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#1034A6] flex items-center justify-center text-gray-400 hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/labyciteverte/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#1034A6] flex items-center justify-center text-gray-400 hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@laby.cite.vert" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#1034A6] flex items-center justify-center text-gray-400 hover:text-white transition-all">
                <TikTokIcon />
              </a>
            </div>
          </div>

          <p className="mt-5 text-[10px] text-gray-300 text-center">
            © {new Date().getFullYear()} Lab Yaounde — Connexion sécurisée SSL
          </p>
        </div>
      </div>
    </div>
  );
}
