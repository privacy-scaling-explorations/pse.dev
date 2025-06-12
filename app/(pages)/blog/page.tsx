import { LABELS } from "@/app/labels"
import { AppContent } from "@/components/ui/app-content"
import { Label } from "@/components/ui/label"
import { Metadata } from "next"
import { Suspense } from "react"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import ArticlesList from "@/components/blog/ArticlesList"
import { Skeleton } from "@/components/skeleton"
import { getArticles } from "@/lib/blog"

export const dynamic = "force-dynamic"

export const revalidate = 60 // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: LABELS.BLOG_PAGE.TITLE,
  description: LABELS.BLOG_PAGE.SUBTITLE,
}

interface BlogPageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const BlogLoadingSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
        <Skeleton.Card className="h-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 lg:col-span-2 h-full">
          <Skeleton.Card size="md" className="max-h-[200px]" />
          <Skeleton.Card size="md" className="max-h-[200px]" />
          <Skeleton.Card size="md" className="max-h-[200px]" />
          <Skeleton.Card size="md" className="max-h-[200px]" />
        </div>
      </div>
      <div className="flex flex-col gap-5 lg:gap-14">
        <div className="grid grid-cols-[80px_1fr] lg:grid-cols-[120px_1fr] items-center gap-4 lg:gap-10">
          <Skeleton.Circle size="full" />
          <div className="flex flex-col gap-2">
            <Skeleton.Line size="lg" />
            <Skeleton.Line size="md" />
            <Skeleton.Line size="xs" />
          </div>
        </div>
        <div className="grid grid-cols-[80px_1fr] lg:grid-cols-[120px_1fr] items-center gap-4 lg:gap-10">
          <Skeleton.Circle size="full" />
          <div className="flex flex-col gap-2">
            <Skeleton.Line size="lg" />
            <Skeleton.Line size="md" />
            <Skeleton.Line size="xs" />
          </div>
        </div>
      </div>
    </>
  )
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const tag = searchParams?.tag as string | undefined

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["articles", tag],
    queryFn: async () => {
      try {
        const articles = getArticles({ tag })
        return articles
      } catch (error) {
        console.error("Error fetching articles:", error)
        return []
      }
    },
  })

  return (
    <div className="flex flex-col">
      <div className="w-full bg-page-header-gradient">
        <AppContent className="flex flex-col gap-4 py-10 w-full">
          <Label.PageTitle label={LABELS.BLOG_PAGE.TITLE} />
          {tag && (
            <h2 className="text-xl font-semibold text-tuatara-800">
              {`Filtered by tag: "${tag}"`}
            </h2>
          )}
          <h6 className="font-sans text-base font-normal text-tuatara-950 md:text-[18px] md:leading-[27px] md:max-w-[700px]">
            {LABELS.BLOG_PAGE.SUBTITLE}
          </h6>
        </AppContent>
      </div>

      <AppContent className="flex flex-col gap-10 lg:gap-16 pb-10 lg:py-10 lg:max-w-[978px]">
        <Suspense fallback={<BlogLoadingSkeleton />}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ArticlesList tag={tag} />
          </HydrationBoundary>
        </Suspense>
      </AppContent>
    </div>
  )
}

export default BlogPage
