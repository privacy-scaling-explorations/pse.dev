import { NextRequest, NextResponse } from "next/server"
import { getProjects } from "@/lib/content"

// Cache control
export const revalidate = 60 // Revalidate cache after 60 seconds
export const dynamic = "force-dynamic" // Ensure the route is always evaluated

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const tag = searchParams.get("tag") || undefined
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit") as string, 10)
    : undefined
  const status = searchParams.get("status") || undefined

  try {
    const projects = getProjects({ tag, limit, status })
    return NextResponse.json(projects ?? [])
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects", success: false },
      { status: 500 }
    )
  }
}
