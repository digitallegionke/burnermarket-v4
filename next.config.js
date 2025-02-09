/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'v5.airtableusercontent.com',
        pathname: '**',
      }
    ],
  },
  experimental: {
    missingSuspenseWithCSRError: false,
  },
};

module.exports = nextConfig; 