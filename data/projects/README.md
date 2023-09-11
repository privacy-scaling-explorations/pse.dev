## Add new project to projects list

1. Add new file inside `[...]/data/projects.ts` folder
2. Add project details inside the file already created, to easily include all the required parameters make sure to use the `ProjectInterface`

```js
export const example: ProjectInterface = {
  id: "example",
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

3. Include the exported constant of the project in `projects.ts`

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
  tags: {
    themes: ["play", "buildWith"],
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
