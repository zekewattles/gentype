import { getAllSemesterPosters } from "@/lib/api-utils"
import { NextResponse } from "next/server"

export const dynamic = "force-static"

export async function GET() {
  try {
    const semesterPosters = await getAllSemesterPosters()
    console.log("API route - semesterPosters:", semesterPosters)

    if (Object.keys(semesterPosters).length === 0) {
      throw new Error("No semester posters found")
    }

    return NextResponse.json(semesterPosters)
  } catch (error) {
    console.error("Error in semesterPosters API route:", error)
    return NextResponse.json(
      { error: `Failed to fetch semester posters: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 },
    )
  }
}

