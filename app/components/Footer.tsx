"use client"

import { useEffect, useState } from "react"

interface FooterProps {
  logoSrc: string
}

export function Footer({ logoSrc }: FooterProps) {
  const [currentYear, setCurrentYear] = useState("2025")

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="w-full mt-[var(--section-spacing)] pb-[var(--section-spacing)]">
      <hr className="border-stone-400" />
      <div className="content-spacing-double pt-[var(--content-spacing-double)]">
        <div className="w-full mb-[var(--content-spacing-double)]">
          <img src={logoSrc || undefined} alt="Generative Typography Logo" className="w-full h-auto" />
        </div>
        <p className="subtitle-text text-base">© {currentYear} Zeke Wattles + all students.</p>
      </div>
    </footer>
  )
}
