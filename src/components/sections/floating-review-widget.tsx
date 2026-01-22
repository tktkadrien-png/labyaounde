"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, X } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

const FloatingReviewWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // Show widget after 5 seconds
    const timer = setTimeout(() => {
      const hasClosedBefore = sessionStorage.getItem("reviewWidgetClosed");
      if (!hasClosedBefore) {
        setIsVisible(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
    sessionStorage.setItem("reviewWidgetClosed", "true");
  };

  const content = {
    fr: {
      title: "Votre avis compte !",
      subtitle: "Partagez votre expérience",
      button: "Donner mon avis",
    },
    en: {
      title: "Your opinion matters!",
      subtitle: "Share your experience",
      button: "Leave a review",
    },
  };

  const currentContent = content[language];

  if (!isVisible || isClosed) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#1589FF]/20 p-5 max-w-sm relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1589FF] to-[#1589FF]/100"></div>

        {/* Content */}
        <div className="text-center pt-2">
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse"
                style={{ animationDelay: `${star * 100}ms` }}
              />
            ))}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-[#2916F5] mb-1">
            {currentContent.title}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-gray-600 mb-4">
            {currentContent.subtitle}
          </p>

          {/* CTA Button */}
          <Link
            href="/laisser-un-avis"
            className="inline-block w-full px-6 py-3 bg-gradient-to-r from-[#2916F5] to-[#157DEC] text-white font-semibold rounded-lg
              hover:from-[#157DEC] hover:to-[#2916F5] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            {currentContent.button}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FloatingReviewWidget;
