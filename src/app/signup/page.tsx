"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, UserPlus, CheckCircle, AlertCircle, Check, X } from "lucide-react";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function SignupPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Field focus states
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push("/");
      }
    };
    checkUser();
  }, [router]);

  const content = {
    fr: {
      title: "Créer un compte",
      subtitle: "Rejoignez notre communauté de patients",
      nameLabel: "Nom complet",
      namePlaceholder: "Jean Dupont",
      emailLabel: "Adresse email",
      emailPlaceholder: "jean.dupont@example.com",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "Minimum 6 caractères",
      confirmPasswordLabel: "Confirmer le mot de passe",
      confirmPasswordPlaceholder: "Répétez votre mot de passe",
      signupButton: "Créer mon compte",
      hasAccount: "Vous avez déjà un compte?",
      loginLink: "Se connecter",
      loading: "Création en cours...",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
      invalidEmail: "Veuillez entrer une adresse email valide",
      nameRequired: "Veuillez entrer votre nom complet",
      termsRequired: "Veuillez accepter les conditions d'utilisation",
      acceptTerms: "J'accepte les conditions d'utilisation et la politique de confidentialité",
      accountCreated: "Compte créé avec succès! Vérifiez votre email pour confirmer.",
      networkError: "Erreur de connexion. Vérifiez votre connexion internet.",
      emailInUse: "Cette adresse email est déjà utilisée",
      passwordStrength: {
        title: "Sécurité du mot de passe",
        length: "Au moins 6 caractères",
        uppercase: "Une lettre majuscule",
        number: "Un chiffre",
      },
    },
    en: {
      title: "Create an account",
      subtitle: "Join our patient community",
      nameLabel: "Full name",
      namePlaceholder: "John Doe",
      emailLabel: "Email address",
      emailPlaceholder: "john.doe@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Minimum 6 characters",
      confirmPasswordLabel: "Confirm password",
      confirmPasswordPlaceholder: "Repeat your password",
      signupButton: "Create account",
      hasAccount: "Already have an account?",
      loginLink: "Sign in",
      loading: "Creating account...",
      passwordMismatch: "Passwords do not match",
      passwordTooShort: "Password must be at least 6 characters",
      invalidEmail: "Please enter a valid email address",
      nameRequired: "Please enter your full name",
      termsRequired: "Please accept the terms and conditions",
      acceptTerms: "I accept the terms of use and privacy policy",
      accountCreated: "Account created successfully! Check your email to confirm.",
      networkError: "Connection error. Check your internet connection.",
      emailInUse: "This email address is already in use",
      passwordStrength: {
        title: "Password strength",
        length: "At least 6 characters",
        uppercase: "One uppercase letter",
        number: "One number",
      },
    },
  };

  const currentContent = content[language];

  // Validation helpers
  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const passwordChecks = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const isPasswordStrong = passwordChecks.length;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!fullName.trim()) {
      setError(currentContent.nameRequired);
      return;
    }

    if (!isEmailValid(email)) {
      setError(currentContent.invalidEmail);
      return;
    }

    if (password.length < 6) {
      setError(currentContent.passwordTooShort);
      return;
    }

    if (password !== confirmPassword) {
      setError(currentContent.passwordMismatch);
      return;
    }

    if (!acceptTerms) {
      setError(currentContent.termsRequired);
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (authError) {
        // Handle errors with friendly messages
        const errorMsg = authError.message?.toLowerCase() || "";
        if (errorMsg.includes("already registered") || errorMsg.includes("user already registered")) {
          setError(currentContent.emailInUse);
        } else if (errorMsg.includes("password") && errorMsg.includes("short")) {
          setError(currentContent.passwordTooShort);
        } else if (
          errorMsg.includes("network") ||
          errorMsg.includes("fetch") ||
          errorMsg.includes("timeout") ||
          errorMsg.includes("abort") ||
          errorMsg.includes("connexion") ||
          (authError as any).status === 0
        ) {
          setError(language === 'fr'
            ? "Problème de connexion. Veuillez vérifier votre internet et réessayer."
            : "Connection issue. Please check your internet and try again.");
        } else if (errorMsg.includes("rate limit") || errorMsg.includes("too many")) {
          setError(language === 'fr'
            ? "Trop de tentatives. Veuillez patienter quelques minutes."
            : "Too many attempts. Please wait a few minutes.");
        } else if (errorMsg.includes("email") && errorMsg.includes("invalid")) {
          setError(currentContent.invalidEmail);
        } else {
          // Generic message for unknown errors
          setError(language === 'fr'
            ? "Impossible de créer le compte. Vérifiez vos informations."
            : "Unable to create account. Please check your information.");
        }
        setLoading(false);
        return;
      }

      // Check if email confirmation is required
      if (data?.user && !data?.session) {
        setSuccess(currentContent.accountCreated);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
        return;
      }

      // If we have a session, they're logged in immediately
      if (data?.session) {
        setSuccess(language === 'fr' ? "Compte cree avec succes!" : "Account created successfully!");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 500);
      } else if (data?.user) {
        // User created but needs email confirmation
        setSuccess(currentContent.accountCreated);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (err: any) {
      // Handle network/timeout errors
      const errMsg = err?.message?.toLowerCase() || "";
      const errName = err?.name?.toLowerCase() || "";
      if (
        errMsg.includes("network") ||
        errMsg.includes("fetch") ||
        errMsg.includes("timeout") ||
        errName.includes("abort") ||
        errMsg.includes("connexion")
      ) {
        setError(language === 'fr'
          ? "Problème de connexion. Veuillez vérifier votre internet et réessayer."
          : "Connection issue. Please check your internet and try again.");
      } else {
        setError(language === 'fr'
          ? "Impossible de créer le compte. Vérifiez vos informations."
          : "Unable to create account. Please check your information.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />
      <main className="min-h-screen bg-gradient-to-br from-[#0A065D] via-[#0080FF] to-[#0909FF] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00CED1]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0A065D]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          {/* Modern Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-10 space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FE5000] to-[#CC4000] rounded-2xl mb-4 shadow-xl transform transition-transform hover:scale-110 hover:rotate-6 duration-300">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#0A065D] to-[#0080FF] bg-clip-text text-transparent mb-2">
                {currentContent.title}
              </h2>
              <p className="text-base text-gray-600">
                {currentContent.subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-5">
              {error && (
                <div className="bg-[#FE5000]/10 border-l-4 border-[#FE5000] p-4 rounded-lg flex items-center gap-3 animate-slideDown">
                  <AlertCircle className="w-5 h-5 text-[#FE5000] flex-shrink-0" />
                  <p className="text-sm text-[#FE5000]">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-[#0A065D]/10 border-l-4 border-[#0A065D] p-4 rounded-lg flex items-center gap-3 animate-slideDown">
                  <CheckCircle className="w-5 h-5 text-[#FE5000] flex-shrink-0" />
                  <p className="text-sm text-[#0A065D]">{success}</p>
                </div>
              )}

              {/* Full Name */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <User className={`h-5 w-5 transition-colors duration-200 ${nameFocused || fullName ? 'text-[#0A065D]' : 'text-gray-400'}`} />
                </div>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setError("");
                  }}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  placeholder=" "
                  className="peer block w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-[#0A065D] transition-all duration-300 placeholder-transparent bg-white"
                />
                <label
                  htmlFor="fullName"
                  className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                    nameFocused || fullName
                      ? '-top-2.5 left-3 text-xs bg-white px-2 text-[#0A065D] font-semibold'
                      : 'top-4 text-base text-gray-500'
                  }`}
                >
                  {currentContent.nameLabel}
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <Mail className={`h-5 w-5 transition-colors duration-200 ${emailFocused || email ? 'text-[#0A065D]' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder=" "
                  className="peer block w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-[#0A065D] transition-all duration-300 placeholder-transparent bg-white"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                    emailFocused || email
                      ? '-top-2.5 left-3 text-xs bg-white px-2 text-[#0A065D] font-semibold'
                      : 'top-4 text-base text-gray-500'
                  }`}
                >
                  {currentContent.emailLabel}
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <Lock className={`h-5 w-5 transition-colors duration-200 ${passwordFocused || password ? 'text-[#0A065D]' : 'text-gray-400'}`} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder=" "
                  className="peer block w-full pl-12 pr-12 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-[#0A065D] transition-all duration-300 placeholder-transparent bg-white"
                />
                <label
                  htmlFor="password"
                  className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                    passwordFocused || password
                      ? '-top-2.5 left-3 text-xs bg-white px-2 text-[#0A065D] font-semibold'
                      : 'top-4 text-base text-gray-500'
                  }`}
                >
                  {currentContent.passwordLabel}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0A065D] transition-colors z-10"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-600">{currentContent.passwordStrength.title}</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {passwordChecks.length ? (
                        <Check className="w-4 h-4 text-[#FE5000]" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={`text-xs ${passwordChecks.length ? 'text-[#FE5000]' : 'text-gray-500'}`}>
                        {currentContent.passwordStrength.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordChecks.uppercase ? (
                        <Check className="w-4 h-4 text-[#FE5000]" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300" />
                      )}
                      <span className={`text-xs ${passwordChecks.uppercase ? 'text-[#FE5000]' : 'text-gray-400'}`}>
                        {currentContent.passwordStrength.uppercase}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordChecks.number ? (
                        <Check className="w-4 h-4 text-[#FE5000]" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300" />
                      )}
                      <span className={`text-xs ${passwordChecks.number ? 'text-[#FE5000]' : 'text-gray-400'}`}>
                        {currentContent.passwordStrength.number}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Password */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <Lock className={`h-5 w-5 transition-colors duration-200 ${confirmFocused || confirmPassword ? 'text-[#0A065D]' : 'text-gray-400'}`} />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  onFocus={() => setConfirmFocused(true)}
                  onBlur={() => setConfirmFocused(false)}
                  placeholder=" "
                  className={`peer block w-full pl-12 pr-12 py-4 text-base border-2 rounded-xl focus:ring-0 transition-all duration-300 placeholder-transparent bg-white ${
                    confirmPassword && password !== confirmPassword
                      ? 'border-[#FE5000]/50 focus:border-[#FE5000]'
                      : confirmPassword && password === confirmPassword
                      ? 'border-[#0A065D]/50 focus:border-[#0A065D]'
                      : 'border-gray-200 focus:border-[#0A065D]'
                  }`}
                />
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                    confirmFocused || confirmPassword
                      ? '-top-2.5 left-3 text-xs bg-white px-2 text-[#0A065D] font-semibold'
                      : 'top-4 text-base text-gray-500'
                  }`}
                >
                  {currentContent.confirmPasswordLabel}
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0A065D] transition-colors z-10"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked);
                      setError("");
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#0A065D] peer-checked:border-[#0A065D] transition-all duration-200 flex items-center justify-center">
                    <svg className={`w-3 h-3 text-white transition-opacity duration-200 ${acceptTerms ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {currentContent.acceptTerms}
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !isPasswordStrong}
                className="relative w-full overflow-hidden group py-4 px-6 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#0A065D] via-[#0080FF] to-[#0909FF] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
              >
                {/* Animated light effect */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </div>

                <div className="relative flex justify-center items-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{currentContent.loading}</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>{currentContent.signupButton}</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Sign in link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {currentContent.hasAccount}{" "}
                <Link href="/login" className="font-semibold text-[#0A065D] hover:text-[#0080FF] transition-colors hover:underline">
                  {currentContent.loginLink}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
