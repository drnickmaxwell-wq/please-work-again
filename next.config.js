/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

const manusAssetsDir = path.join(__dirname, 'public', 'assets', 'manus');
const manusAssetsRoute = '/assets/manus/:path*';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@': __dirname,
      '@manus/assets': manusAssetsDir,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: manusAssetsRoute,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
