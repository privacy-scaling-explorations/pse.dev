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
      "zkID is a dedicated team committed to advancing self-sovereign identity (SSI) technologies and driving privacy-focused solutions in the digital identity space, utilizing the PSE team's expertise in zero-knowledge technologies",
  },
}

export const zkID: ProjectInterface = {
  id: "zk-id",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.DEVTOOLS,
  section: "pse",
  content,
  image: "",
  imageAlt: "ZK Identity",
  name: "zkID",
  tags: {
    keywords: ["Identity", "Credentials", "Standards", "SSI"],
    themes: ["research"],
    types: ["Legos/dev tools", "Lego sets/toolkits"],
  },
}
