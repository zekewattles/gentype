"use client"

import { useState } from "react"
import { semesterOrder } from "@/lib/constants"

// Array of Tailwind 500 colors
const tailwind500Colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
]

// Define a type for the colors object
type ColorMap = {
  [key: string]: string
}

// Simplified function to get unique random colors
const getUniqueRandomColors = (count: number) => {
  const shuffled = [...tailwind500Colors].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const [menuColors] = useState<ColorMap>(() => {
    // Get unique colors for all menu items (Info + all semesters)
    const uniqueColors = getUniqueRandomColors(semesterOrder.length + 1)

    // Assign colors to menu items
    const colors: ColorMap = { info: uniqueColors[0] }
    semesterOrder.forEach((semester, index) => {
      colors[semester.toLowerCase()] = uniqueColors[index + 1] || tailwind500Colors[0] // Fallback just in case
    })

    return colors
  })

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`fixed text-lg top-4 right-4 z-50 px-4 py-2 bg-white text-black ${
          isOpen ? "" : "rounded-full hover:rounded-none"
        }`}
      >
        Menu
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 z-40 pt-16 pr-4">
          <nav>
            <ul className="flex flex-col">
              <li>
                <a
                  href="#info"
                  className={`block text-white text-lg px-4 py-2 rounded-full hover:rounded-none ${menuColors.info}`}
                  onClick={() => setIsOpen(false)}
                >
                  Info
                </a>
              </li>
              {semesterOrder.map((semester) => (
                <li key={semester}>
                  <a
                    href={`#${semester.toLowerCase()}`}
                    className={`block text-white text-lg px-4 py-2 rounded-full hover:rounded-none ${menuColors[semester.toLowerCase()]}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {semester}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}

