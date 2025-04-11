"use client"

import { useState, useRef, useEffect } from "react"
import { semesterOrder } from "@/lib/constants"

// Define a type for the colors object
type ColorMap = {
  [key: string]: string
}

// Function to generate menu colors - now just assigning IDs since we're using glass effect
const generateMenuColors = () => {
  // Assign colors to menu items - now just using IDs for tracking
  const colors: ColorMap = { info: "info" }

  semesterOrder.forEach((semester) => {
    colors[semester.toLowerCase()] = semester.toLowerCase()
  })

  return colors
}

export function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const [menuColors, setMenuColors] = useState<ColorMap>(generateMenuColors)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
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

  // Glass effect button styles
  const baseButtonStyles = `
    text-base 
    px-4 
    py-2 
    shadow-sm 
    transition-all 
    duration-200 
    rounded-full 
    backdrop-filter 
    backdrop-blur-md 
    bg-white/10
    hover:bg-white/30
    text-white
  `

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      <button ref={buttonRef} onClick={toggleMenu} className={`${baseButtonStyles} ${isOpen ? "bg-white/30" : ""}`}>
        Menu
      </button>

      {isOpen && (
        <div ref={menuRef} className="mt-1 flex flex-col gap-1">
          <a href="#info" className={baseButtonStyles} onClick={() => setIsOpen(false)}>
            Info
          </a>
          {semesterOrder.map((semester) => (
            <a
              key={semester}
              href={`#${semester.toLowerCase()}`}
              className={baseButtonStyles}
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
