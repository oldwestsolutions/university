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
  }
};

module.exports = nextConfig; 