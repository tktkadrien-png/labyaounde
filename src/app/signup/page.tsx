"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react";
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

  // Field validation states
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const content = {
    fr: {
      title: "Créer un compte",
      subtitle: "Rejoignez notre communauté",
      nameLabel: "Nom complet",
      emailLabel: "Adresse email",
      passwordLabel: "Mot de passe",
      confirmPasswordLabel: "Confirmer le mot de passe",
      signupButton: "Créer mon compte",
      hasAccount: "Vous avez déjà un compte?",
      loginLink: "Se connecter",
      loading: "Création en cours...",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
    },
    en: {
      title: "Create an account",
      subtitle: "Join our community",
      nameLabel: "Full name",
      emailLabel: "Email address",
      passwordLabel: "Password",
      confirmPasswordLabel: "Confirm password",
      signupButton: "Create account",
      hasAccount: "Already have an account?",
      loginLink: "Sign in",
      loading: "Creating account...",
      passwordMismatch: "Passwords do not match",
      passwordTooShort: "Password must be at least 6 characters",
    },
  };

  const currentContent = content[language];

  // Validation helpers
  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFieldValid = (field: string) => {
    switch (field) {
      case "fullName":
        return fullName.length >= 2;
      case "email":
        return isEmailValid(email);
      case "password":
        return password.length >= 6;
      case "confirmPassword":
        return confirmPassword.length >= 6 && password === confirmPassword;
      default:
        return false;
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError(currentContent.passwordMismatch);
      return;
    }

    if (password.length < 6) {
      setError(currentContent.passwordTooShort);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: undefined, // Disable email redirect
        },
      });

      if (error) throw error;

      // Check if email confirmation is required
      if (data.user && !data.session) {
        setError(
          language === "fr"
            ? "Compte créé! Veuillez vérifier votre email pour confirmer, puis connectez-vous."
            : "Account created! Please check your email to confirm, then login."
        );
        setLoading(false);
        // Show success but ask them to check email
        setTimeout(() => {
          router.push("/login");
        }, 3000);
        return;
      }

      // If we have a session, they're logged in immediately
      if (data.session) {
        router.push("/");
      } else {
        // No session but user created - go to login
        router.push("/login");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />
      <main className="min-h-screen bg-gradient-to-br from-[#0B3D5F] via-[#0B4D6F] to-[#063251] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ff90e8]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#645bff]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          {/* Modern Card with enhanced styling */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 sm:p-10 space-y-6">
            {/* Header with pulse animation */}
            <div className="text-center relative">
              <div className="inline-flex items-center justify-center relative mb-4">
                {/* Pulsing circles decoration */}
                <div className="absolute w-20 h-20 bg-[#0B3D5F]/20 rounded-full animate-ping"></div>
                <div className="absolute w-16 h-16 bg-[#ff90e8]/30 rounded-full animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {currentContent.title}
              </h2>
              <p className="text-base text-gray-600">
                {currentContent.subtitle}
              </p>
            </div>

            {/* Form with floating labels */}
            <form onSubmit={handleSignup} className="space-y-5">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm rounded-lg animate-in slide-in-from-top-2">
                  {error}
                </div>
              )}

              {/* Full Name - Floating Label */}
              <div className="floating-label">
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => setTouched({ ...touched, fullName: true })}
                  placeholder=" "
                  className={`w-full pt-6 pb-2 px-4 outline-0 border-2 rounded-xl transition-all duration-300 ${
                    touched.fullName && isFieldValid("fullName")
                      ? "border-green-500 focus:border-green-600"
                      : touched.fullName && !isFieldValid("fullName")
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-[#0B3D5F]"
                  }`}
                />
                <span className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  touched.fullName && isFieldValid("fullName") ? "text-green-600" : "text-gray-500"
                }`}>
                  <User className="w-4 h-4 inline mr-1.5" />
                  {currentContent.nameLabel}
                </span>
              </div>

              {/* Email - Floating Label */}
              <div className="floating-label">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  placeholder=" "
                  className={`w-full pt-6 pb-2 px-4 outline-0 border-2 rounded-xl transition-all duration-300 ${
                    touched.email && isFieldValid("email")
                      ? "border-green-500 focus:border-green-600"
                      : touched.email && !isFieldValid("email")
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-[#0B3D5F]"
                  }`}
                />
                <span className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  touched.email && isFieldValid("email") ? "text-green-600" : "text-gray-500"
                }`}>
                  <Mail className="w-4 h-4 inline mr-1.5" />
                  {currentContent.emailLabel}
                </span>
              </div>

              {/* Password - Floating Label */}
              <div className="floating-label">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched({ ...touched, password: true })}
                  placeholder=" "
                  className={`w-full pt-6 pb-2 px-4 pr-12 outline-0 border-2 rounded-xl transition-all duration-300 ${
                    touched.password && isFieldValid("password")
                      ? "border-green-500 focus:border-green-600"
                      : touched.password && !isFieldValid("password")
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-[#0B3D5F]"
                  }`}
                />
                <span className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  touched.password && isFieldValid("password") ? "text-green-600" : "text-gray-500"
                }`}>
                  <Lock className="w-4 h-4 inline mr-1.5" />
                  {currentContent.passwordLabel}
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Confirm Password - Floating Label */}
              <div className="floating-label">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setTouched({ ...touched, confirmPassword: true })}
                  placeholder=" "
                  className={`w-full pt-6 pb-2 px-4 pr-12 outline-0 border-2 rounded-xl transition-all duration-300 ${
                    touched.confirmPassword && isFieldValid("confirmPassword")
                      ? "border-green-500 focus:border-green-600"
                      : touched.confirmPassword && !isFieldValid("confirmPassword")
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-[#0B3D5F]"
                  }`}
                />
                <span className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  touched.confirmPassword && isFieldValid("confirmPassword") ? "text-green-600" : "text-gray-500"
                }`}>
                  <Lock className="w-4 h-4 inline mr-1.5" />
                  {currentContent.confirmPasswordLabel}
                </span>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Submit Button with Arrow Animation */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative border-0 rounded-2xl text-white px-7 py-4 bg-gradient-to-r from-[#0B3D5F] to-[#0B4D6F] flex items-center justify-center gap-3 font-bold transition-all duration-200 hover:from-[#0B4D6F] hover:to-[#063251] transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{currentContent.loading}</span>
                  </>
                ) : (
                  <>
                    <span>{currentContent.signupButton}</span>
                    <div className="flex justify-center items-center">
                      <div className="relative bg-white h-0.5 w-3 transition-all duration-200 group-hover:w-5">
                        <div className="absolute border-white border-r-2 border-b-2 inline-block transition-all duration-200 -top-1 -right-0.5 p-1 transform rotate-[-45deg] group-hover:right-0"></div>
                      </div>
                    </div>
                  </>
                )}
              </button>
            </form>

            {/* Sign in link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {currentContent.hasAccount}{" "}
                <Link href="/login" className="font-semibold text-[#0B3D5F] hover:text-[#0B4D6F] transition-colors hover:underline">
                  {currentContent.loginLink}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
