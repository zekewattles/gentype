import { Project } from "./components/Project"
import { getProjectsBySemester } from "@/lib/api-utils"
import { semesterOrder } from "@/lib/constants"

export default async function Home() {
  const semesterProjects = await Promise.all(
    semesterOrder.map(async (semester) => {
      const projects = await getProjectsBySemester(semester)
      return { semester, projects }
    }),
  )

  return (
    <div className="space-y-20">
      <section id="info">
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
          , students learn to build custom code-based tools for graphic design and use them to build generative identity
          systems, microsites, installations, and more.
        </p>
      </section>
      <hr />
      {semesterProjects.map(({ semester, projects }, index) => (
        <section key={semester} id={semester.toLowerCase()}>
          <h1 className="text-5xl font-normal mb-20">{semester}</h1>
          <div className="space-y-20">
            {projects.map((project) => (
              <Project key={project.id} {...project} />
            ))}
          </div>
          {semester !== semesterOrder[semesterOrder.length - 1] && <hr />}
        </section>
      ))}
    </div>
  )
}
