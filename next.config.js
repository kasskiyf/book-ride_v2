/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add trailingSlash configuration for static export
  trailingSlash: true,
};

module.exports = nextConfig;