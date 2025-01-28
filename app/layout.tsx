import { GeistMono } from "geist/font/mono"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://zeke.studio/gentype/"),
  title: {
    default: "GenType",
    template: "%s | GenType",
  },
  description:
    "Generative Typography is a creative coding course taught by Zeke Wattles at ArtCenter College of Design. Through focused exercises, students learn to build custom code-based tools for graphic design and integrate them into larger identity systems.",
  authors: [{ name: "Zeke Wattles" }],
  keywords: ["Generative Typography", "Creative Coding", "Graphic Design", "ArtCenter College of Design"],
  openGraph: {
    title: "GenType",
    description: "Generative Typography course at ArtCenter College of Design",
    url: "/",
    siteName: "GenType",
    images: [
      {
        url: "/gentype/semesters/fa24/posters/alvin-lin.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GenType",
    description: "Generative Typography course at ArtCenter College of Design",
    images: ["/gentype/semesters/fa24/posters/alvin-lin.jpg"],
  },
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👾</text></svg>',
        type: "image/svg+xml",
      },
    ],
  },
}

const geistMono = GeistMono

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistMono.className} antialiased`}>
        <div className="flex flex-col md:flex-row min-h-screen">{children}</div>
      </body>
    </html>
  )
}

