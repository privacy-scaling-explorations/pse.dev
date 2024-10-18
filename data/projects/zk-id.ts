import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const zkID: ProjectInterface = {
  id: "zk-id",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "",
  imageAlt: "ZK Identity Explorations",
  name: "ZK-ID",
  tags: {
    keywords: ["Identity", "Credentials", "Standards", "SSI"],
    themes: ["research"],
    types: ["Legos/dev tools", "Lego sets/toolkits"],
  },
}
