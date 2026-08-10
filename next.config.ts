import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  reactCompiler: true,
  transpilePackages: ['@candy.thieves/ui-kit-lumos'],
}

export default nextConfig
