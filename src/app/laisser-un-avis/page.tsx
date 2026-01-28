"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, Send, CheckCircle, Calendar, Stethoscope, ThumbsUp, MessageSquare, User, Clock, ChevronDown, Award } from "lucide-react";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { supabase } from "@/lib/supabase";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  service_type?: string;
  visit_date?: string;
  created_at: string;
  would_recommend?: boolean;
}

export default function ReviewPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [existingReviews, setExistingReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
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
    fetchReviews();
  }, [router]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;

      if (data && data.length > 0) {
        setExistingReviews(data);
        setTotalReviews(data.length);
        const avg = data.reduce((sum, review) => sum + review.rating, 0) / data.length;
        setAverageRating(Math.round(avg * 10) / 10);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const content = {
    fr: {
      title: "Partagez votre expérience",
      subtitle: "Votre avis détaillé nous aide à améliorer nos services",
      ratingLabel: "Quelle est votre note globale?",
      nameLabel: "Nom complet",
      namePlaceholder: "Jean Dupont",
      emailLabel: "Email",
      emailPlaceholder: "jean.dupont@example.com",
      serviceTypeLabel: "Type de service",
      serviceTypePlaceholder: "Sélectionnez un service",
      serviceTypes: [
        { value: "prelevement", label: "Prélèvement sanguin" },
        { value: "analyse", label: "Analyses médicales" },
        { value: "resultats", label: "Retrait de résultats" },
        { value: "consultation", label: "Consultation" },
        { value: "autre", label: "Autre" },
      ],
      visitDateLabel: "Date de votre visite",
      recommendLabel: "Recommanderiez-vous notre laboratoire?",
      recommendYes: "Oui, absolument!",
      recommendNo: "Non",
      commentLabel: "Votre avis détaillé",
      commentPlaceholder: "Parlez-nous de votre expérience avec notre laboratoire... Qu'avez-vous aimé? Comment pouvons-nous nous améliorer?",
      submitButton: "Publier mon avis",
      submitting: "Publication...",
      successTitle: "Merci pour votre avis!",
      successMessage: "Votre retour est précieux pour nous et aide d'autres patients.",
      backButton: "Retour à l'accueil",
      reviewsTitle: "Avis de nos patients",
      reviewsSubtitle: "Découvrez ce que nos patients disent de nous",
      averageRating: "Note moyenne",
      totalReviews: "avis",
      showMore: "Voir plus d'avis",
      showLess: "Voir moins",
      noReviews: "Soyez le premier à laisser un avis!",
      recommended: "Recommande ce laboratoire",
      ratingDescriptions: ["Très mauvais", "Mauvais", "Moyen", "Bon", "Excellent"],
      validationError: "Veuillez remplir tous les champs obligatoires",
      ratingError: "Veuillez sélectionner une note",
    },
    en: {
      title: "Share your experience",
      subtitle: "Your detailed review helps us improve our services",
      ratingLabel: "What is your overall rating?",
      nameLabel: "Full name",
      namePlaceholder: "John Doe",
      emailLabel: "Email",
      emailPlaceholder: "john.doe@example.com",
      serviceTypeLabel: "Type of service",
      serviceTypePlaceholder: "Select a service",
      serviceTypes: [
        { value: "prelevement", label: "Blood collection" },
        { value: "analyse", label: "Medical tests" },
        { value: "resultats", label: "Results pickup" },
        { value: "consultation", label: "Consultation" },
        { value: "autre", label: "Other" },
      ],
      visitDateLabel: "Date of your visit",
      recommendLabel: "Would you recommend our laboratory?",
      recommendYes: "Yes, absolutely!",
      recommendNo: "No",
      commentLabel: "Your detailed review",
      commentPlaceholder: "Tell us about your experience with our laboratory... What did you like? How can we improve?",
      submitButton: "Publish Review",
      submitting: "Publishing...",
      successTitle: "Thank you for your review!",
      successMessage: "Your feedback is valuable to us and helps other patients.",
      backButton: "Back to home",
      reviewsTitle: "Patient Reviews",
      reviewsSubtitle: "See what our patients say about us",
      averageRating: "Average rating",
      totalReviews: "reviews",
      showMore: "Show more reviews",
      showLess: "Show less",
      noReviews: "Be the first to leave a review!",
      recommended: "Recommends this laboratory",
      ratingDescriptions: ["Very poor", "Poor", "Average", "Good", "Excellent"],
      validationError: "Please fill in all required fields",
      ratingError: "Please select a rating",
    },
  };

  const currentContent = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (rating === 0) {
      setError(currentContent.ratingError);
      return;
    }

    if (!name.trim() || !comment.trim()) {
      setError(currentContent.validationError);
      return;
    }

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
          service_type: serviceType || "autre",
          visit_date: visitDate || null,
          would_recommend: wouldRecommend,
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getServiceLabel = (value: string) => {
    const service = currentContent.serviceTypes.find(s => s.value === value);
    return service ? service.label : value;
  };

  const displayedReviews = showAllReviews ? existingReviews : existingReviews.slice(0, 3);

  if (isSubmitted) {
    return (
      <>
        <TopNavigationBar />
        <MainNavigation />
        <main className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full text-center">
            <div className="py-12">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {currentContent.successTitle}
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                {currentContent.successMessage}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#2916F5] to-[#157DEC] text-white font-semibold rounded-xl
                    hover:from-[#157DEC] hover:to-[#0909FF] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {currentContent.backButton}
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Show loading while checking auth
  if (!user) {
    return (
      <>
        <TopNavigationBar />
        <MainNavigation />
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#2916F5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">{language === 'fr' ? 'Chargement...' : 'Loading...'}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#2916F5] via-[#157DEC] to-[#0909FF] text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
              <Star className="w-10 h-10 text-[#FE5000]" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {currentContent.title}
            </h1>
            <p className="text-xl text-white/90">{currentContent.subtitle}</p>

            {/* Stats */}
            {totalReviews > 0 && (
              <div className="mt-10 flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-[#FE5000]">{averageRating}</span>
                    <Star className="w-8 h-8 text-[#FE5000] fill-[#FE5000]" />
                  </div>
                  <p className="text-white/80 text-sm mt-1">{currentContent.averageRating}</p>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div className="text-center">
                  <span className="text-4xl font-bold text-[#FE5000]">{totalReviews}</span>
                  <p className="text-white/80 text-sm mt-1">{currentContent.totalReviews}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Review Form */}
            <div>
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm rounded-r-lg">
                      {error}
                    </div>
                  )}

                  {/* Rating */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-6">
                    <label className="block text-center text-base font-semibold text-gray-800 mb-4">
                      {currentContent.ratingLabel}
                    </label>
                    <div className="flex gap-2 justify-center mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-all hover:scale-110 focus:outline-none group"
                        >
                          <Star
                            className={`w-12 h-12 transition-all duration-200 ${
                              star <= (hoveredRating || rating)
                                ? "text-[#FE5000] fill-[#FE5000] drop-shadow-lg"
                                : "text-gray-300 group-hover:text-gray-400"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {(hoveredRating || rating) > 0 && (
                      <p className="text-center text-sm font-medium text-[#FE5000]">
                        {currentContent.ratingDescriptions[(hoveredRating || rating) - 1]}
                      </p>
                    )}
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Stethoscope className="w-4 h-4 inline mr-2" />
                      {currentContent.serviceTypeLabel}
                    </label>
                    <div className="relative">
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2916F5] focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
                      >
                        <option value="">{currentContent.serviceTypePlaceholder}</option>
                        {currentContent.serviceTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Visit Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      {currentContent.visitDateLabel}
                    </label>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2916F5] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      {currentContent.nameLabel} *
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

                  {/* Email (readonly) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {currentContent.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  {/* Would Recommend */}
                  <div className="bg-gradient-to-br from-[#2916F5]/5 to-[#157DEC]/5 rounded-2xl p-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      <ThumbsUp className="w-4 h-4 inline mr-2" />
                      {currentContent.recommendLabel}
                    </label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setWouldRecommend(true)}
                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                          wouldRecommend
                            ? "bg-green-500 text-white shadow-lg"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {currentContent.recommendYes}
                      </button>
                      <button
                        type="button"
                        onClick={() => setWouldRecommend(false)}
                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                          !wouldRecommend
                            ? "bg-red-500 text-white shadow-lg"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {currentContent.recommendNo}
                      </button>
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      {currentContent.commentLabel} *
                    </label>
                    <textarea
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={currentContent.commentPlaceholder}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2916F5] focus:border-transparent transition-all resize-none placeholder:text-gray-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
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

            {/* Existing Reviews */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentContent.reviewsTitle}</h2>
                <p className="text-gray-600">{currentContent.reviewsSubtitle}</p>
              </div>

              {existingReviews.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                  <Award className="w-16 h-16 text-[#FE5000] mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">{currentContent.noReviews}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayedReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#2916F5] to-[#157DEC] rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {review.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-3 h-3" />
                              {formatDate(review.created_at)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "text-[#FE5000] fill-[#FE5000]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {review.service_type && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#2916F5]/10 text-[#2916F5] rounded-full text-xs font-medium mb-3">
                          <Stethoscope className="w-3 h-3" />
                          {getServiceLabel(review.service_type)}
                        </div>
                      )}

                      <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>

                      {review.would_recommend && (
                        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                          <ThumbsUp className="w-4 h-4" />
                          {currentContent.recommended}
                        </div>
                      )}
                    </div>
                  ))}

                  {existingReviews.length > 3 && (
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="w-full py-3 text-[#2916F5] font-medium hover:bg-[#2916F5]/5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      {showAllReviews ? currentContent.showLess : currentContent.showMore}
                      <ChevronDown className={`w-5 h-5 transition-transform ${showAllReviews ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
