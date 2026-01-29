"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Send, CheckCircle, Bell } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="relative w-full py-24 lg:py-32 text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ChatGPT Image Nov 19, 2025, 01_48_32 AM.png"
          alt="Laboratoire de biologie médicale moderne"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#ADD8E6]/90 via-[#0047AB]/85 to-[#0080FF]/90" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#00CED1]/30 to-[#0047AB]/20 backdrop-blur-md rounded-2xl mb-8 border border-white/10 shadow-xl">
            <Bell className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-white font-bold text-4xl md:text-5xl leading-tight mb-5">
            Newsletter
          </h2>

          {/* Subtitle */}
          <p className="text-white/70 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Recevez nos actualités, conseils santé et offres exclusives directement dans votre boîte mail
          </p>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            {isSubmitted ? (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-white font-semibold text-xl mb-2">Merci !</p>
                <p className="text-white/60 text-sm">Votre inscription a été confirmée.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#00CED1] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    required
                    className="w-full h-14 pl-12 pr-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00CED1]/50 focus:border-[#00CED1]/50 focus:bg-white/15 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00CED1] to-[#0047AB] hover:from-[#0080FF] hover:to-[#00CED1] text-white font-semibold py-4 px-6 rounded-xl text-base transition-all duration-300 shadow-lg shadow-[#0047AB]/25 hover:shadow-xl hover:shadow-[#0047AB]/30 hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <span>S&apos;abonner</span>
                  <Send size={18} />
                </button>

                <p className="text-white/40 text-xs">
                  Désabonnement possible à tout moment. Pas de spam.
                </p>
              </form>
            )}
          </div>

          {/* Stats */}
          <div className="mt-16 flex items-center justify-center gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">5K+</p>
              <p className="text-white/70 text-xs mt-1 font-medium">Abonnés</p>
            </div>
            <div className="w-px h-10 bg-white/40"></div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">24h</p>
              <p className="text-white/70 text-xs mt-1 font-medium">Résultats</p>
            </div>
            <div className="w-px h-10 bg-white/40"></div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">100%</p>
              <p className="text-white/70 text-xs mt-1 font-medium">Sécurisé</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
