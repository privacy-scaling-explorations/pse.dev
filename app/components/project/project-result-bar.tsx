"use client"

import {
  DEFAULT_PROJECT_SORT_BY,
  ProjectFilter,
  ProjectSortBy,
  useProjectFiltersState,
} from "@/state/useProjectFiltersState"

import { LABELS } from "@/app/labels"
import { interpolate } from "@/lib/utils"

import { CategoryTag } from "../ui/categoryTag"
import { Dropdown } from "../ui/dropdown"

const labelClass = "h-5 text-xs text-base md:h-6 text-slate-900/70 md:text-sm"

export const ProjectResultBar = () => {
  const { activeFilters, toggleFilter, projects, sortProjectBy, sortBy } =
    useProjectFiltersState((state) => state)

  const haveActiveFilters = Object.entries(activeFilters).some(
    ([, values]) => values?.length > 0
  )

  const resultLabel = haveActiveFilters
    ? interpolate(LABELS.COMMON.SHOWING_PROJECTS_WITH, {
        count: projects?.length,
      })
    : interpolate(LABELS.COMMON.SHOWING_PROJECTS, { count: projects?.length })

  const projectSortItems: { label: string; value: ProjectSortBy }[] = [
    { label: LABELS.COMMON.FILTER_OPTIONS.RANDOM, value: "random" },
    { label: LABELS.COMMON.FILTER_OPTIONS.ASC, value: "asc" },
    { label: LABELS.COMMON.FILTER_OPTIONS.DESC, value: "desc" },
    // { label: LABELS.COMMON.FILTER_OPTIONS.RELEVANCE, value: "relevance" },
  ]

  const getSortByLabel = (sortByValue: string) => {
    switch (sortByValue) {
      case "random":
        return LABELS.COMMON.FILTER_OPTIONS.RANDOM
      case "asc":
        return LABELS.COMMON.FILTER_OPTIONS.ASC
      case "desc":
        return LABELS.COMMON.FILTER_OPTIONS.DESC
      case "relevance":
        return LABELS.COMMON.FILTER_OPTIONS.RELEVANCE
      default:
        return LABELS.COMMON.FILTER_OPTIONS.RANDOM
    }
  }

  const activeSortOption = interpolate(LABELS.COMMON.SORT_BY, {
    option: getSortByLabel(sortBy),
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className={labelClass}>{resultLabel}</span>
        <Dropdown
          label={activeSortOption}
          defaultItem={DEFAULT_PROJECT_SORT_BY}
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
