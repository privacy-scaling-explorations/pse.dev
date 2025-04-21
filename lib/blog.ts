import fs from "fs"
import path from "path"
import matter from "gray-matter"
import jsYaml from "js-yaml"

export interface Article {
  id: string
  title: string
  image?: string
  tldr?: string
  content: string
  date: string
  authors?: string[]
  signature?: string
  publicKey?: string
  hash?: string
  canonical?: string
  tags?: string[]
}

const articlesDirectory = path.join(process.cwd(), "articles")

// Get all articles from /articles
export function getArticles(options?: { limit?: number; tag?: string }) {
  const { limit = 1000, tag } = options ?? {}

  if (!fs.existsSync(articlesDirectory)) {
    console.error(`Articles directory not found at ${articlesDirectory}`)
    return []
  }

  let fileNames = []
  try {
    fileNames = fs.readdirSync(articlesDirectory)
  } catch (error) {
    console.error(`Error reading articles directory: ${error}`)
    return []
  }

  const allArticlesData = fileNames.map((fileName: string) => {
    const id = fileName.replace(/\.md$/, "")
    if (id.toLowerCase() === "readme") {
      return null
    }

    const fullPath = path.join(articlesDirectory, fileName)

    let fileContents
    try {
      fileContents = fs.readFileSync(fullPath, "utf8")
    } catch (error) {
      console.error(`Error reading file ${fileName}: ${error}`)
      return {
        id,
        title: `Error reading ${id}`,
        content: "This article could not be read due to an error.",
        date: new Date().toISOString().split("T")[0],
        tags: [],
      }
    }

    try {
      const matterResult = matter(fileContents, {
        engines: {
          yaml: {
            // Ensure multiline strings are parsed correctly
            parse: (str: string) => {
              try {
                // Use js-yaml's safe load to parse the YAML with type assertion
                return jsYaml.load(str) as object
              } catch (e) {
                console.error(`Error parsing frontmatter in ${fileName}:`, e)
                // Fallback to empty object if parsing fails
                return {}
              }
            },
          },
        },
      })

      // Ensure tags are always an array, combining 'tags' and 'tag'
      const tags = [
        ...(Array.isArray(matterResult.data?.tags)
          ? matterResult.data.tags
          : []),
        ...(matterResult.data?.tag ? [matterResult.data.tag] : []),
      ]

      return {
        id,
        title: matterResult.data.title || `Article ${id}`,
        content: matterResult.content || "",
        date: matterResult.data.date || new Date().toISOString().split("T")[0],
        ...matterResult.data,
        tags: tags, // Assign the combined and normalized tags array
      }
    } catch (error) {
      console.error(`Error processing ${fileName}:`, error)
      // Return minimal article data if there's an error
      return {
        id,
        title: `Error processing ${id}`,
        content: "This article could not be processed due to an error.",
        date: new Date().toISOString().split("T")[0],
        tags: [],
      }
    }
  })

  let filteredArticles = allArticlesData.filter(Boolean) as Article[]

  // Filter by tag if provided
  if (tag) {
    filteredArticles = filteredArticles.filter((article) =>
      article.tags?.includes(tag)
    )
  }

  // Sort posts by date
  return filteredArticles
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)

      if (isNaN(dateA.getTime())) return 1
      if (isNaN(dateB.getTime())) return -1

      // Sort in descending order (newest first)
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, limit)
    .filter((article) => article.id !== "_article-template")
}

export function getArticleById(slug?: string) {
  if (!slug) return null

  try {
    // Note: This might need adjustment if you expect getArticleById to also have tags
    // Currently relies on the base getArticles() which fetches all tags
    const articles = getArticles() // Fetch all articles to find the one by ID
    return articles.find((article) => article.id === slug)
  } catch (error) {
    console.error(`Error in getArticleById for slug ${slug}:`, error)
    return null
  }
}

const lib = { getArticles, getArticleById }

export default lib
