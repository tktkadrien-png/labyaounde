import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A065D] via-[#0080FF] to-[#0909FF] px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-[#FE5000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl font-bold text-[#FE5000]">404</span>
        </div>
        <h2 className="text-2xl font-bold text-[#0A065D] mb-4">
          Page non trouvée
        </h2>
        <p className="text-gray-600 mb-6">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="block w-full bg-[#FE5000] hover:bg-[#CC4000] text-white font-bold py-3 px-6 rounded-xl transition-colors text-center"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
