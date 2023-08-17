import { ProjectInterface } from "@/lib/types"

const description = `
The DSL Working Group is focused on the exploration and improvement of languages used to write zero-knowledge circuits. The group's primary goal is to enhance the state of zk circuit languages, making them easier to write and review by offering the right abstractions. They also aim to make it harder to write unsound circuits by implementing static analysis and enforcing safer patterns. Additionally, they are working to support next-generation (Incrementally Verifiable Computation or IVC) proving systems. The group is currently working on Chiquito, a high-level Domain-Specific Language (DSL) for Halo2 circuits that lowers the entry barrier to write zk circuits with a state-machine abstraction API.
`

export const dslWorkingGroup: ProjectInterface = {
  id: "dsl-working-group",
  projectStatus: "active",
  image: "",
  name: "DSL Working Group",
  tldr: "Exploration of languages for writing zk circuits",
  description,
  links: {
    github: "https://github.com/privacy-scaling-explorations/chiquito/",
  },
  tags: {
    type: ["research"],
    keywords: [],
    themes: [],
    builtWith: [],
  },
}
