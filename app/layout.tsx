import "./globals.css"
import { Menu } from "./components/Menu"
import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Generative Typography",
  description: "Generative Typography course at ArtCenter College of Design",
  metadataBase: new URL("https://zeke.studio"),
  authors: [{ name: "Zeke Wattles" }],
  keywords: ["Generative Typography", "Creative Coding", "Graphic Design", "ArtCenter College of Design"],
  openGraph: {
    title: "Generative Typography",
    description: "Generative Typography course at ArtCenter College of Design",
    url: "/gentype/",
    siteName: "Generative Typography",
    images: [
      {
        url: "/gentype/semesters/fa22/posters/kenny-zhang.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generative Typography",
    description: "Generative Typography course at ArtCenter College of Design",
    images: ["/gentype/semesters/fa22/posters/kenny-zhang.jpg"],
  },
  icons: {
    icon: [
      { url: "/gentype/favicon.svg", type: "image/svg+xml" },
      { url: "/gentype/favicon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: "/gentype/favicon.svg",
    apple: "/gentype/apple-touch-icon.png",
  },
  manifest: "/gentype/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="fragment-mono">
      <head>
        <meta name="theme-color" content="#1c1917" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Fragment+Mono:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <div className="min-h-screen bg-stone-900 text-stone-100">
          <Menu />
          <div className="container mx-auto px-4 max-w-5xl">{children}</div>
        </div>
      </body>
    </html>
  )
}
