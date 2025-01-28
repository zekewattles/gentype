import { notFound } from "next/navigation"
import { SemesterLayout } from "@/components/semester-layout"
import { getProjectsBySemester } from "@/lib/api"
import { semesterOrder } from "@/lib/constants"

export default async function SemesterPage(props: { params: Promise<{ semester: string }> }) {
  const params = await props.params;
  const projects = await getProjectsBySemester(params.semester)

  if (!projects.length) {
    notFound()
  }

  return <SemesterLayout semester={params.semester} projects={projects} />
}

export function generateStaticParams() {
  return semesterOrder.map((semester) => ({
    semester: semester.toLowerCase(),
  }))
}

