import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import type { ProjectData } from "@/app/types"

const semestersDirectory = path.join(process.cwd(), "content/semesters")

// Cache for processed markdown to avoid redundant processing
const markdownCache = new Map<string, string>()

// Simplified markdown processing with caching
async function processMarkdown(content: string, cacheKey: string) {
  if (markdownCache.has(cacheKey)) {
    return markdownCache.get(cacheKey)!
  }

  const result = await unified().use(remarkParse).use(remarkRehype).use(rehypeStringify).process(content)
  const html = result.toString()

  markdownCache.set(cacheKey, html)
  return html
}

// Simplified path handling
function formatAssetPath(assetPath: string | null) {
  if (!assetPath) return null
  return `/gentype/${assetPath.replace(/^\//, "")}`
}

// Project data cache
const projectCache = new Map<string, ProjectData[]>()

export async function getProjectsBySemester(semester: string): Promise<ProjectData[]> {
  // Check cache first
  const cacheKey = semester.toLowerCase()
  if (projectCache.has(cacheKey)) {
    return projectCache.get(cacheKey)!
  }

  const semesterDir = path.join(semestersDirectory, cacheKey)
  const fileNames = await fs.promises.readdir(semesterDir)

  const projects = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const fullPath = path.join(semesterDir, fileName)
        const fileContents = await fs.promises.readFile(fullPath, "utf8")
        const { data, content } = matter(fileContents)
        const contentHtml = await processMarkdown(content, `${cacheKey}-${fileName}`)

        return {
          id: data.id || fileName.replace(/\.md$/, ""),
          author: data.author,
          title: data.title,
          description: contentHtml,
          videoSrc: formatAssetPath(data.videoSrc),
          posterSrc: formatAssetPath(data.posterSrc),
          links: data.links || [],
        }
      }),
  )

  // Sort projects
  const sortedProjects = projects.sort((a, b) => {
    const aNum = Number.parseInt(a.id.split("-").pop() || "0", 10)
    const bNum = Number.parseInt(b.id.split("-").pop() || "0", 10)
    return aNum - bNum
  })

  // Cache the result
  projectCache.set(cacheKey, sortedProjects)

  return sortedProjects
}
