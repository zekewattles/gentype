import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ClientLayout } from "@/components/client-layout"
import { getInitialData } from "@/lib/api"
import { metadata } from "./metadata"
import type React from "react"

const geistMono = GeistMono

export { metadata }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialData = await getInitialData()

  return (
    <html lang="en" className={geistMono.className}>
      <head>
        <meta name="theme-color" content="#09090b" />
        {/* Set initial theme color to match startup screen */}
      </head>
      <body className="antialiased">
        <ClientLayout initialData={initialData}>{children}</ClientLayout>
      </body>
    </html>
  )
}

