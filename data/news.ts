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
    title: "Revisiting Nova. How to handle cycles of curves within folding schemes by Wilson Nguyen. Aug/9, 16:00 UTC",
    action: {
      label: "See details",
      url: "https://discord.com/events/943612659163602974/1128713844987002984",
    },
  },
  {
    type: "learn",
    title: "Diving into Indexed Merkle Trees within ZK circuits by Sean Aztec. Aug/16, 12:00 UTC ",
    action: {
      label: "See details",
      url: "https://discord.gg/pse?event=1137001447679070318",
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
