import { SidebarClient } from "./sidebar-client"
import { getAllSemesterPosters } from "@/lib/api"

export async function Sidebar() {
  const semesterPosters = await getAllSemesterPosters()

  return <SidebarClient semesterPosters={semesterPosters} />
}

