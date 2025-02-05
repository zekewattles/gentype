import { getAllSemesterPosters } from "@/lib/api-utils"
import { Sidebar } from "./Sidebar"

export async function SidebarWrapper() {
  let semesterPosters: Record<string, string> = {}
  let error: string | null = null

  try {
    semesterPosters = await getAllSemesterPosters()
  } catch (e) {
    console.error("Error fetching semester posters:", e)
    error = e instanceof Error ? e.message : String(e)
  }

  return <Sidebar semesterPosters={semesterPosters} error={error} />
}

