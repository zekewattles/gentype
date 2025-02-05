"use client"

import { SidebarClient } from "./SidebarClient"

interface SidebarProps {
  semesterPosters: Record<string, string>
  error: string | null
}

export function Sidebar({ semesterPosters, error }: SidebarProps) {
  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>
  }

  if (Object.keys(semesterPosters).length === 0) {
    return <div className="text-white p-4">No semester posters found.</div>
  }

  return <SidebarClient semesterPosters={semesterPosters} />
}

