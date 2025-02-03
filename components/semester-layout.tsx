import { Sidebar } from "./sidebar"
import { Project } from "./project"
import { getProjectsBySemester } from "@/lib/api"

interface SemesterLayoutProps {
  semester: string
}

export async function SemesterLayout({ semester }: SemesterLayoutProps) {
  const projects = await getProjectsBySemester(semester)

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-3 space-y-3 overflow-y-auto bg-zinc-950 rounded-lg">
        <div className="space-y-3">
          {projects.map((project) => (
            <Project key={project.id} {...project} />
          ))}
        </div>
      </main>
    </>
  )
}

