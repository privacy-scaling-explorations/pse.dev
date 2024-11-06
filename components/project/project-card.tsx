import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { VariantProps, cva } from "class-variance-authority"

import { getProjectById } from "@/lib/projectsUtils"
import { ProjectInterface, ProjectLinkWebsite } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/app/i18n/client"
import { LocaleTypes } from "@/app/i18n/settings"

import { Icons } from "../icons"
import { CategoryTag } from "../ui/categoryTag"
import { ThemesButtonMapping } from "./project-filters-bar"
import { ProjectLink } from "./project-link"

interface ProjectCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof projectCardVariants> {
  project: ProjectInterface
  showLinks?: boolean // show links in the card
  showBanner?: boolean // show images in the card
}

const TagsIconMapping: Record<string, any> = {
  build: <Icons.hammer height={12} width={12} />,
  play: <Icons.hand height={12} width={12} />,
  research: <Icons.readme height={12} width={12} />,
}

const tagCardVariants = cva(
  "text-xs font-sans text-tuatara-950 rounded-[3px] py-[2px] px-[6px]",
  {
    variants: {
      variant: {
        primary: "bg-[#D8FEA8]",
        secondary: "bg-[#C2E8F5]",
      },
    },
  }
)
const projectCardVariants = cva(
  "flex flex-col overflow-hidden rounded-lg transition duration-200 ease-in border border-transparent",
  {
    variants: {
      showLinks: {
        true: "min-h-[280px]",
        false: "min-h-[200px]",
      },
      border: {
        true: "border border-slate-900/20",
      },
    },
  }
)

export default function ProjectCard({
  project,
  showLinks = false,
  showBanner = false,
  border = false,
  className,
  lang,
}: ProjectCardProps & { lang: LocaleTypes }) {
  const { t } = useTranslation(lang, "common")
  const router = useRouter()

  const { id, image, links, name, tags, imageAlt, projectStatus, cardTags } =
    project ?? {}

  const projectNotActive = projectStatus !== "active"
  const { content: projectContent } = getProjectById(id, lang)

  return (
    <div
      className={cn(
        "group",
        projectCardVariants({ showLinks, border, className })
      )}
    >
      {showBanner && (
        <div className="relative flex flex-col border-b border-black/10">
          <Image
            src={`/project-banners/${image ? image : "fallback.webp"}`}
            alt={`${name} banner`}
            width={1200}
            height={630}
            className="h-[160px] w-full overflow-hidden rounded-t-lg border-none object-cover"
          />
          {!image && (
            <span className="absolute w-full px-5 text-xl font-bold text-center text-black -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              {imageAlt || name}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-col justify-between h-full gap-8 p-4 bg-white rounded-b-lg">
        <div className="flex flex-col justify-start gap-2">
          <h1
            className="text-2xl font-bold leading-7 text-black duration-200 cursor-pointer hover:text-anakiwa-500"
            onClick={() => {
              router.push(`/projects/${id}`)
            }}
          >
            {name}
          </h1>
          {projectContent?.tldr && (
            <div className="flex flex-col h-24 gap-4">
              <p className="text-slate-900/80 line-clamp-4">
                {projectContent?.tldr}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {projectNotActive && (
            <span className="text-sm font-medium italic leading-[21px] text-tuatara-400">
              {t("inactive")}
            </span>
          )}
          <div className="flex justify-between ">
            {showLinks && (
              <div className="flex items-center justify-start gap-3">
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
            )}
            {cardTags && (
              <div className="flex items-center gap-1">
                {cardTags?.primary && (
                  <div className={tagCardVariants({ variant: "primary" })}>
                    {cardTags?.primary}
                  </div>
                )}
                {cardTags?.secondary && (
                  <div className={tagCardVariants({ variant: "secondary" })}>
                    {cardTags?.secondary}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
