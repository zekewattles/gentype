"use client"

import { SidebarClient } from "./SidebarClient"
import { useEffect, useState } from "react"

export function Sidebar() {
  const [semesterPosters, setSemesterPosters] = useState<Record<string, string>>({})

  useEffect(() => {
    async function fetchSemesterPosters() {
      const response = await fetch("/api/semester-posters")
      const data = await response.json()
      setSemesterPosters(data)
    }

    fetchSemesterPosters()
  }, [])

  return <SidebarClient semesterPosters={semesterPosters} />
}

