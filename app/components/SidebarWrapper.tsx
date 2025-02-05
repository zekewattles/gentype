import { getAllSemesterPosters } from "@/lib/api-utils"
import { Sidebar } from "./Sidebar"

export async function SidebarWrapper() {
  const semesterPosters = await getAllSemesterPosters()
  return <Sidebar semesterPosters={semesterPosters} />
}

