---
authors: ["Alessandro", "Chao"]
title: "Announcing MACI v1.1.1"
image: ""
tldr: "This post was authored by [Alessandro](https://github.com/ctrlc03) and [Chao](https://github.com/chaosma)"
date: "2023-01-18"
canonical: "https://mirror.xyz/privacy-scaling-explorations.eth/ltCt68hslI5jmMf1AnfkrP2eUwkeZ8_fgkHc_WyD9Nc"
tags:
  [
    "maci",
    "zero-knowledge proofs",
    "privacy",
    "voting/governance",
    "collusion resistance",
    "ethereum",
    "security",
    "quadratic funding",
    "public goods",
    "infrastructure/protocol",
  ]
projects: ["maci"]
---

We are pleased to announce the release of an updated version of MACI - Minimal Anti-Collusion Infrastructure v1.1.1.

This new release brings a more secure product, new features, and a much needed documentation refresh. Before we dive into the updates, let's refresh your memory on what MACI is and what it was created to achieve.

## Background

MACI is an application that provides collusion resistance for on-chain voting processes. It was originally created after Vitalik's [post](https://ethresear.ch/t/minimal-anti-collusion-infrastructure/5413), and has since been revisited and improved.

MACI revolves around the need for a trusted coordinator. The coordinator is in charge of setting up the system, publishing its public key, and computing the tally of the votes. Below are the main properties of MACI:

![](/articles/announcing-maci-v111/9GxuqUkAqCpsIiIRaFe7x.webp)

Since its inception, MACI has been adopted by different projects, most notably [clr.fund](https://github.com/clrfund) and [QFI](https://github.com/quadratic-funding/qfi/tree/feat/code-freeze). These projects prove how effective MACI can be, especially when integrated with applications that are otherwise prone to collusion, such as funding Public Goods.

For a more detailed description of MACI, please refer to the [v1 technical introduction article](https://medium.com/privacy-scaling-explorations/a-technical-introduction-to-maci-1-0-db95c3a9439a).

## Security Audit

MACI was [audited](https://github.com/privacy-scaling-explorations/maci/blob/v1/audit/202220930_Hashcloak_audit_report.pdf) by HashCloack in the summer of 2022. The audit team discovered certain high risk vulnerabilities, whose fixes were the focus of the MACI team in the past months.

In more details, the audit revealed two high risk issues within the zk-SNARK circuits:

- Incomplete validation when processing messages
- Integer overflow which could have allowed users to affect a coordinator's effort of calculating the subsidy by either making it incorrect or by intercepting the calculation

Another notable security issue was the lack of initialization of the `AccQueue` contract. This contract is used to store messages (votes or topups) for the different polls. Without inserting a zero value hash into the merkle tree contract as the first message during initialization, a malicious user could have performed a denial of service attack on a poll. This could have resulted in the poll results taking a very long time before being tallied by the coordinator.

All of these issues have been successfully resolved, on top of fixing minor issues and general code optimizations. The updated product uses a more up to date and secure version of Solidity, and more thorough test cases to verify the correctness of the solution.

## New Features

The following sections provide a quick introduction to the newest features introduced in MACI's codebase.

![](/articles/announcing-maci-v111/Gfn-Vu6lKKsJ750LQIXxA.webp)

### Top Up Credit

Rather than requiring a user to sign up multiple times, it is now possible to top up voice credits by sending a top up message on the Poll contract. Withdrawals are not enabled as this would allow a malicious user to bribe others offline to transfer their keys.

Now, the Poll contract will hold all the funds deposited from users for the current poll. At the end of a poll, the coordinator can transfer the funds to a hardcoded address which can be used to fund public goods.

When a user deposits tokens by calling topup, they will also need to specify the stateTree index. The topup function will insert a topup message into the message queue for them. When the voting period ends, any call of topup function will be rejected. Both voting and topup messages have the same ending time, which ensures there is a well-defined ending state for each poll.

Please note that in this approach, the initial credit is still shared across multiple polls, and the actual credit an user can spend in a given poll is the following: `totalCredit=initialCredit+topupCredit` where the `topupCredit` is the voice credit amount deposited by the user during the voting period of the given pollID.

For a detailed description, please refer to this [document.](https://hackmd.io/@chaosma/rkyPfI7Iq)

### Pairwise Subsidy

Pairwise subsidy is a new way to reduce collusion in quadratic funding applications. If two contributors with access to enough collude with each other, they can extract most of the public funding pool if they have enough funds.

In this [post](https://ethresear.ch/t/pairwise-coordination-subsidies-a-new-quadratic-funding-design/5553), Vitalik introduced this kind of collusion and also proposed a protocol to penalize this behavior. As a generalized solution, the more correlation between contributions, the smaller subsidy should be allocated to this project, as this reduces the risk of collusion between contributors. It should be noted that this solution assumes that an identity system is in place to prevent the same entity from registering with two different identities.

Please refer to this [post](https://hackmd.io/@chaosma/H1_9xmT2K) for a more detailed explanation of the implementation.

Finally, please note that currently it is not possible to generate the `zkeys` for the subsidy circuit with the `vote options` parameter larger than 5252. This issue is documented [here](https://github.com/privacy-scaling-explorations/maci/issues/584) and the team will focus on finding a solution to be able to support larger vote options.

### Coordinator Service

MACI now includes a sample [coordinator service](https://github.com/privacy-scaling-explorations/maci/tree/v1/server).

There are two roles in the coordinator service: admin (i.e. MACI coordinator) and user (i.e. a voter). The admin's responsibility is to ensure that the code remains updated and that the backend services are live. The user can then simply send HTTP requests to the backend server to interact with MACI, for instance, by signing up and publishing a message on chain.

The coordinator service has been wrapped into two docker instances: one for the backend server to accept user requests; one for the Mongodb service to store all necessary information on the current state such as smart contract addresses, zero knowledge proof keys and so on.

For further reading on coordinator services, please refer to this [doc](https://hackmd.io/@chaosma/SJtsfzKnF).

## How to use MACI

MACI can be used as a standalone application to carry out on-chain polls, or be implemented into new projects that can then benefit from its properties.

For use as a standalone application, a `cli` package is provided which allows coordinators and voters to use MACI. Please refer to this [doc](https://privacy-scaling-explorations.github.io/maci/cli.html) for details on how to use it.

To implement MACI into a project, the [documentation](https://privacy-scaling-explorations.github.io/maci/) can be used a reference, as well as reviewing how [clr.fund](https://github.com/clrfund) and [qfi](https://github.com/quadratic-funding/qfi/tree/feat/code-freeze) use MACI in their code.

## MACI 0.x

MACI version 0.x will be discontinued. MACI 1.x has feature parity, more robust code and newest features. Users are encouraged to use the latest version. Starting February 7th 2023, the team will focus solely on resolving issues for MACI 1.x, and will cease to provide support for version 0.x.

## How to get involved

Should you wish to get involved with MACI or simply report a bug, feel free to visit the [repository](https://github.com/privacy-scaling-explorations/maci/tree/v1) and open an issue, or comment under an open issue to notify the team of your intention to work on it.

For any other enquiry, please reach out to us via the Privacy Stewards of Ethereums (PSE) [Discord](https://discord.gg/bTdZfpc69U).

## References

- [MACI GitHub repository](https://github.com/privacy-scaling-explorations/maci/tree/v1)
- [A technical introduction to MACI 1.0 - Kyle Charbonnet](https://medium.com/privacy-scaling-explorations/a-technical-introduction-to-maci-1-0-db95c3a9439a)
- [Minimal anti-collusion infrastructure - Vitalik](https://ethresear.ch/t/minimal-anti-collusion-infrastructure/5413)
- [Pairwise Subsidy](https://ethresear.ch/t/pairwise-coordination-subsidies-a-new-quadratic-funding-design/5553)
- [Security Audit](https://github.com/privacy-scaling-explorations/maci/blob/v1/audit/202220930_Hashcloak_audit_report.pdf)

## Release

Here is a link to the new release code in GitHub - [v1.1.1 Release](https://github.com/privacy-scaling-explorations/maci/releases/tag/v1.1.1).
