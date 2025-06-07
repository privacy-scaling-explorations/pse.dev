"use client"

import { HtmlHTMLAttributes } from "react"
import Link from "next/link"
import {
  FilterLabelMapping,
  ProjectFilter,
} from "@/state/useProjectFiltersState"

import { ProjectInterface } from "@/lib/types"

import { CategoryTag } from "../ui/categoryTag"
import { LABELS } from "@/app/labels"

interface TagsProps extends HtmlHTMLAttributes<HTMLDivElement> {
  label: string
}

const TagsWrapper = ({ label, children }: TagsProps) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <h3 className="text-[22px] font-bold text-tuatara-700">{label}</h3>
      {children}
    </div>
  )
}

type IProjectTags = {
  project: ProjectInterface
}

export function ProjectTags({ project }: IProjectTags) {
  return (
    <div className="flex flex-col gap-4 pt-10">
      {Object.entries(FilterLabelMapping).map(([key]) => {
        const keyTags = project?.tags?.[key as ProjectFilter]
        const hasItems = keyTags && keyTags?.length > 0

        if (["themes", "builtWith"].includes(key)) return null // keys to ignore
        return (
          hasItems && (
            <div data-section-id={key} key={key}>
              <TagsWrapper
                label={
                  LABELS.COMMON.FILTER_LABELS[
                    key as keyof typeof LABELS.COMMON.FILTER_LABELS
                  ] as string
                }
              >
                <div className="flex flex-wrap gap-[6px]">
                  {keyTags?.map((tag: string, index: number) => {
                    return (
                      <Link key={index} href={`/projects?${key}=${tag}`}>
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
    </div>
  )
}
