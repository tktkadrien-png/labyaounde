"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Star, LogOut, Mail, User, Calendar, MessageSquare, Filter, Search,
  Users, FileText, TrendingUp, BarChart3, RefreshCw, Briefcase, Newspaper, ArrowRight
} from "lucide-react";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";

interface Review {
  id: string;
  user_id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"overview" | "reviews">("overview");

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Stats en temps réel
  const [stats, setStats] = useState({
    totalUsers: 0,
    todayUsers: 0,
    totalReviews: 0,
    todayReviews: 0,
    avgRating: 0,
  });

  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "5" | "4" | "3" | "2" | "1">("all");

  const content = {
    fr: {
      dashboard: "Tableau de Bord",
      overview: "Vue d'ensemble",
      reviewsTab: "Avis",
      totalUsers: "Total Utilisateurs",
      newToday: "Nouveaux Aujourd'hui",
      totalReviews: "Total Avis",
      reviewsToday: "Avis Aujourd'hui",
      avgRating: "Note Moyenne",
      search: "Rechercher...",
      filterBy: "Filtrer par note",
      all: "Tous",
      stars: "étoiles",
      noReviews: "Aucun avis",
      refresh: "Actualiser",
      logout: "Déconnexion",
    },
    en: {
      dashboard: "Dashboard",
      overview: "Overview",
      reviewsTab: "Reviews",
      totalUsers: "Total Users",
      newToday: "New Today",
      totalReviews: "Total Reviews",
      reviewsToday: "Reviews Today",
      avgRating: "Average Rating",
      search: "Search...",
      filterBy: "Filter by rating",
      all: "All",
      stars: "stars",
      noReviews: "No reviews",
      refresh: "Refresh",
      logout: "Logout",
    }
  };

  const currentContent = content[language];

  useEffect(() => {
    // Vérifier si déjà authentifié dans le sessionStorage
    const authStatus = sessionStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchAllData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Mise à jour automatique toutes les 10 secondes seulement si authentifié
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      fetchAllData();
    }, 10000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  useEffect(() => {
    filterReviews();
  }, [searchTerm, statusFilter, reviews]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mot de passe admin: LabYaounde2025!
    if (password === 'LabYaounde2025!') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuthenticated', 'true');
      setError("");
      fetchAllData();
    } else {
      setError("Mot de passe incorrect");
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchUsers(),
        fetchReviews(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      // Compter les utilisateurs uniques à partir des avis
      const { data: reviewsData, error } = await supabase
        .from("reviews")
        .select("user_id, created_at");

      if (error) {
        console.error("Error fetching users from reviews:", error);
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Utilisateurs uniques
      const uniqueUsers = new Set(reviewsData?.map(r => r.user_id) || []);
      const totalUsers = uniqueUsers.size;

      // Nouveaux utilisateurs aujourd'hui
      const todayUsers = reviewsData?.filter(r => {
        const createdAt = new Date(r.created_at);
        return createdAt >= today;
      }).length || 0;

      setStats(prev => ({
        ...prev,
        totalUsers,
        todayUsers,
      }));
    } catch (error) {
      console.error("Error in fetchUsers:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
        return;
      }

      setReviews(data || []);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const totalReviews = data?.length || 0;
      const todayReviews = data?.filter(r => {
        const createdAt = new Date(r.created_at);
        return createdAt >= today;
      }).length || 0;

      const avgRating = totalReviews > 0
        ? data.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

      setStats(prev => ({
        ...prev,
        totalReviews,
        todayReviews,
        avgRating: Number(avgRating.toFixed(1))
      }));
    } catch (error) {
      console.error("Error in fetchReviews:", error);
    }
  };

  const filterReviews = () => {
    let filtered = reviews;

    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      const rating = parseInt(statusFilter);
      filtered = filtered.filter(r => r.rating === rating);
    }

    setFilteredReviews(filtered);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
    setPassword("");
  };

  // Si pas authentifié, afficher le formulaire de connexion
  if (!isAuthenticated) {
    return (
      <>
        <TopNavigationBar />
        <MainNavigation />

        <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-full mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès Admin</h2>
                <p className="text-gray-600">Entrez le mot de passe pour accéder au tableau de bord</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B3D5F] focus:border-transparent"
                    placeholder="Entrez le mot de passe admin"
                    required
                  />
                  {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0B3D5F] to-[#0B4D6F] text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  Se connecter
                </button>
              </form>
            </div>
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

      <main className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{currentContent.dashboard}</h1>
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={fetchAllData}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 min-h-[44px] flex-1 sm:flex-initial text-sm sm:text-base"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">{currentContent.refresh}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors min-h-[44px] flex-1 sm:flex-initial text-sm sm:text-base"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentContent.logout}</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-4 sm:mt-6 border-b border-gray-200 -mx-4 sm:mx-0 px-4 sm:px-0">
              <nav className="flex gap-4 sm:gap-8 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`pb-3 sm:pb-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap min-h-[44px] flex items-center ${
                    activeTab === "overview"
                      ? "border-[#0B3D5F] text-[#0B3D5F]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <BarChart3 className="w-4 h-4 inline mr-1.5 sm:mr-2" />
                  {currentContent.overview}
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-3 sm:pb-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap min-h-[44px] flex items-center ${
                    activeTab === "reviews"
                      ? "border-[#0B3D5F] text-[#0B3D5F]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <MessageSquare className="w-4 h-4 inline mr-1.5 sm:mr-2" />
                  {currentContent.reviewsTab}
                </button>
              </nav>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Total Users */}
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">{currentContent.totalUsers}</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.totalUsers}</p>
                      <p className="text-xs text-green-600 mt-1">+{stats.todayUsers} {currentContent.newToday.toLowerCase()}</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-blue-100 rounded-full flex-shrink-0">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Total Reviews */}
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">{currentContent.totalReviews}</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.totalReviews}</p>
                      <p className="text-xs text-green-600 mt-1">+{stats.todayReviews} {currentContent.reviewsToday.toLowerCase()}</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-yellow-100 rounded-full flex-shrink-0">
                      <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>

                {/* Average Rating */}
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">{currentContent.avgRating}</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.avgRating} / 5</p>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                              star <= Math.round(stats.avgRating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="p-2 sm:p-3 bg-green-100 rounded-full flex-shrink-0">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Access Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Link
                  href="/admin-dashboard/job-offers"
                  className="bg-gradient-to-br from-[#0B3D5F] to-[#0B4D6F] rounded-lg shadow-lg p-6 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Briefcase className="w-10 h-10 text-white" />
                    <ArrowRight className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Gestion des Offres d'Emploi</h3>
                  <p className="text-white/80 text-sm">Créer et gérer les offres d'emploi et stages</p>
                </Link>

                <Link
                  href="/admin-dashboard/actualites"
                  className="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Newspaper className="w-10 h-10 text-white" />
                    <ArrowRight className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Gestion des Actualités</h3>
                  <p className="text-white/80 text-sm">Créer et gérer les actualités du laboratoire</p>
                </Link>
              </div>

              {/* Recent Reviews */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Derniers Avis</h2>
                <div className="space-y-3 sm:space-y-4">
                  {reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-3 sm:pb-4 last:border-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{review.name}</p>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star
                                  key={star}
                                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                                    star <= review.rating
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{review.comment}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(review.created_at).toLocaleDateString('fr-FR')} à {new Date(review.created_at).toLocaleTimeString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              {/* Filters */}
              <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder={currentContent.search}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0B3D5F] focus:border-transparent min-h-[44px]"
                    />
                  </div>
                </div>
                <div className="w-full sm:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0B3D5F] focus:border-transparent min-h-[44px]"
                  >
                    <option value="all">{currentContent.all}</option>
                    <option value="5">5 {currentContent.stars}</option>
                    <option value="4">4 {currentContent.stars}</option>
                    <option value="3">3 {currentContent.stars}</option>
                    <option value="2">2 {currentContent.stars}</option>
                    <option value="1">1 {currentContent.stars}</option>
                  </select>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">{currentContent.noReviews}</p>
                ) : (
                  filteredReviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{review.name}</p>
                          <p className="text-sm text-gray-500">{review.email}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(review.created_at).toLocaleDateString('fr-FR')} à {new Date(review.created_at).toLocaleTimeString('fr-FR')}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
