import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // This is crucial for Firebase Hosting (Free Plan)
  },
};

export default nextConfig;