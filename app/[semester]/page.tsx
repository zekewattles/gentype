import { notFound } from "next/navigation"
import { Project } from "@/components/Project"
import { getProjectsBySemester } from "@/lib/api-utils"
import { semesterOrder } from "@/lib/constants"

export default async function SemesterPage({ params }: { params: Promise<{ semester: string }> }) {
  const { semester } = await params
  const projects = await getProjectsBySemester(semester)

  if (!projects.length) {
    notFound()
  }

  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <Project key={project.id} {...project} />
      ))}
    </div>
  )
}

export function generateStaticParams() {
  return semesterOrder.map((semester) => ({
    semester: semester.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ semester: string }> }) {
  const { semester } = await params
  return {
    title: `${semester.toUpperCase()} Semester | GenType`,
  }
}

