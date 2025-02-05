import { Project } from "./components/Project"
import { getProjectsBySemester } from "@/lib/api-utils"
import { semesterOrder } from "@/lib/constants"

export default async function Home() {
  const latestSemester = semesterOrder[0]
  const projects = await getProjectsBySemester(latestSemester)

  return (
    <div className="space-y-2">
      {projects.map((project) => (
        <Project key={project.id} {...project} />
      ))}
    </div>
  )
}

