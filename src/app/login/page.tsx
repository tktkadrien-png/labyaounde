"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";

const translations = {
  fr: {
    title: "Espace Patient",
    subtitle: "Accédez à vos résultats d'analyses",
    emailLabel: "Adresse email",
    emailPlaceholder: "exemple@email.com",
    passwordLabel: "Mot de passe",
    passwordPlaceholder: "••••••••",
    rememberMe: "Rester connecté",
    forgotPassword: "Mot de passe oublié ?",
    loginButton: "Se connecter",
    loggingIn: "Connexion...",
    noAccount: "Pas encore de compte ?",
    createAccount: "Créer un compte",
    backToHome: "Retour à l'accueil",
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
      back: "Retour à la connexion",
      success: "Email envoyé ! Vérifiez votre boîte de réception.",
      error: "Impossible d'envoyer l'email. Vérifiez l'adresse.",
    },
  },
  en: {
    title: "Patient Portal",
    subtitle: "Access your test results",
    emailLabel: "Email address",
    emailPlaceholder: "example@email.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    loginButton: "Sign in",
    loggingIn: "Signing in...",
    noAccount: "Don't have an account?",
    createAccount: "Create account",
    backToHome: "Back to home",
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
      sendButton: "Send link",
      sending: "Sending...",
      back: "Back to login",
      success: "Email sent! Check your inbox.",
      error: "Unable to send email. Check the address.",
    },
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
      if (user) router.push("/");
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
        if (rememberMe) localStorage.setItem("laboyaounde_remember", "true");
        setTimeout(() => { router.push("/"); router.refresh(); }, 800);
      }
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex flex-col items-center justify-center px-4 py-12">
      {/* Back to home */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-[#1034A6]/60 hover:text-[#1034A6] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.backToHome}
      </Link>

      {/* Logo */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-block">
          <div className="text-2xl font-bold text-[#1034A6] tracking-tight">Lab<span className="text-[#84BDE3]">Yaounde</span></div>
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        {!showReset ? (
          <>
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t.passwordLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => { setShowReset(true); setError(""); setSuccess(""); }}
                    className="text-xs text-[#1034A6]/60 hover:text-[#1034A6] transition-colors"
                  >
                    {t.forgotPassword}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder={t.passwordPlaceholder}
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

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#1034A6] focus:ring-[#1034A6]"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">{t.rememberMe}</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1034A6] hover:bg-[#0A2480] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />{t.loggingIn}</>
                ) : t.loginButton}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              {t.noAccount}{" "}
              <Link href="/mes-resultats" className="text-[#1034A6] font-semibold hover:underline">
                {t.createAccount}
              </Link>
            </p>
          </>
        ) : (
          /* Reset Password Form */
          <>
            <button
              onClick={() => { setShowReset(false); setError(""); setSuccess(""); }}
              className="flex items-center gap-1.5 text-sm text-[#1034A6]/60 hover:text-[#1034A6] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.reset.back}
            </button>

            <div className="mb-7">
              <h1 className="text-xl font-bold text-[#1034A6]">{t.reset.title}</h1>
              <p className="text-sm text-gray-400 mt-1">{t.reset.subtitle}</p>
            </div>

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

            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => { setResetEmail(e.target.value); setError(""); }}
                    placeholder={t.emailPlaceholder}
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-[#1034A6] focus:ring-1 focus:ring-[#1034A6] outline-none transition-colors text-[#1034A6] placeholder-gray-300"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={resetLoading}
                className="w-full py-3 bg-[#1034A6] hover:bg-[#0A2480] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {resetLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />{t.reset.sending}</>
                ) : t.reset.sendButton}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Footer note */}
      <p className="mt-6 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} Lab Yaounde — Connexion sécurisée SSL
      </p>
    </div>
  );
}
