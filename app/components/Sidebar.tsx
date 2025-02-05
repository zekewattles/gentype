"use client"

import { SidebarClient } from "./SidebarClient"
import { useEffect, useState } from "react"

export function Sidebar() {
  const [semesterPosters, setSemesterPosters] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSemesterPosters() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/semesterPosters")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log("Fetched semester posters:", data)
        setSemesterPosters(data)
      } catch (error) {
        console.error("Error fetching semester posters:", error)
        setError("Failed to fetch semester posters. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSemesterPosters()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return <SidebarClient semesterPosters={semesterPosters} />
}

