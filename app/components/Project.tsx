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
    <article className="w-full space-y-6">
      {" "}
      {/* Removed mb-24 since spacing is handled by parent */}
      <div className="w-full aspect-video bg-black border border-neutral-800">
        <video
          ref={videoRef}
          src={videoSrc || undefined}
          poster={posterSrc || undefined}
          className="w-full h-full object-cover"
          playsInline
          controls
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-base">
          <span className="font-bold">
            {author} — {title}
          </span>
        </h3>
        <div className="text-base leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: description }} />
        <div className="space-y-4">
          {links?.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="block text-base underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

