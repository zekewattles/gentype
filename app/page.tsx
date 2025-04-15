import { Project } from "./components/Project"
import { getProjectsBySemester } from "@/lib/api-utils"
import { semesterOrder } from "@/lib/constants"
import { Footer } from "./components/Footer"

export default async function Home() {
  const semesterProjects = await Promise.all(
    semesterOrder.map(async (semester) => {
      const projects = await getProjectsBySemester(semester)
      return { semester, projects }
    }),
  )

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
          , students learn to build custom code-based tools for graphic design and use them to build generative identity
          systems, microsites, installations, and more.
        </p>
      </section>

      {semesterProjects.map(({ semester, projects }, semesterIndex) => (
        <section key={semester} id={semester.toLowerCase()} className="section-spacing">
          <h1 className="section-title mb-[var(--section-spacing)]">{semester}</h1>
          <div>
            {projects.map((project, projectIndex) => (
              <Project key={project.id} {...project} isLast={projectIndex === projects.length - 1} />
            ))}
          </div>
        </section>
      ))}

      <Footer logoSrc="/gentype/images/logo.svg" />
    </div>
  )
}
