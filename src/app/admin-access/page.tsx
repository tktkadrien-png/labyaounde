"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Key } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function AdminAccessPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [secretCode, setSecretCode] = useState("");
  const [error, setError] = useState("");

  // The secret code stored in your environment
  const ADMIN_SECRET_CODE = "LABYAOUNDE2025ADMIN";

  const content = {
    fr: {
      title: "Accès Administrateur",
      subtitle: "Entrez le code secret pour accéder au tableau de bord",
      codeLabel: "Code Secret",
      codePlaceholder: "Entrez le code secret",
      accessButton: "Accéder au Dashboard",
      invalidCode: "Code secret incorrect!",
    },
    en: {
      title: "Admin Access",
      subtitle: "Enter secret code to access the dashboard",
      codeLabel: "Secret Code",
      codePlaceholder: "Enter secret code",
      accessButton: "Access Dashboard",
      invalidCode: "Invalid secret code!",
    },
  };

  const currentContent = content[language];

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check if the secret code matches
    if (secretCode === ADMIN_SECRET_CODE) {
      // Store a flag in sessionStorage to allow access
      sessionStorage.setItem("admin_access", "true");
      // Redirect to admin dashboard
      router.push("/admin-dashboard");
    } else {
      setError(currentContent.invalidCode);
      setSecretCode("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-8 border-t-4 border-red-500">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full mb-6 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentContent.title}
            </h1>
            <p className="text-gray-600">{currentContent.subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleAccess} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm rounded animate-shake">
                {error}
              </div>
            )}

            {/* Secret Code Input */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
              <label htmlFor="secretCode" className="block text-sm font-bold text-gray-800 mb-3 text-center">
                {currentContent.codeLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Key className="h-6 w-6 text-yellow-600" />
                </div>
                <input
                  id="secretCode"
                  type="password"
                  required
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  placeholder={currentContent.codePlaceholder}
                  className="block w-full pl-12 pr-4 py-4 border-2 border-yellow-400 rounded-lg focus:ring-4 focus:ring-red-500 focus:border-red-500 transition-all placeholder:text-gray-400 bg-white text-lg font-mono tracking-widest text-center"
                  autoFocus
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-3 py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              <Shield className="w-6 h-6" />
              {currentContent.accessButton}
            </button>
          </form>

          {/* Info */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-600">
              {language === "fr"
                ? "Seuls les propriétaires autorisés de Lab Yaounde ont accès à ce code"
                : "Only authorized Lab Yaounde owners have access to this code"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
