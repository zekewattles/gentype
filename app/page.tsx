import { Suspense } from "react"
import { Project } from "./components/Project"
import { getProjectsBySemester } from "@/lib/api-utils"
import { semesterOrder } from "@/lib/constants"
import { Footer } from "./components/Footer"

// Helper component to load semester projects with Suspense
async function SemesterProjectsComponent({ semester }: { semester: string }) {
  const projects = await getProjectsBySemester(semester)

  return (
    <>
      {projects.map((project, i) => (
        <Project key={project.id} {...project} isLast={i === projects.length - 1} />
      ))}
    </>
  )
}

export default async function Home() {
  // Pre-fetch the first semester for faster initial load
  const firstSemesterProjects = await getProjectsBySemester(semesterOrder[0])

  return (
    <div className="py-[var(--section-spacing)]">
      <section id="info" className="section-spacing">
        <h1 className="section-title">
          GENERATIVE
          <br />
          TYPOGRAPHY
        </h1>
        <p className="text-base leading-relaxed">
          Generative Typography is a creative coding course taught by{" "}
          <a href="https://zeke.studio/" target="_blank" rel="noopener noreferrer">
            ZEKE WATTLES
          </a>{" "}
          at ArtCenter College of Design. Through a series of focused{" "}
          <a href="https://editor.p5js.org/zekewattles/sketches" target="_blank" rel="noopener noreferrer">
            P5.JS DEMOS
          </a>
          , students learn to build custom code-based graphic design tools for generative identity systems, microsites, installations, and more.
        </p>
      </section>

      {/* First semester loaded eagerly */}
      <section id={semesterOrder[0].toLowerCase()} className="section-spacing">
        <h1 className="section-title mb-[var(--section-spacing)]">{semesterOrder[0]}</h1>
        {firstSemesterProjects.map((project, i) => (
          <Project key={project.id} {...project} isLast={i === firstSemesterProjects.length - 1} />
        ))}
      </section>

      {/* Other semesters loaded with Suspense */}
      {semesterOrder.slice(1).map((semester) => (
        <section key={semester} id={semester.toLowerCase()} className="section-spacing">
          <h1 className="section-title mb-[var(--section-spacing)]">{semester}</h1>
          <Suspense
            fallback={<div className="h-24 flex items-center justify-center text-stone-400">Loading projects...</div>}
          >
            <SemesterProjectsComponent semester={semester} />
          </Suspense>
        </section>
      ))}

      <Footer logoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Generative%E2%80%A8Typography-dyzvCOYSNgHYNnx5ifuVTHLzXLUIAb.svg" />
    </div>
  )
}
