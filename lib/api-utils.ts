import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import { VFile } from "vfile"

const semestersDirectory = path.join(process.cwd(), "content/semesters")

export async function getProjectsBySemester(semester: string) {
  try {
    const semesterDirectory = path.join(semestersDirectory, semester.toLowerCase())
    const fileNames = await fs.readdir(semesterDirectory)

    const projects = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map(async (fileName) => {
          const fullPath = path.join(semesterDirectory, fileName)
          const fileContents = await fs.readFile(fullPath, "utf8")
          const { data, content } = matter(fileContents)

          const processedContent = await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(new VFile(content))
          const contentHtml = processedContent.toString()

          if (!data.id) {
            console.warn(`Project file ${fileName} is missing an id in its frontmatter`)
          }

          return {
            id: data.id || fileName.replace(/\.md$/, ""),
            author: data.author,
            title: data.title,
            description: contentHtml,
            videoSrc: data.videoSrc ? `/gentype/${data.videoSrc.replace(/^\//, "")}` : null,
            posterSrc: data.posterSrc ? `/gentype/${data.posterSrc.replace(/^\//, "")}` : null,
            links: data.links || [],
          }
        }),
    )

    return projects.sort((a, b) => {
      const aNumber = a.id ? Number.parseInt(a.id.split("-").pop() || "0", 10) : 0
      const bNumber = b.id ? Number.parseInt(b.id.split("-").pop() || "0", 10) : 0
      return aNumber - bNumber
    })
  } catch (error) {
    console.error("Error in getProjectsBySemester:", error)
    return []
  }
}

export async function getTotalProjectCount(): Promise<number> {
  try {
    let totalCount = 0
    const semesters = await fs.readdir(semestersDirectory)

    for (const semester of semesters) {
      const semesterPath = path.join(semestersDirectory, semester)
      const stat = await fs.stat(semesterPath)
      if (stat.isDirectory()) {
        const files = await fs.readdir(semesterPath)
        totalCount += files.filter((file) => file.endsWith(".md")).length
      }
    }

    return totalCount
  } catch (error) {
    console.error("Error in getTotalProjectCount:", error)
    return 0
  }
}

export async function getAllSemesterPosters(): Promise<Record<string, string>> {
  try {
    console.log("Semesters directory:", semestersDirectory)
    const entries = await fs.readdir(semestersDirectory, { withFileTypes: true })
    console.log("Directory entries:", entries)
    const semesters = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)
    console.log("Filtered semesters:", semesters)

    const posterPromises = semesters.map(async (semester) => {
      const poster = await getFirstProjectPosterBySemester(semester)
      console.log(`Poster for ${semester}:`, poster)
      return [semester, poster] as [string, string | null]
    })

    const posters = await Promise.all(posterPromises)
    const result = Object.fromEntries(
      posters
        .filter(([, poster]) => poster !== null)
        .map(([semester, poster]) => [
          semester.toLowerCase(),
          poster ? `/gentype/${poster.replace(/^\//, "")}` : "/placeholder-poster.jpg",
        ]),
    ) as Record<string, string>

    console.log("Final result:", result)
    return result
  } catch (error) {
    console.error("Error in getAllSemesterPosters:", error)
    throw new Error(`Failed to get all semester posters: ${error instanceof Error ? error.message : String(error)}`)
  }
}

async function getFirstProjectPosterBySemester(semester: string): Promise<string | null> {
  try {
    const semesterDirectory = path.join(semestersDirectory, semester.toLowerCase())
    console.log("Checking semester directory:", semesterDirectory)
    const entries = await fs.readdir(semesterDirectory, { withFileTypes: true })

    const mdFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md")).map((entry) => entry.name)
    console.log("MD files found:", mdFiles)

    if (mdFiles.length === 0) return null

    const firstProjectFile = mdFiles[0]
    const fullPath = path.join(semesterDirectory, firstProjectFile)
    const fileContents = await fs.readFile(fullPath, "utf8")

    const { data } = matter(fileContents)
    console.log("Frontmatter data:", data)
    return data.posterSrc || null
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOTDIR") {
      console.warn(`Skipping non-directory entry in semesters: ${semester}`)
      return null
    }
    console.error(`Error in getFirstProjectPosterBySemester for ${semester}:`, error)
    return null
  }
}

