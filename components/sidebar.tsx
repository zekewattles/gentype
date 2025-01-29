import React from "react"
import { ScrollToTop } from "./scroll-to-top"
import { semesterOrder } from "@/lib/constants"

function SidebarComponent() {
  return (
    <aside className="w-full md:w-4/12 md:sticky md:top-0 md:h-screen border-b md:border-r border-gray-200 overflow-y-auto flex flex-col bg-[var(--background-color)]">
      <div className="p-3 flex-grow space-y-3">
        <ScrollToTop href="/" className="inline-block">
          <h1 className="text-3xl font-medium">GenType</h1>
        </ScrollToTop>
        <p className="text-sm leading-relaxed">
          Generative Typography is a creative coding course taught by Zeke Wattles at ArtCenter College of Design.
        </p>
        <p className="text-sm leading-relaxed">
          Through focused exercises, students learn to build custom{" "}
          <a
            href="https://editor.p5js.org/zekewattles/sketches"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
          >
            code-based tools
          </a>{" "}
          for graphic design and integrate them into larger identity systems.
        </p>
      </div>
      <nav className="p-3 pt-0">
      <h2 className="text-sm font-bold mb-1">Terms</h2>
        <ul className="space-y-0">
          {semesterOrder.map((semester) => (
            <li key={semester}>
              <ScrollToTop href={`/${semester.toLowerCase()}`} className="text-indigo-600 hover:text-indigo-800 cursor-pointer font-medium text-2xl">
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

