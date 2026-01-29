"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, Download, Calendar, Clock, Eye, ArrowLeft } from "lucide-react";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/contents/LanguageContext";

interface Result {
  id: string;
  user_id: string;
  test_name: string;
  test_type: string;
  result_date: string;
  status: "pending" | "ready" | "viewed";
  file_url: string;
  notes: string;
  created_at: string;
}

export default function ResultsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  const content = {
    fr: {
      title: "Mes Résultats",
      subtitle: "Consultez et téléchargez vos résultats de tests",
      noResults: "Aucun résultat disponible pour le moment",
      noResultsDesc: "Vos résultats de laboratoire apparaîtront ici une fois disponibles.",
      testName: "Test",
      testType: "Type",
      date: "Date",
      status: "Statut",
      actions: "Actions",
      view: "Voir",
      download: "Télécharger",
      pending: "En attente",
      ready: "Disponible",
      viewed: "Consulté",
      backButton: "Retour",
    },
    en: {
      title: "My Results",
      subtitle: "View and download your test results",
      noResults: "No results available at the moment",
      noResultsDesc: "Your laboratory results will appear here once available.",
      testName: "Test",
      testType: "Type",
      date: "Date",
      status: "Status",
      actions: "Actions",
      view: "View",
      download: "Download",
      pending: "Pending",
      ready: "Ready",
      viewed: "Viewed",
      backButton: "Back",
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
      await fetchResults(user.id);
    } catch (error) {
      console.error("Auth error:", error);
      router.push("/login");
    }
  };

  const fetchResults = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("patient_results")
        .select("*")
        .eq("user_id", userId)
        .order("result_date", { ascending: false });

      if (error) throw error;

      setResults(data || []);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsViewed = async (resultId: string) => {
    try {
      await supabase
        .from("patient_results")
        .update({ status: "viewed" })
        .eq("id", resultId);

      setResults(results.map(r => r.id === resultId ? { ...r, status: "viewed" as const } : r));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleView = async (result: Result) => {
    if (result.file_url) {
      window.open(result.file_url, "_blank");
      if (result.status !== "viewed") {
        await markAsViewed(result.id);
      }
    }
  };

  const handleDownload = async (result: Result) => {
    if (result.file_url) {
      const link = document.createElement("a");
      link.href = result.file_url;
      link.download = `${result.test_name}_${result.result_date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (result.status !== "viewed") {
        await markAsViewed(result.id);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-[#FE5000]/20 text-[#FE5000] border-[#FE5000]/50",
      ready: "bg-green-100 text-green-800 border-green-300",
      viewed: "bg-[#00CED1]/20 text-blue-800 border-blue-300",
    };
    const labels = {
      pending: currentContent.pending,
      ready: currentContent.ready,
      viewed: currentContent.viewed,
    };
    return { style: styles[status as keyof typeof styles], label: labels[status as keyof typeof labels] };
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
        <div className="max-w-7xl mx-auto">
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

          {/* Results List */}
          {results.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentContent.noResults}</h3>
              <p className="text-gray-600">{currentContent.noResultsDesc}</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {currentContent.testName}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {currentContent.testType}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {currentContent.date}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {currentContent.status}
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {currentContent.actions}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.map((result) => {
                      const statusBadge = getStatusBadge(result.status);
                      return (
                        <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 text-[#0047AB] mr-3" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{result.test_name}</div>
                                {result.notes && <div className="text-xs text-gray-500">{result.notes}</div>}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{result.test_type}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-2" />
                              {new Date(result.result_date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.style}`}>
                              {statusBadge.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleView(result)}
                                disabled={!result.file_url}
                                className="inline-flex items-center gap-1 px-3 py-2 bg-[#0047AB] text-white rounded-lg hover:bg-[#0080FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Eye className="w-4 h-4" />
                                {currentContent.view}
                              </button>
                              <button
                                onClick={() => handleDownload(result)}
                                disabled={!result.file_url}
                                className="inline-flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Download className="w-4 h-4" />
                                {currentContent.download}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-200">
                {results.map((result) => {
                  const statusBadge = getStatusBadge(result.status);
                  return (
                    <div key={result.id} className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-[#0047AB] mt-1" />
                          <div>
                            <h3 className="font-medium text-gray-900">{result.test_name}</h3>
                            <p className="text-sm text-gray-600">{result.test_type}</p>
                            {result.notes && <p className="text-xs text-gray-500 mt-1">{result.notes}</p>}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusBadge.style}`}>
                          {statusBadge.label}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(result.result_date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(result)}
                          disabled={!result.file_url}
                          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-[#0047AB] text-white rounded-lg hover:bg-[#0080FF] transition-colors disabled:opacity-50"
                        >
                          <Eye className="w-4 h-4" />
                          {currentContent.view}
                        </button>
                        <button
                          onClick={() => handleDownload(result)}
                          disabled={!result.file_url}
                          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          <Download className="w-4 h-4" />
                          {currentContent.download}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
