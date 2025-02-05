/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/gentype",
  assetPrefix: "/gentype/",
  images: {
    unoptimized: true,
  },
  // This is important for GitHub Pages
  trailingSlash: true,
}

module.exports = nextConfig

