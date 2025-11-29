"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, UserPlus, User } from "lucide-react";
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

  const content = {
    fr: {
      title: "Créer un compte",
      subtitle: "Inscrivez-vous pour laisser un avis",
      nameLabel: "Nom complet",
      namePlaceholder: "Jean Dupont",
      emailLabel: "Email",
      emailPlaceholder: "votre.email@example.com",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "••••••••",
      confirmPasswordLabel: "Confirmer le mot de passe",
      confirmPasswordPlaceholder: "••••••••",
      signupButton: "Créer mon compte",
      hasAccount: "Vous avez déjà un compte?",
      loginLink: "Se connecter",
      loading: "Création du compte...",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
    },
    en: {
      title: "Create an account",
      subtitle: "Sign up to leave a review",
      nameLabel: "Full name",
      namePlaceholder: "John Doe",
      emailLabel: "Email",
      emailPlaceholder: "your.email@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      confirmPasswordLabel: "Confirm password",
      confirmPasswordPlaceholder: "••••••••",
      signupButton: "Create account",
      hasAccount: "Already have an account?",
      loginLink: "Sign in",
      loading: "Creating account...",
      passwordMismatch: "Passwords do not match",
      passwordTooShort: "Password must be at least 6 characters",
    },
  };

  const currentContent = content[language];

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
      <main className="min-h-screen bg-gradient-to-br from-[#0B3D5F] via-[#0B4D6F] to-[#063251] flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Modern Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4 shadow-lg bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F]">
                <UserPlus className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {currentContent.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                {currentContent.subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-4 sm:space-y-5">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 text-red-700 text-xs sm:text-sm rounded">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                  {currentContent.nameLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none">
                    <User className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={currentContent.namePlaceholder}
                    className="block w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3D5F] focus:border-transparent transition-all placeholder:text-gray-400 min-h-[44px]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                  {currentContent.emailLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={currentContent.emailPlaceholder}
                    className="block w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3D5F] focus:border-transparent transition-all placeholder:text-gray-400 min-h-[44px]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                  {currentContent.passwordLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={currentContent.passwordPlaceholder}
                    className="block w-full pl-10 sm:pl-11 pr-12 sm:pr-13 py-3 sm:py-3.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3D5F] focus:border-transparent transition-all placeholder:text-gray-400 min-h-[44px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 sm:pr-3.5 flex items-center text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] justify-center"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 sm:h-6 sm:w-6" /> : <Eye className="h-5 w-5 sm:h-6 sm:w-6" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                  {currentContent.confirmPasswordLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={currentContent.confirmPasswordPlaceholder}
                    className="block w-full pl-10 sm:pl-11 pr-12 sm:pr-13 py-3 sm:py-3.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3D5F] focus:border-transparent transition-all placeholder:text-gray-400 min-h-[44px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 sm:pr-3.5 flex items-center text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] justify-center"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 sm:h-6 sm:w-6" /> : <Eye className="h-5 w-5 sm:h-6 sm:w-6" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3.5 sm:py-4 px-4 sm:px-6 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-gradient-to-r from-[#0B3D5F] to-[#0B4D6F] hover:from-[#0B4D6F] hover:to-[#063251] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B3D5F] transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm sm:text-base">{currentContent.loading}</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span className="text-sm sm:text-base">{currentContent.signupButton}</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-white text-gray-500">{language === "fr" ? "ou" : "or"}</span>
              </div>
            </div>

            {/* Login link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {currentContent.hasAccount}{" "}
                <Link href="/login" className="font-semibold text-[#0B3D5F] hover:text-[#0B4D6F] transition-colors">
                  {currentContent.loginLink}
                </Link>
              </p>
            </div>

            {/* Admin Access Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <Link
                href="/admin-access"
                className="inline-flex items-center gap-2 text-xs text-red-600 hover:text-red-700 font-semibold transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {language === "fr" ? "Accès Administrateur" : "Admin Access"}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
