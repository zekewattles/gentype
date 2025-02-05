/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/gentype",
  assetPrefix: "/gentype/",
  images: {
    unoptimized: true,
  },
  experimental: {
    // Enable new features if needed
    // serverActions: true,
  },
}

module.exports = nextConfig

