"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import NoResultIcon from "@/public/icons/no-result.svg"
import { useProjectFiltersState } from "@/state/useProjectFiltersState"

import { ProjectLinkWebsite } from "@/lib/types"

import { Icons } from "../icons"
import { CategoryTag } from "../ui/categoryTag"
import { ThemesButtonMapping } from "./project-filters-bar"
import { ProjectLink } from "./project-link"

const TagsIconMapping: Record<string, any> = {
  build: <Icons.hammer height={12} width={12} />,
  play: <Icons.hand height={12} width={12} />,
  research: <Icons.readme height={12} width={12} />,
}

const NoResults = () => {
  return (
    <div className="flex flex-col gap-2 pt-24 pb-40 text-center">
      <div className="mx-auto">
        <Image className="w-9 h-9" src={NoResultIcon} alt="no result icon" />
      </div>
      <span className="text-2xl font-bold font-display text-tuatara-950">
        No results found.
      </span>
      <span className="text-lg font-normal text-tuatara-950">
        No projects matching these filters. Try changing your search.
      </span>
    </div>
  )
}

export default function ProjectList() {
  const { projects } = useProjectFiltersState((state) => state)
  const router = useRouter()

  const noItems = projects?.length === 0

  if (noItems) return <NoResults />

  return (
    <div className="flex flex-wrap justify-center gap-6 pb-6">
      {projects.map((project) => {
        const { id, image, links, name, tldr, tags } = project

        return (
          <div key={id}>
            <div
              onClick={() => router.push(`/projects/${id}`)}
              className="flex h-[460px] w-[310px] cursor-pointer flex-col overflow-hidden rounded-lg border border-slate-900/20 transition duration-150 ease-in hover:scale-105"
            >
              <Image
                src={`/project-banners/${image ? image : "fallback.webp"}`}
                alt={`${name} banner`}
                width={1200}
                height={630}
                className="object-cover w-full rounded-t-lg"
              />
              <div className="flex flex-col justify-between h-full gap-5 p-5 bg-white rounded-b-lg">
                <div className="flex flex-col justify-start gap-2">
                  <div className="flex gap-2 mb-2">
                    {tags?.themes?.map((theme, index) => {
                      const { label } = ThemesButtonMapping?.[theme]
                      const icon = TagsIconMapping?.[theme]

                      return (
                        <CategoryTag variant="blue" size="xs" key={index}>
                          <div className="flex items-center gap-1">
                            {icon}
                            <span>{label ?? theme}</span>
                          </div>
                        </CategoryTag>
                      )
                    })}
                  </div>
                  <h1 className="text-xl font-bold text-black">{name}</h1>
                  <p className="text-slate-900/80">{tldr}</p>
                </div>
                <div className="flex items-center justify-start gap-2 mr-auto">
                  {Object.entries(links ?? {})?.map(([website, url], index) => {
                    return (
                      <ProjectLink
                        key={index}
                        url={url}
                        website={website as ProjectLinkWebsite}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
