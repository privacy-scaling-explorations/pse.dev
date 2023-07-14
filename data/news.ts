import { NewsInterface } from "@/lib/types"

export const newsItems: NewsInterface[] = [
  {
    type: "learn",
    title: "Diving into Plonk accumulation via aPlonk by Ralph Toledo",
    action: {
      label: "Watch",
      url: "https://www.youtube.com/live/hRXgf6T2yb8",
    },
  },
  {
    type: "post",
    title: " Learnings from the KZG Ceremony",
    action: {
      label: "Read",
      url: "https://mirror.xyz/privacy-scaling-explorations.eth/naTdx-u7kyirczTLSAnWwH6ZdedfTQu1yCWQj1m_n-E",
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
  {
    type: "event",
    title: "PSE@ETHGlobal Paris",
    action: {
      label: "Attend",
      url: "https://ethglobal.com/events/paris2023",
    },
  },
] 
