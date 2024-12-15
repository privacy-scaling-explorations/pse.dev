import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "Exploration of languages for writing zk circuits",
    description: `The DSL Working Group is focused on the exploration and improvement of languages used to write zero-knowledge circuits. The group's primary goal is to enhance the state of zk circuit languages, making them easier to write and review by offering the right abstractions. They also aim to make it harder to write unsound circuits by implementing static analysis and enforcing safer patterns. Additionally, they are working to support next-generation (Incrementally Verifiable Computation or IVC) proving systems. The group is currently working on Chiquito, a high-level Domain-Specific Language (DSL) for Halo2 circuits that lowers the entry barrier to write zk circuits with a state-machine abstraction API.`,
  },
}

export const dslWorkingGroup: ProjectInterface = {
  id: "dsl-working-group",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.RESEARCH,
  section: "pse",
  content,
  image: "",
  imageAlt: "DSL Working Group",
  name: "DSL Working Group",
  links: {
    github: "https://github.com/privacy-scaling-explorations/chiquito/",
  },
  tags: {
    types: ["Legos/dev tools", "Proof of concept", "Developer tooling"],
    keywords: [],
    themes: ["research"],
    builtWith: [],
  },
}
