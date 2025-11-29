"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Mail, Lock, Eye, EyeOff, UserPlus, User, Key } from "lucide-react";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function AdminRegisterPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Secret code that only Lab Yaounde owners should know
  const ADMIN_SECRET_CODE = "LABYAOUNDE2025ADMIN";

  const content = {
    fr: {
      title: "Créer un compte Admin",
      subtitle: "Inscription réservée aux administrateurs autorisés",
      nameLabel: "Nom complet",
      namePlaceholder: "Nom de l'administrateur",
      emailLabel: "Email Administrateur",
      emailPlaceholder: "admin@labyaounde.com",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "••••••••",
      confirmPasswordLabel: "Confirmer le mot de passe",
      confirmPasswordPlaceholder: "••••••••",
      secretCodeLabel: "Code Secret Admin",
      secretCodePlaceholder: "Entrez le code secret",
      registerButton: "Créer le compte Admin",
      loading: "Création du compte...",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
      invalidSecretCode: "Code secret incorrect. Seuls les propriétaires autorisés peuvent créer des comptes admin.",
      hasAccount: "Déjà un compte admin?",
      loginLink: "Se connecter",
    },
    en: {
      title: "Create Admin Account",
      subtitle: "Registration reserved for authorized administrators",
      nameLabel: "Full name",
      namePlaceholder: "Administrator name",
      emailLabel: "Admin Email",
      emailPlaceholder: "admin@labyaounde.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      confirmPasswordLabel: "Confirm password",
      confirmPasswordPlaceholder: "••••••••",
      secretCodeLabel: "Admin Secret Code",
      secretCodePlaceholder: "Enter secret code",
      registerButton: "Create Admin Account",
      loading: "Creating account...",
      passwordMismatch: "Passwords do not match",
      passwordTooShort: "Password must be at least 6 characters",
      invalidSecretCode: "Invalid secret code. Only authorized owners can create admin accounts.",
      hasAccount: "Already have an admin account?",
      loginLink: "Sign in",
    },
  };

  const currentContent = content[language];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate secret code first
    if (secretCode !== ADMIN_SECRET_CODE) {
      setError(currentContent.invalidSecretCode);
      return;
    }

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
      console.log("Starting signup process...");
      console.log("Email:", email);
      console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

      // Create admin account with is_admin flag and disable email confirmation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            is_admin: true, // Mark as admin
          },
          emailRedirectTo: undefined, // Disable email redirect
        },
      });

      console.log("Signup response:", { data, error });

      if (error) {
        console.error("Signup error:", error);
        throw error;
      }

      // Check if email confirmation is required
      if (data.user && !data.session) {
        console.log("Email confirmation required");
        setError(
          language === "fr"
            ? "Veuillez vérifier votre email pour confirmer votre compte, puis connectez-vous."
            : "Please check your email to confirm your account, then login."
        );
        setLoading(false);
        return;
      }

      // If we have a session, redirect to admin dashboard
      if (data.session) {
        console.log("Session active, redirecting to dashboard");
        router.push("/admin-dashboard");
      } else {
        console.log("No session, redirecting to login");
        // No session but user created - redirect to login
        router.push("/admin-login");
      }
    } catch (error: any) {
      console.error("Caught error:", error);
      setError(error.message || "Failed to fetch");
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
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-8 border-t-4 border-red-500">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {currentContent.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{currentContent.subtitle}</p>

              {/* Admin Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-600">
                  {language === "fr" ? "Inscription Administrateur" : "Administrator Registration"}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-5">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm rounded">
                  {error}
                </div>
              )}

              {/* Secret Code - First field for security */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <label htmlFor="secretCode" className="block text-sm font-medium text-gray-700 mb-1">
                  {currentContent.secretCodeLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-yellow-600" />
                  </div>
                  <input
                    id="secretCode"
                    type="password"
                    required
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    placeholder={currentContent.secretCodePlaceholder}
                    className="block w-full pl-10 pr-3 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-400 bg-white"
                  />
                </div>
                <p className="mt-2 text-xs text-yellow-800">
                  {language === "fr"
                    ? "Seuls les propriétaires autorisés de Lab Yaounde ont ce code"
                    : "Only authorized Lab Yaounde owners have this code"}
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  {currentContent.nameLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={currentContent.namePlaceholder}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-400"
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
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-400"
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

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {currentContent.confirmPasswordLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={currentContent.confirmPasswordPlaceholder}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {currentContent.loading}
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    {currentContent.registerButton}
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

            {/* Login link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {currentContent.hasAccount}{" "}
                <a href="/admin-login" className="font-semibold text-red-600 hover:text-red-700 transition-colors">
                  {currentContent.loginLink}
                </a>
              </p>
            </div>

            {/* Warning Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-xs text-yellow-800 text-center">
                <strong>{language === "fr" ? "Avertissement:" : "Warning:"}</strong>{" "}
                {language === "fr"
                  ? "Cette zone est strictement réservée aux administrateurs autorisés de Lab Yaounde."
                  : "This area is strictly reserved for authorized Lab Yaounde administrators."}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
