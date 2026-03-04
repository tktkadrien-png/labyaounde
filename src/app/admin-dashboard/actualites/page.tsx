"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Newspaper, Plus, Edit, Trash2, Eye, EyeOff, Save, X, ArrowLeft,
  CheckCircle, XCircle
} from "lucide-react";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { supabase } from "@/lib/supabase";

interface Actualite {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category: string;
  date: string;
  is_published: boolean;
  created_at: string;
}

export default function ActualitesAdmin() {
  const router = useRouter();
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingActualite, setEditingActualite] = useState<Actualite | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "Général",
    date: "",
    is_published: false,
  });

  // Protection: vérifier l'authentification admin
  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuth) {
      router.push('/admin-dashboard');
    }
  }, [router]);

  useEffect(() => {
    fetchActualites();
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchActualites = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('actualites')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching actualites:', error);
    } else {
      setActualites(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingActualite) {
      const { error } = await supabase
        .from('actualites')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingActualite.id);

      if (error) {
        console.error('Error updating actualite:', error);
        showToast('Erreur lors de la mise à jour', 'error');
      } else {
        showToast('Actualité mise à jour avec succès !');
        resetForm();
        fetchActualites();
      }
    } else {
      const { error } = await supabase
        .from('actualites')
        .insert([formData]);

      if (error) {
        console.error('Error creating actualite:', error);
        showToast(`Erreur lors de la création : ${error.message}`, 'error');
      } else {
        showToast('Actualité créée avec succès !');
        resetForm();
        fetchActualites();
      }
    }
  };

  const handleEdit = (actualite: Actualite) => {
    setEditingActualite(actualite);
    setFormData({
      title: actualite.title,
      excerpt: actualite.excerpt,
      content: actualite.content,
      image_url: actualite.image_url || "",
      category: actualite.category,
      date: actualite.date,
      is_published: actualite.is_published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette actualité?')) return;

    const { error } = await supabase
      .from('actualites')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting actualite:', error);
      showToast('Erreur lors de la suppression', 'error');
    } else {
      showToast('Actualité supprimée avec succès !');
      fetchActualites();
    }
  };

  const togglePublish = async (actualite: Actualite) => {
    const { error } = await supabase
      .from('actualites')
      .update({ is_published: !actualite.is_published })
      .eq('id', actualite.id);

    if (error) {
      console.error('Error toggling publish:', error);
      showToast('Erreur lors du changement de statut', 'error');
    } else {
      showToast(actualite.is_published ? 'Actualité dépubliée' : 'Actualité publiée');
      fetchActualites();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      image_url: "",
      category: "Général",
      date: "",
      is_published: false,
    });
    setEditingActualite(null);
    setShowForm(false);
  };

  const categories = ["Général", "Technologie", "Certification", "Événement", "Santé"];

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl text-white font-semibold transition-all flex items-center gap-3 ${
          toast.type === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 flex-shrink-0" />
          )}
          {toast.message}
        </div>
      )}

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin-dashboard"
              className="inline-flex items-center gap-2 text-[#0A065D] hover:text-[#0080FF] mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour au tableau de bord
            </Link>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-[#1E40AF] flex items-center gap-3">
                  <Newspaper className="w-8 h-8 text-[#0A065D]" />
                  Gestion des Actualités
                </h1>
                <p className="text-[#1E40AF]/70 mt-2">Créer et gérer les actualités du laboratoire</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0A065D] to-[#0080FF] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {showForm ? 'Annuler' : 'Nouvelle Actualité'}
              </button>
            </div>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#1E40AF] mb-6">
                {editingActualite ? 'Modifier l\'actualité' : 'Nouvelle actualité'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#1E40AF]/80 mb-2">
                      Titre *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A065D] focus:border-transparent"
                      placeholder="Titre de l'actualité"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1E40AF]/80 mb-2">
                      Catégorie *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A065D] focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1E40AF]/80 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A065D] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1E40AF]/80 mb-2">
                      URL de l'image (optionnel)
                    </label>
                    <input
                      type="text"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A065D] focus:border-transparent"
                      placeholder="/images/actualite.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1E40AF]/80 mb-2">
                    Extrait *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A065D] focus:border-transparent"
                    placeholder="Court résumé de l'actualité..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1E40AF]/80 mb-2">
                    Contenu *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A065D] focus:border-transparent"
                    placeholder="Contenu complet de l'actualité..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="w-5 h-5 text-[#0A065D] rounded focus:ring-2 focus:ring-[#0A065D]"
                  />
                  <label htmlFor="is_published" className="text-sm font-semibold text-[#1E40AF]/80">
                    Publier immédiatement
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0A065D] to-[#0080FF] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
                  >
                    <Save className="w-5 h-5" />
                    {editingActualite ? 'Mettre à jour' : 'Créer'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-8 py-3 border-2 border-gray-300 text-[#1E40AF]/80 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Actualites List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A065D] mx-auto"></div>
              </div>
            ) : actualites.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1E40AF] mb-2">Aucune actualité</h3>
                <p className="text-[#1E40AF]/70">Créez votre première actualité</p>
              </div>
            ) : (
              actualites.map((actualite) => (
                <div key={actualite.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-[#1E40AF]">{actualite.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          actualite.is_published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-[#1E40AF]/80'
                        }`}>
                          {actualite.is_published ? 'Publié' : 'Brouillon'}
                        </span>
                        <span className="bg-[#0A065D]/10 text-[#0A065D] px-3 py-1 rounded-full text-xs font-semibold">
                          {actualite.category}
                        </span>
                      </div>
                      <p className="text-[#1E40AF]/70 text-sm mb-2">{actualite.date}</p>
                      <p className="text-[#1E40AF]/80 mb-2">{actualite.excerpt}</p>
                      <p className="text-[#1E40AF]/70 text-sm line-clamp-2">{actualite.content}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => togglePublish(actualite)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title={actualite.is_published ? 'Dépublier' : 'Publier'}
                      >
                        {actualite.is_published ? (
                          <EyeOff className="w-5 h-5 text-[#1E40AF]/70" />
                        ) : (
                          <Eye className="w-5 h-5 text-[#1E40AF]/70" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(actualite)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-5 h-5 text-[#0A065D]" />
                      </button>
                      <button
                        onClick={() => handleDelete(actualite.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
