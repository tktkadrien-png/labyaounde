"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, Send, CheckCircle } from "lucide-react";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { supabase } from "@/lib/supabase";

export default function ReviewPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const { language } = useLanguage();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        setEmail(user.email || "");
        setName(user.user_metadata?.full_name || "");
      }
    };
    checkAuth();
  }, [router]);

  const content = {
    fr: {
      title: "Partagez votre expérience",
      subtitle: "Votre avis détaillé nous aide à améliorer nos services",
      ratingLabel: "Quelle est votre note globale?",
      nameLabel: "Nom complet",
      namePlaceholder: "Jean Dupont",
      emailLabel: "Email",
      emailPlaceholder: "jean.dupont@example.com",
      commentLabel: "Votre avis détaillé",
      commentPlaceholder: "Parlez-nous de votre expérience avec notre laboratoire... Qu'avez-vous aimé? Comment pouvons-nous nous améliorer?",
      submitButton: "Publier mon avis",
      submitting: "Publication...",
      successTitle: "Merci pour votre avis!",
      successMessage: "Votre retour est précieux pour nous et aide d'autres patients.",
      backButton: "Retour à l'accueil",
    },
    en: {
      title: "Share your experience",
      subtitle: "Your detailed review helps us improve our services",
      ratingLabel: "What is your overall rating?",
      nameLabel: "Full name",
      namePlaceholder: "John Doe",
      emailLabel: "Email",
      emailPlaceholder: "john.doe@example.com",
      commentLabel: "Your detailed review",
      commentPlaceholder: "Tell us about your experience with our laboratory... What did you like? How can we improve?",
      submitButton: "Publish Review",
      submitting: "Publishing...",
      successTitle: "Thank you for your review!",
      successMessage: "Your feedback is valuable to us and helps other patients.",
      backButton: "Back to home",
    },
  };

  const currentContent = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Insert review into Supabase
      const { error } = await supabase.from("reviews").insert([
        {
          user_id: user.id,
          name: name,
          email: email,
          rating: rating,
          comment: comment,
        },
      ]);

      if (error) throw error;

      setIsSubmitted(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <TopNavigationBar />
        <MainNavigation />
        <main className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full text-center">
            <div className="py-12">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                {currentContent.successTitle}
              </h1>
              <p className="text-gray-500 mb-8">
                {currentContent.successMessage}
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-[#2916F5] text-white font-medium text-sm rounded-md
                  hover:bg-[#157DEC] transition-colors duration-200"
              >
                {currentContent.backButton}
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Show loading while checking auth
  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Modern Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2916F5] to-[#157DEC] shadow-lg mb-6">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {currentContent.title}
            </h1>
            <p className="text-lg text-gray-600">{currentContent.subtitle}</p>
          </div>

          {/* Modern Card Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Rating - Modern */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <label className="block text-center text-base font-semibold text-gray-800 mb-6">
                  {currentContent.ratingLabel}
                </label>
                <div className="flex gap-3 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-all hover:scale-125 focus:outline-none group"
                    >
                      <Star
                        className={`w-14 h-14 transition-all duration-200 ${
                          star <= (hoveredRating || rating)
                            ? "text-yellow-400 fill-yellow-400 drop-shadow-lg"
                            : "text-gray-300 group-hover:text-gray-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name - Modern */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {currentContent.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={currentContent.namePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2916F5] focus:border-transparent transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Email - Modern */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {currentContent.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={currentContent.emailPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2916F5] focus:border-transparent transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Comment - Modern */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {currentContent.commentLabel}
                </label>
                <textarea
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={currentContent.commentPlaceholder}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2916F5] focus:border-transparent transition-all resize-none placeholder:text-gray-400"
                />
              </div>

              {/* Submit Button - Modern */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!rating || loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#2916F5] to-[#157DEC] text-white font-semibold text-base rounded-xl
                    hover:from-[#157DEC] hover:to-[#0909FF] transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {currentContent.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {currentContent.submitButton}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
