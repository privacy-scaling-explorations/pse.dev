import React from "react"
import Link from "next/link"

import {
  ActionLinkTypeLink,
  ProjectExtraLinkType,
  ProjectInterface,
} from "@/lib/types"

import { Icons } from "../icons"

const ExtraLinkLabelMapping: Record<
  ProjectExtraLinkType,
  {
    label: string
    icon?: any
  }
> = {
  buildWith: {
    label: "Build with this tool",
    icon: <Icons.hammer />,
  },
  play: {
    label: "Try it out!",
    icon: <Icons.hand />,
  },
  research: {
    label: "Dive deeper into the research",
    icon: <Icons.readme />,
  },
  learn: {
    label: "Learn more",
  },
}

interface ProjectExtraLinksProps {
  project: ProjectInterface
}

interface ExtraLinkItemsProps {
  id: ProjectExtraLinkType
  links: ActionLinkTypeLink[]
}

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

export default function ProjectExtraLinks({ project }: ProjectExtraLinksProps) {
  const { extraLinks = {} } = project
  const hasExtraLinks = Object.keys(extraLinks).length > 0

  if (!hasExtraLinks) return null

  return (
    <div className="flex flex-col gap-8 py-4">
      {Object.entries(ExtraLinkLabelMapping).map(([key]) => {
        const links = extraLinks[key as ProjectExtraLinkType] ?? []
        return (
          <ExtraLinkItems
            key={key}
            id={key as ProjectExtraLinkType}
            links={links}
          />
        )
      })}
    </div>
  )
}
