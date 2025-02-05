import { getAllSemesterPosters } from "@/lib/api-utils"
import { NextResponse } from "next/server"

export const dynamic = "force-static"

export async function GET() {
  const semesterPosters = await getAllSemesterPosters()
  console.log("API route - semesterPosters:", semesterPosters)
  return NextResponse.json(semesterPosters)
}

