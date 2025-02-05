export const semesterOrder = ["FA24", "SP24", "FA23", "SP23", "FA22", "SU22"] as const

export type Semester = (typeof semesterOrder)[number]

