import { getAllSemesterPosters } from "@/lib/api-utils"
import { NextResponse } from "next/server"

export async function GET() {
  const semesterPosters = await getAllSemesterPosters()
  return NextResponse.json(semesterPosters)
}

