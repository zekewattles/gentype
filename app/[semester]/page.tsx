import { Suspense } from "react"
import { Project } from "../components/Project"
import { getProjectsBySemester } from "@/lib/api-utils"
import { semesterOrder, type Semester } from "@/lib/constants"
import type { Metadata } from "next"
import Loading from "../loading"

interface PageProps {
  params: Promise<{ semester: string }>
}

export default function SemesterPage({ params }: PageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <SemesterContent params={params} />
    </Suspense>
  )
}

async function SemesterContent({ params }: PageProps) {
  const { semester } = await params
  const normalizedSemester = semester.toUpperCase() as Semester

  if (!semesterOrder.includes(normalizedSemester)) {
    return <div className="text-white text-center p-8">Invalid semester.</div>
  }

  const projects = await getProjectsBySemester(normalizedSemester)

  if (!projects || projects.length === 0) {
    return <div className="text-white text-center p-8">No projects found for this semester.</div>
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { semester } = await params
  return {
    title: `${semester.toUpperCase()} Semester | GenType`,
  }
}

