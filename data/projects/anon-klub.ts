import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const anonKlub: ProjectInterface = {
  id: "anon-klub",
  section: "pse",
  projectStatus: ProjectStatus.INACTIVE,
  image: "anonklub.svg",
  name: "AnonKlub",
  links: {
    github: "https://github.com/anonklub",
    website: "https://anonklub.github.io",
  },
  tags: {
    keywords: [
      "Transaction privacy",
      "Anonymity/privacy",
      "Social",
      "Identity",
      "Voting/governance",
    ],
    themes: ["build", "play"],
    types: ["Infrastructure/protocol", "Prototype", "Proof of concept"],
    builtWith: ["circom", "snarkjs", "halo2"],
  },
}
