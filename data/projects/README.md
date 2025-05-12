## How to Add a New Project to the Projects List

#### 1. Create a New Project File:

- Go to the `../data/projects` folder in your project.
- Create a new file named `[project-name].ts`

#### 2. Add Project Details:

- Open the newly created `[project-name].ts` file.
- Use the ProjectInterface template to add the necessary details. Here's a basic example (please copy this for a quick start):

```js
import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const projectName: ProjectInterface = {
  id: "project-name",
  image: "",
  name: "Project Example",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  content: {
    en: {
      tldr: "Short description",
      description: `
## Heading

Sample project description goes here. You can also use **Markdown** for formatting.
        `,
    },
  },
  tags: {
    keywords: [],
    themes: [],
    types: [],
    builtWith: [],
  },
}
```

**Note**: Make sure to add all the necessary language versions (locales) under content to support every language you need. Markdown is supported, so feel free to format accordingly.

#### 3. Register the New Project:

- Open the `[...]/data/projects.ts` file where all projects are listed.
- Add your new project to the projects array to make it visible:

```js
import { projectName } from './projects/[project-name].ts';

const projects: ProjectInterface[] = [
  // other projects
  projectName,
];
```

That's it! Your new project will now be visible. Here is Overview example

![Project overview](/public/project/example-project-badge.jpg)

## Show links in project page detail

To add extra link to projects we need to add `extraLinks` for the projects we are going to add links for.
Make sure that for every "themes" value there is a specific "extraLinks" object will all the links.

```js
import { ProjectCategory, ProjectInterface, ProjectStatus } from '@/lib/types'

export const example: ProjectInterface = {
  id: "example",
  image: "",
  name: "This is an example of the project",
  category: ProjectCategory.RESEARCH, // 'APPLICATIONS', 'RESEARCH' or  'DEVTOOLS'
  section: "pse", // 'pse', 'grant', 'collaboration', 'archived'
  projectStatus: ProjectStatus.ACTIVE,
  tags: {
    themes: ["play", "buildWith"],
    keywords: ["Anonymity/privacy", "Voting/governance"],
    types: ["Lego sets/toolkits", "Infrastructure/protocol"],
    builtWith: ["p0tion", "JubjubLib"],
  },
  extraLinks: {
    buildWith: [
      {
        label: "Link to get started",
        url: 'https://google.it"',
      },
    ],
    play: [
      {
        label: "Link to get started",
        url: 'https://google.it"',
      },
    ],
  },
}
```

This is the result

![Project links](/public/project/example-project-detail.jpg)

## Adding YouTube Videos to a Project

Add YouTube videos to your project by including a `youtubeLinks` array:

```js
export const projectName: ProjectInterface = {
  // other properties...
  youtubeLinks: [
    "https://www.youtube.com/watch?v=XXXXXXXXXXX",
    "https://youtu.be/XXXXXXXXXXX",
    "XXXXXXXXXXX" // Just the YouTube video ID
  ],
}
```

The videos will appear as clickable thumbnails with titles on the project page:

![YouTube Videos](/public/project/example-project-video.png)

## Adding Team Members to a Project

Add team members to your project using the `team` array:

```js
export const projectName: ProjectInterface = {
  // other properties...
  team: [
    {
      name: "John Doe",
      role: "Lead Developer",
      image: "/team/john-doe.jpg", // Optional
      email: "john.doe@example.com", // Optional
      links: { // Optional
        github: "https://github.com/johndoe",
        twitter: "https://twitter.com/johndoe"
      }
    }
  ],
}
```

Supported link types: `github`, `website`, `discord`, `twitter`, `youtube`, `telegram`

![Project Team Members](/public/project/example-project-team.png)

### Project detail now supports markdown

Please note the keyword and theme is curated by the comms & design team. If you wish to change, please create a PR.
