import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const semestersDirectory = path.join(process.cwd(), "content/semesters")

export async function getProjectsBySemester(semester: string) {
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

  return projects.sort((a, b) => {
    const aNumber = a.id ? Number.parseInt(a.id.split("-").pop() || "0", 10) : 0
    const bNumber = b.id ? Number.parseInt(b.id.split("-").pop() || "0", 10) : 0
    return aNumber - bNumber
  })
}

