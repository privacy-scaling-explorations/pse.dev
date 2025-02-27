import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "The second generation of the cryptographic Provable Data format from 0xPARC.",
    description: `
POD2 is the next iteration of the Provable Object Datatype (POD).  This new iteration introduces arbitrary computation on data via custom predicates, recursion and interoperability with other data provinance cryptographic tools.  This is a 0xPARC project that PSE is collaborating on.
`,
  },
}

export const nfctap: ProjectInterface = {
  id: "pod2",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.DEVTOOLS,
  section: "collaboration",
  content,
  image: "",
  name: "POD2",
  links: {
    github: "https://github.com/0xPARC/pod2",
    website: "https://0xparc.github.io/pod2/",
  },
  tags: {
    keywords: [
      "anonymity/privacy",
      "data portability",
      "social",
      "identity",
      "toolkits",
    ],
    builtWith: [],
    themes: ["build", "play"],
  },
}
