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

  return (
    <article className="w-full space-y-3 rounded-md overflow-hidden">
      <div className="w-full mx-auto aspect-video rounded-md overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc || undefined}
          poster={posterSrc || undefined}
          className="w-full h-full object-cover"
          playsInline
          controls
        />
      </div>
      <div className="bg-zinc-900 rounded-md p-3 space-y-2">
        <p className="text-xs font-medium text-zinc-400">{author}</p>
        <h2 className="text-2xl font-medium text-zinc-50">{title}</h2>
        <div
          className="text-xs leading-relaxed space-y-2 text-zinc-50"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {links?.map((link, index) => (
          <div key={index}>
            <a
              href={link.url}
              className="text-lime-400 text-sm hover:text-zinc-300 font-medium cursor-pointer"
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

