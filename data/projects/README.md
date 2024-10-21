## How to Add a New Project to the Projects List


####  1. Create a New Project File:
- Go to the `../data/projects` folder in your project.
- Create a new file named `[project_name].ts`

#### 2. Add Project Details:
 - Open the newly created `[project_name].ts` file.
 - Use the ProjectInterface template to add the necessary details. Here’s a basic example (please copy this for a quick start):

```js
import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const project_name: ProjectInterface = {
  id: "project_name",
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
import { project_name } from './projects/[project_name].ts';

const projects: ProjectInterface[] = [
  // other projects
  project_name,
];
```

That’s it! Your new project will now be visible. Here is Overview example

![Project overview](/public/project/example-project-badge.jpg)

## Show links in project page detail

To add extra link to projects we need to add `extraLinks` for the projects we are going to add links for.
Make sure that for every "themes" value there is a specific "extraLinks" object will all the links.

```js
export const example: ProjectInterface = {
  id: "example",
  image: "",
  name: "This is an example of the project",
  projectStatus: '',
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

### Project detail now supports markdown

Please note the keyword and theme is curated by the comms & design team. If you wish to change, please create a PR.
