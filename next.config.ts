import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      {
        protocol: 'https',
        hostname: 'lumusapp-528592447405-eu-north-1-an.s3.eu-north-1.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
