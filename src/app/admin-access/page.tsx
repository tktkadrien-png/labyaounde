"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminAccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirection automatique vers le dashboard admin
    router.push("/admin-dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="text-white text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl">Redirection vers le tableau de bord...</p>
      </div>
    </div>
  );
}
