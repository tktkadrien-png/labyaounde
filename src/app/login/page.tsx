"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
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
  const [success, setSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

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
      adminAccess: "Accès Administrateur",
      invalidCredentials: "Email ou mot de passe incorrect",
      emailRequired: "Veuillez entrer votre adresse email",
      passwordRequired: "Veuillez entrer votre mot de passe",
      resetPasswordTitle: "Réinitialiser le mot de passe",
      resetPasswordDesc: "Entrez votre email pour recevoir un lien de réinitialisation",
      sendResetLink: "Envoyer le lien",
      backToLogin: "Retour à la connexion",
      resetEmailSent: "Un email de réinitialisation a été envoyé à votre adresse",
      resetEmailError: "Erreur lors de l'envoi de l'email",
      networkError: "Erreur de connexion. Vérifiez votre connexion internet.",
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
      adminAccess: "Admin Access",
      invalidCredentials: "Invalid email or password",
      emailRequired: "Please enter your email address",
      passwordRequired: "Please enter your password",
      resetPasswordTitle: "Reset Password",
      resetPasswordDesc: "Enter your email to receive a reset link",
      sendResetLink: "Send Reset Link",
      backToLogin: "Back to login",
      resetEmailSent: "A reset email has been sent to your address",
      resetEmailError: "Error sending reset email",
      networkError: "Connection error. Check your internet connection.",
    },
  };

  const currentContent = content[language];

  const validateForm = () => {
    if (!email.trim()) {
      setError(currentContent.emailRequired);
      return false;
    }
    if (!password) {
      setError(currentContent.passwordRequired);
      return false;
    }
    return true;
  };

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
        // Handle specific error messages without showing technical details
        if (authError.message.includes("Invalid login credentials") ||
            authError.message.includes("invalid") ||
            authError.message.includes("Invalid")) {
          setError(currentContent.invalidCredentials);
        } else if (authError.message.includes("Email not confirmed")) {
          setError(language === 'fr'
            ? "Veuillez confirmer votre email avant de vous connecter"
            : "Please confirm your email before logging in");
        } else {
          // For any other error (network, fetch, etc), show generic message
          setError(currentContent.invalidCredentials);
        }
        setLoading(false);
        return;
      }

      if (data?.user) {
        // Successful login - redirect to home
        setSuccess(language === 'fr' ? "Connexion réussie!" : "Login successful!");
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      // Don't show technical errors to user
      setError(currentContent.invalidCredentials);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!resetEmail.trim()) {
      setError(currentContent.emailRequired);
      return;
    }

    setResetLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccess(currentContent.resetEmailSent);
      setTimeout(() => {
        setShowResetForm(false);
        setResetEmail("");
        setSuccess("");
      }, 5000);
    } catch (error: any) {
      // Don't show technical errors
      setError(currentContent.resetEmailError);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      {/* Animated Background */}
      <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0047AB] via-[#0080FF] to-[#0909FF] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#00CED1]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          {/* Modern Card with entrance animation */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-10 space-y-8 transform transition-all duration-500 hover:shadow-3xl animate-fadeIn">
            {showResetForm ? (
              /* Password Reset Form */
              <>
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FE5000] to-[#CC4000] rounded-2xl mb-4 shadow-xl">
                    <Mail className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#0047AB] to-[#0080FF] bg-clip-text text-transparent">
                    {currentContent.resetPasswordTitle}
                  </h2>
                  <p className="text-base text-gray-600">{currentContent.resetPasswordDesc}</p>
                </div>

                <form onSubmit={handlePasswordReset} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <p className="text-sm text-green-700">{success}</p>
                    </div>
                  )}

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder={currentContent.emailPlaceholder}
                      className="block w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-[#0047AB] transition-all duration-300 bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="relative w-full overflow-hidden group py-4 px-6 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#0047AB] via-[#0080FF] to-[#0909FF] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {resetLoading ? (
                      <div className="flex justify-center items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Envoi...</span>
                      </div>
                    ) : (
                      currentContent.sendResetLink
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowResetForm(false);
                      setError("");
                      setSuccess("");
                    }}
                    className="w-full text-center text-[#0047AB] hover:text-[#0080FF] font-medium transition-colors"
                  >
                    {currentContent.backToLogin}
                  </button>
                </form>
              </>
            ) : (
              /* Login Form */
              <>
                {/* Header with sparkle icon */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FE5000] to-[#CC4000] rounded-2xl mb-4 shadow-xl transform transition-transform hover:scale-110 hover:rotate-6 duration-300">
                    <Sparkles className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#0047AB] to-[#0080FF] bg-clip-text text-transparent">
                    {currentContent.title}
                  </h2>
                  <p className="text-base text-gray-600">{currentContent.subtitle}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-slideDown flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <p className="text-sm text-green-700">{success}</p>
                    </div>
                  )}

                  {/* Email Field with Floating Label */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 z-10">
                      <Mail className={`h-5 w-5 transition-colors duration-200 ${emailFocused || email ? 'text-[#0047AB]' : 'text-gray-400'}`} />
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
                      className="peer block w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-[#0047AB] transition-all duration-300 placeholder-transparent bg-white"
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                        emailFocused || email
                          ? '-top-2.5 left-3 text-xs bg-white px-2 text-[#0047AB] font-semibold'
                          : 'top-4 text-base text-gray-500'
                      }`}
                    >
                      {currentContent.emailLabel}
                    </label>
                  </div>

                  {/* Password Field with Floating Label */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 z-10">
                      <Lock className={`h-5 w-5 transition-colors duration-200 ${passwordFocused || password ? 'text-[#0047AB]' : 'text-gray-400'}`} />
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
                      className="peer block w-full pl-12 pr-12 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-[#0047AB] transition-all duration-300 placeholder-transparent bg-white"
                    />
                    <label
                      htmlFor="password"
                      className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                        passwordFocused || password
                          ? '-top-2.5 left-3 text-xs bg-white px-2 text-[#0047AB] font-semibold'
                          : 'top-4 text-base text-gray-500'
                      }`}
                    >
                      {currentContent.passwordLabel}
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0047AB] transition-colors duration-200 z-10"
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
                        <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#0047AB] peer-checked:border-[#0047AB] transition-all duration-200 flex items-center justify-center">
                          <svg className={`w-3 h-3 text-white transition-opacity duration-200 ${rememberMe ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        {currentContent.rememberMe}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowResetForm(true);
                        setResetEmail(email);
                        setError("");
                      }}
                      className="text-sm font-medium text-[#0047AB] hover:text-[#0080FF] transition-colors duration-200"
                    >
                      {currentContent.forgotPassword}
                    </button>
                  </div>

                  {/* Submit Button with Light Animation */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full overflow-hidden group py-4 px-6 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#0047AB] via-[#0080FF] to-[#0909FF] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
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
                      className="font-semibold text-[#0047AB] hover:text-[#0080FF] transition-colors duration-200 hover:underline"
                    >
                      {currentContent.signupLink}
                    </Link>
                  </p>
                </div>

                {/* Admin Access Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <Link
                    href="/admin-dashboard"
                    className="inline-flex items-center gap-2 text-sm text-[#FE5000] hover:text-[#CC4000] font-semibold transition-all duration-200 hover:gap-3 group"
                  >
                    <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {currentContent.adminAccess}
                  </Link>
                </div>
              </>
            )}
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
