import { Project } from "../components/Project"
import { getProjectsBySemester } from "@/lib/api-utils"
import { semesterOrder, type Semester } from "@/lib/constants"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ semester: string }>
}

export default async function SemesterPage({ params }: PageProps) {
  try {
    const { semester } = await params
    console.log("Attempting to fetch projects for semester:", semester)

    // Validate semester
    const normalizedSemester = semester.toUpperCase() as Semester
    if (!semesterOrder.includes(normalizedSemester)) {
      console.log("Invalid semester:", semester)
      return <div className="text-white text-center p-8">Invalid semester.</div>
    }

    const projects = await getProjectsBySemester(normalizedSemester)
    console.log("Projects found:", projects.length)

    if (!projects || projects.length === 0) {
      console.log("No projects found for semester:", semester)
      return <div className="text-white text-center p-8">No projects found for this semester.</div>
    }

    return (
      <div className="space-y-3">
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error in SemesterPage:", error)
    return <div className="text-red-500 text-center p-8">An error occurred while loading projects.</div>
  }
}

export function generateStaticParams() {
  // Generate params for all valid semesters
  const params = semesterOrder.map((semester) => ({
    semester: semester.toLowerCase(),
  }))
  console.log("Generated static params:", params)
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { semester } = await params
  return {
    title: `${semester.toUpperCase()} Semester | GenType`,
  }
}

