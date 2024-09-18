export type SiteConfig = typeof siteConfig

export const siteConfig = {
  showLanguageSwitcher: true, // enable when we have more languages
  showOnlyEnabledLanguages: true, // enable to show only enabled languages
  name: "Privacy & Scaling Explorations",
  description:
    "Enhancing Ethereum through cryptographic research and collective experimentation.",
  links: {
    twitter: "https://twitter.com/privacyscaling",
    github: "https://github.com/privacy-scaling-explorations",
    docs: "https://ui.shadcn.com",
    discord: "https://discord.com/invite/sF5CT5rzrR",
    articles: "https://mirror.xyz/privacy-scaling-explorations.eth",
    youtube: "https://www.youtube.com/@privacyscalingexplorations",
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
    "https://github.com/privacy-scaling-explorations/website-v2/blob/main/app/%5Blang%5D/content/resources.md",
  editProjectPage: (id: string, locale = "en") =>
    `https://github.com/privacy-scaling-explorations/pse.dev/blob/main/app/i18n/locales/${locale}/projects/${id}.json`,
}
