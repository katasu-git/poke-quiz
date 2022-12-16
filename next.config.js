/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // useEffectが2回実行されるのを防ぐ
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
