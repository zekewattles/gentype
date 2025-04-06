import { Project } from "./components/Project"
import { getProjectsBySemester } from "@/lib/api-utils"
import { semesterOrder } from "@/lib/constants"

export default async function Home() {
  // Get all projects for each semester
  const semesterProjects = await Promise.all(
    semesterOrder.map(async (semester) => {
      const projects = await getProjectsBySemester(semester)
      return { semester, projects }
    }),
  )

  return (
    <div>
      {/* Info Section */}
      <section id="info" className="mb-24">
        <h1 className="text-5xl font-normal mb-8">
          Generative
          <br />
          Typography
        </h1>
        <p className="text-base leading-relaxed">
          Generative Typography is a creative coding course taught by{" "}
          <a
            href="https://zeke.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            Zeke Wattles
          </a>{" "}
          at ArtCenter College of Design. Through a series of focused{" "}
          <a
            href="https://editor.p5js.org/zekewattles/sketches"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            p5.js demos
          </a>
          , students learn to build custom code-based tools for graphic design and use them to build generative identity systems, microsites, installations, and more.
        </p>
      </section>

      <hr />

      {/* Semester Sections */}
      {semesterProjects.map(({ semester, projects }) => (
        <section key={semester} id={semester.toLowerCase()} className="mb-12">
          <h1 className="text-5xl font-normal mb-12">{semester}</h1>
          {projects.map((project) => (
            <Project key={project.id} {...project} />
          ))}
          {semester !== semesterOrder[semesterOrder.length - 1] && <hr />}
        </section>
      ))}
    </div>
  )
}

