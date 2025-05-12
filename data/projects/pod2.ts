import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "The second generation of cryptographic PODs: Provable Data Objects",
    description: `
POD2 is the next iteration of the Provable Object Datatype (POD).  This new iteration introduces arbitrary computation on data via custom predicates, recursion and interoperability with other data provenance cryptographic tools.  

This is a 0xPARC project that PSE is collaborating on.
`,
  },
}

export const pod2: ProjectInterface = {
  id: "pod2",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.DEVTOOLS,
  section: "collaboration",
  content,
  image: "pod.webp",
  name: "POD2",
  links: {
    github: "https://github.com/0xPARC/pod2",
    website: "https://pod.org",
    telegram: "https://t.me/zupass"
  },
  team: [
    {
      name: "Edu",
      image: "/avatars/edu.jpeg",
      links: {
        github: "https://github.com/ed255",
      },
    },
  ],
  tags: {
    keywords: [
      "anonymity/privacy",
      "data portability",
      "social",
      "identity",
      "toolkits",
    ],
    builtWith: ["Rust", "Plonky2", "Groth16", "Typescript"],
    themes: ["build", "research"],
  },
  extraLinks: {
    buildWith: [
      {
        label: "PODify your proofs",
        url: "https://pod.org/pod/introduction"
      },
      {
        label: "Config-driven proofs",
        url: "https://pod.org/gpc/introduction"
      },
      {
        label: "Create and consume PODs in your web app",
        url: "https://pod.org/z-api/introduction"
      },
      {
        label: "POD book (evolving)",
        url: "https://0xparc.github.io/pod2/introduction.html"
      },
    ],
    research: [
      {
        label: "State of POD R&D",
        url: "https://github.com/0xPARC/pod2/milestones",
      },
      {
        label: "Ideation on a logic VM for PODs",
        url: "https://hackmd.io/@gubsheep/r1zxZGpQke",
      },
    ],
  },
}
