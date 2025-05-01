import { NextResponse } from "next/server"
import { getArticles } from "@/lib/blog"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const project = searchParams.get("project")
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit") || "100")
    : undefined
  const tag = searchParams.get("tag") || undefined

  const articles = getArticles({
    project: project || undefined,
    limit,
    tag,
  })

  return NextResponse.json({ articles })
}
