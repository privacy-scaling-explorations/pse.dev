import { QueryClient, usePrefetchQuery, useQuery } from "@tanstack/react-query"
import { ProjectInterface } from "@/lib/types"

interface UseGetBlogArticlesParams {
  tag?: string
  revalidate?: number
}

interface UseGetProjectsParams {
  tag?: string
  limit?: number
  project?: string
  revalidate?: number
}

export const useGetBlogArticles = ({
  tag,
  revalidate = 3600,
}: UseGetBlogArticlesParams = {}) => {
  const queryClient = new QueryClient()
  return queryClient.prefetchQuery({
    queryKey: ["articles", tag],
    queryFn: async () => {
      try {
        const params = new URLSearchParams()
        if (tag) params.append("tag", tag)

        const response = await fetch(`/api/articles?${params.toString()}`, {
          next: { revalidate },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`)
        }

        const data = await response.json()
        return data.articles || []
      } catch (error) {
        console.error("Error fetching articles:", error)
        return []
      }
    },
  })
}

// Client-side hook for projects
export const useGetProjects = ({
  tag,
  limit,
  project,
  revalidate = 3600,
}: UseGetProjectsParams = {}) => {
  return useQuery({
    queryKey: ["projects", tag, limit, project],
    queryFn: async (): Promise<ProjectInterface[]> => {
      try {
        const params = new URLSearchParams()
        if (tag) params.append("tag", tag)
        if (limit) params.append("limit", limit.toString())
        if (project) params.append("project", project)

        const response = await fetch(`/api/projects?${params.toString()}`, {
          next: { revalidate },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`)
        }

        const data = await response.json()
        return data.projects || []
      } catch (error) {
        console.error("Error fetching projects:", error)
        throw error
      }
    },
    staleTime: (revalidate || 3600) * 1000,
  })
}

// Client-side hook for single project
export const useGetProject = (id: string) => {
  return useQuery({
    queryKey: ["project", id?.toLowerCase()],
    queryFn: async (): Promise<ProjectInterface | null> => {
      try {
        const response = await fetch(`/api/projects/${id?.toLowerCase()}`)

        if (!response.ok) {
          if (response.status === 404) return null
          throw new Error(`Failed to fetch project: ${response.status}`)
        }

        const data = await response.json()
        return data.project || null
      } catch (error) {
        console.error("Error fetching project:", error)
        throw error
      }
    },
    staleTime: 3600 * 1000, // 1 hour
  })
}

// Server-side prefetch function for projects
export const prefetchProjects = async (
  queryClient: any,
  { tag, limit, project, revalidate = 3600 }: UseGetProjectsParams = {}
) => {
  return await queryClient.prefetchQuery({
    queryKey: ["projects", tag, limit, project],
    queryFn: async (): Promise<ProjectInterface[]> => {
      try {
        const params = new URLSearchParams()
        if (tag) params.append("tag", tag)
        if (limit) params.append("limit", limit.toString())
        if (project) params.append("project", project)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/projects?${params.toString()}`,
          {
            next: { revalidate },
          }
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`)
        }

        const data = await response.json()
        return data.projects || []
      } catch (error) {
        console.error("Error fetching projects:", error)
        throw error
      }
    },
    staleTime: (revalidate || 3600) * 1000,
  })
}
