
# Privacy & Scaling Explorations

Enhancing Ethereum through cryptographic research and collective experimentation.

## Contributing guidelines

### Open for contribution.
- For updating project detail, please open PR and request at least two reviewers for approval (there should be auto-assign actions, so you don't need to select manually).
- For adding new features, please open PR and first merge to staging/dev for QA, or open issue for suggestion, bug report.
- For any misc. update such as typo, PR to main and two approval is needed.


### Project detail now supports markdown
For PSE members who wish to add more information to the project detail, you can now add to the "description" in the {project}.ts. 

Supported format:
- Headings
- Table
- more to come in a later release.

Please note the keyword and theme is curated by the comms & design team. If you wish to change, please create a PR. 


## Run Locally

Clone the project

```bash
  git clone https://github.com/privacy-scaling-explorations/website-v2
```

Go to the project directory

```bash
  cd website-v2
```

Install dependencies

```bash
  pnpm install
```

Start the app

```bash
  pnpm dev
```



## Tech Stack

[@shadcn's Nextjs 13 template](https://github.com/shadcn/next-template)

- Next.js 13 App Directory
- Radix UI Primitives
- Tailwind CSS
- Icons from [Lucide](https://lucide.dev)
- Dark mode with `next-themes`
- Tailwind CSS class sorting, merging and linting.

