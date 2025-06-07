import { getProjects } from "@/lib/markdownContentFetch"
import { NextRequest, NextResponse } from "next/server"

// Cache control
export const revalidate = 60 // Revalidate cache after 60 seconds
export const dynamic = "force-dynamic" // Ensure the route is always evaluated

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const tag = searchParams.get("tag") || undefined
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit") as string, 10)
    : undefined
  const project = searchParams.get("project") || undefined

  try {
    const projects = await getProjects({
      tag,
      limit,
      project,
    })

    return NextResponse.json({
      projects,
      success: true,
    })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects", success: false },
      { status: 500 }
    )
  }
}
