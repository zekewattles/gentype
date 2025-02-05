import { Project } from "./components/Project"
import { getProjectsBySemester } from "@/lib/api-utils"
import { semesterOrder } from "@/lib/constants"

export default async function Home() {
  try {
    const latestSemester = semesterOrder[0]
    console.log("Fetching projects for latest semester:", latestSemester)

    const projects = await getProjectsBySemester(latestSemester)
    console.log("Projects found:", projects.length)

    if (!projects || projects.length === 0) {
      return <div className="text-white text-center p-8">No projects found for the current semester.</div>
    }

    return (
      <div className="space-y-3">
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error in Home page:", error)
    return <div className="text-red-500 text-center p-8">Error loading projects. Please try again later.</div>
  }
}

