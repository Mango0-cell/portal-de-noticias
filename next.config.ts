import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'newsapi.org',
      },
      {
        protocol: 'https',
        hostname: '**.newsapi.org',
      },
      // Common news image sources
      {
        protocol: 'https',
        hostname: '**.cdn.cnn.com',
      },
      {
        protocol: 'https',
        hostname: '**.bbci.co.uk',
      },
      {
        protocol: 'https',
        hostname: '**.nyt.com',
      },
      {
        protocol: 'https',
        hostname: '**.wp.com',
      },
      {
        protocol: 'https',
        hostname: '**.media',
      },
    ],
  },
};

export default nextConfig;
