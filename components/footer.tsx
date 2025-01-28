"use client"

import { useCallback } from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <footer className="mt-12 py-1 flex justify-between items-center">
      <div className="text-xs text-gray-500">© {currentYear} Zeke Wattles and all students.</div>
      <button onClick={scrollToTop} className="scroll-to-top-btn text-xs text-gray-500">
        Scroll to top
      </button>
    </footer>
  )
}

