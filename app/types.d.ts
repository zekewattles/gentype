import type { Metadata } from "next"

declare global {
  type PageProps<Params = {}> = {
    params: Params
    searchParams: { [key: string]: string | string[] | undefined }
  }

  type GenerateMetadata = (props: PageProps) => Promise<Metadata> | Metadata
}

