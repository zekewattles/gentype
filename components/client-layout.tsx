"use client"

import type React from "react"
import { useState } from "react"
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

  return (
    <>
      {!showContent && <StartupAnimation onComplete={() => setShowContent(true)} initialData={initialData} />}
      {showContent && <div className="flex flex-col md:flex-row min-h-screen bg-zinc-950">{children}</div>}
    </>
  )
}

