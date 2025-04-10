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
}

const articlesDirectory = path.join(process.cwd(), "articles")

// Get all articles from /articles
export function getArticles(limit: number = 1000) {
  // Get file names under /articles
  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticlesData = fileNames.map((fileName: string) => {
    const id = fileName.replace(/\.md$/, "")
    if (id.toLowerCase() === "readme") {
      return null
    }

    // Read markdown file as string
    const fullPath = path.join(articlesDirectory, fileName)
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

      return {
        id,
        ...matterResult.data,
        content: matterResult.content,
      }
    } catch (error) {
      console.error(`Error processing ${fileName}:`, error)
      // Return minimal article data if there's an error
      return {
        id,
        title: `Error processing ${id}`,
        content: "This article could not be processed due to an error.",
        date: new Date().toISOString().split("T")[0],
      }
    }
  })

  // Sort posts by date
  return allArticlesData
    .filter(Boolean)
    .sort((a: any, b: any) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)

      // Sort in descending order (newest first)
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, limit)
    .filter((article: any) => article.id !== "_article-template") as Article[]
}

export function getArticleById(slug?: string) {
  const articles = getArticles()

  return articles.find((article) => article.id === slug)
}

const lib = { getArticles, getArticleById }

export default lib
