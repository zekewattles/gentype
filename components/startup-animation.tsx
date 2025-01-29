"use client"

import { useState, useEffect, useCallback } from "react"
import { GeistMono } from "geist/font/mono"

const geistMono = GeistMono

interface InitialData {
  totalProjects: number
  currentYear: number
  totalSemesters: number
}

export function StartupAnimation({ onComplete, initialData }: { onComplete: () => void; initialData: InitialData }) {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [isComplete, setIsComplete] = useState(false)
  const [lines, setLines] = useState<string[]>([])

  const initializeLines = useCallback(() => {
    // Helper function to safely get device memory
    const getDeviceMemory = () => {
      if (typeof navigator !== "undefined" && "deviceMemory" in navigator) {
        return (navigator as any).deviceMemory
      }
      return "Unknown"
    }

    return [
      "GenType BIOS v2.0.1",
      `(C) 2022-${initialData.currentYear} GT MICROSYSTEMS, INC.`,
      "All rights reserved.",
      `Released: ${new Date().toISOString().split("T")[0]}`,
      "",
      "GenType-PCI BIOS Revision 2.0",
      `CPU: ${(typeof navigator !== "undefined" && navigator.hardwareConcurrency) || "Unknown"}-core`,
      `Memory Test: ${getDeviceMemory()} GB`,
      "Keyboard... Detected",
      "Mouse... Detected",
      `Display Adapter: ${typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height} @ ${window.screen.colorDepth}-bit` : "Unknown"}`,
      "Boot Device: GenType v2.0",
      "",
      "Scanning archive directory...",
      `Total Semesters: ${initialData.totalSemesters}`,
      `Total Projects: ${initialData.totalProjects}`,
      "",
      "Finalizing archive parameters... OK",
      "Initializing UI...",
      "",
    ]
  }, [initialData])

  useEffect(() => {
    setLines(initializeLines())
  }, [initializeLines])

  useEffect(() => {
    if (lines.length === 0) return

    const delays = lines.map(() => Math.random() * 150 + 50) // Generate random delays for each line
    let totalDelay = 0

    const timeouts = lines.map((_, index) => {
      totalDelay += delays[index]
      return setTimeout(() => {
        setVisibleLines((prev) => {
          if (prev < lines.length) {
            return prev + 1
          }
          return prev
        })

        if (index === lines.length - 1) {
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(onComplete, 3000)
          }, 500) // Wait a bit before showing the final message
        }
      }, totalDelay)
    })

    return () => timeouts.forEach(clearTimeout)
  }, [lines, onComplete])

  if (lines.length === 0) return null

  return (
    <div className="fixed inset-0 startup-background">
      <div className="relative z-10 p-5">
        <pre className={`${geistMono.className} text-xs font-medium whitespace-pre startup-text`}>
          {lines.slice(0, visibleLines).join("\n")}
          {isComplete && (
            <>
              {"\n"}
              <span className="animate-blink">*** GENTYPE BOOT COMPLETE ***</span>
            </>
          )}
        </pre>
      </div>
    </div>
  )
}

