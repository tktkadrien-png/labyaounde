"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Briefcase, Plus, Edit, Trash2, Eye, EyeOff, Save, X, ArrowLeft
} from "lucide-react";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { supabase } from "@/lib/supabase";

interface JobOffer {
  id: string;
  title: string;
  location: string;
  type: 'CDI' | 'CDD' | 'Stage' | 'Freelance';
  date: string;
  description: string;
  requirements?: string;
  is_published: boolean;
  created_at: string;
}

export default function JobOffersAdmin() {
  const router = useRouter();
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<JobOffer | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "CDI" as 'CDI' | 'CDD' | 'Stage' | 'Freelance',
    date: "",
    description: "",
    requirements: "",
    is_published: false,
  });

  useEffect(() => {
    fetchJobOffers();
  }, []);

  const fetchJobOffers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('job_offers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching job offers:', error);
    } else {
      setJobOffers(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingOffer) {
      // Update existing offer
      const { error } = await supabase
        .from('job_offers')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingOffer.id);

      if (error) {
        console.error('Error updating job offer:', error);
        alert('Erreur lors de la mise à jour de l\'offre');
      } else {
        alert('Offre mise à jour avec succès!');
        resetForm();
        fetchJobOffers();
      }
    } else {
      // Create new offer
      const { error } = await supabase
        .from('job_offers')
        .insert([formData]);

      if (error) {
        console.error('Error creating job offer:', error);
        alert(`Erreur lors de la création de l'offre: ${error.message}\n\nDétails: ${JSON.stringify(error, null, 2)}`);
      } else {
        alert('Offre créée avec succès!');
        resetForm();
        fetchJobOffers();
      }
    }
  };

  const handleEdit = (offer: JobOffer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      location: offer.location,
      type: offer.type,
      date: offer.date,
      description: offer.description,
      requirements: offer.requirements || "",
      is_published: offer.is_published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette offre?')) return;

    const { error } = await supabase
      .from('job_offers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting job offer:', error);
      alert('Erreur lors de la suppression');
    } else {
      alert('Offre supprimée avec succès!');
      fetchJobOffers();
    }
  };

  const togglePublish = async (offer: JobOffer) => {
    const { error } = await supabase
      .from('job_offers')
      .update({ is_published: !offer.is_published })
      .eq('id', offer.id);

    if (error) {
      console.error('Error toggling publish:', error);
    } else {
      fetchJobOffers();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      location: "",
      type: "CDI",
      date: "",
      description: "",
      requirements: "",
      is_published: false,
    });
    setEditingOffer(null);
    setShowForm(false);
  };

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin-dashboard"
              className="inline-flex items-center gap-2 text-[#0047AB] hover:text-[#0080FF] mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour au tableau de bord
            </Link>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Briefcase className="w-8 h-8 text-[#0047AB]" />
                  Gestion des Offres d'Emploi
                </h1>
                <p className="text-gray-600 mt-2">Créer et gérer les offres d'emploi et stages</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0047AB] to-[#0080FF] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {showForm ? 'Annuler' : 'Nouvelle Offre'}
              </button>
            </div>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingOffer ? 'Modifier l\'offre' : 'Nouvelle offre'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Titre du poste *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0047AB] focus:border-transparent"
                      placeholder="Ex: Biologiste Médical"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Localisation *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0047AB] focus:border-transparent"
                      placeholder="Ex: Yaoundé, Cameroun"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Type de contrat *
                    </label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0047AB] focus:border-transparent"
                    >
                      <option value="CDI">CDI</option>
                      <option value="CDD">CDD</option>
                      <option value="Stage">Stage</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date de publication *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0047AB] focus:border-transparent"
                      placeholder="Ex: Décembre 2025"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0047AB] focus:border-transparent"
                    placeholder="Description du poste..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Requis (optionnel)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0047AB] focus:border-transparent"
                    placeholder="Compétences et qualifications requises..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="w-5 h-5 text-[#0047AB] rounded focus:ring-2 focus:ring-[#0047AB]"
                  />
                  <label htmlFor="is_published" className="text-sm font-semibold text-gray-700">
                    Publier immédiatement
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0047AB] to-[#0080FF] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
                  >
                    <Save className="w-5 h-5" />
                    {editingOffer ? 'Mettre à jour' : 'Créer'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Job Offers List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0047AB] mx-auto"></div>
              </div>
            ) : jobOffers.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune offre</h3>
                <p className="text-gray-600">Créez votre première offre d'emploi</p>
              </div>
            ) : (
              jobOffers.map((offer) => (
                <div key={offer.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          offer.is_published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {offer.is_published ? 'Publié' : 'Brouillon'}
                        </span>
                        <span className="bg-[#0047AB]/10 text-[#0047AB] px-3 py-1 rounded-full text-xs font-semibold">
                          {offer.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{offer.location} • {offer.date}</p>
                      <p className="text-gray-700">{offer.description}</p>
                      {offer.requirements && (
                        <p className="text-gray-600 text-sm mt-2">Requis: {offer.requirements}</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => togglePublish(offer)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title={offer.is_published ? 'Dépublier' : 'Publier'}
                      >
                        {offer.is_published ? (
                          <EyeOff className="w-5 h-5 text-gray-600" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(offer)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-5 h-5 text-[#0047AB]" />
                      </button>
                      <button
                        onClick={() => handleDelete(offer.id)}
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
