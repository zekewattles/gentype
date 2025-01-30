"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { StartupAnimation } from "./startup-animation"

interface InitialData {
  totalProjects: number
  currentYear: number
  totalSemesters: number
}

export function ClientLayout({
  children,
  initialData,
}: {
  children: React.ReactNode
  initialData: InitialData
}) {
  const [showContent, setShowContent] = useState(false)

  // Define our theme colors
  const themeColors = {
    startup: "#000000",
    main: "#f5f5f5",
  }

  useEffect(() => {
    // Update theme color when content visibility changes
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", showContent ? themeColors.main : themeColors.startup)
    }
  }, [showContent])

  return (
    <>
      {!showContent && <StartupAnimation onComplete={() => setShowContent(true)} initialData={initialData} />}
      {showContent && <div className="flex flex-col md:flex-row min-h-screen">{children}</div>}
    </>
  )
}

