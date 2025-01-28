"use client"

import { useRef } from "react"

interface ProjectProps {
  author: string
  title: string
  description: string
  videoSrc: string
  posterSrc: string
  links?: { text: string; url: string }[]
}

export function Project({ author, title, description, videoSrc, posterSrc, links }: ProjectProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Ensure URLs start with /gentype
  const getFullUrl = (path: string) => {
    // Remove any leading slash to avoid double slashes
    const cleanPath = path.startsWith("/") ? path.slice(1) : path
    return `/gentype/${cleanPath}`
  }

  return (
    <article className="w-full">
      <div className="w-full mx-auto aspect-video mb-4">
        <video
          ref={videoRef}
          src={getFullUrl(videoSrc)}
          poster={getFullUrl(posterSrc)}
          className="w-full h-full object-cover"
          playsInline
          controls
        />
      </div>
      <p className="text-md font-bold">{author}</p>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="text-sm leading-relaxed space-y-3" dangerouslySetInnerHTML={{ __html: description }} />
      {links?.map((link, index) => (
        <div key={index} className="mt-2">
          <a
            href={link.url}
            className="text-violet-600 text-sm hover:text-violet-800 underline cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.text}
          </a>
        </div>
      ))}
    </article>
  )
}

