"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Shield, Mail, Lock, Eye, EyeOff, AlertCircle,
  ArrowLeft, Loader2, ShieldCheck, Fingerprint, Lock as LockIcon,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const t = {
    fr: {
      title: "Connexion Admin",
      subtitle: "Accès réservé aux administrateurs autorisés",
      emailLabel: "Adresse email",
      emailPlaceholder: "admin@labyaounde.com",
      passwordLabel: "Mot de passe",
      loginButton: "Accéder au tableau de bord",
      loading: "Vérification...",
      unauthorized: "Accès refusé. Compte administrateur requis.",
      noAccount: "Pas encore de compte admin ?",
      registerLink: "Créer un compte",
      invalidCredentials: "Email ou mot de passe incorrect.",
      networkError: "Erreur de connexion. Vérifiez votre connexion internet.",
      backToSite: "Retour au site",
      secureZone: "Zone sécurisée",
      feature1: "Accès chiffré SSL",
      feature2: "Authentification à deux niveaux",
      feature3: "Sessions sécurisées",
    },
    en: {
      title: "Admin Login",
      subtitle: "Access reserved for authorized administrators",
      emailLabel: "Email address",
      emailPlaceholder: "admin@labyaounde.com",
      passwordLabel: "Password",
      loginButton: "Access Dashboard",
      loading: "Verifying...",
      unauthorized: "Access denied. Administrator account required.",
      noAccount: "No admin account yet?",
      registerLink: "Create account",
      invalidCredentials: "Invalid email or password.",
      networkError: "Connection error. Check your internet connection.",
      backToSite: "Back to site",
      secureZone: "Secure Zone",
      feature1: "SSL encrypted access",
      feature2: "Two-level authentication",
      feature3: "Secure sessions",
    },
  }[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (authError) {
        if (authError.message.includes("Invalid login credentials")) {
          setError(t.invalidCredentials);
        } else if (authError.message.toLowerCase().includes("network") || authError.message.toLowerCase().includes("fetch")) {
          setError(t.networkError);
        } else {
          setError(authError.message);
        }
        return;
      }

      if (!data.user) { setError(t.invalidCredentials); return; }

      try {
        const verifyResponse = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: data.user.id }),
        });
        const verifyData = await verifyResponse.json();
        if (!verifyData.is_admin) {
          await supabase.auth.signOut();
          setError(t.unauthorized);
          return;
        }
      } catch {
        const isAdmin =
          data.user.user_metadata?.is_admin === true ||
          data.user.user_metadata?.role === "admin";
        if (!isAdmin) {
          await supabase.auth.signOut();
          setError(t.unauthorized);
          return;
        }
      }

      router.push("/admin-dashboard");
    } catch (err: any) {
      if (err.message?.toLowerCase().includes("fetch") || err.message?.toLowerCase().includes("network")) {
        setError(t.networkError);
      } else {
        setError(language === "fr" ? "Une erreur est survenue." : "An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL — dark security theme ── */}
      <div className="hidden lg:flex lg:w-[42%] relative flex-col justify-between p-12 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #050D1F 0%, #0A1628 40%, #0F2444 70%, #0D1F3C 100%)" }}>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Glow blobs */}
        <div className="absolute top-20 right-0 w-72 h-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(16,52,166,0.25) 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 left-0 w-56 h-56 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)" }} />

        {/* Top — Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <div className="bg-white/8 backdrop-blur-sm rounded-2xl px-5 py-3.5 border border-white/10 shadow-xl inline-block">
              <Image
                src="/images/images.png"
                alt="Lab Yaoundé"
                width={140}
                height={56}
                className="h-11 w-auto object-contain brightness-0 invert opacity-90"
                priority
              />
            </div>
          </Link>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400/80 text-xs font-semibold tracking-widest uppercase">{t.secureZone}</span>
          </div>
        </div>

        {/* Center — Shield icon + text */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-8">
            {/* Outer ring */}
            <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-white/15 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1034A6] to-[#2563EB] flex items-center justify-center shadow-2xl shadow-[#1034A6]/50">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            {/* Rotating ring decoration */}
            <div className="absolute inset-0 rounded-full border border-[#1034A6]/30 border-dashed animate-spin" style={{ animationDuration: "20s" }} />
          </div>

          <h2 className="text-2xl font-black text-white mb-3 leading-tight">
            Espace<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #60A5FA, #93C5FD)" }}>
              Administrateur
            </span>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            {t.subtitle}
          </p>
        </div>

        {/* Bottom — Security features */}
        <div className="relative z-10 space-y-3">
          {[
            { icon: LockIcon, label: t.feature1 },
            { icon: Fingerprint, label: t.feature2 },
            { icon: ShieldCheck, label: t.feature3 },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-[#60A5FA]" />
              </div>
              <span className="text-white/50 text-xs font-medium">{label}</span>
            </div>
          ))}
          <p className="text-white/20 text-[10px] pt-3">© {new Date().getFullYear()} Lab Yaounde — Accès restreint</p>
        </div>
      </div>

      {/* ── RIGHT PANEL — form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 bg-[#F0F4FF]">

        {/* Back to site */}
        <Link
          href="/"
          className="absolute top-6 left-6 lg:hidden flex items-center gap-1.5 text-xs text-[#1034A6]/60 hover:text-[#1034A6] transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.backToSite}
        </Link>
        <Link
          href="/"
          className="hidden lg:flex absolute top-6 right-8 items-center gap-1.5 text-xs text-gray-400 hover:text-[#1034A6] transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.backToSite}
        </Link>

        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Image src="/images/images.png" alt="Lab Yaoundé Logo" width={130} height={52} className="h-13 w-auto object-contain" priority />
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1034A6] to-[#2563EB] flex items-center justify-center shadow-lg shadow-[#1034A6]/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900">{t.title}</h1>
                <p className="text-xs text-gray-400 font-medium">Lab Yaounde — Admin</p>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-[#1034A6]/20 via-[#2563EB]/10 to-transparent" />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl mb-6">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.emailLabel}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder={t.emailPlaceholder}
                  className="w-full pl-11 pr-4 py-3.5 text-sm bg-white border border-gray-200 rounded-xl focus:border-[#1034A6] focus:ring-2 focus:ring-[#1034A6]/10 outline-none transition-all text-gray-800 placeholder-gray-300 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.passwordLabel}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 text-sm bg-white border border-gray-200 rounded-xl focus:border-[#1034A6] focus:ring-2 focus:ring-[#1034A6]/10 outline-none transition-all text-gray-800 placeholder-gray-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#1034A6] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-sm font-bold text-white rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 shadow-lg shadow-[#1034A6]/25 hover:shadow-[#1034A6]/40 hover:scale-[1.01] active:scale-[0.99]"
              style={{ background: "linear-gradient(135deg, #0A1F6E 0%, #1034A6 50%, #2563EB 100%)" }}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />{t.loading}</>
              ) : (
                <><ShieldCheck className="w-4 h-4" />{t.loginButton}</>
              )}
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-7 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-400">
              {t.noAccount}{" "}
              <Link href="/admin-register" className="text-[#1034A6] font-bold hover:underline">
                {t.registerLink}
              </Link>
            </p>
          </div>

          <p className="mt-6 text-[10px] text-gray-300 text-center">
            © {new Date().getFullYear()} Lab Yaounde — Zone administrateur sécurisée SSL
          </p>
        </div>
      </div>
    </div>
  );
}
