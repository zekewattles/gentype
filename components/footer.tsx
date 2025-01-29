"use client"

import { useCallback } from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <footer className="mt-12 py-1 text-xs text-gray-500 flex justify-between items-center">
      <span>© {currentYear} Zeke Wattles & all students.</span>
      <button
        onClick={scrollToTop}
        className="text-violet-600 text-xs hover:text-violet-800 underline cursor-pointer"
        aria-label="Scroll to top of page"
      >
        ↑ Scroll up
      </button>
    </footer>
  )
}

