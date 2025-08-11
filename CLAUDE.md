# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Privacy Stewards of Ethereum (pse.dev) website - a Next.js 14 application showcasing cryptographic research, projects, and articles. The site uses a modern architecture with App Router, MDX content management, and comprehensive performance optimizations.

## Development Commands

### Core Development

```bash
yarn dev           # Start development server
yarn build         # Production build
yarn start         # Start production server
yarn preview       # Build and start locally
yarn clean         # Remove build artifacts
```

### Code Quality

```bash
yarn lint          # Run ESLint
yarn lint:fix      # Fix ESLint issues automatically
yarn typecheck     # TypeScript type checking
yarn format:check  # Check Prettier formatting
yarn format:write  # Apply Prettier formatting
```

### Testing

```bash
yarn test          # Run all tests once (CI mode)
yarn test:watch    # Run tests in watch mode
yarn test:ui       # Open Vitest UI runner
yarn test:coverage # Generate coverage report
yarn test:validation # Run setup validation tests
yarn test:ci       # CI-optimized test run
```

## Architecture Overview

### Next.js App Router Structure

- **App Directory**: Uses Next.js 14 App Router (`/app` directory)
- **Route Groups**: Pages organized in `(pages)` route group for clean URLs
- **Dynamic Routes**: Blog articles use `[slug]` and projects use `[id]`
- **API Routes**: RESTful endpoints in `/app/api/` for content, search, RSS, YouTube

### Content Management System

- **File-based CMS**: Content stored in `/content/` directory
  - Articles: `/content/articles/` (Markdown with YAML frontmatter)
  - Projects: `/content/projects/` (Markdown with rich metadata)
- **Templates**: Use `_article-template.md` and `_project-template.md` for new content
- **Assets**: Article images in `/public/articles/[article-name]/`
- **Processing**: Custom content library handles markdown parsing with `gray-matter`

### Component Architecture

```
/components/
├── ui/           # Reusable UI primitives (shadcn/ui + Radix)
├── blog/         # Blog-specific components
├── project/      # Project-specific components
├── sections/     # Page sections and layouts
├── search/       # Search functionality
└── layouts/      # Layout components and providers
```

### State Management

- **Global State**: React Context via `GlobalProvider` for theme and app state
- **Data Fetching**: TanStack Query for async state management
- **Providers**: Nested pattern (Global → Projects → Theme → children)

### Content Features

- **Math Rendering**: KaTeX for LaTeX formulas (`$inline$` and `$$block$$`)
- **Code Highlighting**: Prism.js with syntax highlighting
- **Rich Markdown**: Custom table components, accordions, footnotes
- **Search**: Algolia integration with Fuse.js fallback
- **SEO**: Comprehensive metadata generation and RSS feeds

## Development Workflow

### Adding Articles

1. Copy `/content/articles/_article-template.md`
2. Rename to `kebab-case-title.md`
3. Update frontmatter (authors, title, image, tldr, date, tags, projects)
4. Create matching folder in `/public/articles/[article-name]/` for images
5. Write content using Markdown with KaTeX math support

### Adding Projects

1. Copy `/content/projects/_project-template.md`
2. Rename to `project-id.md`
3. Configure frontmatter:
   - **Required**: id, name, image, section, projectStatus, tldr
   - **Optional**: category, license, tags, links, team, youtubeLinks, extraLinks
4. Write project description using Markdown

### Content Frontmatter Structure

**Articles**:

```yaml
authors: ["Name"] # Author names
title: "Article Title" # Display title
image: "/articles/name/cover.webp" # Cover image
tldr: "Brief summary" # Short description
date: "2024-01-01" # Publication date
canonical: "external-url" # Optional canonical URL
tags: ["tag1", "tag2"] # Optional categorization
projects: ["project-id"] # Optional project links
```

**Projects**:

```yaml
id: "unique-project-id" # Kebab-case identifier
name: "Project Display Name" # Human-readable name
section: "pse" # pse|grant|collaboration|archived
projectStatus: "active" # active|inactive|maintained
image: "/projects/id/cover.webp" # Cover image path
tldr: "One-line description" # Brief summary
category: "research" # research|devtools|application
tags:
  keywords: ["tag1", "tag2"] # Technical keywords
  themes: ["privacy"] # High-level themes
  types: ["research"] # Project types
  builtWith: ["typescript"] # Technologies
links:
  github: "github-url" # Project links
  website: "website-url"
team: # Team member details
  - name: "Member Name"
    role: "Role"
    links:
      github: "github-url"
youtubeLinks: ["video-urls"] # YouTube videos
extraLinks: # Categorized action links
  buildWith: [...]
  play: [...]
  research: [...]
  learn: [...]
```

## Performance Optimizations

### Modern JavaScript Build

- **Browser Targets**: Chrome 91+, Firefox 90+, Safari 14.1+, Edge 91+ (see `.browserslistrc`)
- **TypeScript Config**: ES2022 target with modern library support
- **SWC Compiler**: Rust-based compilation with minimal transpilation (`.swcrc`)
- **Bundle Optimization**: Tree shaking, code splitting, optimized imports

### Image and Asset Optimization

- **Next.js Image**: Automatic WebP/AVIF conversion and responsive sizing
- **Font Loading**: Google Fonts with `display: swap` and fallbacks
- **Resource Hints**: Preconnect/DNS prefetch for external domains

### Render Performance

- **Lazy Analytics**: Matomo tracking loads with `lazyOnload` strategy
- **Critical CSS**: Inlined base styles for faster initial render
- **Static Generation**: Extensive use of SSG for content pages

## Testing Architecture

### Test Structure

```
/tests/
├── test-utils.tsx        # Custom render with providers
├── setup.tsx             # Global test setup
├── mocks/                # Mock implementations
└── *.test.tsx           # Individual test files
```

### Test Utilities

- **Custom Render**: Use `@/tests/test-utils` render function for provider context
- **Environment**: jsdom preconfigured for DOM testing
- **Mocks**: Browser APIs and external libraries mocked in `/tests/mocks/`
- **Path Aliases**: `@/` alias points to project root in tests

### Test Commands Context

- `test:validation` runs sanity checks for project setup
- Coverage reports generated in `/coverage/` directory
- UI runner available for interactive test development

## API Architecture

### Endpoint Structure

```
/app/api/
├── articles/route.ts     # Article listing with filtering
├── projects/route.ts     # Project data endpoints
├── search/route.ts       # Global search functionality
├── rss/route.ts          # RSS feed generation
└── youtube/             # YouTube integration
    ├── route.ts         # Channel data
    └── videos/route.ts  # Video endpoints
```

### Response Patterns

- Consistent JSON response format
- Error handling with appropriate HTTP status codes
- Route-level caching with revalidation strategies

## External Integrations

- **YouTube API**: Video embedding and metadata fetching
- **Matomo Analytics**: Privacy-focused tracking (loads lazily)
- **Discord Bot**: Server-side integration capabilities (`/common/discord`)
- **Algolia Search**: Primary search with local Fuse.js fallback

## Build and Performance Notes

### Bundle Analysis

- Use `yarn build` to see route-by-route bundle sizes
- Shared chunks optimized for caching across routes
- Dynamic imports used for code splitting where beneficial

### Performance Monitoring

- PageSpeed Insights optimizations implemented
- Modern JavaScript delivery reduces transpilation overhead
- Aggressive caching strategies for static content

### Environment Configuration

- Development/production environment variables supported
- Node.js 22.x required (see `engines` in package.json)
- Yarn 4.x with Corepack for package management

## Key Development Patterns

### Content Updates

- Always run `yarn test:validation` after content changes
- Images should be optimized (prefer WebP format, <300KB)
- Article folder names must exactly match markdown file names (without .md)

### Code Style

- TypeScript strict mode enabled
- ESLint + Prettier configured with import sorting
- Path aliases (`@/`) for clean imports
- Husky + lint-staged for pre-commit quality checks

### Contribution Guidelines

- Internal PRs: Tag @kalidiagne, @psedesign for review
- Use #website-pse Discord channel for questions
- Staging/dev branch for feature PRs, main for minor updates
- Two approvals required for main branch changes
