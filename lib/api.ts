import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const semestersDirectory = path.join(process.cwd(), "content/semesters")

// Cache object to store processed projects
const projectsCache: { [key: string]: any[] } = {}

export async function getProjectsBySemester(semester: string) {
  // Check if projects for this semester are already in cache
  if (projectsCache[semester]) {
    return projectsCache[semester]
  }

  const semesterDirectory = path.join(semestersDirectory, semester.toLowerCase())
  const fileNames = fs.readdirSync(semesterDirectory)

  const projects = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(semesterDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
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
        id: data.id || fileName.replace(/\.md$/, ""), // Use filename as fallback id
        author: data.author,
        title: data.title,
        description: contentHtml,
        videoSrc: data.videoSrc,
        posterSrc: data.posterSrc,
        links: data.links || [],
      }
    }),
  )

  const sortedProjects = projects.sort((a, b) => {
    const aNumber = Number.parseInt(a.id?.split("-").pop() ?? "0", 10)
    const bNumber = Number.parseInt(b.id?.split("-").pop() ?? "0", 10)
    return aNumber - bNumber
  })

  if (projects.length === 0) {
    console.warn(`No projects found for semester: ${semester}`)
    console.warn(`Searched directory: ${semesterDirectory}`)
  }

  // Store the processed and sorted projects in cache
  projectsCache[semester] = sortedProjects

  return sortedProjects
}

