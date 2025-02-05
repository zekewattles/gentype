import { Project } from "./components/Project"
import { getProjectsBySemester } from "@/lib/api-utils"
import { semesterOrder } from "@/lib/constants"

export default async function Home() {
  const latestSemester = semesterOrder[0]
  const projects = await getProjectsBySemester(latestSemester)

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
}

