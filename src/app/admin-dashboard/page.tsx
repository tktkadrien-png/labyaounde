"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Star, LogOut, Mail, User, Calendar, MessageSquare, Filter, Search,
  Users, FileText, TrendingUp, BarChart3, RefreshCw, Briefcase, Newspaper,
  ArrowRight, ArrowUp, ArrowDown, Clock, CheckCircle, XCircle, Eye,
  Activity, PieChart, CalendarDays, ChevronRight, Bell, Settings,
  ThumbsUp, ThumbsDown, Trash2
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
  service_type?: string;
  would_recommend?: boolean;
  status?: string;
  created_at: string;
}

interface Actualite {
  id: string;
  title: string;
  is_published: boolean;
  created_at: string;
}

interface JobOffer {
  id: string;
  title: string;
  is_published: boolean;
  created_at: string;
}

interface DailyStats {
  date: string;
  reviews: number;
  users: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "analytics">("overview");
  const [timePeriod, setTimePeriod] = useState<"day" | "week" | "month" | "year">("week");

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Data states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "5" | "4" | "3" | "2" | "1">("all");

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    todayUsers: 0,
    weekUsers: 0,
    monthUsers: 0,
    totalReviews: 0,
    todayReviews: 0,
    weekReviews: 0,
    monthReviews: 0,
    avgRating: 0,
    totalActualites: 0,
    publishedActualites: 0,
    totalJobOffers: 0,
    publishedJobOffers: 0,
    recommendRate: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });

  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);

  const content = {
    fr: {
      dashboard: "Tableau de Bord Administrateur",
      overview: "Vue d'ensemble",
      reviewsTab: "Gestion Avis",
      analytics: "Analytiques",
      totalUsers: "Utilisateurs",
      newToday: "Aujourd'hui",
      thisWeek: "Cette semaine",
      thisMonth: "Ce mois",
      thisYear: "Cette année",
      totalReviews: "Total Avis",
      reviewsToday: "Avis aujourd'hui",
      avgRating: "Note Moyenne",
      search: "Rechercher par nom, email...",
      filterBy: "Filtrer par note",
      all: "Tous",
      stars: "étoiles",
      noReviews: "Aucun avis trouvé",
      refresh: "Actualiser",
      logout: "Déconnexion",
      quickActions: "Actions Rapides",
      recentActivity: "Activité Récente",
      performanceOverview: "Performance",
      contentManagement: "Gestion Contenu",
      actualites: "Actualités",
      jobOffers: "Offres d'emploi",
      published: "Publiées",
      drafts: "Brouillons",
      day: "Jour",
      week: "Semaine",
      month: "Mois",
      year: "Année",
      ratingDistribution: "Distribution des Notes",
      recommendRate: "Taux de Recommandation",
      trendsOverTime: "Tendances",
      delete: "Supprimer",
      approve: "Approuver",
      reject: "Rejeter",
      pending: "En attente",
      approved: "Approuvé",
      rejected: "Rejeté",
    },
    en: {
      dashboard: "Admin Dashboard",
      overview: "Overview",
      reviewsTab: "Review Management",
      analytics: "Analytics",
      totalUsers: "Users",
      newToday: "Today",
      thisWeek: "This week",
      thisMonth: "This month",
      thisYear: "This year",
      totalReviews: "Total Reviews",
      reviewsToday: "Reviews today",
      avgRating: "Average Rating",
      search: "Search by name, email...",
      filterBy: "Filter by rating",
      all: "All",
      stars: "stars",
      noReviews: "No reviews found",
      refresh: "Refresh",
      logout: "Logout",
      quickActions: "Quick Actions",
      recentActivity: "Recent Activity",
      performanceOverview: "Performance",
      contentManagement: "Content Management",
      actualites: "News",
      jobOffers: "Job Offers",
      published: "Published",
      drafts: "Drafts",
      day: "Day",
      week: "Week",
      month: "Month",
      year: "Year",
      ratingDistribution: "Rating Distribution",
      recommendRate: "Recommendation Rate",
      trendsOverTime: "Trends",
      delete: "Delete",
      approve: "Approve",
      reject: "Reject",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
    }
  };

  const currentContent = content[language];

  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchAllData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      fetchAllData();
    }, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  useEffect(() => {
    filterReviews();
  }, [searchTerm, statusFilter, reviews]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'LABYAOUNDE2025ADMIN') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuthenticated', 'true');
      setError("");
      fetchAllData();
    } else {
      setError(language === 'fr' ? "Mot de passe incorrect" : "Incorrect password");
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchReviews(),
        fetchActualites(),
        fetchJobOffers(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
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
      calculateStats(data || []);
    } catch (error) {
      console.error("Error in fetchReviews:", error);
    }
  };

  const fetchActualites = async () => {
    try {
      const { data, error } = await supabase
        .from("actualites")
        .select("id, title, is_published, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching actualites:", error);
        return;
      }

      setActualites(data || []);
      setStats(prev => ({
        ...prev,
        totalActualites: data?.length || 0,
        publishedActualites: data?.filter(a => a.is_published).length || 0,
      }));
    } catch (error) {
      console.error("Error in fetchActualites:", error);
    }
  };

  const fetchJobOffers = async () => {
    try {
      const { data, error } = await supabase
        .from("job_offers")
        .select("id, title, is_published, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching job offers:", error);
        return;
      }

      setJobOffers(data || []);
      setStats(prev => ({
        ...prev,
        totalJobOffers: data?.length || 0,
        publishedJobOffers: data?.filter(j => j.is_published).length || 0,
      }));
    } catch (error) {
      console.error("Error in fetchJobOffers:", error);
    }
  };

  const calculateStats = (reviewsData: Review[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Get unique users
    const uniqueUsers = new Set(reviewsData.map(r => r.user_id));
    const totalUsers = uniqueUsers.size;

    // Today's users
    const todayReviewUsers = new Set(
      reviewsData
        .filter(r => new Date(r.created_at) >= today)
        .map(r => r.user_id)
    );

    // Week users
    const weekReviewUsers = new Set(
      reviewsData
        .filter(r => new Date(r.created_at) >= weekAgo)
        .map(r => r.user_id)
    );

    // Month users
    const monthReviewUsers = new Set(
      reviewsData
        .filter(r => new Date(r.created_at) >= monthAgo)
        .map(r => r.user_id)
    );

    // Reviews counts
    const todayReviews = reviewsData.filter(r => new Date(r.created_at) >= today).length;
    const weekReviews = reviewsData.filter(r => new Date(r.created_at) >= weekAgo).length;
    const monthReviews = reviewsData.filter(r => new Date(r.created_at) >= monthAgo).length;

    // Average rating
    const avgRating = reviewsData.length > 0
      ? reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length
      : 0;

    // Rating distribution
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsData.forEach(r => {
      if (r.rating >= 1 && r.rating <= 5) {
        ratingDistribution[r.rating as keyof typeof ratingDistribution]++;
      }
    });

    // Recommendation rate
    const recommendCount = reviewsData.filter(r => r.would_recommend === true).length;
    const recommendRate = reviewsData.length > 0
      ? Math.round((recommendCount / reviewsData.length) * 100)
      : 0;

    // Calculate daily stats for charts
    const last7Days: DailyStats[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const dayReviews = reviewsData.filter(r =>
        r.created_at.startsWith(dateStr)
      );
      const dayUsers = new Set(dayReviews.map(r => r.user_id));

      last7Days.push({
        date: date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'short' }),
        reviews: dayReviews.length,
        users: dayUsers.size,
      });
    }
    setDailyStats(last7Days);

    setStats(prev => ({
      ...prev,
      totalUsers,
      todayUsers: todayReviewUsers.size,
      weekUsers: weekReviewUsers.size,
      monthUsers: monthReviewUsers.size,
      totalReviews: reviewsData.length,
      todayReviews,
      weekReviews,
      monthReviews,
      avgRating: Number(avgRating.toFixed(1)),
      ratingDistribution,
      recommendRate,
    }));
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

  const handleDeleteReview = async (id: string) => {
    if (!confirm(language === 'fr' ? 'Supprimer cet avis?' : 'Delete this review?')) return;

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchReviews();
    }
  };

  const handleUpdateReviewStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('reviews')
      .update({ status })
      .eq('id', id);

    if (!error) {
      fetchReviews();
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
    setPassword("");
  };

  const getStatsByPeriod = () => {
    switch (timePeriod) {
      case "day":
        return { users: stats.todayUsers, reviews: stats.todayReviews, label: currentContent.newToday };
      case "week":
        return { users: stats.weekUsers, reviews: stats.weekReviews, label: currentContent.thisWeek };
      case "month":
        return { users: stats.monthUsers, reviews: stats.monthReviews, label: currentContent.thisMonth };
      default:
        return { users: stats.totalUsers, reviews: stats.totalReviews, label: currentContent.thisYear };
    }
  };

  const periodStats = getStatsByPeriod();

  // Login form
  if (!isAuthenticated) {
    return (
      <>
        <TopNavigationBar />
        <MainNavigation />
        <main className="min-h-screen bg-gradient-to-br from-[#0A065D] via-[#0080FF] to-[#0909FF] flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0A065D] to-[#0080FF] rounded-2xl mb-4 shadow-lg">
                  <Settings className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === 'fr' ? 'Accès Administrateur' : 'Admin Access'}
                </h2>
                <p className="text-gray-600">
                  {language === 'fr' ? 'Entrez le mot de passe pour continuer' : 'Enter password to continue'}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'fr' ? 'Mot de passe' : 'Password'}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A065D] focus:border-transparent"
                    placeholder="••••••••••••"
                    required
                  />
                  {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0A065D] to-[#0080FF] text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  {language === 'fr' ? 'Se connecter' : 'Login'}
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

      <main className="min-h-screen bg-gray-100">
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#0A065D] via-[#0080FF] to-[#0909FF] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{currentContent.dashboard}</h1>
                <p className="text-white/80 text-sm mt-1">
                  {language === 'fr' ? 'Gérez votre laboratoire efficacement' : 'Manage your laboratory efficiently'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchAllData}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">{currentContent.refresh}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentContent.logout}</span>
                </button>
              </div>
            </div>

            {/* Time Period Selector */}
            <div className="flex gap-2 mt-6">
              {(["day", "week", "month", "year"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimePeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timePeriod === period
                      ? 'bg-white text-[#0A065D]'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {currentContent[period]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-6 p-1 inline-flex">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                activeTab === "overview"
                  ? "bg-[#0A065D] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              {currentContent.overview}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                activeTab === "reviews"
                  ? "bg-[#0A065D] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              {currentContent.reviewsTab}
              {reviews.length > 0 && (
                <span className="bg-[#FE5000] text-white text-xs px-2 py-0.5 rounded-full">
                  {reviews.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                activeTab === "analytics"
                  ? "bg-[#0A065D] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <PieChart className="w-4 h-4" />
              {currentContent.analytics}
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Users Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#0A065D]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{currentContent.totalUsers}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalUsers}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <ArrowUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">+{periodStats.users}</span>
                        <span className="text-xs text-gray-500">{periodStats.label}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-[#0A065D]/10 rounded-xl">
                      <Users className="w-8 h-8 text-[#0A065D]" />
                    </div>
                  </div>
                </div>

                {/* Reviews Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#FE5000]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{currentContent.totalReviews}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalReviews}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <ArrowUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">+{periodStats.reviews}</span>
                        <span className="text-xs text-gray-500">{periodStats.label}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-[#FE5000]/10 rounded-xl">
                      <MessageSquare className="w-8 h-8 text-[#FE5000]" />
                    </div>
                  </div>
                </div>

                {/* Rating Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{currentContent.avgRating}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stats.avgRating}/5</p>
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.round(stats.avgRating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-xl">
                      <Star className="w-8 h-8 text-yellow-600" />
                    </div>
                  </div>
                </div>

                {/* Recommendation Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{currentContent.recommendRate}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stats.recommendRate}%</p>
                      <div className="flex items-center gap-1 mt-2">
                        <ThumbsUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">{language === 'fr' ? 'Recommandent' : 'Recommend'}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-green-100 rounded-xl">
                      <ThumbsUp className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Management & Quick Actions */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Content Management */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#0A065D]" />
                    {currentContent.contentManagement}
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Actualités */}
                    <Link
                      href="/admin-dashboard/actualites"
                      className="group p-5 bg-gradient-to-br from-[#0A065D]/5 to-[#0080FF]/10 rounded-xl border-2 border-transparent hover:border-[#0A065D] transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-[#0A065D] rounded-lg">
                          <Newspaper className="w-6 h-6 text-white" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#0A065D] group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{currentContent.actualites}</h3>
                      <div className="flex gap-4 text-sm">
                        <span className="text-gray-600">{stats.totalActualites} total</span>
                        <span className="text-green-600">{stats.publishedActualites} {currentContent.published.toLowerCase()}</span>
                      </div>
                    </Link>

                    {/* Job Offers */}
                    <Link
                      href="/admin-dashboard/job-offers"
                      className="group p-5 bg-gradient-to-br from-[#FE5000]/5 to-[#FE5000]/10 rounded-xl border-2 border-transparent hover:border-[#FE5000] transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-[#FE5000] rounded-lg">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#FE5000] group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{currentContent.jobOffers}</h3>
                      <div className="flex gap-4 text-sm">
                        <span className="text-gray-600">{stats.totalJobOffers} total</span>
                        <span className="text-green-600">{stats.publishedJobOffers} {currentContent.published.toLowerCase()}</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Quick Stats Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#0A065D]" />
                    {currentContent.trendsOverTime}
                  </h2>

                  <div className="space-y-3">
                    {dailyStats.map((day, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-10">{day.date}</span>
                        <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#0A065D] to-[#0080FF] rounded-full transition-all"
                            style={{ width: `${Math.min((day.reviews / Math.max(...dailyStats.map(d => d.reviews), 1)) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 w-8">{day.reviews}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#0A065D]" />
                    {currentContent.recentActivity}
                  </h2>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className="text-sm text-[#0A065D] hover:underline flex items-center gap-1"
                  >
                    {language === 'fr' ? 'Voir tout' : 'View all'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0A065D] to-[#0080FF] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{review.name}</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= review.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(review.created_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {reviews.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>{currentContent.noReviews}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={currentContent.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A065D] focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A065D] focus:border-transparent"
                >
                  <option value="all">{currentContent.all}</option>
                  <option value="5">5 {currentContent.stars}</option>
                  <option value="4">4 {currentContent.stars}</option>
                  <option value="3">3 {currentContent.stars}</option>
                  <option value="2">2 {currentContent.stars}</option>
                  <option value="1">1 {currentContent.stars}</option>
                </select>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">{currentContent.noReviews}</p>
                  </div>
                ) : (
                  filteredReviews.map((review) => (
                    <div key={review.id} className="border-2 border-gray-100 rounded-xl p-6 hover:border-gray-200 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#0A065D] to-[#0080FF] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                            {review.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-bold text-gray-900">{review.name}</span>
                              <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= review.rating
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              {review.would_recommend && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                                  <ThumbsUp className="w-3 h-3" />
                                  {language === 'fr' ? 'Recommande' : 'Recommends'}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{review.email}</p>
                            {review.service_type && (
                              <span className="text-xs bg-[#0A065D]/10 text-[#0A065D] px-2 py-1 rounded-full mb-2 inline-block">
                                {review.service_type}
                              </span>
                            )}
                            <p className="text-gray-700 mt-2">{review.comment}</p>
                            <p className="text-xs text-gray-400 mt-2">
                              {new Date(review.created_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 sm:flex-col">
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title={currentContent.delete}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Rating Distribution */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#0A065D]" />
                    {currentContent.ratingDistribution}
                  </h2>

                  <div className="space-y-4">
                    {[5, 4, 3, 2, 1].map(rating => {
                      const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
                      const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;

                      return (
                        <div key={rating} className="flex items-center gap-4">
                          <div className="flex items-center gap-1 w-20">
                            <span className="font-medium text-gray-700">{rating}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          </div>
                          <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                rating >= 4 ? 'bg-green-500' : rating === 3 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-600 w-16 text-right">
                            {count} ({Math.round(percentage)}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#0A065D]" />
                    {currentContent.performanceOverview}
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl text-center">
                      <p className="text-3xl font-bold text-[#0A065D]">{stats.totalReviews}</p>
                      <p className="text-sm text-gray-600">{currentContent.totalReviews}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl text-center">
                      <p className="text-3xl font-bold text-green-600">{stats.recommendRate}%</p>
                      <p className="text-sm text-gray-600">{currentContent.recommendRate}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-xl text-center">
                      <p className="text-3xl font-bold text-yellow-600">{stats.avgRating}</p>
                      <p className="text-sm text-gray-600">{currentContent.avgRating}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl text-center">
                      <p className="text-3xl font-bold text-purple-600">{stats.totalUsers}</p>
                      <p className="text-sm text-gray-600">{currentContent.totalUsers}</p>
                    </div>
                  </div>

                  {/* Period comparison */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-3">{periodStats.label}</h3>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-2xl font-bold text-[#0A065D]">{periodStats.reviews}</p>
                        <p className="text-xs text-gray-500">{language === 'fr' ? 'Nouveaux avis' : 'New reviews'}</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{periodStats.users}</p>
                        <p className="text-xs text-gray-500">{language === 'fr' ? 'Utilisateurs actifs' : 'Active users'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Trend Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-[#0A065D]" />
                  {language === 'fr' ? 'Activité des 7 derniers jours' : 'Last 7 days activity'}
                </h2>

                <div className="flex items-end justify-between gap-2 h-48">
                  {dailyStats.map((day, index) => {
                    const maxReviews = Math.max(...dailyStats.map(d => d.reviews), 1);
                    const height = (day.reviews / maxReviews) * 100;

                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{day.reviews}</span>
                        <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '160px' }}>
                          <div
                            className="absolute bottom-0 w-full bg-gradient-to-t from-[#0A065D] to-[#0080FF] rounded-t-lg transition-all"
                            style={{ height: `${Math.max(height, 5)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{day.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
