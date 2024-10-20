import { ReactNode } from "react"

// list of project groups
export const ProjectSections = [
  "pse",
  "grant",
  "collaboration",
  "archived",
] as const
export type ProjectSection = (typeof ProjectSections)[number]

export enum ProjectStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
export interface Faq {
  question: string
  answer: ReactNode
}

export const ProjectSectionLabelMapping: Record<ProjectSection, string> = {
  pse: "PSE projects",
  grant: "Grants",
  collaboration: "Collaborations",
  archived: "Archived",
}
export const ProjectStatusLabelMapping: Record<ProjectStatus, string> = {
  active: "Active",
  inactive: "Not Currently Active",
}
export interface AnnounceInterface {
  id: number
  type?: number
  content: string
  attachments?: string[]
  timestamp: string
  embeds?: {
    type: "link" | "article"
    url: string
    title: string
    description: string
    color: number
  }[]
}
export interface NewsInterface {
  type: string
  title: string
  expires?: string
  action: {
    label: string
    url: string
  }
}

export type ProjectLinkWebsite =
  | "github"
  | "website"
  | "discord"
  | "twitter"
  | "youtube"
  | "telegram"

export type ProjectLinkType = Partial<Record<ProjectLinkWebsite, any>>
export type ProjectExtraLinkType = "buildWith" | "play" | "research" | "learn"
export type TagType =
  | "types"
  | "themes"
  | "builtWith"
  | "keywords"
  | "fundingSource"
export type ProjectTags = Partial<Record<TagType, string[]>>
export type ActionLinkTypeLink = {
  label: string
  url: string
}
export type ActionLinkType = Partial<
  Record<ProjectExtraLinkType, Array<ActionLinkTypeLink>>
>

export interface ProjectContent {
  [language: string]: {
    tldr: string
    description: string
  }
}
export interface ProjectInterface {
  id: string
  hasWiki?: boolean // show project with wiki page template
  license?: string
  content: ProjectContent // project tldr and description with support for multiple language
  section: ProjectSection
  image: string
  previousBrandImage?: string
  imageAlt?: string
  name: string
  links?: ProjectLinkType
  projectStatus: ProjectStatus
  tags?: ProjectTags
  extraLinks?: ActionLinkType
}
