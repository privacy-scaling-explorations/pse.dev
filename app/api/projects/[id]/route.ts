import { getProjectById } from "@/lib/markdownContentFetch"
import { NextRequest, NextResponse } from "next/server"

// Cache control
export const revalidate = 60 // Revalidate cache after 60 seconds
export const dynamic = "force-dynamic" // Ensure the route is always evaluated

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await getProjectById(params.id.toLowerCase())

    if (!project) {
      return NextResponse.json(
        {
          error: "Project not found",
          success: false,
          id: params.id.toLowerCase(),
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      project,
      success: true,
    })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json(
      { error: "Failed to fetch project", success: false },
      { status: 500 }
    )
  }
}
