/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse", "llamaindex"],
  },
};
