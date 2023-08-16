import Link from "next/link"
import {
  FilterLabelMapping,
  ProjectFilter,
} from "@/state/useProjectFiltersState"

import { ProjectInterface } from "@/lib/types"

import { CategoryTag } from "../ui/categoryTag"

export function ProjectTags({ project }: { project: ProjectInterface }) {
  return (
    <div className="flex flex-col gap-4 mt-8">
      {Object.entries(FilterLabelMapping).map(([key, label]) => {
        const keyTags = project?.tags?.[key as ProjectFilter]
        const hasItems = keyTags && keyTags?.length > 0

        return (
          hasItems && (
            <div>
              <div className="flex gap-2">
                <span className="py-2 text-base font-medium ">{label}</span>
                <div className="flex gap-[6px]">
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
              </div>
            </div>
          )
        )
      })}
    </div>
  )
}
