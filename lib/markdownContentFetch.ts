import { ProjectInterface } from "./types"

// Production-ready dynamic imports for server-side only
async function getServerModules() {
  // Only import on server-side to avoid bundling in client
  if (typeof window !== "undefined") {
    return null
  }

  try {
    const [{ default: fs }, { default: path }, { default: matter }, jsYaml] =
      await Promise.all([
        import("fs"),
        import("path"),
        import("gray-matter"),
        import("js-yaml"),
      ])

    return { fs, path, matter, jsYaml }
  } catch (error) {
    console.error("Failed to load server modules:", error)
    return null
  }
}

// Base interface for all markdown content
export interface MarkdownContent {
  id: string
  title: string
  image?: string
  tldr?: string
  content: string
  date: string
  authors?: string[]
  signature?: string
  category?: string
  projectStatus?: string
  publicKey?: string
  hash?: string
  canonical?: string
  tags?: string[]
  projects?: string[]
  [key: string]: any // Allow for additional properties
}

// Article-specific interface based on _article-template.md
export interface Article {
  id: string
  title: string
  image: string
  tldr?: string
  content: string
  date: string
  authors: string[]
  canonical?: string
  tags?: string[]
  projects?: string[]
  [key: string]: any
}

// Project-specific interfaces based on _project-template.md
export interface ProjectTags {
  keywords?: string[]
  themes?: string[]
  types?: string[]
  builtWith?: string[]
  fundingSource?: string[]
}

export interface FetchMarkdownOptions {
  limit?: number
  tag?: string
  project?: string
}

// Generic function to get markdown files from any folder
export async function getMarkdownFiles(
  folderName: string,
  options?: FetchMarkdownOptions
): Promise<MarkdownContent[]> {
  // Return empty array if running on client-side
  if (typeof window !== "undefined") {
    console.warn(
      "getMarkdownFiles called on client-side, returning empty array"
    )
    return []
  }

  const modules = await getServerModules()
  if (!modules) {
    console.error("Failed to load server modules")
    return []
  }

  const { fs, path, matter, jsYaml } = modules
  const { limit = 1000, tag, project } = options ?? {}

  // Use absolute path resolution for better Vercel compatibility
  const contentDirectory = path.resolve(process.cwd(), folderName)

  // Check if directory exists
  if (!fs.existsSync(contentDirectory)) {
    console.error(
      `Directory ${folderName} does not exist at ${contentDirectory}`
    )
    // Log current working directory for debugging
    console.error(`Current working directory: ${process.cwd()}`)
    return []
  }

  // Get file names under the specified folder
  const fileNames = fs.readdirSync(contentDirectory)
  const allContentData = fileNames
    .filter((fileName: string) => fileName.endsWith(".md"))
    .map((fileName: string) => {
      const id = fileName.replace(/\.md$/, "")?.toLowerCase()
      if (id === "readme" || id.startsWith("_")) {
        return null
      }

      // Read markdown file as string
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      try {
        // Use matter with options to handle multiline strings
        const matterResult = matter(fileContents, {
          engines: {
            yaml: {
              // Ensure multiline strings are parsed correctly
              parse: (str: string) => {
                try {
                  // Use js-yaml's safe load to parse the YAML with type assertion
                  return jsYaml.load(str, {
                    schema: jsYaml.DEFAULT_SCHEMA,
                    filename: fileName,
                  }) as object
                } catch (e) {
                  console.error(
                    `Error parsing YAML frontmatter in ${fileName}:`,
                    e
                  )
                  console.error("YAML content preview:", str.substring(0, 200))
                  // Fallback to empty object if parsing fails
                  return {}
                }
              },
            },
          },
        })

        // Handle tags properly - preserve object structure for projects, array for articles
        let processedTags = matterResult.data?.tags

        // If tags is an array (legacy format), keep it as array
        if (Array.isArray(matterResult.data?.tags)) {
          processedTags = [
            ...matterResult.data.tags,
            ...(matterResult.data?.tag ? [matterResult.data.tag] : []),
          ]
        }
        // If tags is an object (new project format), preserve the object structure
        else if (
          typeof matterResult.data?.tags === "object" &&
          matterResult.data?.tags !== null
        ) {
          processedTags = matterResult.data.tags
        }
        // If no tags but there's a single tag field, create array
        else if (matterResult.data?.tag) {
          processedTags = [matterResult.data.tag]
        }
        // Default to empty array
        else {
          processedTags = []
        }

        return {
          id,
          ...matterResult.data,
          tags: processedTags,
          content: matterResult.content,
        }
      } catch (error) {
        console.error(`Error processing ${fileName}:`, error)
        // Return minimal content data if there's an error
        return {
          id,
          title: `Error processing ${id}`,
          content: "This content could not be processed due to an error.",
          date: new Date().toISOString().split("T")[0],
          tags: [],
        }
      }
    })

  let filteredContent = allContentData.filter(Boolean) as MarkdownContent[]

  // Filter by tag if provided
  if (tag) {
    filteredContent = filteredContent.filter((content) => {
      // Handle array format (legacy articles)
      if (Array.isArray(content.tags)) {
        return content.tags.includes(tag)
      }
      // Handle object format (projects)
      if (typeof content.tags === "object" && content.tags !== null) {
        // Check all tag categories for the tag
        return Object.values(content.tags).some((tagArray) =>
          Array.isArray(tagArray) ? tagArray.includes(tag) : false
        )
      }
      return false
    })
  }

  // Filter by project if provided
  if (project) {
    filteredContent = filteredContent.filter(
      (content) =>
        Array.isArray(content.projects) && content.projects.includes(project)
    )
  }

  // Sort content by date (if date exists)
  return filteredContent
    .sort((a, b) => {
      const dateA = new Date(a.date || "1970-01-01")
      const dateB = new Date(b.date || "1970-01-01")

      // Sort in descending order (newest first)
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, limit)
}

// Generic function to get a specific markdown file by ID from a folder
export async function getMarkdownFileById(
  folderName: string,
  id: string
): Promise<MarkdownContent | undefined> {
  // Return undefined if running on client-side
  if (typeof window !== "undefined") {
    console.warn(
      "getMarkdownFileById called on client-side, returning undefined"
    )
    return undefined
  }

  const allContent = await getMarkdownFiles(folderName)
  return allContent.find(
    (content) => content.id?.toLowerCase() === id?.toLowerCase()
  )
}

// Specific helper functions for common use cases
export async function getArticles(
  options?: FetchMarkdownOptions
): Promise<Article[]> {
  const content = await getMarkdownFiles("content/articles", options)
  return content.map((item) => ({
    ...item,
    authors: item.authors || [],
    image: item.image || "",
    tldr: item.tldr || "",
  })) as Article[]
}

export async function getProjects(
  options?: FetchMarkdownOptions
): Promise<ProjectInterface[]> {
  const content = (await getMarkdownFiles(
    "content/projects",
    options
  )) as unknown as ProjectInterface[]

  return content.map((item) => ({
    ...item,
    name: item.name,
    section: item.section || "pse",
    projectStatus: item.projectStatus || "active",
    tldr: item.tldr || "",
    image: item.image || "",
  })) as ProjectInterface[]
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const content = await getMarkdownFileById("content/articles", id)
  if (!content) return undefined

  return {
    ...content,
    authors: content.authors || [],
    image: content.image || "",
    tldr: content.tldr || "",
  } as Article
}

export async function getProjectById(
  id: string
): Promise<ProjectInterface | undefined> {
  const content = (await getMarkdownFileById(
    "content/projects",
    id
  )) as unknown as ProjectInterface
  if (!content) return undefined

  return {
    ...content,
    name: content.name,
    section: content.section || "pse",
    projectStatus: content.projectStatus || "active",
    tldr: content.tldr || "",
    image: content.image || "",
  } as ProjectInterface
}

// Generic functions that return MarkdownContent for flexibility
export async function getAllArticles(
  options?: FetchMarkdownOptions
): Promise<MarkdownContent[]> {
  return await getMarkdownFiles("content/articles", options)
}

export async function getAllProjects(
  options?: FetchMarkdownOptions
): Promise<MarkdownContent[]> {
  return await getMarkdownFiles("content/projects", options)
}

const lib = {
  getMarkdownFiles,
  getMarkdownFileById,
  getArticles,
  getProjects,
  getArticleById,
  getProjectById,
  getAllArticles,
  getAllProjects,
}

export default lib
