import GithubIcon from "@/public/social-medias/github-fill.svg"
import GlobeIcon from "@/public/social-medias/global-line.svg"

import { ProjectInterface, ProjectLinkType } from "@/lib/types"

import { anonAadhaar } from "./projects/anon-aadhaar"
import { anonKlub } from "./projects/anon-klub"
import { bandada } from "./projects/bandada"
import { channel4 } from "./projects/channel-4"
import { Coco } from "./projects/coco"
import { cryptkeeper } from "./projects/cryptkeeper"
import { discreetly } from "./projects/discreetly"
import { dslWorkingGroup } from "./projects/dsl-working-group"
import { ECIPHalo2 } from "./projects/ecip-halo2"
import { eigenTrust } from "./projects/eigen-trust"
import { Interep } from "./projects/interep"
import { jubmoji } from "./projects/jubmoji"
import { maci } from "./projects/maci"
import { nfctap } from "./projects/nfctap"
import { p0tion } from "./projects/p0tion"
import { p256 } from "./projects/p256"
import { pollenLabs } from "./projects/pollen-labs"
import { PerpetualPowersOfTau } from "./projects/powers-of-tau"
import { pseSecurity } from "./projects/pse-security"
import { rln } from "./projects/rln"
import { semaphore } from "./projects/semaphore"
import { summa } from "./projects/summa"
import { tlsn } from "./projects/tlsn"
import { trustedSetups } from "./projects/trusted-setups"
import { unirepProtocol } from "./projects/unirep-protocol"
import { voicedeck } from "./projects/voice-deck"
import { wax } from "./projects/wax"
import { zk3 } from "./projects/zk3"
import { ZKKit } from "./projects/zk-kit"
import { zkevmCommunity } from "./projects/zkevm-community"
import { zkitter } from "./projects/zkitter"
import { zkml } from "./projects/zkml"
import { Zkopru } from "./projects/zkopru"
import { zkp2p } from "./projects/zkp2p"

export const ProjectLinkIconMap: ProjectLinkType = {
  github: GithubIcon,
  website: GlobeIcon,
}
/**
 * List of Projects
 *
 * Every 'description' props supports markdown syntax https://www.markdownguide.org/basic-syntax/
 */
export const projects: ProjectInterface[] = [
  rln,
  zkitter,
  maci,
  wax,
  discreetly,
  cryptkeeper,
  semaphore,
  pseSecurity,
  zkevmCommunity,
  bandada,
  dslWorkingGroup,
  zkml,
  trustedSetups,
  tlsn,
  eigenTrust,
  anonKlub,
  summa,
  anonAadhaar,
  channel4,
  pollenLabs,
  unirepProtocol,
  PerpetualPowersOfTau,
  ECIPHalo2,
  Coco,
  Interep,
  Zkopru,
  ZKKit,
  p256,
  p0tion,
  jubmoji,
  nfctap,
  zkp2p,
  zk3,
  voicedeck,
]
