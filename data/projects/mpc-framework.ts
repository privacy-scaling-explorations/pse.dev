import { ProjectCategory, ProjectInterface, ProjectStatus } from "@/lib/types"

export const mpcFramework: ProjectInterface = {
  id: "mpc-framework",
  image: "",
  name: "MPC Framework",
  category: ProjectCategory.DEVTOOLS,
  license: "MIT",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  links: {
    github: "https://github.com/voltrevo/mpc-framework",
    // website: "https://mpc.pse.dev/",
  },
  content: {
    en: {
      tldr: "Create secure MPC apps easily in TypeScript.",
      description: `
## Quick Start

MPC Framework supports the web. Try the [hello world](https://voltrevo.github.io/mpc-hello/) app here.

## Overview

To make an MPC app you need three things:

**1) Backend**
- Implements the underlying cryptography.

**2) Circuit Generator**
- The shared computation needs to be specified as a circuit, and you need something to generate
that. This is similar to using a compiler to get programs to run on your machine.

**3) Messaging with each Party**
- Send and receive bytes.

MPC Framework brings these pieces together in a straightforward TypeScript API to make MPC
application development easy.

It includes multiple officially supported components for (1) and (2), templates that include (3),
and is designed to accommodate new solutions for each component.

The main solution for (2) is [Summon](https://github.com/voltrevo/summon), which is a TypeScript-like
language for generating circuits.

## What is MPC?

MPC stands for _Multi-Party Computation_. In regular computation, all inputs,
outputs, and intermediate calculations are necessarily visible on the device
performing the computation. MPC, by contrast, allows multiple devices to
collaborate on a computation while keeping intermediate calculations and others'
inputs private.

Here's some ways that can be useful:

- Provide analysis on patient data to researchers without revealing the patient data
- Play [Rock Paper Scissors Lizard Spock](https://voltrevo.github.io/mpc-lizard-spock/) while keeping your move secret
- Hold an auction while keeping the bids secret (only the winning bidder and price is revealed)
- [Match employers and job-seekers that each have hidden criteria](https://github.com/cursive-team/pz-hiring)
- Arrange optimal asset swaps (eg sports players / trading cards / corporate assets / NFTs) using hidden valuations
- Find out if you qualify for an insurance policy without sharing your health data and without requiring the insurer to reveal the policy requirements
- Quantify how much you have in common with someone and then figure out the commonalities together (or choose not to)
- Create an embarassing songs playlist for a party where each song is liked by >=N people

For a bit more of an introduction to MPC, see Barry Whitehat's talk
[2PC is for Lovers](https://www.youtube.com/watch?v=PzcDqegGoKI). The
lovers' app described in the talk has been implemented using mpc-framework
[here](https://voltrevo.github.io/2pc-is-for-lovers/).

For a more technical introduction, see [Computerphile's video on Garbled Circuits](https://www.youtube.com/watch?v=FMZ-HARN0gI). For a deeper dive: [Pragmatic MPC](https://securecomputation.org/).
        `,
    },
  },
  tags: {
    keywords: ['MPC', 'TypeScript'],
    themes: [],
    types: [],
    builtWith: [],
  },
  extraLinks: {
    play: [
      {
        label: "Try it out: Hello world in MPC",
        url: "https://voltrevo.github.io/mpc-hello/",
      },
    ],
  },
}
