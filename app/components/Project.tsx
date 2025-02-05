"use client"

import { useRef } from "react"

interface ProjectProps {
  author: string
  title: string
  description: string
  videoSrc: string | null
  posterSrc: string | null
  links?: { text: string; url: string }[]
}

export function Project({ author, title, description, videoSrc, posterSrc, links }: ProjectProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  if (!title || !author) {
    return null
  }

  return (
    <article className="w-full space-y-3 overflow-hidden">
      <div className="w-full mx-auto aspect-video rounded-sm overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc || undefined}
          poster={posterSrc || undefined}
          className="w-full h-full object-contain"
          playsInline
          controls
        />
      </div>
      <div className="backdrop-blur-2xl bg-white/5 rounded-sm p-3 space-y-1.5">
        <p className="text-xs font-medium uppercase text-white/50">{author}</p>
        <h2 className="text-2xl font-medium text-white">{title}</h2>
        <div
          className="text-xs leading-relaxed space-y-2 text-white"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {links?.map((link, index) => (
          <div key={index}>
            <a
              href={link.url}
              className="text-lime-400 text-sm hover:text-lime-600 font-medium cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          </div>
        ))}
      </div>
    </article>
  )
}

