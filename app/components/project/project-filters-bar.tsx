"use client"

import React, { ChangeEvent, ReactNode, useEffect, useState } from "react"
import Image from "next/image"
import FiltersIcon from "@/public/icons/filters.svg"
import { cn } from "@/lib/utils"
import { LABELS } from "@/app/labels"
import { useProjectFiltersContext } from "@/contexts/project-filters-context"
import type { ProjectFilter } from "@/contexts/project-filters-context"

import { Icons } from "../icons"
import Badge from "../ui/badge"
import { Button } from "../ui/button"
import { CategoryTag } from "../ui/categoryTag"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Modal } from "../ui/modal"
import { useDebounce } from "react-use"
import {
  ProjectStatus,
  ProjectCategories,
  ProjectStatusLabelMapping,
} from "@/lib/types"
import { useGetProjectsFilters } from "@/hooks/useFetchContent"
import { IThemeStatus } from "@/types/common"

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

interface FilterWrapperProps {
  label: string
  children?: ReactNode
  className?: string
}

export const ThemesStatusMapping: IThemeStatus = {
  active: {
    label: LABELS.COMMON.STATUS.ACTIVE,
    icon: <Icons.checkActive />,
  },
  inactive: {
    label: LABELS.COMMON.STATUS.INACTIVE,
    icon: <Icons.archived />,
  },
}

const FilterWrapper = ({ label, children, className }: FilterWrapperProps) => {
  return (
    <div className={cn("flex flex-col gap-4 py-4", className)}>
      <h6 className="font-sans text-xs font-bold text-tuatara-950 md:text-sm">
        {label}
      </h6>
      {children}
    </div>
  )
}

export const ThemesButtonMapping = {
  build: {
    label: LABELS.COMMON.TAGS.BUILD,
    icon: <Icons.hammer />,
  },
  play: {
    label: LABELS.COMMON.TAGS.PLAY,
    icon: <Icons.hand />,
  },
  research: {
    label: LABELS.COMMON.TAGS.RESEARCH,
    icon: <Icons.readme />,
  },
}

const SectionLinkBadge = ({
  section,
  isActive,
  onClick,
}: {
  section: string
  isActive: boolean
  onClick: () => void
}) => {
  return (
    <CategoryTag
      className={cn(
        "transition-colors cursor-pointer",
        isActive
          ? "bg-anakiwa-600 text-white"
          : "bg-transparent text-tuatara-950 hover:bg-anakiwa-100"
      )}
      onClick={onClick}
    >
      {section}
    </CategoryTag>
  )
}

export default function ProjectFiltersBar() {
  const [showModal, setShowModal] = useState(false)
  const [localSearchQuery, setLocalSearchQuery] = useState("")

  const { data: filters = [], isLoading: isLoadingFilters } =
    useGetProjectsFilters()

  // Use context instead of managing state locally
  const {
    activeFilters,
    searchQuery: contextSearchQuery,
    toggleFilterSimple,
    clearAllFilters,
    onFilterProject,
  } = useProjectFiltersContext()

  // Sync local search query with context
  useEffect(() => {
    setLocalSearchQuery(contextSearchQuery)
  }, [contextSearchQuery])

  // Calculate filter count from context
  const filterCount = Object.values(activeFilters).reduce((acc, curr) => {
    return acc + curr.length
  }, 0)

  // Debounced search - now uses context method
  useDebounce(
    () => {
      if (localSearchQuery !== contextSearchQuery) {
        onFilterProject(localSearchQuery)
      }
    },
    500,
    [localSearchQuery, contextSearchQuery, onFilterProject]
  )

  const hasActiveFilters = filterCount > 0 || localSearchQuery.length > 0

  return (
    <>
      <Modal
        title="Filters"
        footer={
          <div className="flex">
            <Button
              disabled={!hasActiveFilters}
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
            >
              {LABELS.COMMON.CLEAR_ALL}
            </Button>
            <div className="ml-auto">
              <Button
                variant="black"
                size="sm"
                onClick={() => setShowModal(false)}
              >
                {LABELS.COMMON.SHOW_PROJECTS}
              </Button>
            </div>
          </div>
        }
        open={showModal}
        setOpen={setShowModal}
      >
        <div className="flex flex-col divide-y divide-tuatara-200">
          {Object.entries(filters as any).map(([key, items]) => {
            const label = FilterLabelMapping[key as ProjectFilter]
            const type = FilterTypeMapping[key as ProjectFilter]
            const hasActiveThemeFilters =
              (activeFilters?.themes ?? [])?.length > 0

            if (!(items as any[])?.length) return null

            if (
              ["themes", "fundingSource"].includes(key) &&
              !hasActiveThemeFilters
            )
              return null

            return (
              <FilterWrapper key={key} label={label}>
                <div
                  className={cn("gap-y-2", {
                    "grid grid-cols-1 gap-2 md:grid-cols-3":
                      type === "checkbox",
                    "flex gap-x-4 flex-wrap": type === "button",
                  })}
                >
                  {(items as any[]).map((item: any, index: any) => {
                    const isActive =
                      activeFilters?.[key as ProjectFilter]?.includes(item) ||
                      false

                    if (type === "checkbox") {
                      return (
                        <Checkbox
                          key={item}
                          onClick={() =>
                            toggleFilterSimple(key as ProjectFilter, item)
                          }
                          name={item}
                          label={item}
                          checked={isActive}
                        />
                      )
                    }

                    if (type === "button") {
                      return (
                        <SectionLinkBadge
                          key={item}
                          section={item}
                          isActive={isActive}
                          onClick={() =>
                            toggleFilterSimple(key as ProjectFilter, item)
                          }
                        />
                      )
                    }

                    return null
                  })}
                </div>
              </FilterWrapper>
            )
          })}

          <FilterWrapper
            className="hidden"
            label={LABELS.COMMON.FILTER_LABELS.FUNDING_SOURCE}
          >
            {Object.keys(ProjectCategories).map((section: string) => {
              const label =
                ProjectCategories[section as keyof typeof ProjectCategories]
              return (
                <Checkbox key={section} name={section} label={String(label)} />
              )
            })}
          </FilterWrapper>

          <FilterWrapper
            className="hidden"
            label={LABELS.COMMON.FILTER_LABELS.PROJECT_STATUS}
          >
            {Object.keys(ProjectStatus).map((section: any) => {
              const label =
                ProjectStatusLabelMapping?.[section as ProjectStatus]
              return <Checkbox key={section} name={section} label={label} />
            })}
          </FilterWrapper>
        </div>
      </Modal>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6">
          <div className="grid items-center justify-between grid-cols-1 gap-3 md:grid-cols-5 md:gap-12">
            <div className="col-span-1 grid grid-cols-[1fr_auto] gap-2 md:col-span-3 md:gap-3">
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setLocalSearchQuery(e?.target?.value)
                }}
                value={localSearchQuery}
                placeholder={LABELS.COMMON.SEARCH_PROJECT_PLACEHOLDER}
              />
              <div className="flex items-center gap-3">
                <Badge value={filterCount}>
                  <Button
                    onClick={() => setShowModal(true)}
                    variant="white"
                    className={cn({
                      "border-2 border-anakiwa-950": filterCount > 0,
                    })}
                  >
                    <div className="flex items-center gap-2">
                      <Image src={FiltersIcon} alt="filter icon" />
                      <span className="hidden md:block">
                        {LABELS.COMMON.FILTERS}
                      </span>
                    </div>
                  </Button>
                </Badge>
                <button
                  disabled={!hasActiveFilters}
                  onClick={clearAllFilters}
                  className="hidden bg-transparent cursor-pointer opacity-85 text-primary hover:opacity-100 disabled:pointer-events-none disabled:opacity-50 md:block"
                >
                  <div className="flex items-center gap-2 border-b-2 border-black">
                    <span className="text-sm font-medium">
                      {LABELS.COMMON.CLEAR_ALL}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
