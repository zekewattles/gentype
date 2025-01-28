/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/gentype",
  images: {
    unoptimized: true,
    domains: ["v0.blob.com"],
  },
  assetPrefix: "/gentype/",
}

module.exports = nextConfig

