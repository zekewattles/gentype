/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  basePath: "/gentype",
  assetPrefix: "/gentype/",
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

