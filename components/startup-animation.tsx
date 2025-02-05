"use client"

import { useState, useEffect, useCallback } from "react"
import localFont from "next/font/local"
import Image from "next/image"
import packageJson from "../package.json"

// Load the custom IBM BIOS font
const ibmBiosFont = localFont({
  src: "../public/fonts/WebPlus_IBM_BIOS-2y.woff",
  variable: "--font-ibm-bios",
})

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
      if (typeof navigator !== "undefined") {
        if ("deviceMemory" in navigator) {
          return `${(navigator as any).deviceMemory} GB`
        }
        // Fallback for devices that don't support deviceMemory
        if ("hardwareConcurrency" in navigator) {
          // Estimate based on CPU cores (very rough estimate)
          const cores = navigator.hardwareConcurrency
          if (cores <= 2) return "2 GB (est.)"
          if (cores <= 4) return "4 GB (est.)"
          if (cores <= 8) return "8 GB (est.)"
          return "16+ GB (est.)"
        }
      }
      return "Unknown"
    }

    return [
      `GenType BIOS v${packageJson.version}`,
      `(C) 2022-${initialData.currentYear} GT MICROSYSTEMS, INC.`,
      "All rights reserved.",
      `Released: ${new Date().toISOString().split("T")[0]}`,
      "",
      "GenType-PCI BIOS Revision 2.0",
      `CPU: ${(typeof navigator !== "undefined" && navigator.hardwareConcurrency) || "Unknown"}-core`,
      `Memory Test: ${getDeviceMemory()}`,
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
            setTimeout(onComplete, 2000)
          }, 500) // Wait a bit before showing the final message
        }
      }, totalDelay)
    })

    return () => timeouts.forEach(clearTimeout)
  }, [lines, onComplete])

  if (lines.length === 0) return null

  return (
    <div className={`fixed inset-0 bg-black ${ibmBiosFont.variable}`}>
      <div className="absolute top-3 right-3 w-24 h-24">
        <Image
          src="/gentype/images/energy-star-logo.png"
          alt="ENERGY STAR"
          width={266}
          height={168}
          className="startup-logo"
        />
      </div>
      <div className="relative z-10 p-5">
        <pre className="font-ibm-bios text-white text-xs font-medium whitespace-pre">
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

