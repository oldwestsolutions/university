/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['localhost', process.env.NEXT_PUBLIC_DOMAIN || 'your-domain.ondigitalocean.app'],
  },
  experimental: {},
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  basePath: '',
  server: {
    port: 3001,
  },
};

module.exports = nextConfig; 