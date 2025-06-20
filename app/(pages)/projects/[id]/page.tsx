import { Metadata } from "next"

import { ProjectInterface } from "@/lib/types"
import { ProjectContent } from "../sections/ProjectContent"
import { getProjects, Project } from "@/lib/content"

type PageProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface ProjectProps {
  project: ProjectInterface
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const projects = await getProjects()
  const project = projects.find(
    (p: Project) =>
      String(p.id?.toLowerCase()) === params.id.toString().toLowerCase()
  )

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found",
    }
  }

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
}

export default async function ProjectDetailPage({ params }: PageProps) {
  return <ProjectContent id={params?.id?.toLowerCase()} />
}
