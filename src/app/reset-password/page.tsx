"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Shield,
  Loader2,
  Check,
  X,
  KeyRound
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";

// Translations
const translations = {
  fr: {
    title: "Nouveau mot de passe",
    subtitle: "Choisissez un nouveau mot de passe sécurisé",
    passwordLabel: "Nouveau mot de passe",
    passwordPlaceholder: "Minimum 8 caractères",
    confirmPasswordLabel: "Confirmer le mot de passe",
    confirmPasswordPlaceholder: "Répétez le mot de passe",
    submitButton: "Réinitialiser le mot de passe",
    submitting: "Réinitialisation...",
    backToLogin: "Retour à la connexion",
    secureConnection: "Connexion sécurisée SSL",
    passwordStrength: {
      title: "Sécurité du mot de passe",
      weak: "Faible",
      medium: "Moyen",
      strong: "Fort",
      requirements: {
        length: "Au moins 8 caractères",
        uppercase: "Une lettre majuscule",
        number: "Un chiffre",
        special: "Un caractère spécial",
      },
    },
    errors: {
      passwordRequired: "Veuillez entrer un mot de passe",
      passwordTooShort: "Le mot de passe doit contenir au moins 8 caractères",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      invalidLink: "Ce lien de réinitialisation est invalide ou a expiré",
      networkError: "Problème de connexion. Vérifiez votre internet et réessayez.",
      unknownError: "Une erreur est survenue. Veuillez réessayer.",
    },
    success: {
      passwordReset: "Mot de passe réinitialisé avec succès !",
      redirecting: "Redirection vers la page de connexion...",
    },
  },
  en: {
    title: "New Password",
    subtitle: "Choose a new secure password",
    passwordLabel: "New password",
    passwordPlaceholder: "Minimum 8 characters",
    confirmPasswordLabel: "Confirm password",
    confirmPasswordPlaceholder: "Repeat password",
    submitButton: "Reset password",
    submitting: "Resetting...",
    backToLogin: "Back to login",
    secureConnection: "Secure SSL Connection",
    passwordStrength: {
      title: "Password strength",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",
      requirements: {
        length: "At least 8 characters",
        uppercase: "One uppercase letter",
        number: "One number",
        special: "One special character",
      },
    },
    errors: {
      passwordRequired: "Please enter a password",
      passwordTooShort: "Password must be at least 8 characters",
      passwordMismatch: "Passwords do not match",
      invalidLink: "This reset link is invalid or has expired",
      networkError: "Connection issue. Check your internet and try again.",
      unknownError: "An error occurred. Please try again.",
    },
    success: {
      passwordReset: "Password reset successfully!",
      redirecting: "Redirecting to login page...",
    },
  },
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  // Form state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Check for valid reset session
  useEffect(() => {
    setMounted(true);

    const checkSession = async () => {
      try {
        // The session should be established by Supabase when user clicks the reset link
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          setIsValidSession(true);
        } else {
          // Check if there's a hash in the URL (from the reset email link)
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const type = hashParams.get('type');

          if (accessToken && type === 'recovery') {
            // Set the session with the recovery token
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: hashParams.get('refresh_token') || '',
            });

            if (!error) {
              setIsValidSession(true);
            } else {
              setError(t.errors.invalidLink);
            }
          } else {
            setError(t.errors.invalidLink);
          }
        }
      } catch {
        setError(t.errors.invalidLink);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, [router, t.errors.invalidLink]);

  // Password strength calculation
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length;
  const getStrengthLabel = () => {
    if (passwordStrength <= 1) return { label: t.passwordStrength.weak, color: "bg-red-500", width: "w-1/4" };
    if (passwordStrength <= 2) return { label: t.passwordStrength.medium, color: "bg-yellow-500", width: "w-2/4" };
    if (passwordStrength <= 3) return { label: t.passwordStrength.medium, color: "bg-yellow-500", width: "w-3/4" };
    return { label: t.passwordStrength.strong, color: "bg-green-500", width: "w-full" };
  };

  // Form validation
  const validateForm = useCallback(() => {
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
    return true;
  }, [password, confirmPassword, t.errors]);

  // Handle password reset
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        const errorMsg = updateError.message?.toLowerCase() || "";

        if (errorMsg.includes("same password") || errorMsg.includes("different")) {
          setError(language === 'fr'
            ? "Le nouveau mot de passe doit être différent de l'ancien"
            : "New password must be different from the old one"
          );
        } else if (
          errorMsg.includes("network") ||
          errorMsg.includes("fetch") ||
          errorMsg.includes("timeout")
        ) {
          setError(t.errors.networkError);
        } else {
          setError(t.errors.unknownError);
        }
        return;
      }

      setSuccess(`${t.success.passwordReset} ${t.success.redirecting}`);

      // Sign out and redirect to login
      await supabase.auth.signOut();

      setTimeout(() => {
        router.push("/login");
      }, 2000);

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

  // Show loading while checking session
  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#0A065D] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">
            {language === 'fr' ? 'Vérification...' : 'Verifying...'}
          </p>
        </div>
      </div>
    );
  }

  // Show error if invalid session
  if (!isValidSession && error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'fr' ? 'Lien invalide' : 'Invalid Link'}
            </h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#0A065D] text-white rounded-xl font-semibold hover:bg-[#0A065D]/90 transition-all"
            >
              {t.backToLogin}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
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
            <div className="w-16 h-16 bg-[#FF6B00]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-8 h-8 text-[#FF6B00]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {t.title}
            </h1>
            <p className="text-gray-500">
              {t.subtitle}
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-5">
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

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.passwordLabel}
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
                {t.confirmPasswordLabel}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || passwordStrength < 3}
              className="w-full py-3.5 bg-[#0A065D] text-white rounded-xl font-semibold hover:bg-[#0A065D]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.submitting}
                </>
              ) : (
                <>
                  {t.submitButton}
                  <ArrowRight className="w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                </>
              )}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link
              href="/login"
              className="text-[#0A065D] hover:text-[#0080FF] font-medium transition-colors"
            >
              {t.backToLogin}
            </Link>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center flex items-center justify-center gap-2 text-sm text-gray-500">
          <Shield className="w-4 h-4" />
          <span>{t.secureConnection}</span>
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
