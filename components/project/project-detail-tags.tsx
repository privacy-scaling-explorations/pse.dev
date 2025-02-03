'use client'

import { HtmlHTMLAttributes } from 'react'
import Link from 'next/link'
import {
  FilterLabelMapping,
  ProjectFilter,
} from '@/state/useProjectFiltersState'

import { ProjectInterface } from '@/lib/types'
import { useTranslation } from '@/app/i18n/client'
import { LocaleTypes } from '@/app/i18n/settings'

import { CategoryTag } from '../ui/categoryTag'

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
  lang: LocaleTypes
}

export function ProjectTags({ project, lang }: IProjectTags) {
  const { t } = useTranslation(lang, 'common')

  return (
    <div className="flex flex-col gap-4 pt-10">
      {Object.entries(FilterLabelMapping(lang)).map(([key]) => {
        const keyTags = project?.tags?.[key as ProjectFilter]
        const hasItems = keyTags && keyTags?.length > 0

        if (['themes', 'builtWith'].includes(key)) return null // keys to ignore
        return (
          hasItems && (
            <div data-section-id={key} key={key}>
              <TagsWrapper label={t(`filterLabels.${key}`)}>
                <div className="flex flex-wrap gap-[6px]">
                  {keyTags?.map((tag, index) => {
                    return (
                      <Link
                        key={index}
                        href={`/${lang}/projects?${key}=${tag}`}
                      >
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
