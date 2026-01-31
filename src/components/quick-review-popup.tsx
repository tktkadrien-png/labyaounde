"use client";

import React, { useState, useEffect } from "react";
import { X, Star, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { useRouter } from "next/navigation";

interface QuickReviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickReviewPopup({ isOpen, onClose }: QuickReviewPopupProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const content = {
    fr: {
      title: "Partagez votre avis",
      subtitle: "Votre expérience nous aide à nous améliorer",
      ratingLabel: "Notez votre expérience",
      commentLabel: "Commentaire (optionnel)",
      commentPlaceholder: "Dites-nous ce que vous pensez...",
      submitButton: "Envoyer l'avis",
      detailedButton: "Écrire un avis détaillé",
      submitting: "Envoi...",
      successMessage: "Merci pour votre avis!",
      errorMessage: "Une erreur s'est produite",
      loginRequired: "Connectez-vous pour laisser un avis",
      loginButton: "Se connecter",
    },
    en: {
      title: "Share your review",
      subtitle: "Your experience helps us improve",
      ratingLabel: "Rate your experience",
      commentLabel: "Comment (optional)",
      commentPlaceholder: "Tell us what you think...",
      submitButton: "Submit Review",
      detailedButton: "Write Detailed Review",
      submitting: "Submitting...",
      successMessage: "Thank you for your review!",
      errorMessage: "An error occurred",
      loginRequired: "Sign in to leave a review",
      loginButton: "Sign In",
    },
  };

  const currentContent = content[language];

  useEffect(() => {
    if (isOpen) {
      checkAuth();
    }
  }, [isOpen]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError(currentContent.loginRequired);
      return;
    }

    if (rating === 0) {
      setError(language === 'fr' ? "Veuillez sélectionner une note" : "Please select a rating");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: submitError } = await supabase.from("reviews").insert([
        {
          user_id: user.id,
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || "Anonymous",
          email: user.email,
          rating: rating,
          comment: comment || (language === 'fr' ? "Aucun commentaire" : "No comment"),
        },
      ]);

      if (submitError) throw submitError;

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setRating(0);
        setComment("");
        setSuccess(false);
      }, 2000);
    } catch (error: any) {
      setError(error.message || currentContent.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailedReview = () => {
    onClose();
    router.push("/laisser-un-avis");
  };

  if (!isOpen) return null;

  // Don't show popup if user is not logged in
  if (!user) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-3xl shadow-2xl z-[9999] animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8">
          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentContent.successMessage}</h3>
              <p className="text-gray-600">{language === 'fr' ? 'Votre retour est précieux pour nous' : 'Your feedback is valuable to us'}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header */}
              <div className="text-center pb-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentContent.title}</h2>
                <p className="text-gray-600 text-sm">{currentContent.subtitle}</p>
              </div>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 text-red-700 text-sm rounded">
                  {error}
                </div>
              )}

              {/* Rating */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <label className="block text-center text-sm font-semibold text-gray-800 mb-4">
                  {currentContent.ratingLabel}
                </label>
                <div className="flex gap-3 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-all hover:scale-125 focus:outline-none group"
                    >
                      <Star
                        className={`w-12 h-12 transition-all duration-200 ${
                          star <= (hoverRating || rating)
                            ? "text-[#FE5000] fill-[#FE5000] drop-shadow-lg"
                            : "text-gray-300 group-hover:text-gray-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-3">
                  {currentContent.commentLabel}
                </label>
                <textarea
                  id="comment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={currentContent.commentPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A065D] focus:border-transparent transition-all resize-none text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading || rating === 0}
                  className="flex-1 flex justify-center items-center gap-2 py-3 px-4 bg-[#0A065D] text-white rounded-xl hover:bg-[#0080FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A065D] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {currentContent.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {currentContent.submitButton}
                    </>
                  )}
                </button>
              </div>

              {/* Detailed Review Link */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleDetailedReview}
                  className="text-sm text-[#0A065D] hover:text-[#0080FF] font-medium transition-colors"
                >
                  {currentContent.detailedButton}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
