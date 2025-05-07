"use client"

import { useState, useEffect, useRef } from "react"
import { semesterOrder } from "@/lib/constants"

export function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("info")
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Simplified click outside handler
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Simplified scroll handler using Intersection Observer
  useEffect(() => {
    const sections = ["info", ...semesterOrder.map((s) => s.toLowerCase())]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.1, rootMargin: "-100px 0px 0px 0px" },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Simplified menu rendering
  const menuItems = ["info", ...semesterOrder.map((s) => s.toLowerCase())]

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`menu-button ${isOpen ? "menu-button-active" : "hover:bg-stone-100 hover:text-stone-900"}`}
      >
        MENU
      </button>

      {isOpen && (
        <div ref={menuRef} className="mt-1 flex flex-col gap-1">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`menu-button ${activeSection === item ? "menu-button-active" : "hover:bg-stone-100 hover:text-stone-900"}`}
              onClick={() => {
                setActiveSection(item)
                setIsOpen(false)
              }}
            >
              {item === "info" ? "INFO" : item.toUpperCase()}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
