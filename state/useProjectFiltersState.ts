import { projects } from "@/data/projects"
import Fuse from "fuse.js"
import { create } from "zustand"

import { ProjectInterface } from "@/lib/types"
import { uniq } from "@/lib/utils"

export type ProjectFilter = "keywords" | "builtWith" | "themes"
export type FiltersProps = Record<ProjectFilter, string[]>

export const FilterLabelMapping: Record<ProjectFilter, string> = {
  keywords: "Keywords",
  builtWith: "Built with",
  themes: "Themes",
}

interface ProjectStateProps {
  projects: ProjectInterface[]
  filters: FiltersProps
  activeFilters: Partial<FiltersProps>
  queryString: string
}

interface SearchMatchByParamsProps {
  searchPattern: string
}

interface ProjectActionsProps {
  toggleFilter: (projectFilter: ProjectFilter, value: string) => void
  setFilterFromQueryString: (filters: Partial<FiltersProps>) => void
  onFilterProject: (searchPattern: string) => void
}

const createURLQueryString = (params: Partial<FiltersProps>) => {
  const qs = Object.keys(params)
    .map((key: any) => `${key}=${encodeURIComponent((params as any)[key])}`)
    .join("&")

  return qs
}

const getProjectFilters = (): FiltersProps => {
  const filters: FiltersProps = {
    keywords: [],
    builtWith: [],
    themes: [],
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

const filterProjects = ({ searchPattern }: SearchMatchByParamsProps) => {
  // keys that will be used for search
  const keys = [
    "name",
    "tldr",
    "tags.themes",
    "tags.keywords",
    "tags.builtWith",
    "projectStatus",
  ]

  const query = {
    $or: [
      // search for every keys
      ...keys.map((key) => ({
        [key]: searchPattern,
      })),
    ],
  }
  const fuse = new Fuse(projects, {
    useExtendedSearch: true,
    keys,
  })
  const result = fuse.search(query)?.map(({ item }) => item)
  console.log(result, projects)

  return result ?? []
}

export const useProjectFiltersState = create<
  ProjectStateProps & ProjectActionsProps
>()((set) => ({
  projects,
  queryString: "",
  filters: getProjectFilters(), // list of filters with all possible values from projects
  activeFilters: {}, // list of filters active in the current view by the user
  toggleFilter: (filterKey: ProjectFilter, value: string) =>
    set((state: any) => {
      if (!filterKey) return
      const values: string[] = state?.activeFilters?.[filterKey] ?? []
      const index = values?.indexOf(value)
      if (index > -1) {
        values.splice(index, 1)
      } else {
        values.push(value)
      }

      const activeFilters: Partial<FiltersProps> = {
        ...state.activeFilters,
        [filterKey]: values,
      }

      return {
        ...state,
        activeFilters,
        queryString: createURLQueryString(activeFilters),
      }
    }),
  onFilterProject: (searchPattern: string) => {
    set((state: any) => {
      console.log("searchPattern", searchPattern)
      if (!searchPattern?.length)
        return {
          ...state,
          projects,
        }

      const filteredProjects = filterProjects({
        searchPattern,
      })

      return {
        ...state,
        projects: filteredProjects,
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
}))
