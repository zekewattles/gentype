import { SemesterLayout } from "@/components/semester-layout"
import { getProjectsBySemester } from "@/lib/api"
import { semesterOrder } from "@/lib/constants"

export default async function Home() {
  const latestSemester = semesterOrder[0]
  try {
    const projects = await getProjectsBySemester(latestSemester)
    return <SemesterLayout semester={latestSemester} projects={projects} />
  } catch (error) {
    console.error(`Error fetching projects for ${latestSemester}:`, error)
    return <div>Error loading projects. Please try again later.</div>
  }
}

