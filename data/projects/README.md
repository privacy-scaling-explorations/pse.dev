## Add new project to projects list




####  1. Create a New Project File:
  - Navigate to the [...]/data/projects folder within your project directory.
 - Inside this folder, create a new file named [project_name].ts.

#### 2. Add Project Details:
 - Open the newly created [project_name].ts file.
 - To ensure all necessary parameters are included, use the ProjectInterface template. Here's a basic structure to get you started:

**Note**: The `description` and `tldr` are now managed through the respective translation file located in /i18n/locales. Refer to step #4 for more details.

```js
export const project_name: ProjectInterface = {
  id: "project_name",
  image: "",
  name: "This is an example of the project",
  tags: {
    keywords: [],
    themes: [],
    types: [],
    builtWith: [],
  },
}
```

 - Fill in the id, image, name, and tags fields as per your project's details. The tags object includes arrays for keywords, themes, types, and builtWith.

#### 3. Register the New Project:
 - Open the projects.ts file located in the same directory or wherever your project's list is maintained.
 - Add your new project to the projects array to make it visible:

```js
import { project_name } from './projects/[project_name].ts';

const projects: ProjectInterface[] = [
  // other projects
  project_name,
];
```

#### 4. Project Description and TLRD
With the project now supporting multiple languages, the description and content fields are managed in the internalization folder. Follow these steps:
- Create a new project_id.json file in /app/i18n/locales/${lang}/projects/${project_id}.json.
- Ensure the project_id defined in Step 2 matches the project_id.json file.
- In this new file, add the description and tldr for the project.
- Repeat these steps for each language you wish to support.

```json
{
  "description": "project description content",
  "tldr": "project tldr"
}
```

By following these steps, you will successfully add a new project and ensure it is correctly registered and visible.

## Show badges in the project card

Badges can be set by setting the `themes` params, by looking at this example

```js
export const example: ProjectInterface = {
  id: "example",
  image: "",
  name: "This is an example of the project",
  tags: {
    themes: ["play", "build"],
  },
}
```

This is the result

![Project card badge](/public/project/example-project-badge.png)

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

![Project links](/public/project/example-project-extra-link.png)

### Project detail now supports markdown
For PSE members who wish to add more information to the project detail, you can now add to the "description" in the {project}.ts.

Supported format:
- Headings
- Table
- more to come in a later release.

Please note the keyword and theme is curated by the comms & design team. If you wish to change, please create a PR.
