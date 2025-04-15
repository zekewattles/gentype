"use client"

import { useRef } from "react"

interface ProjectProps {
  author: string
  title: string
  description: string
  videoSrc: string | null
  posterSrc: string | null
  links?: { text: string; url: string }[]
  isLast?: boolean
}

export function Project({ author, title, description, videoSrc, posterSrc, links, isLast = false }: ProjectProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  if (!title || !author) {
    return null
  }

  return (
    <article className={`w-full ${!isLast ? "section-spacing" : ""}`}>
      <hr className="border-stone-400" />
      <div className="content-spacing">
        <div className="pt-[var(--content-spacing)]">
          <h2 className="title-text">
            {title.toUpperCase()}
            <br />
            <span className="subtitle-text">{author.toUpperCase()}</span>
          </h2>
        </div>

        <div className="w-full aspect-video bg-stone-800 relative flex items-center justify-center">
          {/* Removed the text overlay that was here */}
          <video
            ref={videoRef}
            src={videoSrc || undefined}
            poster={posterSrc || undefined}
            className="w-full h-full object-cover"
            playsInline
            controls
          />
        </div>

        <div className="text-base leading-relaxed content-spacing" dangerouslySetInnerHTML={{ __html: description }} />

        {links && links.length > 0 && (
          <div className="content-spacing">
            {links.map((link, index) => (
              <a key={index} href={link.url} className="block text-base" target="_blank" rel="noopener noreferrer">
                {link.text.toUpperCase()}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
