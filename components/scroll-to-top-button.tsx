"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300)
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

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

  // return (
  //   <button
  //     onClick={scrollToTop}
  //     className="fixed bottom-4 right-0 bg-gray-900 text-white w-8 h-8 rounded-full shadow-md flex items-center justify-center border border-gray-700 transition-all duration-200 md:hidden hover:bg-gray-700"
  //     style={{
  //       animation: "bounce 2s infinite",
  //     }}
  //     aria-label="Scroll to top"
  //   >
  //     <style jsx>{`
  //       @keyframes bounce {
  //         0%, 100% { transform: translateY(0) translateX(-50%); }
  //         50% { transform: translateY(-4px) translateX(-50%); }
  //       }
  //     `}</style>
  //     <ChevronUp className="w-5 h-5" />
  //   </button>
  // )
}

