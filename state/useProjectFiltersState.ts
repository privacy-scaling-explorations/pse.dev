"use client"

import Fuse from "fuse.js"
import { create } from "zustand"

import { ProjectCategory, ProjectInterface } from "@/lib/types"
import { uniq } from "@/lib/utils"
import { LABELS } from "@/app/labels"
import { getProjects } from "@/lib/markdownContentFetch"

export type ProjectSortBy = "random" | "asc" | "desc" | "relevance"
export type ProjectFilter =
  | "keywords"
  | "builtWith"
  | "themes"
  | "fundingSource"
export type FiltersProps = Record<ProjectFilter, string[]>
export const DEFAULT_PROJECT_SORT_BY: ProjectSortBy = "asc"
interface ProjectInterfaceScore extends ProjectInterface {
  score: number
}

export const SortByFnMapping: Record<
  ProjectSortBy,
  (a: ProjectInterfaceScore, b: ProjectInterfaceScore) => number
> = {
  random: () => Math.random() - 0.5,
  asc: (a, b) => a.name.localeCompare(b.name),
  desc: (a, b) => b.name.localeCompare(a.name),
  relevance: (a, b) => b?.score - a?.score, // sort from most relevant to least relevant
}

export const FilterLabelMapping: Record<ProjectFilter, string> = {
  keywords: LABELS.COMMON.FILTER_LABELS.KEYWORDS,
  builtWith: LABELS.COMMON.FILTER_LABELS.BUILT_WITH,
  themes: LABELS.COMMON.FILTER_LABELS.THEMES,
  fundingSource: LABELS.COMMON.FILTER_LABELS.FUNDING_SOURCE,
}

export const FilterTypeMapping: Partial<
  Record<ProjectFilter, "checkbox" | "button">
> = {
  keywords: "checkbox",
  builtWith: "checkbox",
  themes: "button",
  fundingSource: "checkbox",
}

interface ProjectStateProps {
  sortBy: ProjectSortBy
  projects: ProjectInterface[]
  researchs: ProjectInterface[]
  filters: FiltersProps
  activeFilters: Partial<FiltersProps>
  queryString: string
  searchQuery: string
  currentCategory: ProjectCategory | null
  isLoading: boolean
  error: Error | null
}

interface SearchMatchByParamsProps {
  searchPattern: string
  activeFilters?: Partial<FiltersProps>
  findAnyMatch?: boolean
  projects?: ProjectInterface[]
}

interface toggleFilterProps {
  tag: ProjectFilter
  value: string
  searchQuery?: string
}

interface ProjectActionsProps {
  toggleFilter: ({ tag, value, searchQuery }: toggleFilterProps) => void
  setFilterFromQueryString: (filters: Partial<FiltersProps>) => void
  onFilterProject: (searchPattern: string) => void
  onSelectTheme: (theme: string, searchPattern?: string) => void
  sortProjectBy: (sortBy: ProjectSortBy) => void
  setCurrentCategory: (section: ProjectCategory | null) => void
  setProjects: (projects: ProjectInterface[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: Error | null) => void
}

const createURLQueryString = (params: Partial<FiltersProps>): string => {
  if (Object.keys(params)?.length === 0) return "" // no params, return empty string
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

  // get list of all tags from project list
  projects.forEach((project) => {
    if (project?.tags?.builtWith) {
      filters.builtWith.push(
        ...project.tags.builtWith.map((tag) => {
          if (typeof tag === "string") {
            return tag.toLowerCase()
          }
          return ""
        })
      )
    }

    if (project?.tags?.keywords) {
      filters.keywords.push(
        ...project.tags.keywords.map((keyword) =>
          typeof keyword === "string" ? keyword.toLowerCase() : ""
        )
      )
    }
  })

  // duplicate-free array for every tags
  Object.entries(filters).forEach(([key, entries]) => {
    filters[key as ProjectFilter] = uniq(entries)
  })

  return filters
}

export const filterProjects = ({
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

  const fuse = new Fuse(projectList, {
    threshold: 0.3,
    useExtendedSearch: true,
    includeScore: true,
    findAllMatches: true,
    distance: 200,
    keys,
  })

  const result = fuse.search(query)?.map(({ item, score }) => {
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

export const useProjectFiltersState = create<
  ProjectStateProps & ProjectActionsProps
>((set, get) => ({
  currentCategory: null,
  sortBy: DEFAULT_PROJECT_SORT_BY,
  projects: [],
  researchs: [],
  queryString: "",
  searchQuery: "",
  isLoading: false,
  error: null,
  filters: {
    themes: ["play", "build", "research"],
    keywords: [],
    builtWith: [],
    fundingSource: [],
  }, // initial empty filters, will be populated when projects are loaded
  activeFilters: {}, // list of filters active in the current view by the user
  toggleFilter: ({ tag: filterKey, value, searchQuery }: toggleFilterProps) =>
    set((state: any) => {
      const currentFilters = state.activeFilters[filterKey] || []
      const isFiltered = currentFilters.includes(value)

      const newFilters = isFiltered
        ? currentFilters.filter((item: string) => item !== value)
        : [...currentFilters, value]

      const updatedActiveFilters = {
        ...state.activeFilters,
        [filterKey]: newFilters,
      }

      const filteredProjects = filterProjects({
        searchPattern: searchQuery || state.searchQuery,
        activeFilters: updatedActiveFilters,
        projects: state.projects,
      })

      const queryString = createURLQueryString(updatedActiveFilters)

      return {
        ...state,
        activeFilters: updatedActiveFilters,
        queryString,
        projects: filteredProjects,
      }
    }),
  setFilterFromQueryString: (filters: Partial<FiltersProps>) => {
    set((state: any) => {
      return {
        ...state,
        activeFilters: filters,
        queryString: createURLQueryString(filters),
      }
    })
  },

  onFilterProject: (searchPattern: string) =>
    set((state: any) => {
      const filteredProjects = filterProjects({
        searchPattern,
        activeFilters: state.activeFilters,
        projects: state.projects,
      })

      return {
        ...state,
        searchQuery: searchPattern,
        projects: filteredProjects,
      }
    }),

  onSelectTheme: (theme: string, searchPattern?: string) =>
    set((state: any) => {
      const activeThemeFilters = state.activeFilters.themes || []

      const updatedActiveFilters = {
        ...state.activeFilters,
        themes: activeThemeFilters.includes(theme)
          ? activeThemeFilters.filter(
              (activeTheme: string) => activeTheme !== theme
            )
          : [...activeThemeFilters, theme],
      }

      const queryString = createURLQueryString(updatedActiveFilters)

      const filteredProjects = filterProjects({
        searchPattern: searchPattern || state.searchQuery,
        activeFilters: updatedActiveFilters,
        projects: state.projects,
      })

      return {
        ...state,
        activeFilters: updatedActiveFilters,
        queryString,
        projects: filteredProjects,
      }
    }),

  sortProjectBy(sortBy: ProjectSortBy) {
    set((state: any) => {
      const sortedProjects = sortProjectByFn({
        projects: state.projects,
        sortBy,
        category: state.currentCategory,
      })

      const sortedResearch = sortProjectByFn({
        projects: state.projects,
        sortBy,
        category: ProjectCategory.RESEARCH,
        ignoreCategories: [
          ProjectCategory.DEVTOOLS,
          ProjectCategory.APPLICATION,
        ],
      })

      return {
        ...state,
        sortBy,
        projects: sortedProjects,
        researchs: sortedResearch,
      }
    })
  },
  setCurrentCategory(category: ProjectCategory | null) {
    set((state: any) => {
      const sortedProjects = sortProjectByFn({
        projects: state.projects,
        sortBy: state.sortBy,
        category,
      })

      return {
        ...state,
        currentCategory: category,
        projects: sortedProjects,
      }
    })
  },
  setProjects: (projects: ProjectInterface[]) => {
    set((state: any) => {
      const filters = getProjectFilters(projects)
      const researchs = sortProjectByFn({
        projects,
        sortBy: state.sortBy,
        category: ProjectCategory.RESEARCH,
        ignoreCategories: [
          ProjectCategory.DEVTOOLS,
          ProjectCategory.APPLICATION,
        ],
      })

      return {
        ...state,
        projects,
        researchs,
        filters,
      }
    })
  },
  setLoading: (loading: boolean) => {
    set((state: any) => {
      return {
        ...state,
        isLoading: loading,
      }
    })
  },
  setError: (error: Error | null) => {
    set((state: any) => {
      return {
        ...state,
        error,
      }
    })
  },
}))

// Helper function to initialize state with projects data
export const initializeProjectsState = (projects: ProjectInterface[]) => {
  const { setProjects } = useProjectFiltersState.getState()
  setProjects(projects)
}
