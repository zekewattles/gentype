import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "GenType",
    template: "%s | GenType",
  },
  description: "Generative Typography course at ArtCenter College of Design",
  metadataBase: new URL("https://zeke.studio/gentype/"),
  authors: [{ name: "Zeke Wattles" }],
  keywords: ["Generative Typography", "Creative Coding", "Graphic Design", "ArtCenter College of Design"],
  openGraph: {
    title: "GenType",
    description: "Generative Typography course at ArtCenter College of Design",
    url: "/",
    siteName: "GenType",
    images: [
      {
        url: "semesters/fa24/posters/alvin-lin.jpg",
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
    images: ["semesters/fa24/posters/alvin-lin.jpg"],
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

