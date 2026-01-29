"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Camera, Save, ArrowLeft } from "lucide-react";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const content = {
    fr: {
      title: "Mon Profil",
      subtitle: "Gérez vos informations personnelles",
      fullNameLabel: "Nom complet",
      emailLabel: "Email",
      phoneLabel: "Téléphone",
      avatarLabel: "Photo de profil",
      uploadButton: "Choisir une photo",
      uploading: "Téléchargement...",
      saveButton: "Enregistrer les modifications",
      saving: "Enregistrement...",
      successMessage: "Profil mis à jour avec succès!",
      backButton: "Retour",
      emailNote: "L'email ne peut pas être modifié après l'inscription",
    },
    en: {
      title: "My Profile",
      subtitle: "Manage your personal information",
      fullNameLabel: "Full Name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      avatarLabel: "Profile Photo",
      uploadButton: "Choose Photo",
      uploading: "Uploading...",
      saveButton: "Save Changes",
      saving: "Saving...",
      successMessage: "Profile updated successfully!",
      backButton: "Back",
      emailNote: "Email cannot be changed after registration",
    },
  };

  const currentContent = content[language];

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);
      setEmail(user.email || "");
      setFullName(user.user_metadata?.full_name || "");
      setPhone(user.user_metadata?.phone || "");
      setAvatarUrl(user.user_metadata?.avatar_url || "");

      setLoading(false);
    } catch (error) {
      console.error("Auth error:", error);
      router.push("/login");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setError("");

      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      setAvatarUrl(data.publicUrl);
    } catch (error: any) {
      setError(error.message || "Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone: phone,
          avatar_url: avatarUrl,
        },
      });

      if (error) throw error;

      // Also update the profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: fullName,
          avatar_url: avatarUrl,
        });

      if (profileError) console.error("Profile update error:", profileError);

      setSuccess(currentContent.successMessage);
      setTimeout(() => setSuccess(""), 3000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0047AB]"></div>
      </div>
    );
  }

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#0047AB] hover:text-[#0080FF] mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              {currentContent.backButton}
            </button>
            <h1 className="text-4xl font-bold text-gray-900">{currentContent.title}</h1>
            <p className="text-gray-600 mt-2">{currentContent.subtitle}</p>
          </div>

          {/* Profile Form Card */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-200">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0047AB] to-[#0080FF] flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
                  ) : (
                    <span>{fullName?.charAt(0) || email?.charAt(0) || "U"}</span>
                  )}
                </div>
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border-2 border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                  <Camera className="w-5 h-5 text-[#0047AB]" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                {uploading ? currentContent.uploading : currentContent.avatarLabel}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 text-green-700 text-sm rounded">
                  {success}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  {currentContent.fullNameLabel}
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047AB] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email (Read-only) */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {currentContent.emailLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{currentContent.emailNote}</p>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {currentContent.phoneLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+237 XXX XX XX XX"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047AB] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#0047AB] to-[#0080FF] hover:from-[#0080FF] hover:to-[#0909FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0047AB] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {currentContent.saving}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {currentContent.saveButton}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
