"use client"
import Link from "next/link"
import { semesterOrder } from "@/lib/constants"

interface SidebarClientProps {
  semesterPosters: Record<string, string>
}

export function SidebarClient({ semesterPosters }: SidebarClientProps) {
  return (
    <aside className="w-full md:w-4/12 md:sticky md:top-0 md:h-screen overflow-y-auto bg-zinc-950 scrollbar-hide rounded-md">
      <div className="p-3 space-y-3 h-full overflow-y-auto scrollbar-hide">
        <div className="info bg-zinc-900 rounded-md p-3 space-y-2">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-medium text-zinc-50">GenType</h1>
          </Link>
          <p className="text-xs leading-relaxed text-zinc-50">
            Generative Typography is a creative coding course taught by Zeke Wattles at ArtCenter College of Design.
          </p>
          <p className="text-xs leading-relaxed text-zinc-50">
            Through focused exercises, students learn to build custom{" "}
            <a
              href="https://editor.p5js.org/zekewattles/sketches"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-400 hover:text-zinc-300 font-medium cursor-pointer"
            >
              code-based tools
            </a>{" "}
            for graphic design and integrate them into larger identity systems.
          </p>
        </div>
        <nav>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-1">
            {semesterOrder.map((semester) => (
              <li key={semester}>
                <Link
                  href={`/${semester.toLowerCase()}`}
                  className="block aspect-video rounded-md text-white transition-colors relative overflow-hidden group"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${semesterPosters[semester.toLowerCase()]})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black opacity-20" />
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <span className="font-medium text-2xl md:text-4xl">{semester}</span>
                  </div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

