"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
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
      subtitle: "Accès réservé aux administrateurs",
      emailLabel: "Email",
      emailPlaceholder: "admin@labyaounde.com",
      passwordLabel: "Mot de passe",
      loginButton: "Se connecter",
      loading: "Connexion...",
      unauthorized: "Accès non autorisé. Compte administrateur requis.",
      noAccount: "Pas encore de compte admin ?",
      registerLink: "Créer un compte",
      invalidCredentials: "Email ou mot de passe incorrect.",
      networkError: "Erreur de connexion. Vérifiez votre connexion internet.",
      backToSite: "Retour au site",
    },
    en: {
      title: "Admin Login",
      subtitle: "Access reserved for administrators",
      emailLabel: "Email",
      emailPlaceholder: "admin@labyaounde.com",
      passwordLabel: "Password",
      loginButton: "Sign in",
      loading: "Signing in...",
      unauthorized: "Unauthorized. Administrator account required.",
      noAccount: "No admin account yet?",
      registerLink: "Create account",
      invalidCredentials: "Invalid email or password.",
      networkError: "Connection error. Check your internet connection.",
      backToSite: "Back to site",
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

      // Verify admin status
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
        // Fallback check
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
    <div className="min-h-screen bg-[#F8FAFF] flex flex-col items-center justify-center px-4 py-12">
      {/* Back to site */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-[#1034A6]/60 hover:text-[#1034A6] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.backToSite}
      </Link>

      {/* Logo */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#1034A6]" />
          <div className="text-2xl font-bold text-[#1034A6] tracking-tight">
            Lab<span className="text-[#84BDE3]">Yaounde</span>
            <span className="text-sm font-normal text-gray-400 ml-2">Admin</span>
          </div>
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="mb-7">
          <h1 className="text-xl font-bold text-[#1034A6]">{t.title}</h1>
          <p className="text-sm text-gray-400 mt-1">{t.subtitle}</p>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-100 rounded-xl mb-5">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              {t.emailLabel}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder={t.emailPlaceholder}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-[#1034A6] focus:ring-1 focus:ring-[#1034A6] outline-none transition-colors text-[#1034A6] placeholder-gray-300"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              {t.passwordLabel}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:border-[#1034A6] focus:ring-1 focus:ring-[#1034A6] outline-none transition-colors text-[#1034A6] placeholder-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1034A6] hover:bg-[#0A2480] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" />{t.loading}</>
            ) : t.loginButton}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          {t.noAccount}{" "}
          <Link href="/admin-register" className="text-[#1034A6] font-semibold hover:underline">
            {t.registerLink}
          </Link>
        </p>
      </div>

      <p className="mt-6 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} Lab Yaounde — Zone administrateur sécurisée
      </p>
    </div>
  );
}
