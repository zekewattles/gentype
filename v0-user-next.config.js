/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/gentype",
  assetPrefix: "/gentype/",
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

