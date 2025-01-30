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

  useEffect(() => {
    // Get the computed values of our CSS variables
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)
    const startupBgColor = computedStyle.getPropertyValue("--startup-background-color").trim()
    const mainBgColor = computedStyle.getPropertyValue("--background-color").trim()

    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      // Set initial theme color to match startup background
      metaThemeColor.setAttribute("content", startupBgColor)

      // When content is shown, update to main background color
      if (showContent) {
        metaThemeColor.setAttribute("content", mainBgColor)
      }
    }
  }, [showContent])

  return (
    <>
      {!showContent && <StartupAnimation onComplete={() => setShowContent(true)} initialData={initialData} />}
      {showContent && <div className="flex flex-col md:flex-row min-h-screen">{children}</div>}
    </>
  )
}

