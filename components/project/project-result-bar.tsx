"use client"

import {
  DEFAULT_PROJECT_SORT_BY,
  ProjectFilter,
  ProjectSortBy,
  useProjectFiltersState,
} from "@/state/useProjectFiltersState"

import { LangProps } from "@/types/common"
import { useTranslation } from "@/app/i18n/client"

import { CategoryTag } from "../ui/categoryTag"
import { Dropdown } from "../ui/dropdown"

const labelClass = "h-5 text-xs text-base md:h-6 text-slate-900/70 md:text-sm"

export const ProjectResultBar = ({ lang }: LangProps["params"]) => {
  const { t } = useTranslation(lang, "common")
  const { activeFilters, toggleFilter, projects, sortProjectBy, sortBy } =
    useProjectFiltersState((state) => state)

  const haveActiveFilters = Object.entries(activeFilters).some(
    ([_key, values]) => values?.length > 0
  )

  const resultLabel = t(
    haveActiveFilters ? "showingProjectsWith" : "showingProjects",
    {
      count: projects?.length,
    }
  )

  const projectSortItems: { label: string; value: ProjectSortBy }[] = [
    { label: t("filterOptions.random"), value: "random" },
    { label: t("filterOptions.asc"), value: "asc" },
    { label: t("filterOptions.desc"), value: "desc" },
    { label: t("filterOptions.relevance"), value: "relevance" },
  ]

  const activeSortOption = t("sortBy", {
    option: t(`filterOptions.${sortBy}`),
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
