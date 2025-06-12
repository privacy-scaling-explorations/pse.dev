import { Metadata } from "next"

import { getProjectById } from "@/lib/projectsUtils"
import { ProjectInterface } from "@/lib/types"

import { ProjectContent } from "../sections/ProjectContent"

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
  const { project, content } = getProjectById(params.id)
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
