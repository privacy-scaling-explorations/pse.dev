import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const trustedSetups: ProjectInterface = {
  id: "trusted-setups",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "trusted-setups.svg",
  name: "Trusted Setups",
  links: {
    github: "https://github.com/zkparty",
  },
  tags: {
    themes: ["play"],
    types: ["Legos/dev tools", "Lego sets/toolkits"],
    builtWith: [],
    keywords: ["Scaling", "Education"],
  },
}
