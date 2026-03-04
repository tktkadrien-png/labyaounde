"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Mail, Lock, Eye, EyeOff, AlertCircle,
  ArrowLeft, Loader2, ShieldCheck, ChevronRight,
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
      badge: "Espace Administrateur",
      title: "Bon retour",
      subtitle: "Connectez-vous pour accéder au panneau d'administration.",
      emailLabel: "Adresse email",
      emailPlaceholder: "admin@labyaounde.com",
      passwordLabel: "Mot de passe",
      loginButton: "Accéder au dashboard",
      loading: "Vérification en cours…",
      unauthorized: "Accès refusé. Compte administrateur requis.",
      noAccount: "Pas encore de compte ?",
      registerLink: "Créer un compte admin",
      invalidCredentials: "Email ou mot de passe incorrect.",
      networkError: "Erreur réseau. Vérifiez votre connexion.",
      backToSite: "Retour au site",
      ssl: "Connexion sécurisée SSL · Zone privée",
    },
    en: {
      badge: "Administrator Area",
      title: "Welcome back",
      subtitle: "Sign in to access the administration panel.",
      emailLabel: "Email address",
      emailPlaceholder: "admin@labyaounde.com",
      passwordLabel: "Password",
      loginButton: "Access dashboard",
      loading: "Verifying…",
      unauthorized: "Access denied. Administrator account required.",
      noAccount: "No admin account yet?",
      registerLink: "Create admin account",
      invalidCredentials: "Invalid email or password.",
      networkError: "Network error. Check your connection.",
      backToSite: "Back to site",
      ssl: "SSL secured connection · Private area",
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
        if (authError.message.includes("Invalid login credentials")) setError(t.invalidCredentials);
        else if (authError.message.toLowerCase().includes("network") || authError.message.toLowerCase().includes("fetch")) setError(t.networkError);
        else setError(authError.message);
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
        if (!verifyData.is_admin) { await supabase.auth.signOut(); setError(t.unauthorized); return; }
      } catch {
        const isAdmin = data.user.user_metadata?.is_admin === true || data.user.user_metadata?.role === "admin";
        if (!isAdmin) { await supabase.auth.signOut(); setError(t.unauthorized); return; }
      }
      router.push("/admin-dashboard");
    } catch (err: any) {
      setError(err.message?.toLowerCase().includes("fetch") || err.message?.toLowerCase().includes("network")
        ? t.networkError
        : language === "fr" ? "Une erreur est survenue." : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex flex-col">

      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#1034A6]/10 flex items-center justify-center group-hover:bg-[#1034A6]/20 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 text-[#1034A6]" />
          </div>
          <span className="text-xs font-semibold text-gray-400 group-hover:text-[#1034A6] transition-colors">{t.backToSite}</span>
        </Link>

        {/* Secure badge */}
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {t.ssl}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[420px]">

          {/* Logo + badge */}
          <div className="flex flex-col items-center mb-10">
            {/* Logo */}
            <div className="mb-6 w-28 h-28 rounded-3xl bg-white shadow-xl shadow-black/8 border border-gray-100 flex items-center justify-center">
              <Image
                src="/images/images.png"
                alt="Lab Yaoundé"
                width={96}
                height={96}
                className="w-20 h-auto object-contain"
                priority
              />
            </div>

            {/* Badge */}
            <div className="flex items-center gap-2 bg-[#1034A6]/8 border border-[#1034A6]/15 rounded-full px-4 py-1.5 mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1034A6]" />
              <span className="text-[11px] font-bold text-[#1034A6] tracking-wide uppercase">{t.badge}</span>
            </div>

            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t.title}</h1>
            <p className="text-sm text-gray-400 mt-2 text-center leading-relaxed max-w-xs">{t.subtitle}</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-black/6 border border-gray-100 p-8">

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 p-3.5 bg-red-50 border border-red-100 rounded-2xl mb-6">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">{t.emailLabel}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder={t.emailPlaceholder}
                    className="w-full pl-11 pr-4 py-3.5 text-sm bg-[#F8FAFF] border border-gray-200 rounded-xl focus:border-[#1034A6] focus:ring-2 focus:ring-[#1034A6]/10 focus:bg-white outline-none transition-all text-gray-800 placeholder-gray-300"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">{t.passwordLabel}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 text-sm bg-[#F8FAFF] border border-gray-200 rounded-xl focus:border-[#1034A6] focus:ring-2 focus:ring-[#1034A6]/10 focus:bg-white outline-none transition-all text-gray-800 placeholder-gray-300"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#1034A6] transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-sm font-bold text-white rounded-2xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#1034A6]/30 hover:shadow-[#1034A6]/50 hover:scale-[1.02] active:scale-[0.98] mt-2"
                style={{ background: "linear-gradient(135deg, #0C1E7F 0%, #1034A6 55%, #1D4ED8 100%)" }}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />{t.loading}</>
                ) : (
                  <><ShieldCheck className="w-4 h-4" />{t.loginButton}<ChevronRight className="w-4 h-4 ml-auto" /></>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-6">
            {t.noAccount}{" "}
            <Link href="/admin-register" className="text-[#1034A6] font-bold hover:underline">
              {t.registerLink}
            </Link>
          </p>

          <p className="text-center text-[10px] text-gray-300 mt-4">
            © {new Date().getFullYear()} Lab Yaounde
          </p>
        </div>
      </div>
    </div>
  );
}
