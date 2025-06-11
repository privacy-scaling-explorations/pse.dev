import { NextResponse } from "next/server"
import { getArticles } from "@/lib/markdownContentFetch"

// Cache control
export const revalidate = 60 // Revalidate cache after 60 seconds
export const dynamic = "force-dynamic" // Ensure the route is always evaluated

export async function GET(request: Request): Promise<NextResponse> {
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

    const response = NextResponse.json(responseData)

    // Add cache headers for better performance
    response.headers.set(
      "Cache-Control",
      "s-maxage=60, stale-while-revalidate=300"
    )
    response.headers.set("CDN-Cache-Control", "max-age=60")
    response.headers.set("Vercel-CDN-Cache-Control", "max-age=3600")

    return response
  } catch (error) {
    console.error("Error fetching articles:", error)
    console.error(
      "Error details:",
      error instanceof Error ? error.message : String(error)
    )

    const errorResponse = NextResponse.json(
      {
        error: "Failed to fetch articles",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )

    // Don't cache error responses
    errorResponse.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    )

    return errorResponse
  }
}
