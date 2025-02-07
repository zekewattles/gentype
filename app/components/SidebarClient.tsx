"use client"
import Link from "next/link"
import { semesterOrder } from "@/lib/constants"

interface SidebarClientProps {
  semesterPosters: Record<string, string>
}

export function SidebarClient({ semesterPosters }: SidebarClientProps) {
  return (
    <aside className="w-full md:w-4/12 md:sticky md:top-0 md:h-screen overflow-y-auto bg-black scrollbar-hide">
      <div className="p-2 space-y-2 h-full overflow-y-auto scrollbar-hide">
        <div className="info bg-neutral-950 rounded-lg p-3 space-y-2 border border-neutral-800">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-light text-white">GenType</h1>
          </Link>
          <p className="text-xs leading-relaxed text-white">
            Generative Typography is a creative coding course taught by Zeke Wattles at ArtCenter College of Design.
          </p>
          <p className="text-xs leading-relaxed text-white">
            Through focused exercises, students learn to build custom{" "}
            <a
              href="https://editor.p5js.org/zekewattles/sketches"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-400 hover:text-lime-600 font-medium cursor-pointer"
            >
              code-based tools
            </a>{" "}
            for graphic design and integrate them into larger identity systems.
          </p>
        </div>
        <nav>
          <ul className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {semesterOrder.map((semester) => {
              const posterUrl = semesterPosters[semester.toLowerCase()]
              return (
                <li key={semester}>
                  <Link
                    href={`/${semester.toLowerCase()}`}
                    className="block aspect-video rounded-lg text-white relative overflow-hidden group border border border-neutral-800"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center scale-110 blur-sm group-hover:blur-none transition-all duration-200"
                      style={{
                        backgroundImage: posterUrl ? `url(${posterUrl})` : "none",
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-light text-3xl md:text-5xl z-10">{semester}</span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

