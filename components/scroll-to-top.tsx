"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface ScrollToTopProps {
  href: string
  children: ReactNode
  className?: string
}

export function ScrollToTop({ href, children, className }: ScrollToTopProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push(href)
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

