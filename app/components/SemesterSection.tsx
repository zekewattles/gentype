import { Project } from "./Project"
import { getProjectsBySemester } from "@/lib/api-utils"

interface SemesterSectionProps {
  semester: string
}

export default async function SemesterSection({ semester }: SemesterSectionProps) {
  const projects = await getProjectsBySemester(semester)

  return (
    <section id={semester.toLowerCase()} className="section-spacing">
      <h1 className="section-title mb-[var(--section-spacing)]">{semester}</h1>
      {projects.map((project, i) => (
        <Project key={project.id} {...project} isLast={i === projects.length - 1} />
      ))}
    </section>
  )
}
