import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const Zkopru: ProjectInterface = {
  id: "zkopru",
  section: "pse",
  image: "zkopru.svg",
  name: "ZKOPRU",
  projectStatus: ProjectStatus.INACTIVE,
  links: {
    website: "https://zkopru.network/",
    github: "https://github.com/zkopru-network",
    youtube: "https://www.youtube.com/watch?v=GvRsJxu9X6w",
  },
  extraLinks: {
    learn: [
      {
        label: "ZKOPRU: Wat, Y & Wen",
        url: "https://mirror.xyz/privacy-scaling-explorations.eth/kfuuBPtGtDjl_J2wBq-jrtyURGLmQpUhZfDTuZChEy8",
      },
      {
        label: "ZKOPRU on Testnet",
        url: "https://mirror.xyz/privacy-scaling-explorations.eth/EB0KcMY0k9ucN8iQSBeOYksoupDYRBQ4ZffhRt477FE",
      },
    ],
  },
  tags: {
    keywords: ["anonymity", "private transactions"],
  },
}
