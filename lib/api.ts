import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const semestersDirectory = path.join(process.cwd(), "content/semesters")

export async function getProjectsBySemester(semester: string) {
  try {
    const semesterDirectory = path.join(semestersDirectory, semester.toLowerCase())
    const fileNames = await fs.readdir(semesterDirectory)

    const projects = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".md")) // Only process markdown files
        .map(async (fileName) => {
          const fullPath = path.join(semesterDirectory, fileName)
          const fileContents = await fs.readFile(fullPath, "utf8")
          const { data, content } = matter(fileContents)

          const processedContent = await remark().use(html).process(content)
          const contentHtml = processedContent
            .toString()
            .split("\n")
            .filter((paragraph) => paragraph.trim() !== "")
            .map((paragraph) => `<p>${paragraph}</p>`)
            .join("")

          if (!data.id) {
            console.warn(`Project file ${fileName} is missing an id in its frontmatter`)
          }

          return {
            id: data.id || fileName.replace(/\.md$/, ""),
            author: data.author,
            title: data.title,
            description: contentHtml,
            videoSrc: data.videoSrc,
            posterSrc: data.posterSrc,
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

export async function getInitialData() {
  try {
    const totalProjects = await getTotalProjectCount()
    const semesters = (await fs.readdir(semestersDirectory)).filter(async (item) => {
      const stat = await fs.stat(path.join(semestersDirectory, item))
      return stat.isDirectory()
    })
    return {
      totalProjects,
      currentYear: new Date().getFullYear(),
      totalSemesters: semesters.length,
    }
  } catch (error) {
    console.error("Error in getInitialData:", error)
    return {
      totalProjects: 0,
      currentYear: new Date().getFullYear(),
      totalSemesters: 0,
    }
  }
}

