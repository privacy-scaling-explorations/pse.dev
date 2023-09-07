"use client"

import {
  ProjectFilter,
  ProjectSortBy,
  useProjectFiltersState,
} from "@/state/useProjectFiltersState"

import { CategoryTag } from "../ui/categoryTag"
import { Dropdown } from "../ui/dropdown"

const labelClass = "h-5 text-xs text-base md:h-6 text-slate-900/70 md:text-lg"

const projectSortItems: { label: string; value: ProjectSortBy }[] = [
  { label: "Random", value: "random" },
  { label: "Title: A-Z", value: "asc" },
  { label: "Title: Z-A", value: "desc" },
  { label: "Relevancy", value: "relevancy" },
]

const getSortLabel = (sortBy: ProjectSortBy) => {
  return projectSortItems.find((item) => item.value === sortBy)?.label || sortBy
}

export const ProjectResultBar = () => {
  const { activeFilters, toggleFilter, projects, sortProjectBy, sortBy } =
    useProjectFiltersState((state) => state)

  const haveActiveFilters = Object.entries(activeFilters).some(
    ([_key, values]) => values?.length > 0
  )

  const resultLabel = haveActiveFilters
    ? `Showing ${projects?.length} projects with:`
    : `Showing ${projects.length} projects`

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className={labelClass}>{resultLabel}</span>
        <Dropdown
          label={`Sort: ${getSortLabel(sortBy)}`}
          defaultItem="random"
          items={projectSortItems}
          onChange={(sortBy) => sortProjectBy(sortBy as ProjectSortBy)}
          disabled={!projects?.length}
        />
      </div>
      {haveActiveFilters && (
        <div className="inline-flex flex-wrap gap-1 md:gap-4">
          {Object.entries(activeFilters).map(([key, filters], index) => {
            return (
              <>
                {filters?.map((filter) => {
                  if (filter?.length === 0) return null

                  return (
                    <CategoryTag
                      closable
                      variant="gray"
                      onClose={() =>
                        toggleFilter({
                          tag: key as ProjectFilter,
                          value: filter,
                        })
                      }
                      key={`${index}-${filter}`}
                    >
                      {filter}
                    </CategoryTag>
                  )
                })}
              </>
            )
          })}
        </div>
      )}
    </div>
  )
}
