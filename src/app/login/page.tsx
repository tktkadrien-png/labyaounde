"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Shield,
  Loader2,
  Microscope,
  FileText,
  Calendar,
  Key,
  UserCog,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";

// Admin secret key
const ADMIN_SECRET_KEY = "LABYAOUNDE2025ADMIN";

// Translations
const translations = {
  fr: {
    welcomeBack: "Bienvenue",
    subtitle: "Connectez-vous à votre espace patient",
    emailLabel: "Adresse email",
    emailPlaceholder: "exemple@email.com",
    passwordLabel: "Mot de passe",
    passwordPlaceholder: "Entrez votre mot de passe",
    loginButton: "Se connecter",
    loggingIn: "Connexion...",
    forgotPassword: "Mot de passe oublié ?",
    noAccount: "Pas encore de compte ?",
    createAccount: "Créer un compte",
    rememberMe: "Rester connecté",
    secureConnection: "Connexion sécurisée SSL",
    backToHome: "Retour à l'accueil",
    errors: {
      emailRequired: "Veuillez entrer votre adresse email",
      emailInvalid: "Adresse email invalide",
      passwordRequired: "Veuillez entrer votre mot de passe",
      invalidCredentials: "Email ou mot de passe incorrect",
      emailNotConfirmed: "Veuillez confirmer votre email avant de vous connecter",
      networkError: "Problème de connexion. Vérifiez votre internet et réessayez.",
      tooManyAttempts: "Trop de tentatives. Veuillez patienter quelques minutes.",
      unknownError: "Une erreur est survenue. Veuillez réessayer.",
      invalidSecretKey: "Clé secrète invalide",
      adminFieldsRequired: "Veuillez remplir tous les champs administrateur",
    },
    success: {
      loginSuccess: "Connexion réussie ! Redirection...",
      adminLoginSuccess: "Connexion administrateur réussie !",
    },
    resetPassword: {
      title: "Réinitialiser le mot de passe",
      description: "Entrez votre email pour recevoir un lien de réinitialisation",
      sendButton: "Envoyer le lien",
      sending: "Envoi...",
      backToLogin: "Retour à la connexion",
      success: "Email envoyé ! Vérifiez votre boîte de réception.",
      error: "Impossible d'envoyer l'email. Vérifiez l'adresse.",
    },
    features: {
      title: "Votre santé, notre priorité",
      feature1: "Accédez à vos résultats d'analyses",
      feature2: "Suivez votre historique médical",
      feature3: "Prenez rendez-vous en ligne",
    },
    admin: {
      title: "Accès Administrateur",
      description: "Réservé au personnel autorisé",
      secretKeyLabel: "Clé secrète",
      secretKeyPlaceholder: "Entrez la clé secrète",
      emailLabel: "Email administrateur",
      passwordLabel: "Mot de passe",
      loginButton: "Connexion Admin",
      collapse: "Masquer",
      expand: "Accès Admin",
    },
  },
  en: {
    welcomeBack: "Welcome Back",
    subtitle: "Sign in to your patient portal",
    emailLabel: "Email address",
    emailPlaceholder: "example@email.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    loginButton: "Sign in",
    loggingIn: "Signing in...",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    createAccount: "Create account",
    rememberMe: "Remember me",
    secureConnection: "Secure SSL Connection",
    backToHome: "Back to home",
    errors: {
      emailRequired: "Please enter your email address",
      emailInvalid: "Invalid email address",
      passwordRequired: "Please enter your password",
      invalidCredentials: "Invalid email or password",
      emailNotConfirmed: "Please confirm your email before signing in",
      networkError: "Connection issue. Check your internet and try again.",
      tooManyAttempts: "Too many attempts. Please wait a few minutes.",
      unknownError: "An error occurred. Please try again.",
      invalidSecretKey: "Invalid secret key",
      adminFieldsRequired: "Please fill in all administrator fields",
    },
    success: {
      loginSuccess: "Login successful! Redirecting...",
      adminLoginSuccess: "Administrator login successful!",
    },
    resetPassword: {
      title: "Reset Password",
      description: "Enter your email to receive a reset link",
      sendButton: "Send link",
      sending: "Sending...",
      backToLogin: "Back to login",
      success: "Email sent! Check your inbox.",
      error: "Unable to send email. Check the address.",
    },
    features: {
      title: "Your health, our priority",
      feature1: "Access your test results",
      feature2: "Track your medical history",
      feature3: "Book appointments online",
    },
    admin: {
      title: "Administrator Access",
      description: "Reserved for authorized personnel",
      secretKeyLabel: "Secret Key",
      secretKeyPlaceholder: "Enter secret key",
      emailLabel: "Admin Email",
      passwordLabel: "Password",
      loginButton: "Admin Login",
      collapse: "Hide",
      expand: "Admin Access",
    },
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Admin form state
  const [showAdminSection, setShowAdminSection] = useState(false);
  const [adminSecretKey, setAdminSecretKey] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    setMounted(true);
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          router.push("/");
        }
      } catch {
        // Ignore errors - user is not logged in
      }
    };
    checkUser();
  }, [router]);

  // Email validation
  const isValidEmail = useCallback((email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  // Form validation
  const validateForm = useCallback(() => {
    if (!email.trim()) {
      setError(t.errors.emailRequired);
      return false;
    }
    if (!isValidEmail(email)) {
      setError(t.errors.emailInvalid);
      return false;
    }
    if (!password) {
      setError(t.errors.passwordRequired);
      return false;
    }
    return true;
  }, [email, password, isValidEmail, t.errors]);

  // Handle regular login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (authError) {
        console.error("🔴 Supabase Auth Error:", authError);
        const errorMsg = authError.message?.toLowerCase() || "";

        if (errorMsg.includes("email not confirmed")) {
          setError(t.errors.emailNotConfirmed);
        } else if (errorMsg.includes("invalid login credentials") || errorMsg.includes("invalid")) {
          setError(t.errors.invalidCredentials);
        } else if (errorMsg.includes("rate limit") || errorMsg.includes("too many")) {
          setError(t.errors.tooManyAttempts);
        } else {
          setError(t.errors.invalidCredentials);
        }
        return;
      }

      if (data?.user) {
        setSuccess(t.success.loginSuccess);

        if (rememberMe) {
          localStorage.setItem("laboyaounde_remember", "true");
        }

        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 800);
      }
    } catch (err: unknown) {
      console.error("🔴 Login Catch Error:", err);
      setError(t.errors.networkError);
    } finally {
      setLoading(false);
    }
  };

  // Handle admin login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate secret key
    if (adminSecretKey !== ADMIN_SECRET_KEY) {
      setError(t.errors.invalidSecretKey);
      return;
    }

    if (!adminEmail.trim() || !adminPassword) {
      setError(t.errors.adminFieldsRequired);
      return;
    }

    if (!isValidEmail(adminEmail)) {
      setError(t.errors.emailInvalid);
      return;
    }

    setAdminLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: adminEmail.trim().toLowerCase(),
        password: adminPassword,
      });

      if (authError) {
        console.error("🔴 Admin Auth Error:", authError);
        const errorMsg = authError.message?.toLowerCase() || "";

        if (errorMsg.includes("invalid login credentials") || errorMsg.includes("invalid")) {
          setError(t.errors.invalidCredentials);
        } else {
          setError(t.errors.invalidCredentials);
        }
        return;
      }

      if (data?.user) {
        setSuccess(t.success.adminLoginSuccess);

        setTimeout(() => {
          router.push("/admin-dashboard");
          router.refresh();
        }, 800);
      }
    } catch (err: unknown) {
      console.error("🔴 Admin Login Catch Error:", err);
      setError(t.errors.networkError);
    } finally {
      setAdminLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!resetEmail.trim()) {
      setError(t.errors.emailRequired);
      return;
    }

    if (!isValidEmail(resetEmail)) {
      setError(t.errors.emailInvalid);
      return;
    }

    setResetLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        resetEmail.trim().toLowerCase(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) throw error;

      setSuccess(t.resetPassword.success);
      setTimeout(() => {
        setShowResetForm(false);
        setResetEmail("");
        setSuccess("");
      }, 4000);
    } catch {
      setError(t.resetPassword.error);
    } finally {
      setResetLoading(false);
    }
  };

  const featureIcons = [Microscope, FileText, Calendar];

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#0A065D] via-[#0A065D] to-[#0080FF] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF6B00]/10 rounded-full translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                <Image
                  src="/laboyaounde.png"
                  alt="LabYaounde"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <span className="text-3xl font-bold text-white">LabYaounde</span>
            </Link>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-white leading-tight">
              {t.features.title}
            </h2>

            <div className="space-y-6">
              {[t.features.feature1, t.features.feature2, t.features.feature3].map((feature, i) => {
                const Icon = featureIcons[i];
                return (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                      <Icon className="w-7 h-7 text-[#FF6B00]" />
                    </div>
                    <span className="text-xl text-white/90">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Shield className="w-5 h-5" />
            <span>{t.secureConnection}</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-14 h-14 bg-[#0A065D] rounded-2xl flex items-center justify-center shadow-xl">
                <Image
                  src="/laboyaounde.png"
                  alt="LabYaounde"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-[#0A065D]">LabYaounde</span>
            </Link>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
            {showResetForm ? (
              // Password Reset Form
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Mail className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {t.resetPassword.title}
                  </h1>
                  <p className="text-gray-500 text-lg">
                    {t.resetPassword.description}
                  </p>
                </div>

                <form onSubmit={handlePasswordReset} className="space-y-6">
                  {/* Messages */}
                  {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-600 font-medium">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <p className="text-sm text-green-600 font-medium">{success}</p>
                    </div>
                  )}

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {t.emailLabel}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => {
                          setResetEmail(e.target.value);
                          setError("");
                        }}
                        placeholder={t.emailPlaceholder}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#0A065D] focus:outline-none transition-colors text-gray-900 placeholder-gray-400 text-lg"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full py-4 bg-gradient-to-r from-[#0A065D] to-[#0080FF] text-white rounded-2xl font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    {resetLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t.resetPassword.sending}
                      </>
                    ) : (
                      <>
                        {t.resetPassword.sendButton}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {/* Back to Login */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowResetForm(false);
                      setError("");
                      setSuccess("");
                    }}
                    className="w-full text-center text-[#0A065D] hover:text-[#0080FF] font-bold transition-colors text-lg"
                  >
                    {t.resetPassword.backToLogin}
                  </button>
                </form>
              </>
            ) : (
              // Login Form
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {t.welcomeBack}
                  </h1>
                  <p className="text-gray-500 text-lg">
                    {t.subtitle}
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Messages */}
                  {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl animate-shake">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-600 font-medium">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <p className="text-sm text-green-600 font-medium">{success}</p>
                    </div>
                  )}

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                      {t.emailLabel}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder={t.emailPlaceholder}
                        autoComplete="email"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#0A065D] focus:outline-none transition-colors text-gray-900 placeholder-gray-400 text-lg"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                      {t.passwordLabel}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError("");
                        }}
                        placeholder={t.passwordPlaceholder}
                        autoComplete="current-password"
                        className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#0A065D] focus:outline-none transition-colors text-gray-900 placeholder-gray-400 text-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-5 h-5 rounded-lg border-gray-300 text-[#0A065D] focus:ring-[#0A065D] cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors font-medium">
                        {t.rememberMe}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowResetForm(true);
                        setResetEmail(email);
                        setError("");
                      }}
                      className="text-sm font-bold text-[#FF6B00] hover:text-[#FF8C00] transition-colors"
                    >
                      {t.forgotPassword}
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-[#0A065D] to-[#0080FF] text-white rounded-2xl font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg group"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t.loggingIn}
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        {t.loginButton}
                        <ArrowRight className="w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      </>
                    )}
                  </button>
                </form>

                {/* Create Account Link */}
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <p className="text-gray-600 text-lg">
                    {t.noAccount}{" "}
                    <Link
                      href="/signup"
                      className="font-bold text-[#FF6B00] hover:text-[#FF8C00] transition-colors"
                    >
                      {t.createAccount}
                    </Link>
                  </p>
                </div>

                {/* Admin Section */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowAdminSection(!showAdminSection)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 font-medium"
                  >
                    <UserCog className="w-5 h-5" />
                    {showAdminSection ? t.admin.collapse : t.admin.expand}
                    {showAdminSection ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showAdminSection && (
                    <div className="mt-4 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{t.admin.title}</h3>
                          <p className="text-gray-400 text-sm">{t.admin.description}</p>
                        </div>
                      </div>

                      <form onSubmit={handleAdminLogin} className="space-y-4">
                        {/* Secret Key */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t.admin.secretKeyLabel}
                          </label>
                          <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                              type="password"
                              value={adminSecretKey}
                              onChange={(e) => setAdminSecretKey(e.target.value)}
                              placeholder={t.admin.secretKeyPlaceholder}
                              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-[#FF6B00] focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Admin Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t.admin.emailLabel}
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                              type="email"
                              value={adminEmail}
                              onChange={(e) => setAdminEmail(e.target.value)}
                              placeholder={t.emailPlaceholder}
                              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-[#FF6B00] focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Admin Password */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t.admin.passwordLabel}
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                              type={showAdminPassword ? "text" : "password"}
                              value={adminPassword}
                              onChange={(e) => setAdminPassword(e.target.value)}
                              placeholder={t.passwordPlaceholder}
                              className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-[#FF6B00] focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setShowAdminPassword(!showAdminPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                            >
                              {showAdminPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        {/* Admin Login Button */}
                        <button
                          type="submit"
                          disabled={adminLoading}
                          className="w-full py-3 bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                          {adminLoading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              {t.loggingIn}
                            </>
                          ) : (
                            <>
                              <Shield className="w-5 h-5" />
                              {t.admin.loginButton}
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Bottom Links */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <Link href="/" className="hover:text-[#0A065D] transition-colors font-medium">
              {t.backToHome}
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
