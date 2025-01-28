import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata = {
  title: "GenType",
  description:
    "Generative Typography is a creative coding course taught by Zeke Wattles at ArtCenter College of Design. Through focused exercises, students learn to build custom code-based tools for graphic design and integrate them into larger identity systems.",
  authors: [{ name: "Zeke Wattles" }],
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

