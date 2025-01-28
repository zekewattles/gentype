"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronUp } from "lucide-react"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300)
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-0 bg-white text-gray-500 w-8 h-8 rounded-full shadow-lg flex items-center justify-center border border-gray-200 transition-all duration-200 md:hidden hover:bg-gray-50"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  )
}

