"use client"

import { ProjectLinkWebsite } from "@/lib/types"

import { ProjectLinkIconMap } from "./project-links"

interface ProjectLinkProps {
  url: string
  website: ProjectLinkWebsite
}

export function ProjectLink({ website, url }: ProjectLinkProps) {
  const icon = ProjectLinkIconMap?.[website as ProjectLinkWebsite]

  if (!icon) return null
  return (
    <a
      href={url}
      onClick={(event) => {
        // prevent box link to redirect to project page
        event?.stopPropagation()
      }}
      target="_blank"
      rel="noopener noreferrer"
      className="text-lg"
    >
      {icon}
    </a>
  )
}
