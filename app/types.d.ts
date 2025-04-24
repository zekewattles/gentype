// Centralized type definitions
export interface ProjectData {
    id: string
    author: string
    title: string
    description: string
    videoSrc: string | null
    posterSrc: string | null
    links?: { text: string; url: string }[]
  }
  
  export interface SemesterProjects {
    semester: string
    projects: ProjectData[]
  }
  