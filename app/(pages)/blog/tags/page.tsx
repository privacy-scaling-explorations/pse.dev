import { LABELS } from "@/app/labels"
import { Icons } from "@/components/icons"
import { AppContent } from "@/components/ui/app-content"
import { Label } from "@/components/ui/label"
import { getArticleTags } from "@/lib/blog"
import { HydrationBoundary, QueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { Suspense } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: LABELS.BLOG_TAGS_PAGE.TITLE,
  description: LABELS.BLOG_TAGS_PAGE.SUBTITLE,
}

const BlogTagsPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["get-articles-tags"],
    queryFn: async () => {
      try {
        const articles = getArticleTags()
        return articles
      } catch (error) {
        console.error("Error fetching articles:", error)
        return []
      }
    },
  })

  const tags = queryClient.getQueryData(["get-articles-tags"]) as string[]

  return (
    <div className="flex flex-col pb-10v">
      <div className="w-full bg-page-header-gradient">
        <AppContent className="flex flex-col gap-6 py-10 w-full">
          <Link
            className="flex items-center gap-2 text-tuatara-950/80 hover:text-tuatara-950 mr-auto"
            href="/blog"
          >
            <Icons.arrowLeft />
            <span className="font-sans text-base">
              {LABELS.BLOG_TAGS_PAGE.BACK_TO_ARTICLES}
            </span>
          </Link>
          <Label.PageTitle label={LABELS.BLOG_TAGS_PAGE.TITLE} />
        </AppContent>
      </div>

      <AppContent className="grid grid-cols-3 gap-2 lg:gap-4 lg:py-10 lg:max-w-[1200px]">
        <Suspense fallback={null}>
          <HydrationBoundary>
            {tags?.map((tag) => (
              <Link
                href={`/blog/tags/${tag}`}
                key={tag}
                className="text-neutral-950 border-b-[2px] border-b-anakiwa-500 text-sm font-medium w-fit hover:text-anakiwa-500 duration-200"
              >
                {tag}
              </Link>
            ))}
          </HydrationBoundary>
        </Suspense>
      </AppContent>
    </div>
  )
}

export default BlogTagsPage
