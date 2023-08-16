"use client"

import Image from "next/image"

import { ProjectLinkWebsite } from "@/lib/types"

interface ProjectLinkProps {
  url: string
  image: string
  website: ProjectLinkWebsite
}

export function ProjectLink({ image, website, url }: ProjectLinkProps) {
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
      <div className="px-4 py-1 rounded bg-[#F5F5F6]">
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
