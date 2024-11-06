import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "Optimistic Rollup with zk-SNARKs for private Ethereum transactions.",
    description: `ZKOPRU is one of the initial projects of EF's PSE team. It is a Layer 2 scaling solution for Ethereum, emphasizing private transactions through zk-SNARKs and optimistic rollups. It provides an economical Ethereum privacy wallet, enabling users to transact with ETH, ERC-20s, and NFTs anonymously`,
  },
}

export const Zkopru: ProjectInterface = {
  id: "zkopru",
  image: "zkopru.svg",
  name: "ZKOPRU",
  projectStatus: ProjectStatus.INACTIVE,
  category: ProjectCategory.DEVTOOLS,
  section: "archived",
  content,
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
    keywords: ["anonymity/privacy", "private transactions"],
  },
}
