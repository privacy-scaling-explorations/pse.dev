import { ProjectInterface } from "@/lib/types";

export const ZKKit: ProjectInterface = {
    id: "zk-kit",
    image: "zk-kit.svg",
    name: "ZK Kit",
    tldr: "A comprehensive monorepo of JS libraries for zero-knowledge technologies.",
    description: "Designed to streamline the development process, it provides a set of NPM modules, including algorithms and utility functions, that can be integrated into various projects and zero-knowledge protocols. The toolkit is equipped with features like Yarn workspaces for package management, Conventional Commits for meaningful commit messages, Jest for testing, and Typedocs for TypeScript documentation. Developers can leverage these tools to ensure code quality, testing, and documentation without the overhead of setup.",
    projectStatus: 'archived',
    links: {
        github: 'https://github.com/privacy-scaling-explorations/zk-kit',
    },
    tags: {
        keywords: ['anonymity']
    }
}
