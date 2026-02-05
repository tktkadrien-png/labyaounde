import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
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
};

export default nextConfig;
