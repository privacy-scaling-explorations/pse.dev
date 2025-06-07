import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import jsYaml from "js-yaml"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit")!)
    : undefined

  const articlesDirectory = path.join(process.cwd(), "content/blog")
  const filenames = fs.readdirSync(articlesDirectory)

  const articles = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(articlesDirectory, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents, {
        engines: {
          yaml: (s) => jsYaml.load(s, { schema: jsYaml.JSON_SCHEMA }) as object,
        },
      })

      return {
        id: filename.replace(/\.md$/, ""),
        title: data.title,
        date: data.date,
        authors: data.authors,
        image: data.image,
        tldr: data.tldr,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const limitedArticles = limit ? articles.slice(0, limit) : articles

  return NextResponse.json(limitedArticles)
}
