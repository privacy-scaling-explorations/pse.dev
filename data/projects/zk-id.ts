import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "Fostering SSI with zero-knowledge and privacy-driven solutions.",
    description:
      "ZK-ID is a dedicated team committed to advancing self-sovereign identity (SSI) technologies and driving privacy-focused solutions in the digital identity space, utilizing the PSE team's expertise in zero-knowledge technologies",
  },
}

export const zkID: ProjectInterface = {
  id: "zk-id",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.RESEARCH,
  section: "pse",
  content,
  image: "",
  imageAlt: "ZK Identity Explorations",
  name: "ZK-ID",
  tags: {
    keywords: ["Identity", "Credentials", "Standards", "SSI"],
    themes: ["research"],
    types: ["Legos/dev tools", "Lego sets/toolkits"],
  },
}
