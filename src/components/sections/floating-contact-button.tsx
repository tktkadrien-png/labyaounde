"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, X, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/contents/LanguageContext";

export default function FloatingContactButton() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Show button after scrolling a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Show immediately on mount if already scrolled
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const content = {
    fr: {
      contact: "Contactez-nous",
      whatsapp: "WhatsApp",
      call: "Appeler",
      email: "Email",
      visit: "Nous rendre visite",
      tooltip: "Besoin d'aide ?",
    },
    en: {
      contact: "Contact us",
      whatsapp: "WhatsApp",
      call: "Call us",
      email: "Email",
      visit: "Visit us",
      tooltip: "Need help?",
    },
  };

  const currentContent = content[language];

  const contactOptions = [
    {
      icon: MessageCircle,
      label: currentContent.whatsapp,
      href: "https://wa.me/237242046850",
      color: "bg-[#25D366]",
      hoverColor: "hover:bg-[#128C7E]",
    },
    {
      icon: Phone,
      label: currentContent.call,
      href: "tel:+237242046850",
      color: "bg-[#00A8E8]",
      hoverColor: "hover:bg-[#0096C7]",
    },
    {
      icon: Mail,
      label: currentContent.email,
      href: "mailto:contact@labyaounde.com",
      color: "bg-[#0A2540]",
      hoverColor: "hover:bg-[#060440]",
    },
    {
      icon: MapPin,
      label: currentContent.visit,
      href: "/contact",
      color: "bg-[#00CED1]",
      hoverColor: "hover:bg-[#00A5A8]",
    },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Contact options popup */}
      <div
        className={`flex flex-col gap-2 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {contactOptions.map((option, index) => (
          <Link
            key={option.label}
            href={option.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-full ${option.color} ${option.hoverColor} text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            style={{
              transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
              transform: isOpen ? "translateX(0)" : "translateX(20px)",
              opacity: isOpen ? 1 : 0,
            }}
            onClick={() => setIsOpen(false)}
          >
            <option.icon className="w-5 h-5" />
            <span className="font-medium text-sm whitespace-nowrap">{option.label}</span>
          </Link>
        ))}
      </div>

      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div className="absolute bottom-full right-0 mb-2 animate-bounce-in">
          <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
            {currentContent.tooltip}
            <div className="absolute -bottom-1 right-6 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className={`group relative w-16 h-16 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center ${
          isOpen
            ? "bg-gray-800 rotate-0"
            : "bg-[#25D366] animate-whatsapp-pulse"
        }`}
        aria-label={currentContent.contact}
      >
        {/* Ripple effect */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"></span>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-20"></span>
          </>
        )}

        {/* Icon */}
        <div className="relative z-10 transition-transform duration-300">
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <svg
              viewBox="0 0 32 32"
              className="w-8 h-8 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.004 0C7.169 0 0 7.169 0 16.004c0 2.826.736 5.59 2.137 8.023L.073 31.927l8.104-2.048a15.9 15.9 0 0 0 7.827 2.048h.007C24.839 31.927 32 24.758 32 16.004 32 7.169 24.839 0 16.004 0Zm0 29.318a13.26 13.26 0 0 1-6.918-1.939l-.496-.295-5.143 1.3 1.372-4.987-.322-.514A13.29 13.29 0 0 1 2.609 16.004c0-7.39 6.005-13.395 13.395-13.395 7.389 0 13.394 6.005 13.394 13.395 0 7.389-6.005 13.314-13.394 13.314Zm7.337-10.026c-.402-.201-2.381-1.175-2.75-1.309-.369-.134-.638-.201-.907.201-.268.402-1.041 1.309-1.276 1.577-.235.269-.47.302-.872.101-.402-.201-1.698-.626-3.234-1.996-1.196-1.067-2.003-2.385-2.238-2.787-.235-.402-.025-.62.177-.82.181-.181.402-.47.603-.705.201-.235.268-.402.402-.67.134-.269.067-.504-.034-.705-.1-.201-.907-2.184-1.242-2.991-.327-.784-.659-.678-.907-.69-.234-.012-.504-.014-.772-.014-.269 0-.705.101-1.074.504-.369.402-1.409 1.377-1.409 3.36 0 1.982 1.443 3.898 1.644 4.166.201.269 2.84 4.335 6.88 6.079.961.415 1.712.663 2.297.849.965.307 1.844.264 2.539.16.775-.116 2.381-.974 2.717-1.914.335-.94.335-1.746.235-1.914-.101-.168-.369-.269-.772-.47Z" />
            </svg>
          )}
        </div>

        {/* Hover glow effect */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-0 group-hover:opacity-100"
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(37,211,102,0.3) 0%, transparent 70%)",
            transform: "scale(1.5)",
          }}
        ></div>
      </button>

      {/* Badge notification dot */}
      {!isOpen && (
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
      )}
    </div>
  );
}
