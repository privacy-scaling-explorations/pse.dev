import { Metadata } from "next"

import { ProjectInterface } from "@/lib/types"

import { ProjectContent } from "../sections/ProjectContent"
import { getProjectById } from "@/lib/markdownContentFetch"
import { notFound } from "next/navigation"

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
  try {
    const project = await getProjectById(params.id)

    if (!project) {
      return {
        title: "Project Not Found",
        description: "The requested project could not be found.",
      }
    }

    const imageUrl =
      (project?.image ?? "")?.length > 0
        ? `/project-banners/${project?.image}`
        : "/og-image.png"

    return {
      title: project?.name,
      description: project?.tldr,
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
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }
}

export default function ProjectDetailPage({ params }: PageProps) {
  // For server-side rendering, we don't need to prefetch since the client component
  // will handle data fetching through React Query and API routes
  const projectId = params?.id

  if (!projectId) {
    notFound()
  }

  return <ProjectContent id={projectId} />
}
