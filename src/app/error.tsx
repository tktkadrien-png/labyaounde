"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A065D] via-[#0080FF] to-[#0909FF] px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-[#FE5000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#FE5000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#0A065D] mb-4">
          Une erreur est survenue
        </h2>
        <p className="text-gray-600 mb-6">
          Nous nous excusons pour ce désagrément. Veuillez réessayer.
        </p>
        <button
          onClick={() => reset()}
          className="w-full bg-[#FE5000] hover:bg-[#CC4000] text-white font-bold py-3 px-6 rounded-xl transition-colors"
        >
          Réessayer
        </button>
        <a
          href="/"
          className="block mt-4 text-[#0A065D] hover:text-[#0080FF] font-medium transition-colors"
        >
          Retour à l&apos;accueil
        </a>
      </div>
    </div>
  );
}
