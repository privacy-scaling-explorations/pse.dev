import fs from "fs"
import path from "path"
import matter from "gray-matter"

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
}

const articlesDirectory = path.join(process.cwd(), "articles")

// Get all articles from /articles
export function getArticles() {
  // Get file names under /articles
  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticlesData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "")
    if (id.toLowerCase() === "readme") {
      return null
    }

    // Read markdown file as string
    const fullPath = path.join(articlesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data,
      content: matterResult.content,
    }
  })
  // Sort posts by date
  return allArticlesData
    .filter(Boolean)
    .sort((a: any, b: any) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
    .filter((article: any) => article.id !== "_article-template") as Article[]
}

export function getArticleById(slug?: string) {
  const articles = getArticles()

  return articles.find((article) => article.id === slug)
}

const lib = { getArticles, getArticleById }

export default lib
