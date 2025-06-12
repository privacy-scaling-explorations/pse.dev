import { Metadata } from "next"

import { ProjectInterface, Article } from "@/lib/types"

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

  console.log(`🔍 Project page - fetching data for project: ${projectId}`)

  // Fetch project and related articles server-side
  let project: ProjectInterface | null = null
  let relatedArticles: Article[] = []

  try {
    console.log("📦 Fetching project...")
    const fetchedProject = await getProjectById(projectId)
    project = fetchedProject || null
    console.log(`✅ Project fetched: ${project?.name || "not found"}`)
  } catch (error) {
    console.error("❌ Project fetch failed:", error)
    project = null
  }

  if (!project) {
    console.log("⚠️ Project not found, redirecting to 404")
    notFound()
  }

  try {
    console.log(`📰 Fetching articles for project: ${projectId}`)
    relatedArticles = await getArticles({ project: projectId })
    console.log(`✅ Articles fetched: ${relatedArticles.length} found`)
  } catch (error) {
    console.error("❌ Articles fetch failed:", error)
    console.error("Error details:", error)
    relatedArticles = []
  }

  return (
    <ProjectContent
      id={projectId}
      project={project}
      relatedArticles={relatedArticles}
    />
  )
}
