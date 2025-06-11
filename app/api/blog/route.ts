import { NextResponse } from "next/server"
import { getArticles } from "@/lib/markdownContentFetch"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined

    const articles = await getArticles({ limit })

    // Transform to match the expected API response format
    const responseData = articles.map((article) => ({
      id: article.id,
      title: article.title,
      date: article.date,
      authors: article.authors,
      image: article.image,
      tldr: article.tldr,
    }))

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    )
  }
}
