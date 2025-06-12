import { Metadata } from "next"

import { ProjectInterface } from "@/lib/types"

import { ProjectContent } from "../sections/ProjectContent"
import { getProjectById, getArticles } from "@/lib/markdownContentFetch"
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
      twitter: {
        card: "summary_large_image",
        images: [imageUrl],
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

export default async function ProjectDetailPage({ params }: PageProps) {
  const projectId = params?.id

  if (!projectId) {
    notFound()
  }

  // Fetch project and related articles server-side
  const [project, relatedArticles] = await Promise.all([
    getProjectById(projectId),
    getArticles({ project: projectId }),
  ])

  if (!project) {
    notFound()
  }

  return (
    <ProjectContent
      id={projectId}
      project={project}
      relatedArticles={relatedArticles}
    />
  )
}
