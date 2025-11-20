/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true,
    // 允许从项目根目录加载图片
    remotePatterns: [],
  },
}

module.exports = nextConfig

