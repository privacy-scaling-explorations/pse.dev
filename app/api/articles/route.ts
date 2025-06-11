import { getArticles } from "@/lib/markdownContentFetch"
import { NextRequest, NextResponse } from "next/server"

// Cache control
export const revalidate = 60 // Revalidate cache after 60 seconds
export const dynamic = "force-dynamic" // Ensure the route is always evaluated

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get("tag") || undefined
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit") as string, 10)
      : undefined
    const project = searchParams.get("project") || undefined

    console.log("Fetching articles with params:", { tag, limit, project })
    const articles = await getArticles({
      tag,
      limit,
      project,
    })
    console.log("Articles fetched:", articles.length)

    const response = NextResponse.json({
      articles,
      success: true,
      meta: {
        total: articles.length,
        tag,
        limit,
        project,
      },
    })

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
        success: false,
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
