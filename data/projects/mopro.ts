import { ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "Mopro makes client-side proving on mobile simple.",
    description: `
### Overview

Mopro makes client-side proving simple. You can think of it as a toolkit for ZK app development. It primarily focuses on running natively mobile.

How? Mopro connects different adapters with different platforms. You can think of an adapter as a way to use a library with some proof system and performance profile. Because Mopro takes care of hooking up your circuit to some library, and generating bindings for use on multiple platforms, you can focus on what you do best: ZK app development.

### Features

With mopro, developers can overcome the limitations of existing tools like \`snarkjs\`, which struggles with small circuit sizes and slow performance in browsers. Our solution leverages the growing power of mobile GPUs to deliver a fast, scalable, and secure proving experience directly on client-side applications

Mopro, short for Mobile Prover, redefines the landscape of mobile app development by introducing an innovative toolkit designed for zero-knowledge (zk) proofs. With mopro, developers can overcome the limitations of existing tools like snarkjs, which struggles with small circuit sizes and slow performance in browsers. Our solution leverages the growing power of mobile GPUs to deliver a fast, scalable, and secure proving experience directly on client-side applications.

Developer Capabilities:

- **Ease of use**: mopro simplifies the complexity of integrating zk-proofs into mobile apps, making it accessible even for developers new to mobile development.
- **Scalability**: Designed to scale with your needs, mopro supports a wide range of proving systems, facilitating the development of versatile, high-performance applications.
- **X-platform compatibility**: Whether you're developing for iOS, Android, Windows, or Mac, mopro supports you with a unified toolkit that works seamlessly across all platforms.
- **Performance**: By optimizing for mobile GPUs, mopro significantly enhances the speed and capacity for handling large circuits, surpassing traditional browser-based solutions.
- **Security**: Users can generate claims securely on their devices, ensuring data privacy and integrity.

### Applications

- iOS Mopro Benchmark - [TestFlight](https://testflight.apple.com/join/TBlBDicy) | [GitHub](https://github.com/zkmopro/benchmark-app)
`,
  },
}

export const mopro: ProjectInterface = {
  id: "mopro",
  content,
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "mopro.png",
  license: "MIT",
  name: "Mopro",
  links: {
    github: "https://github.com/zkmopro",
    website: "https://zkmopro.org/",
    telegram: "https://t.me/zkmopro",
    twitter: "https://x.com/zkmopro",
  },
  tags: {
    keywords: ["Mobile", "Client", "iOS", "Android"],
    themes: ["build", "play"],
    types: ["Legos/dev tools", "Lego sets/toolkits", "Infrastructure/protocol", "Plugin",],
    builtWith: ["halo2", "circom"],
  },
  extraLinks: {
    buildWith: [
      {
        label: "Getting Started with mopro",
        url: "https://zkmopro.org/docs/getting-started/rust-setup",
      },
    ],
    play: [
      {
        label: "Try it out: Mopro Benchmark",
        url: "https://testflight.apple.com/join/TBlBDicy",
      },
    ],
  },
}
