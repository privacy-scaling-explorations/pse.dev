import { NewsInterface } from "@/lib/types"

export const newsItems: NewsInterface[] = [
  {
    type: "post",
    title: "Learnings from the KZG Ceremony",
    action: {
      label: "Read",
      url: "https://mirror.xyz/privacy-scaling-explorations.eth/naTdx-u7kyirczTLSAnWwH6ZdedfTQu1yCWQj1m_n-E",
    },
  },
  {
    type: "learn",
    title: "Public events hosted by PSE members to learn about each other’s projects, share ideas, and get feedback.",
    action: {
      label: "See full schedule",
      url: "https://pse-team.notion.site/50dcf22c5191485e93406a902ae9e93b?v=453023f8227646dd949abc34a7a4a138&pvs=4",
    },
  },
  {
    type: "learn",
    title: "Folding Circom Circuit: A ZKML Case Study by Dr. Cathie So",
    action: {
      label: "Watch",
      url: "https://www.youtube.com/live/jb6HDEtY4CI",
    },
  },
]
