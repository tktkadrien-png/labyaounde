"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { HelpCircle, ChevronDown, ChevronUp, Star, MessageSquare, User } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";
import { supabase } from "@/lib/supabase";

export default function QuestionsFrequentesPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    setUserEmail(session?.user?.email || null);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleReviewClick = () => {
    if (isAuthenticated) {
      router.push("/laisser-un-avis");
    } else {
      router.push("/login");
    }
  };

  const content = {
    fr: {
      title: "Questions Fréquentes",
      subtitle: "Trouvez rapidement les réponses à vos questions",
      description: "Consultez notre FAQ pour obtenir des informations sur nos services",
      faqs: [
        {
          question: "Puis-je venir sans ordonnance ?",
          answer: "Oui, vous pouvez réaliser des analyses sans ordonnance, mais elles ne seront pas remboursées par la Sécurité Sociale. Le laboratoire vous remettra un devis avant le prélèvement."
        },
        {
          question: "Comment récupérer mes résultats ?",
          answer: "Plusieurs options s'offrent à vous :\n• En ligne sur votre espace patient sécurisé (recommandé)\n• Par email avec envoi crypté\n• Au laboratoire sur présentation d'une pièce d'identité\n• Par courrier postal (délai supplémentaire de 2-3 jours)\n\nVous recevrez une notification par SMS dès que vos résultats sont disponibles."
        },
        {
          question: "Combien de temps pour avoir les résultats ?",
          answer: "Les délais varient selon le type d'analyse :\n• Analyses courantes : 24 à 48 heures\n• Tests rapides (grossesse, paludisme) : 2 à 4 heures\n• Analyses spécialisées : 3 à 7 jours\n• Analyses génétiques : 2 à 4 semaines\n\nEn cas d'urgence médicale, certaines analyses peuvent être accélérées."
        },
        {
          question: "Dois-je être à jeun pour tous les examens ?",
          answer: "Non, le jeûne n'est pas toujours nécessaire. Il est requis pour :\n• Glycémie et bilan lipidique (obligatoire)\n• Bilan de santé général (recommandé)\n• NFS, CRP, sérologies, hormones thyroïdiennes (non nécessaire)\n\nEn cas de doute, consultez votre ordonnance ou contactez-nous."
        },
        {
          question: "Puis-je prendre mes médicaments avant le prélèvement ?",
          answer: "Oui, continuez votre traitement habituel, sauf indication contraire de votre médecin. Exceptions :\n• Anticoagulants : signalez-le à l'infirmier\n• Insuline/antidiabétiques : attendez après le prélèvement si à jeun\n• Hormones thyroïdiennes : prenez après pour un dosage de TSH\n\nSignalez tous vos traitements lors de l'accueil."
        }
      ],
      review: {
        title: "Votre avis compte",
        description: "Partagez votre expérience avec notre laboratoire",
        authenticatedButton: "Laisser un avis",
        unauthenticatedButton: "Se connecter pour laisser un avis",
        loggedInAs: "Connecté en tant que"
      },
      contact: {
        title: "Vous ne trouvez pas la réponse?",
        description: "Notre équipe est disponible pour vous aider",
        button: "Contactez-nous"
      }
    },
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Quickly find answers to your questions",
      description: "Check our FAQ for information about our services",
      faqs: [
        {
          question: "Can I come without a prescription?",
          answer: "Yes, you can have tests done without a prescription, but they will not be reimbursed by Social Security. The laboratory will provide you with a quote before sampling."
        },
        {
          question: "How do I get my results?",
          answer: "Several options are available:\n• Online via your secure patient portal (recommended)\n• By email with encrypted sending\n• At the laboratory upon presentation of ID\n• By postal mail (additional 2-3 day delay)\n\nYou will receive an SMS notification as soon as your results are available."
        },
        {
          question: "How long does it take to get results?",
          answer: "Timeframes vary by test type:\n• Routine tests: 24 to 48 hours\n• Rapid tests (pregnancy, malaria): 2 to 4 hours\n• Specialized tests: 3 to 7 days\n• Genetic tests: 2 to 4 weeks\n\nIn medical emergencies, some tests can be expedited."
        },
        {
          question: "Do I need to fast for all tests?",
          answer: "No, fasting is not always necessary. It is required for:\n• Glucose and lipid panel (mandatory)\n• General health check-up (recommended)\n• CBC, CRP, serologies, thyroid hormones (not necessary)\n\nIf in doubt, check your prescription or contact us."
        },
        {
          question: "Can I take my medications before sampling?",
          answer: "Yes, continue your usual treatment unless otherwise instructed by your doctor. Exceptions:\n• Anticoagulants: inform the nurse\n• Insulin/antidiabetics: wait until after sampling if fasting\n• Thyroid hormones: take after for TSH testing\n\nReport all your treatments during check-in."
        }
      ],
      review: {
        title: "Your opinion matters",
        description: "Share your experience with our laboratory",
        authenticatedButton: "Leave a review",
        unauthenticatedButton: "Sign in to leave a review",
        loggedInAs: "Logged in as"
      },
      contact: {
        title: "Can't find the answer?",
        description: "Our team is available to help you",
        button: "Contact us"
      }
    }
  };

  const currentContent = content[language];

  return (
    <>
      <TopNavigationBar />
      <MainNavigation />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0A065D] via-[#0080FF] to-[#0909FF] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HelpCircle className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">{currentContent.title}</h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-4">{currentContent.subtitle}</p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">{currentContent.description}</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {currentContent.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-[#0A065D] hover:shadow-lg transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 bg-[#0A065D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-5 h-5 text-[#0A065D]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 pr-4">{faq.question}</h3>
                    </div>
                    <div className="flex-shrink-0">
                      {openFaq === index ? (
                        <ChevronUp className="w-6 h-6 text-[#0A065D]" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-[#0A065D]" />
                      )}
                    </div>
                  </button>

                  {openFaq === index && (
                    <div className="px-6 pb-6 pl-20">
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Review Section */}
        <section className="py-16 bg-gradient-to-br from-[#00CED1]/10 to-[#00CED1]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border-2 border-[#00CED1]/30 text-center">
              <div className="flex justify-center mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-10 h-10 text-[#FE5000] fill-[#FE5000]" />
                ))}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{currentContent.review.title}</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{currentContent.review.description}</p>

              {isAuthenticated && userEmail && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
                  <User className="w-4 h-4" />
                  <span>{currentContent.review.loggedInAs}: <strong>{userEmail}</strong></span>
                </div>
              )}

              <button
                onClick={handleReviewClick}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0A065D] to-[#0080FF] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105"
              >
                <MessageSquare className="w-6 h-6" />
                {isAuthenticated ? currentContent.review.authenticatedButton : currentContent.review.unauthenticatedButton}
              </button>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-[#0A065D] to-[#0080FF] rounded-2xl p-8 lg:p-12 text-white shadow-2xl">
              <HelpCircle className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{currentContent.contact.title}</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">{currentContent.contact.description}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-[#0A065D] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {currentContent.contact.button}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
