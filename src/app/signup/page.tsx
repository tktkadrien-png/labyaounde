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
  User,
  UserPlus,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Shield,
  Loader2,
  Phone,
  Check,
  X,
  Sparkles,
  Heart,
  Clock,
  Bell,
  Headphones,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";

// Translations
const translations = {
  fr: {
    title: "Créer un compte",
    subtitle: "Rejoignez LabYaounde pour accéder à vos résultats",
    fullNameLabel: "Nom complet",
    fullNamePlaceholder: "Jean Dupont",
    phoneLabel: "Numéro de téléphone (optionnel)",
    phonePlaceholder: "+237 6XX XXX XXX",
    emailLabel: "Adresse email",
    emailPlaceholder: "exemple@email.com",
    passwordLabel: "Mot de passe",
    passwordPlaceholder: "Minimum 8 caractères",
    confirmPasswordLabel: "Confirmer le mot de passe",
    confirmPasswordPlaceholder: "Répétez le mot de passe",
    signupButton: "Créer mon compte",
    signingUp: "Création en cours...",
    hasAccount: "Déjà un compte ?",
    loginLink: "Se connecter",
    acceptTerms: "J'accepte les",
    termsLink: "conditions d'utilisation",
    andText: "et la",
    privacyLink: "politique de confidentialité",
    secureData: "Vos données sont protégées et sécurisées",
    backToHome: "Retour à l'accueil",
    passwordStrength: {
      title: "Force du mot de passe",
      weak: "Faible",
      medium: "Moyen",
      strong: "Fort",
      veryStrong: "Très fort",
      requirements: {
        length: "8 caractères minimum",
        uppercase: "Une majuscule",
        lowercase: "Une minuscule",
        number: "Un chiffre",
        special: "Un caractère spécial",
      },
    },
    errors: {
      fullNameRequired: "Veuillez entrer votre nom complet",
      fullNameTooShort: "Le nom doit contenir au moins 2 caractères",
      emailRequired: "Veuillez entrer votre adresse email",
      emailInvalid: "Adresse email invalide",
      passwordRequired: "Veuillez entrer un mot de passe",
      passwordTooShort: "Le mot de passe doit contenir au moins 8 caractères",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      termsRequired: "Veuillez accepter les conditions d'utilisation",
      emailInUse: "Cette adresse email est déjà utilisée",
      networkError: "Problème de connexion. Vérifiez votre internet et réessayez.",
      tooManyAttempts: "Trop de tentatives. Veuillez patienter quelques minutes.",
      unknownError: "Une erreur est survenue. Veuillez réessayer.",
    },
    success: {
      accountCreated: "Compte créé avec succès !",
      checkEmail: "Vérifiez votre email pour confirmer votre inscription.",
    },
    benefits: {
      title: "Pourquoi créer un compte ?",
      items: [
        { icon: "clock", text: "Résultats disponibles 24h/24" },
        { icon: "heart", text: "Historique médical complet" },
        { icon: "bell", text: "Notifications instantanées" },
        { icon: "headphones", text: "Support client dédié" },
      ],
    },
  },
  en: {
    title: "Create an account",
    subtitle: "Join LabYaounde to access your results",
    fullNameLabel: "Full name",
    fullNamePlaceholder: "John Doe",
    phoneLabel: "Phone number (optional)",
    phonePlaceholder: "+237 6XX XXX XXX",
    emailLabel: "Email address",
    emailPlaceholder: "example@email.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Minimum 8 characters",
    confirmPasswordLabel: "Confirm password",
    confirmPasswordPlaceholder: "Repeat password",
    signupButton: "Create my account",
    signingUp: "Creating...",
    hasAccount: "Already have an account?",
    loginLink: "Sign in",
    acceptTerms: "I accept the",
    termsLink: "terms of use",
    andText: "and the",
    privacyLink: "privacy policy",
    secureData: "Your data is protected and secured",
    backToHome: "Back to home",
    passwordStrength: {
      title: "Password strength",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",
      veryStrong: "Very strong",
      requirements: {
        length: "8 characters minimum",
        uppercase: "One uppercase",
        lowercase: "One lowercase",
        number: "One number",
        special: "One special character",
      },
    },
    errors: {
      fullNameRequired: "Please enter your full name",
      fullNameTooShort: "Name must be at least 2 characters",
      emailRequired: "Please enter your email address",
      emailInvalid: "Invalid email address",
      passwordRequired: "Please enter a password",
      passwordTooShort: "Password must be at least 8 characters",
      passwordMismatch: "Passwords do not match",
      termsRequired: "Please accept the terms of use",
      emailInUse: "This email address is already in use",
      networkError: "Connection issue. Check your internet and try again.",
      tooManyAttempts: "Too many attempts. Please wait a few minutes.",
      unknownError: "An error occurred. Please try again.",
    },
    success: {
      accountCreated: "Account created successfully!",
      checkEmail: "Check your email to confirm your registration.",
    },
    benefits: {
      title: "Why create an account?",
      items: [
        { icon: "clock", text: "24/7 result access" },
        { icon: "heart", text: "Complete medical history" },
        { icon: "bell", text: "Instant notifications" },
        { icon: "headphones", text: "Dedicated customer support" },
      ],
    },
  },
};

const benefitIcons = {
  clock: Clock,
  heart: Heart,
  bell: Bell,
  headphones: Headphones,
};

export default function SignupPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  // Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

  // Password strength calculation
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length;
  const getStrengthInfo = () => {
    if (passwordStrength <= 2) return { label: t.passwordStrength.weak, color: "bg-red-500", textColor: "text-red-500", width: "25%" };
    if (passwordStrength === 3) return { label: t.passwordStrength.medium, color: "bg-[#FF8C00]", textColor: "text-[#FF8C00]", width: "50%" };
    if (passwordStrength === 4) return { label: t.passwordStrength.strong, color: "bg-green-500", textColor: "text-green-500", width: "75%" };
    return { label: t.passwordStrength.veryStrong, color: "bg-green-600", textColor: "text-green-600", width: "100%" };
  };

  // Form validation
  const validateForm = useCallback(() => {
    if (!fullName.trim()) {
      setError(t.errors.fullNameRequired);
      return false;
    }
    if (fullName.trim().length < 2) {
      setError(t.errors.fullNameTooShort);
      return false;
    }
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
    if (password.length < 8) {
      setError(t.errors.passwordTooShort);
      return false;
    }
    if (password !== confirmPassword) {
      setError(t.errors.passwordMismatch);
      return false;
    }
    if (!acceptTerms) {
      setError(t.errors.termsRequired);
      return false;
    }
    return true;
  }, [fullName, email, password, confirmPassword, acceptTerms, isValidEmail, t.errors]);

  // Handle signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim() || null,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (authError) {
        console.error("🔴 Supabase Signup Error:", authError);
        const errorMsg = authError.message?.toLowerCase() || "";

        if (errorMsg.includes("already registered") || errorMsg.includes("user already")) {
          setError(t.errors.emailInUse);
        } else if (errorMsg.includes("rate limit") || errorMsg.includes("too many")) {
          setError(t.errors.tooManyAttempts);
        } else if (errorMsg.includes("password")) {
          setError(t.errors.passwordTooShort);
        } else {
          setError(t.errors.unknownError);
        }
        return;
      }

      if (data?.user) {
        if (!data.session) {
          setSuccess(`${t.success.accountCreated} ${t.success.checkEmail}`);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          setSuccess(t.success.accountCreated);
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 800);
        }
      }
    } catch (err: unknown) {
      console.error("🔴 Signup Catch Error:", err);
      setError(t.errors.networkError);
    } finally {
      setLoading(false);
    }
  };

  const strengthInfo = getStrengthInfo();

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
        <div className="w-full max-w-lg py-8">
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
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] rounded-2xl mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {t.title}
              </h1>
              <p className="text-gray-500 text-lg">
                {t.subtitle}
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
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

              {/* Full Name Input */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-2">
                  {t.fullNameLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setError("");
                    }}
                    placeholder={t.fullNamePlaceholder}
                    autoComplete="name"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#0A065D] focus:outline-none transition-colors text-gray-900 placeholder-gray-400 text-lg"
                  />
                </div>
              </div>

              {/* Phone Input (Optional) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                  {t.phoneLabel}
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    autoComplete="tel"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#0A065D] focus:outline-none transition-colors text-gray-900 placeholder-gray-400 text-lg"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  {t.emailLabel} <span className="text-red-500">*</span>
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
                  {t.passwordLabel} <span className="text-red-500">*</span>
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
                    autoComplete="new-password"
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

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">{t.passwordStrength.title}</span>
                      <span className={`text-sm font-bold ${strengthInfo.textColor}`}>
                        {strengthInfo.label}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strengthInfo.color} transition-all duration-500 ease-out`}
                        style={{ width: strengthInfo.width }}
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {Object.entries(passwordChecks).map(([key, isValid]) => (
                        <div key={key} className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isValid ? 'bg-green-100' : 'bg-gray-100'}`}>
                            {isValid ? (
                              <Check className="w-3 h-3 text-green-600" />
                            ) : (
                              <X className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                          <span className={`text-xs ${isValid ? "text-green-600 font-medium" : "text-gray-400"}`}>
                            {t.passwordStrength.requirements[key as keyof typeof t.passwordStrength.requirements]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                  {t.confirmPasswordLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    placeholder={t.confirmPasswordPlaceholder}
                    autoComplete="new-password"
                    className={`w-full pl-12 pr-14 py-4 border-2 rounded-2xl focus:outline-none transition-colors text-gray-900 placeholder-gray-400 text-lg ${
                      confirmPassword && password !== confirmPassword
                        ? "border-red-300 focus:border-red-500"
                        : confirmPassword && password === confirmPassword
                        ? "border-green-300 focus:border-green-500"
                        : "border-gray-200 focus:border-[#0A065D]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {confirmPassword && password === confirmPassword && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    setError("");
                  }}
                  className="w-5 h-5 mt-0.5 rounded-lg border-gray-300 text-[#0A065D] focus:ring-[#0A065D] cursor-pointer"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                  {t.acceptTerms}{" "}
                  <Link href="/conditions" className="text-[#0A065D] hover:text-[#0080FF] font-bold">
                    {t.termsLink}
                  </Link>{" "}
                  {t.andText}{" "}
                  <Link href="/confidentialite" className="text-[#0A065D] hover:text-[#0080FF] font-bold">
                    {t.privacyLink}
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || passwordStrength < 3}
                className="w-full py-4 bg-gradient-to-r from-[#0A065D] to-[#0080FF] text-white rounded-2xl font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.signingUp}
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    {t.signupButton}
                    <ArrowRight className="w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-600 text-lg">
                {t.hasAccount}{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#FF6B00] hover:text-[#FF8C00] transition-colors"
                >
                  {t.loginLink}
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <Link href="/" className="hover:text-[#0A065D] transition-colors font-medium">
              {t.backToHome}
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#0A065D] via-[#0A065D] to-[#0080FF] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF6B00]/10 rounded-full -translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-white/5 rounded-full" />
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

          {/* Main Content */}
          <div className="space-y-10">
            <div>
              <h2 className="text-5xl font-bold text-white leading-tight mb-6">
                {t.benefits.title}
              </h2>
            </div>

            {/* Benefits */}
            <div className="space-y-5">
              {t.benefits.items.map((benefit, i) => {
                const Icon = benefitIcons[benefit.icon as keyof typeof benefitIcons];
                return (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                      <Icon className="w-7 h-7 text-[#FF6B00]" />
                    </div>
                    <span className="text-xl text-white/90 font-medium">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Shield className="w-5 h-5" />
            <span>{t.secureData}</span>
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
