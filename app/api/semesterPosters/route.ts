import { getAllSemesterPosters } from "@/lib/api-utils"

export const dynamic = "force-static"

export async function GET() {
  const semesterPosters = await getAllSemesterPosters()
  return new Response(JSON.stringify(semesterPosters), {
    headers: { "Content-Type": "application/json" },
  })
}

