import { Sidebar } from "./sidebar"
import { Project } from "./project"
import { Footer } from "./footer"

interface SemesterLayoutProps {
  semester: string
  projects: any[]
}

export function SemesterLayout({ semester, projects }: SemesterLayoutProps) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-3 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">{semester.toUpperCase()}</h1>
        <div className="space-y-24">
          {projects.map((project) => (
            <Project key={project.id} {...project} />
          ))}
        </div>
        <Footer />
      </main>
    </>
  )
}

