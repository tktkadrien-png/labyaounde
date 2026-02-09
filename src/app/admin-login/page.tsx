"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Mail, Lock, Eye, EyeOff, LogIn, AlertTriangle } from "lucide-react";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const content = {
    fr: {
      title: "Connexion Admin",
      subtitle: "Accès réservé aux administrateurs",
      emailLabel: "Email Administrateur",
      emailPlaceholder: "admin@example.com",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "••••••••",
      loginButton: "Se connecter",
      loading: "Connexion en cours...",
      unauthorized: "Accès non autorisé. Seuls les administrateurs peuvent se connecter ici.",
      noAccount: "Pas encore de compte admin?",
      registerLink: "Créer un compte",
      invalidCredentials: "Email ou mot de passe incorrect.",
      networkError: "Erreur de connexion. Vérifiez votre connexion internet.",
    },
    en: {
      title: "Admin Login",
      subtitle: "Access reserved for administrators",
      emailLabel: "Admin Email",
      emailPlaceholder: "admin@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      loginButton: "Sign in",
      loading: "Signing in...",
      unauthorized: "Unauthorized access. Only administrators can login here.",
      noAccount: "Don't have an admin account?",
      registerLink: "Register",
      invalidCredentials: "Invalid email or password.",
      networkError: "Connection error. Check your internet connection.",
    },
  };

  const currentContent = content[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Sign in with Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (authError) {
        console.error("Auth error:", authError);

        if (authError.message.includes("Invalid login credentials")) {
          setError(currentContent.invalidCredentials);
        } else if (authError.message.toLowerCase().includes("fetch") || authError.message.toLowerCase().includes("network")) {
          setError(currentContent.networkError);
        } else {
          setError(authError.message);
        }
        return;
      }

      if (!data.user) {
        setError(currentContent.invalidCredentials);
        return;
      }

      // 2. Verify admin status via secure API route
      try {
        const verifyResponse = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: data.user.id,
          }),
        });

        const verifyData = await verifyResponse.json();

        if (!verifyData.is_admin) {
          // Not an admin - sign out and show error
          await supabase.auth.signOut();
          setError(currentContent.unauthorized);
          return;
        }
      } catch (verifyError) {
        // If API verification fails, fall back to metadata check
        console.warn("API verification failed, using fallback:", verifyError);

        const isAdmin =
          data.user.email === "Labyaounde@gmail.com" ||
          data.user.user_metadata?.is_admin === true ||
          data.user.user_metadata?.role === "admin";

        if (!isAdmin) {
          await supabase.auth.signOut();
          setError(currentContent.unauthorized);
          return;
        }
      }

      // 3. Admin verified - redirect to dashboard
      router.push("/admin-dashboard");

    } catch (error: any) {
      console.error("Login error:", error);

      if (error.message?.toLowerCase().includes("fetch") || error.message?.toLowerCase().includes("network")) {
        setError(currentContent.networkError);
      } else {
        setError(
          language === "fr"
            ? "Une erreur est survenue. Veuillez réessayer."
            : "An error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Modern Card with Admin Theme */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-8 border-t-4 border-[#FE5000]">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FE5000] to-[#CC4000] rounded-full mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {currentContent.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{currentContent.subtitle}</p>

              {/* Admin Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#FE5000]/10 rounded-full">
                <Shield className="w-4 h-4 text-[#FE5000]" />
                <span className="text-sm font-semibold text-[#FE5000]">
                  {language === "fr" ? "Espace Administrateur" : "Administrator Area"}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {currentContent.emailLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={currentContent.emailPlaceholder}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE5000] focus:border-transparent transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {currentContent.passwordLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={currentContent.passwordPlaceholder}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE5000] focus:border-transparent transition-all placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FE5000] to-[#CC4000] hover:from-[#CC4000] hover:to-[#FE5000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE5000] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {currentContent.loading}
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    {currentContent.loginButton}
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{language === "fr" ? "ou" : "or"}</span>
              </div>
            </div>

            {/* Register link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {currentContent.noAccount}{" "}
                <a href="/admin-register" className="font-semibold text-[#FE5000] hover:text-[#CC4000] transition-colors">
                  {currentContent.registerLink}
                </a>
              </p>
            </div>

            {/* Warning Notice */}
            <div className="bg-[#FE5000]/10 border border-[#FE5000]/30 rounded-lg p-4">
              <p className="text-xs text-[#FE5000] text-center">
                <strong>{language === "fr" ? "Avertissement:" : "Warning:"}</strong>{" "}
                {language === "fr"
                  ? "Cette zone est strictement réservée aux administrateurs autorisés."
                  : "This area is strictly reserved for authorized administrators."}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
