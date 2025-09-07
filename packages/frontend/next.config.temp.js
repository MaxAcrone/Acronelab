/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'acronelab.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'http', hostname: 'localhost' }
    ],
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    webpackBuildWorker: true
  }
};

module.exports = nextConfig;
