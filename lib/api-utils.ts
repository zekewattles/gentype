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
}

export async function getAllSemesterPosters(): Promise<Record<string, string>> {
  const result: Record<string, string> = {}

  for (const semester of semesterOrder) {
    const poster = getFirstProjectPosterBySemester(semester)
    if (poster) {
      result[semester.toLowerCase()] = `/gentype/${poster.replace(/^\//, "")}`
    }
  }

  return result
}

function getFirstProjectPosterBySemester(semester: Semester): string | null {
  const semesterDirectory = path.join(semestersDirectory, semester.toLowerCase())
  const entries = fs.readdirSync(semesterDirectory)

  const mdFiles = entries.filter((entry) => entry.endsWith(".md"))

  if (mdFiles.length === 0) return null

  const firstProjectFile = mdFiles[0]
  const fullPath = path.join(semesterDirectory, firstProjectFile)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const { data } = matter(fileContents)
  return data.posterSrc || null
}

