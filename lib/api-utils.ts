import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import { VFile } from "vfile"
import { semesterOrder, type Semester } from "./constants"

const semestersDirectory = path.join(process.cwd(), "content/semesters")

export async function getProjectsBySemester(semester: string) {
  try {
    const semesterDirectory = path.join(semestersDirectory, semester.toLowerCase())
    const fileNames = await fs.promises.readdir(semesterDirectory)

    const projects = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map(async (fileName) => {
          const fullPath = path.join(semesterDirectory, fileName)
          const fileContents = await fs.promises.readFile(fullPath, "utf8")
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

export async function getAllSemesterPosters(): Promise<Record<string, string>> {
  try {
    console.log("getAllSemesterPosters called")
    console.log("Semesters directory:", semestersDirectory)

    const result: Record<string, string> = {}

    for (const semester of semesterOrder) {
      const poster = getFirstProjectPosterBySemester(semester)
      if (poster) {
        result[semester.toLowerCase()] = `/gentype/${poster.replace(/^\//, "")}`
      }
    }

    console.log("Final result:", result)

    if (Object.keys(result).length === 0) {
      throw new Error("No valid semester posters found")
    }

    return result
  } catch (error) {
    console.error("Error in getAllSemesterPosters:", error)
    throw new Error(`Failed to get all semester posters: ${error instanceof Error ? error.message : String(error)}`)
  }
}

function getFirstProjectPosterBySemester(semester: Semester): string | null {
  try {
    const semesterDirectory = path.join(semestersDirectory, semester.toLowerCase())
    console.log("Checking semester directory:", semesterDirectory)
    const entries = fs.readdirSync(semesterDirectory)

    const mdFiles = entries.filter((entry) => entry.endsWith(".md"))
    console.log("MD files found:", mdFiles)

    if (mdFiles.length === 0) return null

    const firstProjectFile = mdFiles[0]
    const fullPath = path.join(semesterDirectory, firstProjectFile)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const { data } = matter(fileContents)
    console.log("Frontmatter data:", data)
    return data.posterSrc || null
  } catch (error) {
    console.error(`Error in getFirstProjectPosterBySemester for ${semester}:`, error)
    return null
  }
}

