"use client"

import { useState, useRef, useEffect } from "react"
import { semesterOrder } from "@/lib/constants"

export function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("info")
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

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

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["info", ...semesterOrder.map((s) => s.toLowerCase())]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleMenuItemClick = (section: string) => {
    setActiveSection(section)
    setIsOpen(false)
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`menu-button menu-link ${isOpen ? "menu-button-active" : "hover:rounded-none hover:bg-stone-100 hover:text-stone-900"}`}
      >
        MENU
      </button>

      {isOpen && (
        <div ref={menuRef} className="mt-1 flex flex-col gap-1">
          <a
            href="#info"
            className={`menu-button menu-link ${activeSection === "info" ? "menu-button-active" : "hover:rounded-none hover:bg-stone-100 hover:text-stone-900"}`}
            onClick={() => handleMenuItemClick("info")}
          >
            INFO
          </a>
          {semesterOrder.map((semester) => {
            const lowercaseSemester = semester.toLowerCase()
            return (
              <a
                key={semester}
                href={`#${lowercaseSemester}`}
                className={`menu-button menu-link ${activeSection === lowercaseSemester ? "menu-button-active" : "hover:rounded-none hover:bg-stone-100 hover:text-stone-900"}`}
                onClick={() => handleMenuItemClick(lowercaseSemester)}
              >
                {semester}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
