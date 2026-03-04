"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Mail, Lock, Eye, EyeOff, User, Key, AlertCircle, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function AdminRegisterPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const t = {
    fr: {
      title: "Compte Administrateur",
      subtitle: "Inscription réservée aux administrateurs autorisés",
      keyLabel: "Clé secrète admin",
      keyPlaceholder: "Entrez la clé secrète",
      keyNote: "Seuls les propriétaires autorisés de Lab Yaounde disposent de cette clé",
      nameLabel: "Nom complet",
      namePlaceholder: "Nom de l'administrateur",
      emailLabel: "Email",
      emailPlaceholder: "admin@labyaounde.com",
      passwordLabel: "Mot de passe",
      confirmPasswordLabel: "Confirmer le mot de passe",
      registerButton: "Créer le compte",
      loading: "Création...",
      mismatch: "Les mots de passe ne correspondent pas",
      tooShort: "Le mot de passe doit contenir au moins 6 caractères",
      keyRequired: "La clé secrète est requise",
      hasAccount: "Déjà un compte ?",
      loginLink: "Se connecter",
      success: "Compte créé avec succès ! Redirection...",
      networkError: "Erreur de connexion. Vérifiez votre connexion internet.",
      unknownError: "Une erreur est survenue. Veuillez réessayer.",
    },
    en: {
      title: "Admin Account",
      subtitle: "Registration reserved for authorized administrators",
      keyLabel: "Admin secret key",
      keyPlaceholder: "Enter secret key",
      keyNote: "Only authorized Lab Yaounde owners have this key",
      nameLabel: "Full name",
      namePlaceholder: "Administrator name",
      emailLabel: "Email",
      emailPlaceholder: "admin@labyaounde.com",
      passwordLabel: "Password",
      confirmPasswordLabel: "Confirm password",
      registerButton: "Create account",
      loading: "Creating...",
      mismatch: "Passwords do not match",
      tooShort: "Password must be at least 6 characters",
      keyRequired: "Secret key is required",
      hasAccount: "Already have an account?",
      loginLink: "Sign in",
      success: "Account created successfully! Redirecting...",
      networkError: "Connection error. Check your internet connection.",
      unknownError: "An error occurred. Please try again.",
    },
  }[language];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!secretCode.trim()) return setError(t.keyRequired);
    if (password.length < 6) return setError(t.tooShort);
    if (password !== confirmPassword) return setError(t.mismatch);
    setLoading(true);
    try {
      const response = await fetch('/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          full_name: fullName.trim(),
          admin_secret_key: secretCode.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(language === "fr" ? data.error : (data.error_en || data.error));
        return;
      }
      setSuccess(t.success);
      setTimeout(() => router.push("/admin-login"), 2000);
    } catch (err: any) {
      if (err.message?.includes('fetch') || err.message?.includes('network')) {
        setError(t.networkError);
      } else {
        setError(t.unknownError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex flex-col items-center justify-center px-4 py-12">
      {/* Back link */}
      <Link
        href="/admin-login"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-[#1034A6]/60 hover:text-[#1034A6] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.hasAccount} {t.loginLink}
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

        {/* Messages */}
        {error && (
          <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-100 rounded-xl mb-5">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {success && (
          <div className="flex items-start gap-2.5 p-3 bg-green-50 border border-green-100 rounded-xl mb-5">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-600">{success}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Secret key — first for security */}
          <div className="p-4 bg-[#1034A6]/5 border border-[#1034A6]/10 rounded-xl">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              {t.keyLabel}
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1034A6]/40" />
              <input
                type="password"
                required
                value={secretCode}
                onChange={(e) => { setSecretCode(e.target.value); setError(""); }}
                placeholder={t.keyPlaceholder}
                className="w-full pl-10 pr-4 py-3 text-sm border border-[#1034A6]/20 rounded-xl focus:border-[#1034A6] focus:ring-1 focus:ring-[#1034A6] outline-none transition-colors bg-white text-[#1034A6] placeholder-gray-300"
              />
            </div>
            <p className="text-xs text-[#1034A6]/50 mt-1.5">{t.keyNote}</p>
          </div>

          {/* Full name */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t.nameLabel}</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-[#1034A6] focus:ring-1 focus:ring-[#1034A6] outline-none transition-colors text-[#1034A6] placeholder-gray-300"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t.emailLabel}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-[#1034A6] focus:ring-1 focus:ring-[#1034A6] outline-none transition-colors text-[#1034A6] placeholder-gray-300"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t.passwordLabel}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:border-[#1034A6] focus:ring-1 focus:ring-[#1034A6] outline-none transition-colors text-[#1034A6] placeholder-gray-300"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t.confirmPasswordLabel}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:border-[#1034A6] focus:ring-1 focus:ring-[#1034A6] outline-none transition-colors text-[#1034A6] placeholder-gray-300"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
            ) : t.registerButton}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          {t.hasAccount}{" "}
          <Link href="/admin-login" className="text-[#1034A6] font-semibold hover:underline">
            {t.loginLink}
          </Link>
        </p>
      </div>

      <p className="mt-6 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} Lab Yaounde — Zone administrateur sécurisée
      </p>
    </div>
  );
}
