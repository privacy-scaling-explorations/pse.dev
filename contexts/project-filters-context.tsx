"use client"

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react"
import { useGetProjects } from "@/hooks/useFetchContent"
import { ProjectCategory, ProjectInterface } from "@/lib/types"
import { useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

// Import types from the original state
export type ProjectSortBy = "random" | "asc" | "desc" | "relevance"
export type ProjectFilter =
  | "keywords"
  | "builtWith"
  | "themes"
  | "fundingSource"
export type FiltersProps = Record<ProjectFilter, string[]>
export const DEFAULT_PROJECT_SORT_BY: ProjectSortBy = "asc"

interface toggleFilterProps {
  tag: ProjectFilter
  value: string
  searchQuery?: string
}

interface ProjectFiltersContextType {
  // State
  sortBy: ProjectSortBy
  projects: ProjectInterface[]
  researchs: ProjectInterface[]
  activeFilters: Partial<FiltersProps>
  queryString: string
  searchQuery: string
  currentCategory: ProjectCategory | null
  isLoading: boolean
  error: Error | null

  // Actions
  toggleFilter: ({ tag, value, searchQuery }: toggleFilterProps) => void
  toggleFilterSimple: (filterKey: ProjectFilter, value: string) => void
  setFilterFromQueryString: (filters: Partial<FiltersProps>) => void
  onFilterProject: (searchPattern: string) => void
  onSelectTheme: (theme: string, searchPattern?: string) => void
  sortProjectBy: (sortBy: ProjectSortBy) => void
  setCurrentCategory: (section: ProjectCategory | null) => void
  setProjects: (projects: ProjectInterface[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: Error | null) => void
  fetchProjects: () => Promise<void>

  // Additional methods for URL management
  updateFilters: (newFilters: {
    searchPattern?: string
    themes?: string[]
    keywords?: string[]
    builtWith?: string[]
    fundingSource?: string[]
    sortBy?: ProjectSortBy
  }) => void
  clearAllFilters: () => void
}

const ProjectFiltersContext = createContext<
  ProjectFiltersContextType | undefined
>(undefined)

const createURLQueryString = (params: Partial<FiltersProps>): string => {
  if (Object.keys(params)?.length === 0) return ""
  const qs = Object.keys(params)
    .map((key: any) => `${key}=${encodeURIComponent((params as any)[key])}`)
    .join("&")
  return qs
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
  })

  // Remove duplicates
  Object.entries(filters).forEach(([key, entries]) => {
    filters[key as ProjectFilter] = Array.from(new Set(entries))
  })

  return filters
}

export function ProjectFiltersProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Track if filters have been initialized
  const filtersInitialized = useRef(false)

  // Local state that directly controls useGetProjects
  const [sortBy, setSortBy] = useState<ProjectSortBy>(DEFAULT_PROJECT_SORT_BY)
  const [activeFilters, setActiveFilters] = useState<Partial<FiltersProps>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [currentCategory, setCurrentCategory] =
    useState<ProjectCategory | null>(null)
  const [queryString, setQueryString] = useState("")
  // Initialize state from URL on mount
  useEffect(() => {
    const currentThemes =
      searchParams.get("themes")?.split(",").filter(Boolean) || []
    const currentKeywords =
      searchParams.get("keywords")?.split(",").filter(Boolean) || []
    const currentBuiltWith =
      searchParams.get("builtWith")?.split(",").filter(Boolean) || []
    const currentFundingSource =
      searchParams.get("fundingSource")?.split(",").filter(Boolean) || []
    const currentSearchPattern =
      searchParams.get("searchPattern") || searchParams.get("search") || ""
    const currentSortBy =
      (searchParams.get("sortBy") as ProjectSortBy) || DEFAULT_PROJECT_SORT_BY
    const currentCategory = searchParams.get(
      "category"
    ) as ProjectCategory | null

    const urlActiveFilters: Partial<FiltersProps> = {}
    if (currentThemes.length > 0) urlActiveFilters.themes = currentThemes
    if (currentKeywords.length > 0) urlActiveFilters.keywords = currentKeywords
    if (currentBuiltWith.length > 0)
      urlActiveFilters.builtWith = currentBuiltWith
    if (currentFundingSource.length > 0)
      urlActiveFilters.fundingSource = currentFundingSource

    setActiveFilters(urlActiveFilters)
    setSearchQuery(currentSearchPattern)
    setSortBy(currentSortBy)
    setCurrentCategory(currentCategory)
  }, [searchParams])

  // Use the new hook with current state
  const {
    data: projects = [],
    isLoading,
    error,
  } = useGetProjects({
    searchPattern: searchQuery,
    sortBy,
    category: currentCategory as any,
    activeFilters,
  })

  // Separate research projects
  const researchs = projects.filter(
    (project) => project.category === ProjectCategory.RESEARCH
  )

  // Update query string when activeFilters change
  useEffect(() => {
    setQueryString(createURLQueryString(activeFilters))
  }, [activeFilters])

  const updateFilters = useCallback(
    (newFilters: {
      searchPattern?: string
      themes?: string[]
      keywords?: string[]
      builtWith?: string[]
      fundingSource?: string[]
      sortBy?: ProjectSortBy
    }) => {
      const params = new URLSearchParams()

      // Get current values from state (not URL to avoid conflicts)
      const currentThemes = activeFilters.themes || []
      const currentKeywords = activeFilters.keywords || []
      const currentBuiltWith = activeFilters.builtWith || []
      const currentFundingSource = activeFilters.fundingSource || []

      // Apply new values or keep current ones
      const searchPattern =
        newFilters.searchPattern !== undefined
          ? newFilters.searchPattern
          : searchQuery
      const themes =
        newFilters.themes !== undefined ? newFilters.themes : currentThemes
      const keywords =
        newFilters.keywords !== undefined
          ? newFilters.keywords
          : currentKeywords
      const builtWith =
        newFilters.builtWith !== undefined
          ? newFilters.builtWith
          : currentBuiltWith
      const fundingSource =
        newFilters.fundingSource !== undefined
          ? newFilters.fundingSource
          : currentFundingSource
      const sortByValue =
        newFilters.sortBy !== undefined ? newFilters.sortBy : sortBy

      // Update local state immediately for reactive UI
      if (newFilters.searchPattern !== undefined)
        setSearchQuery(newFilters.searchPattern)
      if (newFilters.sortBy !== undefined) setSortBy(newFilters.sortBy)

      const updatedActiveFilters: Partial<FiltersProps> = {}
      if (themes.length > 0) updatedActiveFilters.themes = themes
      if (keywords.length > 0) updatedActiveFilters.keywords = keywords
      if (builtWith.length > 0) updatedActiveFilters.builtWith = builtWith
      if (fundingSource.length > 0)
        updatedActiveFilters.fundingSource = fundingSource

      setActiveFilters(updatedActiveFilters)

      // Add to URL params
      if (searchPattern) params.append("searchPattern", searchPattern)
      if (themes.length > 0) params.append("themes", themes.join(","))
      if (keywords.length > 0) params.append("keywords", keywords.join(","))
      if (builtWith.length > 0) params.append("builtWith", builtWith.join(","))
      if (fundingSource.length > 0)
        params.append("fundingSource", fundingSource.join(","))
      if (sortByValue !== DEFAULT_PROJECT_SORT_BY)
        params.append("sortBy", sortByValue)

      // Navigate to new URL
      const queryString = params.toString()
      router.push(`/projects${queryString ? `?${queryString}` : ""}`)
    },
    [activeFilters, searchQuery, sortBy, router]
  )

  const clearAllFilters = useCallback(() => {
    setSearchQuery("")
    setActiveFilters({})
    setSortBy(DEFAULT_PROJECT_SORT_BY)
    router.push("/projects")
  }, [router])

  // Simple toggleFilter for project-filters-bar.tsx
  const toggleFilterSimple = useCallback(
    (filterKey: ProjectFilter, value: string) => {
      const currentValues = activeFilters[filterKey] || []
      const isActive = currentValues.includes(value)

      const newValues = isActive
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value]

      updateFilters({ [filterKey]: newValues })
    },
    [activeFilters, updateFilters]
  )

  // Original toggleFilter for compatibility
  const toggleFilter = useCallback(
    ({
      tag: filterKey,
      value,
      searchQuery: newSearchQuery,
    }: toggleFilterProps) => {
      const currentFilters = activeFilters[filterKey] || []
      const isFiltered = currentFilters.includes(value)

      const newFilters = isFiltered
        ? currentFilters.filter((item: string) => item !== value)
        : [...currentFilters, value]

      const updatedFilters = { [filterKey]: newFilters }
      //if (newSearchQuery !== undefined) updatedFilters.searchPattern = newSearchQuery

      updateFilters(updatedFilters)
    },
    [activeFilters, updateFilters]
  )

  const setFilterFromQueryString = useCallback(
    (filters: Partial<FiltersProps>) => {
      setActiveFilters(filters)
    },
    []
  )

  const onFilterProject = useCallback(
    (searchPattern: string) => {
      updateFilters({ searchPattern })
    },
    [updateFilters]
  )

  const onSelectTheme = useCallback(
    (theme: string, searchPattern?: string) => {
      const activeThemeFilters = activeFilters.themes || []
      const newThemes = activeThemeFilters.includes(theme)
        ? activeThemeFilters.filter(
            (activeTheme: string) => activeTheme !== theme
          )
        : [...activeThemeFilters, theme]

      const updatedFilters = { themes: newThemes }
      //if (searchPattern !== undefined) updatedFilters.searchPattern = searchPattern

      updateFilters(updatedFilters)
    },
    [activeFilters, updateFilters]
  )

  const sortProjectBy = useCallback(
    (newSortBy: ProjectSortBy) => {
      updateFilters({ sortBy: newSortBy })
    },
    [updateFilters]
  )

  const setCurrentCategoryCallback = useCallback(
    (category: ProjectCategory | null) => {
      setCurrentCategory(category)
    },
    []
  )

  const setProjects = useCallback((newProjects: ProjectInterface[]) => {
    console.warn(
      "setProjects is deprecated, projects are managed by useGetProjects hook"
    )
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    console.warn(
      "setLoading is deprecated, loading state is managed by useGetProjects hook"
    )
  }, [])

  const setErrorCallback = useCallback((newError: Error | null) => {
    console.warn(
      "setError is deprecated, error state is managed by useGetProjects hook"
    )
  }, [])

  const fetchProjects = useCallback(async () => {
    console.warn(
      "fetchProjects is deprecated, projects are fetched automatically by useGetProjects hook"
    )
  }, [])

  const contextValue: ProjectFiltersContextType = {
    // State
    sortBy,
    projects,
    researchs,
    activeFilters,
    queryString,
    searchQuery,
    currentCategory,
    isLoading,
    error: error as Error | null,

    // Actions
    toggleFilter,
    toggleFilterSimple,
    setFilterFromQueryString,
    onFilterProject,
    onSelectTheme,
    sortProjectBy,
    setCurrentCategory: setCurrentCategoryCallback,
    setProjects,
    setLoading,
    setError: setErrorCallback,
    fetchProjects,

    // Additional methods
    updateFilters,
    clearAllFilters,
  }

  return (
    <ProjectFiltersContext.Provider value={contextValue}>
      {children}
    </ProjectFiltersContext.Provider>
  )
}

export function useProjectFiltersContext() {
  const context = useContext(ProjectFiltersContext)
  if (context === undefined) {
    throw new Error(
      "useProjectFiltersContext must be used within a ProjectFiltersProvider"
    )
  }
  return context
}

// For backward compatibility, export the same interface as the original hook
export const useProjectFiltersState = (
  selector?: (state: ProjectFiltersContextType) => any
) => {
  const context = useProjectFiltersContext()
  return selector ? selector(context) : context
}
