import React from "react"
import { ScrollToTop } from "./scroll-to-top"
import { semesterOrder } from "@/lib/constants"

function SidebarComponent() {
  return (
    <aside className="w-full md:w-4/12 md:sticky md:top-0 md:h-screen border-b md:border-r border-gray-200 overflow-y-auto flex flex-col bg-[var(--background-color)]">
      <div className="p-3 flex-grow">
        <ScrollToTop href="/" className="inline-block">
          <h1 className="text-3xl font-bold mb-4">GenType</h1>
        </ScrollToTop>
        <p className="text-sm leading-relaxed mb-4">
          Generative Typography is a creative coding course taught by Zeke Wattles at ArtCenter College of Design.
        </p>
        <p className="text-sm leading-relaxed">
          Through focused exercises, students learn to build{" "}
          <a
            href="https://editor.p5js.org/zekewattles/sketches"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600 hover:text-violet-800 underline cursor-pointer"
          >
            custom code-based tools
          </a>{" "}
          for graphic design and integrate them into larger identity systems.
        </p>
      </div>
      <nav className="p-3 pt-0">
        <ul className="space-y-2">
          {semesterOrder.map((semester) => (
            <li key={semester}>
              <ScrollToTop href={`/${semester.toLowerCase()}`} className="text-violet-600 hover:text-violet-800 cursor-pointer font-bold text-2xl">
                {semester}
              </ScrollToTop>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export const Sidebar = React.memo(SidebarComponent)

