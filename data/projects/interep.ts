import { ProjectInterface } from "@/lib/types";

export const Interep: ProjectInterface = {
    id: "interep",
    image: "interep.svg",
    name: "Interep",
    tldr: "An identity bridge from web2 to web3",
    description: "Interep aims to provide an identity solution for Ethereum users by bridging from an established digital identity source such as Reddit, Twitter, and Github. The product provides an identity layer in the application stack and uses the Semaphore framework to ensure privacy. Interep allows users to establish sybil-resistant decentralized identities on web3 without starting from scratch. By leveraging zero-knowledge proofs, Interep ensures only essential information is disclosed.",
    projectStatus: 'archived',
    links: {
        website: 'https://docs.interep.link/',
        github: 'https://github.com/interep-project',
        youtube: 'https://www.youtube.com/watch?v=dYKgHkb_aqk',
    },
    extraLinks: {
        learn: [{
            label: 'Interep: An on-ramp for reputation',
            url: 'https://mirror.xyz/privacy-scaling-explorations.eth/w7zCHj0xoxIfhoJIxI-ZeYIXwvNatP1t4w0TsqSIBe4'
        }],
    },
}
