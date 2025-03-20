import { ProjectInterface } from '@/lib/types'

import { anonAadhaar } from './projects/anon-aadhaar'
import { anonKlub } from './projects/anon-klub'
import { bandada } from './projects/bandada'
import { channel4 } from './projects/channel-4'
import { chiquito } from './projects/chiquito'
import { Coco } from './projects/coco'
import { cryptkeeper } from './projects/cryptkeeper'
import { discreetly } from './projects/discreetly'
import { dslWorkingGroup } from './projects/dsl-working-group'
import { ECIPHalo2 } from './projects/ecip-halo2'
import { eigenTrust } from './projects/eigen-trust'
import { excubiae } from './projects/excubiae'
import { pse_halo2 } from './projects/pse-halo2'
import { Interep } from './projects/interep'
import { jubmoji } from './projects/jubmoji'
import { maci } from './projects/maci'
import { maciPlatform } from './projects/maci-platform'
import { mopro } from './projects/mopro'
import { circomMpc } from './projects/circom-mpc'
import { mpcStats } from './projects/mpc-stats'
import { nfctap } from './projects/cursive'
import { OpenPassport } from './projects/openpassport'
import { p0tion } from './projects/p0tion'
import { p256 } from './projects/p256'
import { pollenLabs } from './projects/pollen-labs'
import { PerpetualPowersOfTau } from './projects/powers-of-tau'
import { pseSecurity } from './projects/pse-security'
import { publiclyVerifiableGarbledCircuit } from './projects/publicly-verifiable-garbled-circuit'
import { rln } from './projects/rln'
import { semaphore } from './projects/semaphore'
import { sonobe } from './projects/sonobe'
import { summa } from './projects/summa'
import { tlsn } from './projects/tlsn'
import { trustedSetups } from './projects/trusted-setups'
import { unirepProtocol } from './projects/unirep-protocol'
import { voicedeck } from './projects/voice-deck'
import { wax } from './projects/wax'
import { zkemail } from './projects/zk-email'
import { zkID } from './projects/zk-id'
import { ZKKit } from './projects/zk-kit'
import { zkevmCommunity } from './projects/zkevm-community'
import { zkitter } from './projects/zkitter'
import { zkml } from './projects/zkml'
import { Zkopru } from './projects/zkopru'
import { zkp2p } from './projects/zkp2p'
import { mpcFramework } from './projects/mpc-framework'
import { privateProofDelegation } from './projects/private-proof-delegation'
import { pod2 } from './projects/pod2'
import { postQuantumCryptography } from './projects/post-quantum-cryptography'
import { machinaIo } from './projects/machina-iO'
import { plasmaFold } from './projects/plasma_fold'
import { vOPRF } from './projects/vOPRF'

/**
 * List of Projects
 *
 * Every 'description' props supports markdown syntax https://www.markdownguide.org/basic-syntax/
 */
export const projects: ProjectInterface[] = [
  pse_halo2,
  sonobe,
  rln,
  zkitter,
  mopro,
  mpcStats,
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
  voicedeck,
  zkemail,
  chiquito,
  maciPlatform,
  OpenPassport,
  zkID,
  excubiae,
  circomMpc,
  publiclyVerifiableGarbledCircuit,
  mpcFramework,
  privateProofDelegation,
  pod2,
  postQuantumCryptography,
  machinaIo,
  plasmaFold,
  vOPRF,
]
