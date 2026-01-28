import type { NextConfig } from "next";
import crypto from "crypto";

const nextConfig: NextConfig = {
  output: 'standalone',
  generateBuildId: async () => {
    return crypto.randomBytes(16).toString('hex');
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'slelguoygbfzlpylpxfs.supabase.co',
        port: '',
        pathname: '/storage/v1/**',
      },
      {
        protocol: 'https',
        hostname: 'ykbpzwxolnxfwziginul.supabase.co',
        port: '',
        pathname: '/storage/v1/**',
      },
    ],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
