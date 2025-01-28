import { SemesterLayout } from "@/components/semester-layout"
import { getProjectsBySemester } from "@/lib/api"
import { semesterOrder } from "@/lib/constants"

export default async function Home() {
  const latestSemester = semesterOrder[0]
  const projects = await getProjectsBySemester(latestSemester)

  return <SemesterLayout semester={latestSemester} projects={projects} />
}

