"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useProjectFiltersState } from "@/state/useProjectFiltersState"

import { ProjectLinkWebsite } from "@/lib/types"

import { ProjectLink } from "./project-link"

export default function ProjectList() {
  const { projects } = useProjectFiltersState((state) => state)
  const router = useRouter()

  return (
    <div className="flex flex-wrap justify-center gap-6 pb-6">
      {projects.map((project) => {
        const { id, image, links, name, tldr } = project

        return (
          <div key={id}>
            <div
              onClick={() => router.push(`/projects/${id}`)}
              className="flex h-[419px] w-[310px] cursor-pointer flex-col overflow-hidden rounded-lg border border-slate-900/20 transition duration-150 ease-in hover:scale-105"
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
