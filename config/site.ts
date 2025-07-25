export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Privacy & Scaling Explorations",
  description:
    "Enhancing Ethereum through cryptographic research and collective experimentation.",
  url: "https://pse.dev",
  links: {
    twitter: "https://twitter.com/privacyscaling",
    github: "https://github.com/privacy-scaling-explorations",
    docs: "https://ui.shadcn.com",
    discord: "https://discord.com/invite/sF5CT5rzrR",
    articles: "https://pse.dev/blog",
    youtube: "https://www.youtube.com/@privacyscalingexplorations-1",
    jobs: "https://jobs.lever.co/ethereumfoundation/?department=Ethereum%20Foundation&team=Privacy%20and%20Scaling%20Explorations",
    termOfUse: "https://ethereum.org/en/terms-of-use/",
    privacyPolicy: "https://ethereum.org/en/privacy-policy/",
    activity:
      "https://pse-team.notion.site/50dcf22c5191485e93406a902ae9e93b?v=453023f8227646dd949abc34a7a4a138&pvs=4",
    report: "https://reports.pse.dev/",
    firstGoodIssue: "https://gfi.pse.dev/",
    discordAnnouncementChannel:
      "https://discord.com/channels/943612659163602974/969614451089227876",
    accelerationProgram:
      "https://github.com/privacy-scaling-explorations/acceleration-program",
    coreProgram:
      "https://docs.google.com/forms/d/e/1FAIpQLSendzYY0z_z7fZ37g3jmydvzS9I7OWKbY2JrqAnyNqeaBHvMQ/viewform",
  },
  addGithubResource:
    "https://github.com/privacy-scaling-explorations/website-v2/blob/main/content/resources.md",
  editProjectPage: (id: string) =>
    `https://github.com/privacy-scaling-explorations/website-v2/blob/main/content/projects/${id}.md`,
  editBlogPage: (slug: string) =>
    `https://github.com/privacy-scaling-explorations/website-v2/blob/main/content/articles/${slug}.md`,
}
