"use client"

import { useProjectFiltersState } from "@/state/useProjectFiltersState"

import { CategoryTag } from "../ui/categoryTag"

const labelClass = "h-5 text-xs text-base md:h-6 text-slate-900/70 md:text-lg"

export const ProjectResultBar = () => {
  const { activeFilters, toggleFilter, projects } = useProjectFiltersState(
    (state) => state
  )

  const haveActiveFilters = Object.entries(activeFilters).some(
    ([_key, values]) => values.length > 0
  )

  if (!haveActiveFilters)
    return (
      <span className={labelClass}>
        {`Showing ${projects.length} projects`}{" "}
      </span>
    )

  return (
    <div className="flex flex-col gap-2">
      <span className={labelClass}>
        {`Showing ${projects?.length} projects with:`}{" "}
      </span>
      <div className="inline-flex flex-wrap gap-4">
        {Object.entries(activeFilters).map(([key, filters], index) => {
          return (
            <>
              {filters?.map((filter) => {
                if (filter?.length === 0) return null

                return (
                  <CategoryTag
                    closable
                    variant="gray"
                    onClose={() => toggleFilter(key as any, filter)}
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
    </div>
  )
}
