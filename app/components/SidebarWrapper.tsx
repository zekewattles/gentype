import { getAllSemesterPosters } from "@/lib/api-utils"
import { Sidebar } from "./Sidebar"

export async function SidebarWrapper() {
  try {
    const semesterPosters = await getAllSemesterPosters()
    return <Sidebar semesterPosters={semesterPosters} error={null} />
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e)
    return <Sidebar semesterPosters={{}} error={error} />
  }
}

