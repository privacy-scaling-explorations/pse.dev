import { QueryClient, usePrefetchQuery, useQuery } from "@tanstack/react-query"
import { ProjectInterface, ProjectCategory } from "@/lib/types"
import type { Article } from "@/lib/markdownContentFetch"

export type ProjectSortBy = "random" | "asc" | "desc" | "relevance"
export type ProjectFilter =
  | "keywords"
  | "builtWith"
  | "themes"
  | "fundingSource"
export type FiltersProps = Record<ProjectFilter, string[]>
interface UseGetBlogArticlesParams {
  tag?: string
  limit?: number
  project?: string
  revalidate?: number
}

interface UseGetProjectsParams {
  tag?: string
  limit?: number
  project?: string
  revalidate?: number
  searchPattern?: string
  sortBy?: ProjectSortBy
  category?: ProjectCategory
  findAnyMatch?: boolean
  themes?: string[]
  keywords?: string[]
  builtWith?: string[]
  fundingSource?: string[]
  activeFilters?: Partial<FiltersProps>
  ids?: string[] | null | undefined
}

// Client-side hook for blog articles
export const useGetBlogArticles = ({
  tag = "",
  limit = 1000,
  project = "",
  revalidate = 3600,
}: UseGetBlogArticlesParams = {}) => {
  return useQuery({
    queryKey: [
      "articles",
      {
        tag,
        limit,
        project,
      },
    ],
    queryFn: async (): Promise<Article[]> => {
      try {
        // Only run on server-side
        if (typeof window !== "undefined") {
          console.warn(
            "getArticles cannot run on client-side, returning empty array"
          )
          return []
        }

        console.log("Fetching articles with params:", { tag, limit, project })

        const { getArticles } = await import("@/lib/markdownContentFetch")
        const articles = await getArticles({
          tag: tag || undefined,
          limit,
          project: project || undefined,
        })

        console.log("Articles fetched:", articles.length)
        return articles
      } catch (error) {
        console.error("Error fetching articles:", error)
        throw error
      }
    },
    staleTime: (revalidate || 3600) * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  })
}

// Server-side prefetch function for blog articles
export const prefetchBlogArticles = async (
  queryClient: any,
  { tag, limit, project, revalidate = 3600 }: UseGetBlogArticlesParams = {}
) => {
  return await queryClient.prefetchQuery({
    queryKey: [
      "articles",
      {
        tag,
        limit,
        project,
      },
    ],
    queryFn: async (): Promise<Article[]> => {
      try {
        // Only run on server-side
        if (typeof window !== "undefined") {
          console.warn(
            "getArticles cannot run on client-side, returning empty array"
          )
          return []
        }

        console.log("Prefetching articles with params:", {
          tag,
          limit,
          project,
        })

        const { getArticles } = await import("@/lib/markdownContentFetch")
        const articles = await getArticles({
          tag: tag || undefined,
          limit,
          project: project || undefined,
        })

        console.log("Articles prefetched:", articles.length)
        return articles
      } catch (error) {
        console.error("Error prefetching articles:", error)
        throw error
      }
    },
    staleTime: (revalidate || 3600) * 1000,
  })
}

// Client-side hook for projects with enhanced filtering
export const useGetProjects = ({
  tag,
  limit,
  project,
  revalidate = 3600,
  searchPattern,
  sortBy,
  category,
  findAnyMatch,
  themes,
  keywords,
  builtWith,
  fundingSource,
  activeFilters,
  ids,
}: UseGetProjectsParams = {}) => {
  return useQuery({
    queryKey: [
      "projects",
      {
        tag,
        limit,
        project,
        searchPattern,
        sortBy,
        category,
        findAnyMatch,
        themes,
        keywords,
        builtWith,
        fundingSource,
        activeFilters,
        ids,
      },
    ],
    queryFn: async (): Promise<ProjectInterface[]> => {
      try {
        const params = new URLSearchParams()

        // Original parameters
        if (tag) params.append("tag", tag)
        if (limit) params.append("limit", limit.toString())
        if (project) params.append("project", project)

        // New filtering parameters
        if (searchPattern) params.append("searchPattern", searchPattern)
        if (sortBy) params.append("sortBy", sortBy)
        if (category) params.append("category", category)
        if (findAnyMatch) params.append("findAnyMatch", "true")

        // Filter arrays
        if (themes?.length) params.append("themes", themes.join(","))
        if (keywords?.length) params.append("keywords", keywords.join(","))
        if (builtWith?.length) params.append("builtWith", builtWith.join(","))
        if (fundingSource?.length)
          params.append("fundingSource", fundingSource.join(","))

        // Handle specific IDs - IMPORTANT: Add parameter even if array is empty
        if (ids !== undefined && ids !== null) {
          params.append("ids", ids.join(",")) // This will be empty string for empty array
        }

        // Handle activeFilters object
        if (activeFilters) {
          Object.entries(activeFilters).forEach(([key, values]) => {
            if (values && values.length > 0) {
              params.append(key, values.join(","))
            }
          })
        }

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
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  })
}

// Client-side hook for single project
export const useGetProject = (id: string) => {
  return useQuery({
    queryKey: [
      "project",
      {
        id: id?.toLowerCase(),
      },
    ],
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

export const useGetProjectsFilters = () => {
  return useQuery({
    queryKey: ["getProjectsFilters"],
    queryFn: async () => {
      const response = await fetch("/api/projects?filters=true")
      const data = await response.json()
      return data.filters || []
    },
  })
}

// Server-side prefetch function for projects with enhanced filtering
export const prefetchProjects = async (
  queryClient: any,
  {
    tag,
    limit,
    project,
    revalidate = 3600,
    searchPattern,
    sortBy,
    category,
    findAnyMatch,
    themes,
    keywords,
    builtWith,
    fundingSource,
    activeFilters,
    ids,
  }: UseGetProjectsParams = {}
) => {
  return await queryClient.prefetchQuery({
    queryKey: [
      "projects",
      tag,
      limit,
      project,
      searchPattern,
      sortBy,
      category,
      findAnyMatch,
      themes,
      keywords,
      builtWith,
      fundingSource,
      activeFilters,
      ids,
    ],
    queryFn: async (): Promise<ProjectInterface[]> => {
      try {
        const params = new URLSearchParams()

        // Original parameters
        if (tag) params.append("tag", tag)
        if (limit) params.append("limit", limit.toString())
        if (project) params.append("project", project)

        // New filtering parameters
        if (searchPattern) params.append("searchPattern", searchPattern)
        if (sortBy) params.append("sortBy", sortBy)
        if (category) params.append("category", category)
        if (findAnyMatch) params.append("findAnyMatch", "true")

        // Filter arrays
        if (themes?.length) params.append("themes", themes.join(","))
        if (keywords?.length) params.append("keywords", keywords.join(","))
        if (builtWith?.length) params.append("builtWith", builtWith.join(","))
        if (fundingSource?.length)
          params.append("fundingSource", fundingSource.join(","))

        // Handle specific IDs - IMPORTANT: Add parameter even if array is empty
        if (ids !== undefined && ids !== null) {
          params.append("ids", ids.join(",")) // This will be empty string for empty array
        }

        // Handle activeFilters object
        if (activeFilters) {
          Object.entries(activeFilters).forEach(([key, values]) => {
            if (values && values.length > 0) {
              params.append(key, values.join(","))
            }
          })
        }

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
