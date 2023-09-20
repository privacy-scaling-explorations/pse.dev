"use client"

import Image from "next/image"
import { ProjectLinkIconMap } from "@/data/projects"

import { ProjectLinkWebsite } from "@/lib/types"

interface ProjectLinkProps {
  url: string
  website: ProjectLinkWebsite
}

export function ProjectLink({ website, url }: ProjectLinkProps) {
  const image = ProjectLinkIconMap?.[website as ProjectLinkWebsite]

  // TODO: add support for youtube, discord and other links
  if (!image) return null
  return (
    <a
      href={url}
      onClick={(event) => {
        // prevent box link to redirect to project page
        event?.stopPropagation()
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="rounded bg-[#F5F5F6] px-4 py-1">
        <Image
          src={image}
          alt={`${website}Vector`}
          className="cursor-pointer"
          width={18}
          height={18}
        />
      </div>
    </a>
  )
}
