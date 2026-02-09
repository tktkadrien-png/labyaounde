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
  X
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
    phoneLabel: "Numéro de téléphone",
    phonePlaceholder: "+237 6XX XXX XXX",
    emailLabel: "Adresse email",
    emailPlaceholder: "exemple@email.com",
    passwordLabel: "Mot de passe",
    passwordPlaceholder: "Minimum 8 caractères",
    confirmPasswordLabel: "Confirmer le mot de passe",
    confirmPasswordPlaceholder: "Répétez le mot de passe",
    signupButton: "Créer mon compte",
    signingUp: "Création...",
    hasAccount: "Déjà un compte ?",
    loginLink: "Se connecter",
    acceptTerms: "J'accepte les",
    termsLink: "conditions d'utilisation",
    andText: "et la",
    privacyLink: "politique de confidentialité",
    secureData: "Vos données sont protégées",
    backToHome: "Retour à l'accueil",
    passwordStrength: {
      title: "Sécurité du mot de passe",
      weak: "Faible",
      medium: "Moyen",
      strong: "Fort",
      requirements: {
        length: "Au moins 8 caractères",
        uppercase: "Une lettre majuscule",
        lowercase: "Une lettre minuscule",
        number: "Un chiffre",
        special: "Un caractère spécial (!@#$%)",
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
  },
  en: {
    title: "Create an account",
    subtitle: "Join LabYaounde to access your results",
    fullNameLabel: "Full name",
    fullNamePlaceholder: "John Doe",
    phoneLabel: "Phone number",
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
    secureData: "Your data is protected",
    backToHome: "Back to home",
    passwordStrength: {
      title: "Password strength",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",
      requirements: {
        length: "At least 8 characters",
        uppercase: "One uppercase letter",
        lowercase: "One lowercase letter",
        number: "One number",
        special: "One special character (!@#$%)",
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
  },
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
  const getStrengthLabel = () => {
    if (passwordStrength <= 2) return { label: t.passwordStrength.weak, color: "bg-red-500", width: "w-1/3" };
    if (passwordStrength <= 3) return { label: t.passwordStrength.medium, color: "bg-yellow-500", width: "w-2/3" };
    return { label: t.passwordStrength.strong, color: "bg-green-500", width: "w-full" };
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
        const errorMsg = authError.message?.toLowerCase() || "";

        if (errorMsg.includes("already registered") || errorMsg.includes("user already")) {
          setError(t.errors.emailInUse);
        } else if (errorMsg.includes("rate limit") || errorMsg.includes("too many")) {
          setError(t.errors.tooManyAttempts);
        } else if (
          errorMsg.includes("network") ||
          errorMsg.includes("fetch") ||
          errorMsg.includes("timeout") ||
          errorMsg.includes("abort")
        ) {
          setError(t.errors.networkError);
        } else if (errorMsg.includes("password")) {
          setError(t.errors.passwordTooShort);
        } else {
          setError(t.errors.unknownError);
        }
        return;
      }

      if (data?.user) {
        // Check if email confirmation is required
        if (!data.session) {
          setSuccess(`${t.success.accountCreated} ${t.success.checkEmail}`);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          // User is logged in immediately (email confirmation disabled)
          setSuccess(t.success.accountCreated);
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 800);
        }
      }
    } catch (err: unknown) {
      const errMsg = (err as Error)?.message?.toLowerCase() || "";
      if (errMsg.includes("network") || errMsg.includes("fetch")) {
        setError(t.errors.networkError);
      } else {
        setError(t.errors.unknownError);
      }
    } finally {
      setLoading(false);
    }
  };

  const strengthInfo = getStrengthLabel();

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 bg-[#0A065D] rounded-xl flex items-center justify-center shadow-lg">
                <Image
                  src="/laboyaounde.png"
                  alt="LabYaounde"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-[#0A065D]">LabYaounde</span>
            </Link>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {t.title}
              </h1>
              <p className="text-gray-500">
                {t.subtitle}
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              {/* Messages */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl animate-shake">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <p className="text-sm text-green-600">{success}</p>
                </div>
              )}

              {/* Full Name Input */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
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
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#0A065D] focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Phone Input (Optional) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
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
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#0A065D] focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
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
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#0A065D] focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
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
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#0A065D] focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{t.passwordStrength.title}</span>
                      <span className={`font-medium ${
                        passwordStrength <= 2 ? 'text-red-500' : passwordStrength <= 3 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {strengthInfo.label}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${strengthInfo.color} ${strengthInfo.width} transition-all duration-300`} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1.5">
                        {passwordChecks.length ? <Check className="w-3.5 h-3.5 text-green-500" /> : <X className="w-3.5 h-3.5 text-gray-300" />}
                        <span className={passwordChecks.length ? "text-green-600" : "text-gray-400"}>{t.passwordStrength.requirements.length}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {passwordChecks.uppercase ? <Check className="w-3.5 h-3.5 text-green-500" /> : <X className="w-3.5 h-3.5 text-gray-300" />}
                        <span className={passwordChecks.uppercase ? "text-green-600" : "text-gray-400"}>{t.passwordStrength.requirements.uppercase}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {passwordChecks.number ? <Check className="w-3.5 h-3.5 text-green-500" /> : <X className="w-3.5 h-3.5 text-gray-300" />}
                        <span className={passwordChecks.number ? "text-green-600" : "text-gray-400"}>{t.passwordStrength.requirements.number}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {passwordChecks.special ? <Check className="w-3.5 h-3.5 text-green-500" /> : <X className="w-3.5 h-3.5 text-gray-300" />}
                        <span className={passwordChecks.special ? "text-green-600" : "text-gray-400"}>{t.passwordStrength.requirements.special}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
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
                    className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 placeholder-gray-400 ${
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {confirmPassword && password === confirmPassword && (
                    <Check className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    setError("");
                  }}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#0A065D] focus:ring-[#0A065D] cursor-pointer"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-600 cursor-pointer">
                  {t.acceptTerms}{" "}
                  <Link href="/conditions" className="text-[#0A065D] hover:text-[#0080FF] font-medium">
                    {t.termsLink}
                  </Link>{" "}
                  {t.andText}{" "}
                  <Link href="/confidentialite" className="text-[#0A065D] hover:text-[#0080FF] font-medium">
                    {t.privacyLink}
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || passwordStrength < 3}
                className="w-full py-3.5 bg-[#0A065D] text-white rounded-xl font-semibold hover:bg-[#0A065D]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
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
              <p className="text-gray-600">
                {t.hasAccount}{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#FF6B00] hover:text-[#FF8C00] transition-colors"
                >
                  {t.loginLink}
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <Link href="/" className="hover:text-[#0A065D] transition-colors">
              {t.backToHome}
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#0A065D] via-[#0A065D] to-[#0080FF] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF6B00]/10 rounded-full -translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-white/5 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Image
                  src="/laboyaounde.png"
                  alt="LabYaounde"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-white">LabYaounde</span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                {language === 'fr' ? 'Bienvenue chez LabYaounde' : 'Welcome to LabYaounde'}
              </h2>
              <p className="text-lg text-white/80">
                {language === 'fr'
                  ? 'Créez votre compte pour accéder à tous nos services en ligne : résultats d\'analyses, prise de rendez-vous, et bien plus encore.'
                  : 'Create your account to access all our online services: test results, appointments, and much more.'
                }
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                language === 'fr' ? 'Résultats disponibles 24h/24' : '24/7 result access',
                language === 'fr' ? 'Historique médical complet' : 'Complete medical history',
                language === 'fr' ? 'Notifications par email' : 'Email notifications',
                language === 'fr' ? 'Support client dédié' : 'Dedicated customer support',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF6B00] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Shield className="w-4 h-4" />
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
