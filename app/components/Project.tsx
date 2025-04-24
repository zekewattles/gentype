"use client"

import { useRef, useEffect, useState } from "react"

interface ProjectProps {
  author: string
  title: string
  description: string
  videoSrc: string | null
  posterSrc: string | null
  links?: { text: string; url: string }[]
  isLast?: boolean
}

export function Project({ author, title, description, videoSrc, posterSrc, links = [], isLast = false }: ProjectProps) {
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [])

  if (!title || !author) return null

  return (
    <article className={!isLast ? "section-spacing" : ""}>
      <hr className="border-stone-400" />
      <div className="content-spacing">
        <div className="pt-[var(--content-spacing)]">
          <h2 className="title-text">
            {title.toUpperCase()}
            <br />
            <span className="subtitle-text">{author.toUpperCase()}</span>
          </h2>
        </div>

        <div ref={videoRef} className="w-full aspect-video bg-stone-800">
          {isVisible && (
            <video
              src={videoSrc || undefined}
              poster={posterSrc || undefined}
              className="w-full h-full object-cover"
              playsInline
              controls
              preload="none"
              loading="lazy"
            />
          )}
        </div>

        <div className="text-base leading-relaxed content-spacing" dangerouslySetInnerHTML={{ __html: description }} />

        {links.length > 0 && (
          <div className="content-spacing">
            {links.map((link, i) => (
              <a key={i} href={link.url} className="block text-base" target="_blank" rel="noopener noreferrer">
                {link.text.toUpperCase()}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
