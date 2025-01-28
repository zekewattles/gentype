/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/gentype",
  assetPrefix: "/gentype/",
  images: {
    unoptimized: true,
  },
  env: {
    BASE_PATH: "/gentype",
  },
}

module.exports = nextConfig

