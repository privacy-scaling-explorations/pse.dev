export interface NewsInterface {
  type: string
  title: string
  expires?: string
  action: {
    label: string
    url: string
  }
}

export type ProjectLinkWebsite = "github" | "website" | "discord" | "twitter"
export type ProjectLinkType = Partial<Record<ProjectLinkWebsite, string>>
export interface ProjectInterface {
  id: string
  image: string
  name: string
  tldr: string
  description: string
  links?: ProjectLinkType
  tags?: Record<string, string[]>
}
