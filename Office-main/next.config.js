/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['localhost', 'vercel.com', '*.vercel.app'],
  },
  experimental: {
    appDir: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  basePath: '',
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

module.exports = nextConfig; 