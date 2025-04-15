---
authors: ["PSE Team"]
title: "ZKOPRU on Testnet - Privacy & Scaling Explorations"
image: null
tldr: "Exciting news! ZKOPRU is now live on the Görli testnet. We show you how to use it."
date: "2022-08-26"
canonical: "https://mirror.xyz/privacy-scaling-explorations.eth/EB0KcMY0k9ucN8iQSBeOYksoupDYRBQ4ZffhRt477FE"
---

Originally published on Nov 30, 2021:

![](https://miro.medium.com/max/1202/1*OnPLo16BKCepMHTi_CS_vg.png)

## Intro

After many months of hard work we are excited to announce ZKOPRU is live on the Görli testnet 🎊. You can find the ZKOPRU contracts deployed on Görli [here](https://goerli.etherscan.io/address/0x48458c823df628f0c053b0786d4111529b9fb7b0) and the wallet UI [here](https://wallet.zkopru.network/). We will walk you through the process of depositing assets from Görli to ZKOPRU, making a private transfer on ZKOPRU and withdrawing assets from ZKOPRU to Görli. If you are building a wallet or rollup, check out the UI Research section below to find the user acceptance testing results and analysis.

## ZKOPRU tl;dr

We’ll give a very quick overview here, but if you don’t know what ZKOPRU is or need a reminder, we highly recommend reading our previous post [ZKOPRU Wat Y & Wen](https://medium.com/privacy-scaling-explorations/ZKOPRU-wat-y-wen-f5026903cf39) before trying out the wallet.

ZKOPRU is an [optimistic rollup](https://ethereum.org/en/developers/docs/scaling/layer-2-rollups/#optimistic-rollups) that uses zero knowledge proofs to make individual transfers private. Similar to Ethereum’s miners or validators, rollups have coordinators that receive transactions, calculate the new state and submit data to Ethereum.

ZKOPRU currently supports deposit, transfer and withdrawal of ETH and ERC-20 tokens (NFTs coming soon™). For the most part these functions work similarly to their layer 1 counterparts, but there are a few key differences from what you might be used to:

- Although the initial deposit to your ZKOPRU wallet will be visible as a transaction on Ethereum, any subsequent transactions will only be visible to you and the recipient.
- Rollups commit only small amounts of data to the main chain, and coordinators can submit transactions in batches, so the price per transaction is drastically lower.
- ZKOPRU allows you to deposit multiple assets (ETH and another token) at the same time.
- ZKOPRU addresses are \*not\* the same as Ethereum addresses. When you need to receive assets to your ZKOPRU account, you’ll use a ZKOPRU address generated from your connected Ethereum address.
- Rollups have a 7 day delay for withdrawals back to the main chain (we’re working on an instant withdrawal mechanism so users can get around this delay).

## How to use ZKOPRU

## Setup

To get started with ZKOPRU, you’ll need the Metamask plugin. Since it’s still on testnet you’ll also need some GörliETH, which you can get from the [Görli Faucet](https://faucet.goerli.mudit.blog/) or the [Paradigm MultiFaucet](https://faucet.paradigm.xyz/).

> Please note that from here on, when we say ETH we are referring to GörliETH. Don’t send mainnet ETH to your ZKOPRU wallet yet!

Once you’ve got your ETH, make sure MetaMask is connected to the Görli testnet and head to the ZKOPRU [wallet](https://zkopru.network/).

You’ll need to connect an Ethereum account using MetaMask. Select the account you want to use and click _Next_, then _Connect_. You’ll see a popup asking your permission to sync — the ZKOPRU wallet runs a client in the browser which needs to sync with the ZKOPRU network. MetaMask will prompt you to sign to unlock your ZKOPRU account and start the sync.

![](https://miro.medium.com/max/1400/0*TWLX-_TdNK0uWoR-)

Syncing Zkopru

The sync process could take a few minutes. Wait until the bottom left shows \*Fully synced 100%. \*If the site is blurred, double check if Metamask is connected to Görli. If you weren’t connected to Görli you may need to refresh the page in order to start the sync.

![](https://miro.medium.com/max/1400/1*bG__U_qysCQ9xBqgrE2FtQ.png)

ZKOPRU main page

## Deposit

In order to start transacting on ZKOPRU, you’ll need to deposit your ETH from Görli into ZKOPRU On the left side of the main page, click _Deposit_. You’ll see options to deposit ETH, ERC20s or both at the same time. The deposit transaction will require some ETH for the L1 transfer and an additional fee for the coordinator. We recommend you deposit at least 0.01ETH — you’ll also need it to pay coordinator fees for any ZKOPRU transactions. After confirming your transaction in MetaMask, head to the _History_ tab to check the deposit status.

![](https://miro.medium.com/max/1400/1*LY_SezdWuD4vTCsZaOYIkw.png)

Depositing

## Transfer (Send & Receive)

In order to make a private transfer on ZKOPRU, go to _Send,_ on the main page, enter the recipient address, select the asset and amount you want to send and enter the fee for the coordinator. Remember that the recipient’s ZKOPRU address is different from the Ethereum address — the recipient can generate it by clicking _Receive_ on the ZKOPRU main page, then copy it to send to you.

![](https://miro.medium.com/max/1400/0*34CuL1JkOPxxBuYx)

ZKOPRU Address

![](https://miro.medium.com/max/1400/1*JTChF3QmNF6UTWZO42CHew.png)

Transfer

After hitting S*end*, your transaction is relayed to the coordinator. The actual transfer can take a while if there is not a lot of activity on the network, because the coordinator has to accumulate enough transactions that the combined fees will cover the cost of submitting a batch. Since GörliETH is free you can splash it a bit and use a 2500Gwei transaction fee to help the poor coordinator submit the batch right away. We are building an instant finality mechanism to make that faster in the future :).

After the transfer you will see something like this in the _My Wallet_ section:

![](https://miro.medium.com/max/634/0*Vz3tHJi4T7GddChn)

This means that your available balance is currently locked until the transfer succeeds. ZKOPRU, like Bitcoin, uses the UTXO model and you can see your notes’ info by hovering over the “\*i” \*next to your balance.

## Withdraw

If you want your assets back on Görli, you’ll need to withdraw them from ZKOPRU. Head to _Withdraw_ on the main page, select the asset you want to withdraw and enter the amount as well as the fee for the coordinator. The withdrawal will be initiated once the coordinator has enough transactions lined up to make submission of the batch economical (this can be a few hours).

Unlike a transfer, you won’t be able to meaningfully speed up the withdrawal via a higher transaction fee. ZKOPRU, like other optimistic rollups, requires a 7 day delay period for withdrawals. So even if you pay enough to incentivize the coordinator to submit the batch a few minutes sooner, you’ll still have to wait 7 days for your assets to be available. This delay serves an important security function, but it’s a UX annoyance — we’re also working on an instant withdrawal mechanism so you’ll have options to get around the withdrawal delay in the future.

![](https://miro.medium.com/max/1400/0*Jdkh8xVV1w2s3TjF)

## UI Research

Rachel, our awesome designer, has conducted user acceptance testing with users who don’t work in crypto. Users with varying levels of crypto knowledge were asked to complete tasks like adding and withdrawing assets, and describe their experience and impressions. It was especially interesting to hear our users’ first reactions to features we’re excited about, like multi-asset deposits — a good reminder that a new feature is also a new experience for a user, and it’s our job to get them oriented so they can be as excited about it as we are.

You can find the report [here](https://github.com/zkopru-network/resources/tree/main/ui-ux/wallet). We hope it will be useful for others working on similar design challenges!

## Conclusion

ZKOPRU is on testnet! Now [go ahead and make some GörliETH private](https://zkopru.network/wallet). If everything goes smoothly for a few weeks on testnet, we will cut an official release. Stay tuned for the next post, where we will explain more details on how to run a coordinator and how ZKOPRU can be deployed to mainnet. If you are interested in learning more about ZKOPRU check out our [Twitter](https://twitter.com/zkoprunetwork), [Medium](https://medium.com/privacy-scaling-explorations) and [documentation](https://docs.zkopru.network/). Join our brand new [Discord](http://discord.gg/vchXmtWK5Z) and please report any bugs and issues there.

Contributors are welcome — see our [good first issues](https://github.com/zkopru-network/zkopru/labels/good%20first%20issue) on Github.
