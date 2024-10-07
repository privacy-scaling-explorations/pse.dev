import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const zkevmCommunity: ProjectInterface = {
  id: "zkevm-community",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "zkevm.jpg",
  name: "zkEVM Community Edition",
  links: {
    github: "https://github.com/privacy-scaling-explorations/zkevm-circuits",
  },
  tags: {
    keywords: ["Scaling"],
    themes: ["build"],
    types: ["Infrastructure/protocol", "Lego sets/toolkits"],
    builtWith: ["halo2", "rust", "geth"],
  },
}
