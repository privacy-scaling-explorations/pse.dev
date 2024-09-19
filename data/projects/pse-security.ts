import { ProjectInterface } from "@/lib/types"

export const pseSecurity: ProjectInterface = {
  id: "pse-security",
  section: "pse",
  projectStatus: "active",
  image: "pse-security.png",
  name: "PSE Security",
  links: {
    github: "https://github.com/privacy-scaling-explorations/security",
  },
  tags: {
    keywords: [
      "Anonymity/privacy",
      "Education",
      "Key management",
      "Scaling",
      "Security",
    ],
    themes: ["build"],
    types: ["Legos/dev tools"],
    builtWith: ["slither", "ecne", "circomspect", "echidna"],
  },
}
