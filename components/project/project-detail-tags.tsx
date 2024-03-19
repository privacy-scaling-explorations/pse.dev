"use client"

import { HtmlHTMLAttributes } from "react"
import Link from "next/link"
import {
  FilterLabelMapping,
  ProjectFilter,
} from "@/state/useProjectFiltersState"

import { ProjectInterface } from "@/lib/types"
import { useTranslation } from "@/app/i18n/client"
import { LocaleTypes } from "@/app/i18n/settings"

import { CategoryTag } from "../ui/categoryTag"
import { ThemesStatusMapping } from "./project-filters-bar"
import { ProjectSectionLabelMapping } from "./project-list"

interface TagsProps extends HtmlHTMLAttributes<HTMLDivElement> {
  label: string
}

const TagsWrapper = ({ label, children }: TagsProps) => {
  return (
    <div className="flex flex-col items-start md:flex-row md:items-center md:gap-2">
      <span className="py-2 text-base font-medium ">{label}</span>
      {children}
    </div>
  )
}

type IProjectTags = {
  project: ProjectInterface
  lang: LocaleTypes
}

export function ProjectTags({ project, lang }: IProjectTags) {
  const statusItem = ThemesStatusMapping(lang)
  const { label, icon } = statusItem?.[project?.projectStatus] ?? {}
  const { t } = useTranslation(lang, "common")

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(FilterLabelMapping(lang)).map(([key]) => {
        const keyTags = project?.tags?.[key as ProjectFilter]
        const hasItems = keyTags && keyTags?.length > 0

        if (key === "themes") return null // ignore themes
        return (
          hasItems && (
            <div>
              <TagsWrapper label={t(`filterLabels.${key}`)}>
                <div className="flex flex-wrap gap-[6px]">
                  {keyTags?.map((tag) => {
                    return (
                      <Link href={`/${lang}/projects?${key}=${tag}`}>
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
      <TagsWrapper label={t("filterLabels.projectStatus")}>
        <CategoryTag variant="gray" size="default">
          <div className="flex items-center gap-1">
            {icon}
            {label}
          </div>
        </CategoryTag>
      </TagsWrapper>
      <TagsWrapper label={t("filterLabels.fundingSource")}>
        <CategoryTag variant="gray" size="default">
          <div className="flex items-center gap-1">
            {ProjectSectionLabelMapping[project?.section]}
          </div>
        </CategoryTag>
      </TagsWrapper>
    </div>
  )
}
