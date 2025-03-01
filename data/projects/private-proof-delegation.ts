import {
    ProjectCategory,
    ProjectContent,
    ProjectInterface,
    ProjectStatus,
  } from "@/lib/types"

const content: ProjectContent = {
    en: {
        tldr: "Private proof delegation",
        description: `
Private Proof Delegation (PPD) involes the generation of a Zero-Knowledge Proof (ZKP) in a delegating manner, i.e. a client interacts with a server or a set of servers and together they generate a ZKP that testifies the correctness of a chosen statement by the client (with the private witness held by the client) that is (1) publicly verifiable by any party not participating in the proof generation procedure, and (2) the client will still withhold the secrecy of their witness.
See more details [here](https://hackmd.io/qdYZCxweQmix8ezdh7l-Aw?view).`,
    }
}

export const privateProofDelegation: ProjectInterface = {
    id: "private-proof-delegation",
    category: ProjectCategory.RESEARCH,
    projectStatus: ProjectStatus.ACTIVE,
    section: "pse",
    content,
    image: "",
    imageAlt: "Private proof delegation",
    name: "Private proof delegation",
    links: {
        website: "https://hackmd.io/qdYZCxweQmix8ezdh7l-Aw?view",
        github: "https://github.com/privacy-scaling-explorations/private-proof-delegation-docs",
      },
    tags: {
        keywords: ["fhe", "zkp", "tee"],
        themes: ["research"],
    },
}