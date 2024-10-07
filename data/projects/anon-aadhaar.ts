import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const anonAadhaar: ProjectInterface = {
  id: "anon-aadhaar",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "anon-aadhaar.svg",
  name: "Anon Aadhaar",
  links: {
    website: "https://anon-aadhaar.pse.dev/",
    github: "https://github.com/privacy-scaling-explorations/anon-aadhaar",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Social", "Identity", "Voting/governance"],
    themes: ["build", "play"],
    types: ["Legos/dev tools", "Lego sets/toolkits", "Proof of concept"],
    builtWith: ["circom", "rsa"],
  },
}
