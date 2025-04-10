"use client"

import { useState, useRef, useEffect } from "react"
import { semesterOrder } from "@/lib/constants"

// Define flat colors - using darker 600 variants for more vibrant colors
const buttonColors = [
  "bg-red-600",
  "bg-orange-600",
  "bg-amber-600",
  "bg-yellow-600",
  "bg-lime-600",
  "bg-green-600",
  "bg-emerald-600",
  "bg-teal-600",
  "bg-cyan-600",
  "bg-sky-600",
  "bg-blue-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-purple-600",
  "bg-fuchsia-600",
  "bg-pink-600",
  "bg-rose-600",
]

// Define a type for the colors object - simplified to just background colors
type ColorMap = {
  [key: string]: string
}

// Simplified function to get unique random colors
const getUniqueRandomColors = (count: number) => {
  const shuffled = [...buttonColors].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Function to generate menu colors - simplified
const generateMenuColors = () => {
  // Get unique colors for all menu items (Info + all semesters)
  const uniqueColors = getUniqueRandomColors(semesterOrder.length + 1)

  // Assign colors to menu items
  const colors: ColorMap = { info: uniqueColors[0] }

  semesterOrder.forEach((semester, index) => {
    colors[semester.toLowerCase()] = uniqueColors[index + 1] || buttonColors[0]
  })

  return colors
}

export function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const [menuColors, setMenuColors] = useState<ColorMap>(generateMenuColors)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    // If we're opening the menu, randomize the colors
    if (!isOpen) {
      setMenuColors(generateMenuColors())
    }
    setIsOpen(!isOpen)
  }

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    // Add event listener when menu is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Common button styles
  const baseButtonStyles = "text-lg px-4 py-2 border border-white/10 shadow-sm"
  const menuButtonStyles = `${baseButtonStyles} bg-white text-black border-neutral-300`
  const coloredButtonStyles = `${baseButtonStyles} block text-white rounded-full hover:rounded`

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`${menuButtonStyles} ${isOpen ? "rounded" : "rounded-full hover:rounded"}`}
      >
        Menu
      </button>

      {isOpen && (
        <div ref={menuRef} className="mt-1 flex flex-col gap-1">
          <a href="#info" className={`${coloredButtonStyles} ${menuColors.info}`} onClick={() => setIsOpen(false)}>
            Info
          </a>
          {semesterOrder.map((semester) => (
            <a
              key={semester}
              href={`#${semester.toLowerCase()}`}
              className={`${coloredButtonStyles} ${menuColors[semester.toLowerCase()]}`}
              onClick={() => setIsOpen(false)}
            >
              {semester}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
