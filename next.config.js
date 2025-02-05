const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/gentype",
  assetPrefix: "/gentype/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias["@"] = path.resolve(__dirname)
    return config
  },
}

module.exports = nextConfig

