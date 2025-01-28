import { ScrollToTop } from "./scroll-to-top"
import { semesterOrder } from "@/lib/constants"

export function Sidebar() {
  return (
    <aside className="w-full md:w-4/12 md:sticky md:top-0 md:h-screen border-b md:border-r border-black/10 overflow-y-auto flex flex-col">
      <div className="p-4 flex-grow space-y-3">
        <ScrollToTop href="/" className="inline-block">
          <h1 className="text-2xl font-medium">GenType</h1>
        </ScrollToTop>
        <p className="text-xs leading-relaxed">
          Generative Typography is a creative coding course taught by Zeke Wattles at ArtCenter College of Design.
        </p>
        <p className="text-xs leading-relaxed">
          Through focused exercises, students learn to build custom{" "}
          <a
            href="https://editor.p5js.org/zekewattles/sketches"
            target="_blank"
            rel="noopener noreferrer"
            className="btn text-xs"
          >
            code-based tools
          </a>{" "}
          for graphic design and integrate them into larger identity systems.
        </p>
      </div>
      <nav className="p-4 pt-0">
        <ul className="space-y-2">
          {semesterOrder.map((semester) => (
            <li key={semester}>
              <ScrollToTop href={`/${semester.toLowerCase()}`} className="btn text-xl">
                {semester}
              </ScrollToTop>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

