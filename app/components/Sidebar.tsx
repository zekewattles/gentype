"use client"

import { SidebarClient } from "./SidebarClient"

interface SidebarProps {
  semesterPosters: Record<string, string>
}

export function Sidebar({ semesterPosters }: SidebarProps) {
  return <SidebarClient semesterPosters={semesterPosters} />
}

