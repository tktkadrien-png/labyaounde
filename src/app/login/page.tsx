"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const content = {
    fr: {
      title: "Connexion",
      subtitle: "Connectez-vous pour laisser un avis",
      emailLabel: "Email",
      emailPlaceholder: "votre.email@example.com",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "••••••••",
      loginButton: "Se connecter",
      noAccount: "Pas encore de compte?",
      signupLink: "Créer un compte",
      loading: "Connexion en cours...",
    },
    en: {
      title: "Login",
      subtitle: "Sign in to leave a review",
      emailLabel: "Email",
      emailPlaceholder: "your.email@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      loginButton: "Sign in",
      noAccount: "Don't have an account?",
      signupLink: "Sign up",
      loading: "Signing in...",
    },
  };

  const currentContent = content[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/laisser-un-avis");
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
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-full mb-3 sm:mb-4 shadow-lg">
                <LogIn className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {currentContent.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">{currentContent.subtitle}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 text-red-700 text-xs sm:text-sm rounded">
                  {error}
                </div>
              )}

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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3.5 sm:py-4 px-4 sm:px-6 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-gradient-to-r from-[#0B3D5F] to-[#0B4D6F] hover:from-[#0B4D6F] hover:to-[#063251] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B3D5F] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] min-h-[48px]"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm sm:text-base">{currentContent.loading}</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span className="text-sm sm:text-base">{currentContent.loginButton}</span>
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

            {/* Sign up link */}
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-600">
                {currentContent.noAccount}{" "}
                <Link href="/signup" className="font-semibold text-[#0B3D5F] hover:text-[#0B4D6F] transition-colors">
                  {currentContent.signupLink}
                </Link>
              </p>
            </div>

            {/* Admin Access Link */}
            <div className="text-center pt-3 sm:pt-4 border-t border-gray-200">
              <Link
                href="/admin-access"
                className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-red-600 hover:text-red-700 font-semibold transition-colors min-h-[44px] py-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
