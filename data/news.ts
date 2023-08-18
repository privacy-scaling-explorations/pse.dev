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
    title: "Private markets on Ethereum - 0xPARC Piere. August 23, 2023 14:00 (UTC)",
    action: {
      label: "See details",
      url: "https://discord.com/events/943612659163602974/1139573494372388914",
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
