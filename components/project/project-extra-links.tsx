"use client"

import React from "react"
import Link from "next/link"

import {
  ActionLinkTypeLink,
  ProjectExtraLinkType,
  ProjectInterface,
} from "@/lib/types"
import { useTranslation } from "@/app/i18n/client"
import { LocaleTypes } from "@/app/i18n/settings"

import { Icons } from "../icons"

interface ProjectExtraLinksProps {
  project: ProjectInterface
  lang: LocaleTypes
}

interface ExtraLinkItemsProps {
  id: ProjectExtraLinkType
  links: ActionLinkTypeLink[]
}

export default function ProjectExtraLinks({
  project,
  lang,
}: ProjectExtraLinksProps) {
  const { t } = useTranslation(lang, "common")
  const { extraLinks = {} } = project
  const hasExtraLinks = Object.keys(extraLinks).length > 0

  const ExtraLinkLabelMapping: Record<
    ProjectExtraLinkType,
    {
      label: string
      icon?: any
    }
  > = {
    buildWith: {
      label: t("buildWithThisTool"),
      icon: <Icons.hammer />,
    },
    play: {
      label: t("tryItOut"),
      icon: <Icons.hand />,
    },
    research: {
      label: t("deepDiveResearch"),
      icon: <Icons.readme />,
    },
    learn: {
      label: t("learnMore"),
    },
  }

  if (!hasExtraLinks) return null

  const ExtraLinkItems = ({ id, links = [] }: ExtraLinkItemsProps) => {
    const { label, icon } = ExtraLinkLabelMapping[id]

    if (!links.length) return null // no links hide the section

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-anakiwa-500">{icon}</span>}
          <p className="font-sans text-xl font-medium text-tuatara-700">
            {label}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          {links.map(({ label, url }: ActionLinkTypeLink) => {
            return (
              <Link
                href={url}
                target="_blank"
                className="flex cursor-pointer items-center gap-1 overflow-hidden border-b-2 border-transparent font-sans font-normal text-tuatara-950 duration-200 ease-in-out hover:border-orange"
              >
                {label}
                <Icons.externalUrl />
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 py-4">
      {Object.entries(ExtraLinkLabelMapping).map(([key], index) => {
        const links = extraLinks[key as ProjectExtraLinkType] ?? []
        return (
          <ExtraLinkItems
            key={index}
            id={key as ProjectExtraLinkType}
            links={links}
          />
        )
      })}
    </div>
  )
}
