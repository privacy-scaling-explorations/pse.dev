"use client"

import { HtmlHTMLAttributes } from "react"
import Link from "next/link"
import {
  FilterLabelMapping,
  ProjectFilter,
} from "@/state/useProjectFiltersState"

import { ProjectInterface } from "@/lib/types"

import { CategoryTag } from "../ui/categoryTag"
import { ThemesStatusMapping } from "./project-filters-bar"

interface TagsProps extends HtmlHTMLAttributes<HTMLDivElement> {
  label: string
}

const TagsWrapper = ({ label, children }: TagsProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="py-2 text-base font-medium ">{label}</span>
      {children}
    </div>
  )
}

export function ProjectTags({ project }: { project: ProjectInterface }) {
  const { label, icon } = ThemesStatusMapping?.[project?.projectStatus] ?? {}

  return (
    <div className="flex flex-col gap-4 mt-8">
      {Object.entries(FilterLabelMapping).map(([key, label]) => {
        const keyTags = project?.tags?.[key as ProjectFilter]
        const hasItems = keyTags && keyTags?.length > 0

        if (key === "themes") return null // ignore themes

        return (
          hasItems && (
            <div>
              <TagsWrapper label={label}>
                <div className="flex gap-[6px] flex-wrap">
                  {keyTags?.map((tag) => {
                    return (
                      <Link href={`/projects?${key}=${tag}`}>
                        <CategoryTag key={tag} variant="gray">
                          {tag}
                        </CategoryTag>
                      </Link>
                    )
                  })}
                </div>
              </TagsWrapper>
            </div>
          )
        )
      })}
      <TagsWrapper label="Project status">
        <div>
          <CategoryTag variant="gray" size="default">
            <div className="flex items-center gap-1">
              {icon}
              {label}
            </div>
          </CategoryTag>
        </div>
      </TagsWrapper>
    </div>
  )
}
