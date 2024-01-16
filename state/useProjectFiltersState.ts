import { projects } from "@/data/projects"
import Fuse from "fuse.js"
import i18next from "i18next"
import { create } from "zustand"

import { ProjectInterface } from "@/lib/types"
import { uniq } from "@/lib/utils"
import { LocaleTypes, fallbackLng } from "@/app/i18n/settings"

export type ProjectSortBy = "random" | "asc" | "desc" | "relevance"
export type ProjectFilter = "keywords" | "builtWith" | "themes"
export type FiltersProps = Record<ProjectFilter, string[]>

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

export const FilterLabelMapping = (
  lang?: LocaleTypes
): Record<ProjectFilter, string> => {
  const t = i18next.getFixedT(lang ?? fallbackLng, "common")
  return {
    keywords: t("filterLabels.keyword"),
    builtWith: t("filterLabels.builtWith"),
    themes: t("filterLabels.themes"),
  }
}

export const FilterTypeMapping: Record<ProjectFilter, "checkbox" | "button"> = {
  keywords: "checkbox",
  builtWith: "checkbox",
  themes: "button",
}
interface ProjectStateProps {
  sortBy: ProjectSortBy
  projects: ProjectInterface[]
  filters: FiltersProps
  activeFilters: Partial<FiltersProps>
  queryString: string
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
}

const createURLQueryString = (params: Partial<FiltersProps>): string => {
  if (Object.keys(params)?.length === 0) return "" // no params, return empty string
  const qs = Object.keys(params)
    .map((key: any) => `${key}=${encodeURIComponent((params as any)[key])}`)
    .join("&")

  return qs
}

const getProjectFilters = (): FiltersProps => {
  const filters: FiltersProps = {
    themes: ["play", "build", "research"],
    keywords: [],
    builtWith: [],
  }

  // get list of all tags from project list
  projects.forEach((project) => {
    if (project?.tags?.builtWith) {
      filters.builtWith.push(...project?.tags?.builtWith)
    }

    if (project?.tags?.keywords) {
      filters.keywords.push(...project?.tags?.keywords)
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
  projects: projectList = projects,
}: SearchMatchByParamsProps) => {
  // keys that will be used for search
  const keys = [
    "name",
    "tldr",
    "tags.themes",
    "tags.keywords",
    "tags.builtWith",
    "projectStatus",
  ]

  let tagsFiltersQuery: Record<string, string>[] = []

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
    threshold: 0.2,
    useExtendedSearch: true,
    includeScore: true,
    keys,
  })

  const result = fuse.search(query)?.map(({ item, score }) => {
    return {
      ...item,
      score, // 0 indicates a perfect match, while a score of 1 indicates a complete mismatch.
    }
  })
  return result ?? []
}

const sortProjectByFn = (
  projects: ProjectInterface[],
  sortBy: ProjectSortBy
) => {
  const sortedProjectList: ProjectInterface[] = [
    ...(projects as ProjectInterfaceScore[]),
  ].sort(SortByFnMapping[sortBy])

  return sortedProjectList
}

export const useProjectFiltersState = create<
  ProjectStateProps & ProjectActionsProps
>()((set) => ({
  sortBy: "random",
  projects,
  queryString: "",
  filters: getProjectFilters(), // list of filters with all possible values from projects
  activeFilters: {}, // list of filters active in the current view by the user
  toggleFilter: ({ tag: filterKey, value, searchQuery }: toggleFilterProps) =>
    set((state: any) => {
      if (!filterKey) return
      const values: string[] = state?.activeFilters?.[filterKey] ?? []
      const index = values?.indexOf(value)
      if (index > -1) {
        values.splice(index, 1)
      } else {
        values.push(value)
      }

      const activeFiltersNormalized = values.filter(Boolean)

      const activeFilters: Partial<FiltersProps> = {
        ...state.activeFilters,
        [filterKey]: activeFiltersNormalized,
      }
      const queryString = createURLQueryString(activeFilters)
      const filteredProjects = filterProjects({
        searchPattern: searchQuery ?? "",
        activeFilters,
      })

      return {
        ...state,
        activeFilters,
        queryString,
        projects: sortProjectByFn(filteredProjects, state.sortBy),
      }
    }),
  onSelectTheme: (theme: string, searchQuery = "") => {
    set((state: any) => {
      // toggle theme when it's already selected
      const themes = state?.activeFilters?.themes?.includes(theme)
        ? []
        : [theme]

      const activeFilters = {
        ...state.activeFilters,
        themes,
      }

      const filteredProjects = filterProjects({
        searchPattern: searchQuery ?? "",
        activeFilters,
      })

      return {
        ...state,
        activeFilters,
        projects: sortProjectByFn(filteredProjects, state.sortBy),
      }
    })
  },
  onFilterProject: (searchPattern: string) => {
    set((state: any) => {
      const filteredProjects = filterProjects({
        searchPattern,
        activeFilters: state.activeFilters,
      })

      return {
        ...state,
        projects: sortProjectByFn(filteredProjects, state.sortBy),
      }
    })
  },
  setFilterFromQueryString: (filters: Partial<FiltersProps>) => {
    set((state: any) => {
      return {
        ...state,
        activeFilters: filters,
        queryString: createURLQueryString(filters),
      }
    })
  },
  sortProjectBy(sortBy: ProjectSortBy) {
    set((state: any) => {
      return {
        ...state,
        sortBy,
        projects: sortProjectByFn(state.projects, sortBy),
      }
    })
  },
}))
