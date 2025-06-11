import { getProjects } from "@/lib/markdownContentFetch"
import { NextRequest, NextResponse } from "next/server"
import { ProjectCategory, ProjectInterface } from "@/lib/types"

// Dynamic import for Fuse.js to reduce bundle size
async function getFuse() {
  const { default: Fuse } = await import("fuse.js")
  return Fuse
}

// Cache control
export const revalidate = 60 // Revalidate cache after 60 seconds
export const dynamic = "force-dynamic" // Ensure the route is always evaluated

type ProjectSortBy = "random" | "asc" | "desc" | "relevance"
type ProjectFilter = "keywords" | "builtWith" | "themes" | "fundingSource"
type FiltersProps = Record<ProjectFilter, string[]>
const DEFAULT_PROJECT_SORT_BY: ProjectSortBy = "asc"

interface ProjectInterfaceScore extends ProjectInterface {
  score: number
}

const SortByFnMapping: Record<
  ProjectSortBy,
  (a: ProjectInterfaceScore, b: ProjectInterfaceScore) => number
> = {
  random: () => Math.random() - 0.5,
  asc: (a, b) => a.name.localeCompare(b.name),
  desc: (a, b) => b.name.localeCompare(a.name),
  relevance: (a, b) => b?.score - a?.score, // sort from most relevant to least relevant
}

interface SearchMatchByParamsProps {
  searchPattern: string
  activeFilters?: Partial<FiltersProps>
  findAnyMatch?: boolean
  projects?: ProjectInterface[]
}

const filterProjects = async ({
  searchPattern = "",
  activeFilters = {},
  findAnyMatch = false,
  projects: projectListItems = [],
}: SearchMatchByParamsProps) => {
  const projectList = projectListItems.map((project: any) => {
    return {
      ...project,
      id: project?.id?.toLowerCase(), // force lowercase id
    }
  })
  // keys that will be used for search
  const keys = [
    "name",
    "tldr",
    "tags.themes",
    "tags.keywords",
    "tags.builtWith",
    "projectStatus",
  ]

  const tagsFiltersQuery: Record<string, string>[] = []

  Object.entries(activeFilters).forEach(([key, values]) => {
    values.forEach((value) => {
      if (!value) return // skip empty values
      tagsFiltersQuery.push({
        [`tags.${key}`]: value,
      })
    })
  })

  const noActiveFilters =
    tagsFiltersQuery.length === 0 && searchPattern.length === 0

  if (noActiveFilters) return projectList

  let query: any = {}

  if (findAnyMatch) {
    // find any match of filters
    query = {
      $or: [...tagsFiltersQuery, { name: searchPattern }],
    }
  } else if (searchPattern?.length === 0) {
    query = {
      $and: [...tagsFiltersQuery],
    }
  } else if (tagsFiltersQuery.length === 0) {
    query = {
      name: searchPattern,
    }
  } else {
    query = {
      $and: [
        {
          $and: [...tagsFiltersQuery],
        },
        { name: searchPattern },
      ],
    }
  }

  const Fuse = await getFuse()
  const fuse = new Fuse(projectList, {
    threshold: 0.3,
    useExtendedSearch: true,
    includeScore: true,
    findAllMatches: true,
    distance: 200,
    keys,
  })

  const result = fuse
    .search(query)
    ?.map(({ item, score }: { item: any; score?: number }) => {
      return {
        ...item,
        score: score || 0,
      } as ProjectInterfaceScore
    })

  return result || []
}

const sortProjectByFn = ({
  projects = [],
  sortBy = DEFAULT_PROJECT_SORT_BY,
  category = null,
  ignoreCategories = [ProjectCategory.RESEARCH],
}: {
  projects: ProjectInterface[]
  sortBy?: ProjectSortBy
  category?: ProjectCategory | null
  ignoreCategories?: ProjectCategory[]
}) => {
  const sortedProjectList: ProjectInterface[] = [
    ...(projects as ProjectInterfaceScore[]),
  ]
    .sort(SortByFnMapping[sortBy])
    .filter((project) => !ignoreCategories.includes(project.category as any))

  if (category) {
    return sortedProjectList.filter((project) => project.category === category)
  }

  return sortedProjectList.map((project: any) => {
    return {
      id: project?.id?.toLowerCase(), // force lowercase id
      ...project,
    }
  })
}

const getProjectFilters = (projects: ProjectInterface[]): FiltersProps => {
  const filters: FiltersProps = {
    themes: ["play", "build", "research"],
    keywords: [],
    builtWith: [],
    fundingSource: [],
  }

  // Extract unique filters from projects
  projects.forEach((project) => {
    if (project?.tags?.builtWith) {
      filters.builtWith.push(
        ...project.tags.builtWith
          .filter((tag): tag is string => typeof tag === "string")
          .map((tag) => tag.toLowerCase())
      )
    }

    if (project?.tags?.keywords) {
      filters.keywords.push(
        ...project.tags.keywords
          .filter((keyword): keyword is string => typeof keyword === "string")
          .map((keyword) => keyword.toLowerCase())
      )
    }

    if (project?.tags?.fundingSource) {
      filters.fundingSource.push(
        ...project.tags.fundingSource
          .filter((source): source is string => typeof source === "string")
          .map((source) => source.toLowerCase())
      )
    }
  })

  // Remove duplicates
  Object.entries(filters).forEach(([key, entries]) => {
    filters[key as ProjectFilter] = Array.from(new Set(entries))
  })

  return filters
}

const filterProjectsByIds = (
  projects: ProjectInterface[],
  ids: string[]
): ProjectInterface[] => {
  const lowercaseIds = ids.map((id) => id.toLowerCase())
  return projects.filter((project) =>
    lowercaseIds.includes(project.id.toLowerCase())
  )
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)

  // Check if only filters are requested
  const onlyFilters = searchParams.get("filters") === "true"

  // Original parameters
  const tag = searchParams.get("tag") || undefined
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit") as string, 10)
    : undefined
  const project = searchParams.get("project") || undefined

  // New filtering parameters
  const searchPattern =
    searchParams.get("searchPattern") || searchParams.get("search") || ""
  const sortBy =
    (searchParams.get("sortBy") as ProjectSortBy) || DEFAULT_PROJECT_SORT_BY
  const category = searchParams.get("category") as ProjectCategory | null
  const findAnyMatch = searchParams.get("findAnyMatch") === "true"

  // Filter parameters
  const themes = searchParams.get("themes")?.split(",").filter(Boolean) || []
  const keywords =
    searchParams.get("keywords")?.split(",").filter(Boolean) || []
  const builtWith =
    searchParams.get("builtWith")?.split(",").filter(Boolean) || []
  const fundingSource =
    searchParams.get("fundingSource")?.split(",").filter(Boolean) || []

  // Check if ids parameter is explicitly passed (even if empty)
  const idsParam = searchParams.get("ids")
  const hasIdsParameter = searchParams.has("ids")
  const ids = idsParam?.split(",").filter(Boolean) || []

  const activeFilters: Partial<FiltersProps> = {}
  if (themes.length > 0) activeFilters.themes = themes
  if (keywords.length > 0) activeFilters.keywords = keywords
  if (builtWith.length > 0) activeFilters.builtWith = builtWith
  if (fundingSource.length > 0) activeFilters.fundingSource = fundingSource

  try {
    // Get initial projects using existing parameters
    const allProjects = await getProjects({
      tag,
      limit: undefined, // Don't limit initially, we'll apply filtering first
      project,
    })

    // If only filters are requested, return just the filters
    if (onlyFilters) {
      const availableFilters = getProjectFilters(allProjects)
      return NextResponse.json({
        filters: availableFilters,
        success: true,
        meta: {
          total: allProjects.length,
          message: "Available filters extracted from all projects",
        },
      })
    }

    let filteredProjects = allProjects

    // Handle IDs parameter
    if (hasIdsParameter) {
      if (ids.length === 0) {
        // If ids parameter is passed but empty, return no projects
        filteredProjects = []
      } else {
        // If ids parameter has values, filter by those IDs
        filteredProjects = filterProjectsByIds(filteredProjects, ids)
      }
    }

    // Apply other filtering only if we still have projects and no IDs were specified (or IDs filtering didn't empty the list)
    if (
      filteredProjects.length > 0 &&
      (searchPattern || Object.keys(activeFilters).length > 0)
    ) {
      filteredProjects = await filterProjects({
        searchPattern,
        activeFilters,
        findAnyMatch,
        projects: filteredProjects,
      })
    }

    // Apply sorting only if we have projects
    if (
      filteredProjects.length > 0 &&
      (sortBy !== DEFAULT_PROJECT_SORT_BY || category)
    ) {
      filteredProjects = sortProjectByFn({
        projects: filteredProjects,
        sortBy,
        category,
        ignoreCategories: category ? [] : [ProjectCategory.RESEARCH],
      })
    }

    // Apply limit after filtering and sorting
    if (limit && limit > 0) {
      filteredProjects = filteredProjects.slice(0, limit)
    }

    // Get available filters for the response
    const availableFilters = getProjectFilters(allProjects)

    const response = NextResponse.json({
      projects: filteredProjects,
      filters: availableFilters,
      success: true,
      meta: {
        total: filteredProjects.length,
        activeFilters,
        sortBy,
        category,
        searchPattern,
        ids: hasIdsParameter ? ids : undefined,
      },
    })

    // Add cache headers for better performance
    response.headers.set(
      "Cache-Control",
      "s-maxage=60, stale-while-revalidate=300"
    )
    response.headers.set("CDN-Cache-Control", "max-age=60")
    response.headers.set("Vercel-CDN-Cache-Control", "max-age=3600")

    return response
  } catch (error) {
    console.error("Error fetching projects:", error)
    console.error(
      "Error details:",
      error instanceof Error ? error.message : String(error)
    )

    const errorResponse = NextResponse.json(
      {
        error: "Failed to fetch projects",
        success: false,
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )

    // Don't cache error responses
    errorResponse.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    )

    return errorResponse
  }
}
