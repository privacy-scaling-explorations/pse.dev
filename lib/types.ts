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

export type ProjectLinkType = Partial<Record<ProjectLinkWebsite, string>>
export type ProjectExtraLinkType = "buildWith" | "play" | "research" | "learn"
export type TagType = "types" | "themes" | "builtWith" | "keywords"
export type ProjectTags = Partial<Record<TagType, string[]>>
export type ActionLinkTypeLink = {
  label: string
  url: string
}
export type ActionLinkType = Partial<
  Record<ProjectExtraLinkType, Array<ActionLinkTypeLink>>
>

export type ProjectStatusType = "active" | "inactive" | "archived"
export interface ProjectInterface {
  id: string
  image: string
  imageAlt?: string
  name: string
  tldr: string
  description: string
  links?: ProjectLinkType
  projectStatus: ProjectStatusType
  tags?: ProjectTags
  extraLinks?: ActionLinkType
}
