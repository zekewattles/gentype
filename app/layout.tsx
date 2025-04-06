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
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" fontSize="90">👾</text></svg>',
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="geist-mono">
      <head>
        <meta name="theme-color" content="#000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div className="min-h-screen bg-black text-white">
          <Menu />
          <div className="container mx-auto px-4 pt-12 max-w-6xl">{children}</div>
        </div>
      </body>
    </html>
  )
}

