"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles } from "lucide-react";
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
  const [rememberMe, setRememberMe] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const content = {
    fr: {
      title: "Bienvenue",
      subtitle: "Connectez-vous pour continuer",
      emailLabel: "Adresse Email",
      emailPlaceholder: "votre.email@example.com",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "Entrez votre mot de passe",
      loginButton: "Se connecter",
      noAccount: "Pas encore de compte?",
      signupLink: "Créer un compte",
      loading: "Connexion en cours...",
      rememberMe: "Se souvenir de moi",
      forgotPassword: "Mot de passe oublié?",
      orContinueWith: "Ou continuer avec",
      googleButton: "Continuer avec Google",
      appleButton: "Continuer avec Apple",
      adminAccess: "Accès Administrateur",
    },
    en: {
      title: "Welcome Back",
      subtitle: "Sign in to continue",
      emailLabel: "Email Address",
      emailPlaceholder: "your.email@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      loginButton: "Sign In",
      noAccount: "Don't have an account?",
      signupLink: "Sign up",
      loading: "Signing in...",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      orContinueWith: "Or continue with",
      googleButton: "Continue with Google",
      appleButton: "Continue with Apple",
      adminAccess: "Admin Access",
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

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/laisser-un-avis`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/laisser-un-avis`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      {/* Animated Background */}
      <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0B3D5F] via-[#0B4D6F] to-[#063251] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-400/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          {/* Modern Card with entrance animation */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-10 space-y-8 transform transition-all duration-500 hover:shadow-3xl animate-fadeIn">
            {/* Header with sparkle icon */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0B3D5F] via-[#0B4D6F] to-[#063251] rounded-2xl mb-4 shadow-xl transform transition-transform hover:scale-110 hover:rotate-6 duration-300">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#0B3D5F] to-[#0B4D6F] bg-clip-text text-transparent">
                {currentContent.title}
              </h2>
              <p className="text-base text-gray-600">{currentContent.subtitle}</p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm sm:text-base">{currentContent.googleButton}</span>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={handleAppleLogin}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-black border-2 border-black rounded-xl text-white font-medium hover:bg-gray-900 transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span className="text-sm sm:text-base">{currentContent.appleButton}</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">{currentContent.orContinueWith}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-slideDown">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Email Field with Floating Label */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 z-10">
                  <Mail className={`h-5 w-5 transition-colors duration-200 ${emailFocused || email ? 'text-[#0B3D5F]' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder=" "
                  className="peer block w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-[#0B3D5F] transition-all duration-300 placeholder-transparent bg-white"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                    emailFocused || email
                      ? '-top-2.5 left-3 text-xs bg-white px-2 text-[#0B3D5F] font-semibold'
                      : 'top-4 text-base text-gray-500'
                  }`}
                >
                  {currentContent.emailLabel}
                </label>
              </div>

              {/* Password Field with Floating Label */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 z-10">
                  <Lock className={`h-5 w-5 transition-colors duration-200 ${passwordFocused || password ? 'text-[#0B3D5F]' : 'text-gray-400'}`} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder=" "
                  className="peer block w-full pl-12 pr-12 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-[#0B3D5F] transition-all duration-300 placeholder-transparent bg-white"
                />
                <label
                  htmlFor="password"
                  className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                    passwordFocused || password
                      ? '-top-2.5 left-3 text-xs bg-white px-2 text-[#0B3D5F] font-semibold'
                      : 'top-4 text-base text-gray-500'
                  }`}
                >
                  {currentContent.passwordLabel}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0B3D5F] transition-colors duration-200 z-10"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center group cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#0B3D5F] peer-checked:border-[#0B3D5F] transition-all duration-200 flex items-center justify-center">
                      <svg className={`w-3 h-3 text-white transition-opacity duration-200 ${rememberMe ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {currentContent.rememberMe}
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[#0B3D5F] hover:text-[#0B4D6F] transition-colors duration-200"
                >
                  {currentContent.forgotPassword}
                </Link>
              </div>

              {/* Submit Button with Light Animation */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full overflow-hidden group py-4 px-6 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#0B3D5F] via-[#0B4D6F] to-[#063251] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
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
                      <LogIn className="w-5 h-5" />
                      <span>{currentContent.loginButton}</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Sign up link */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">
                {currentContent.noAccount}{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#0B3D5F] hover:text-[#0B4D6F] transition-colors duration-200 hover:underline"
                >
                  {currentContent.signupLink}
                </Link>
              </p>
            </div>

            {/* Admin Access Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <Link
                href="/admin-access"
                className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-semibold transition-all duration-200 hover:gap-3 group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {currentContent.adminAccess}
              </Link>
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
