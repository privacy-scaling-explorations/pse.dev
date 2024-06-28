## Add new project to projects list

####  1. Create a New Project File:
  - Navigate to the [...]/data/projects folder within your project directory.
 - Inside this folder, create a new file named [project_name].ts.

#### 2. Add Project Details:
 - Open the newly created [project_name].ts file.
 - To ensure all necessary parameters are included, use the ProjectInterface template. Here's a basic structure to get you started:

```js
export const example: ProjectInterface = {
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
import { example } from './projects/example';

const projects: ProjectInterface[] = [
  // other projects
  example,
];
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
  tldr: 'The project one-liner',
  description: 'A longer project description',
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

## Markdown supported

You can also format the description to your liking using markdown. We supported all the heading, bold and table.
This can help the reader to quickly scan through the important information.
