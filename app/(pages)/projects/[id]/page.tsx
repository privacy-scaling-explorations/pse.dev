import { Metadata } from "next"

import { ProjectInterface } from "@/lib/types"
import { ProjectContent } from "../sections/ProjectContent"

type PageProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface ProjectProps {
  project: ProjectInterface
}

/*
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const response = await fetch("/api/projects")
  const projects = await response.json()
  
  const project = projects.find(
    (p: ProjectInterface) => 
      String(p.id?.toLowerCase()) === params.id.toString().toLowerCase()
  )
  
  const content = project?.content
  const imageUrl =
    (project?.image ?? "")?.length > 0
      ? `/project-banners/${project?.image}`
      : "/og-image.png"

  return {
    title: project?.name,
    description: content?.tldr,
    openGraph: {
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}*/

export default async function ProjectDetailPage({ params }: PageProps) {
  return <ProjectContent id={params?.id?.toLowerCase()} />
}
