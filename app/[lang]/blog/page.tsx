import { useTranslation } from "@/app/i18n"
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

export const dynamic = "force-dynamic"

export const revalidate = 60 // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Blog",
  description: "",
}

interface BlogPageProps {
  params: { lang: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

const BlogPage = async ({ params: { lang }, searchParams }: BlogPageProps) => {
  const { t } = await useTranslation(lang, "blog-page")
  const tag = searchParams?.tag as string | undefined

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["articles", tag],
    queryFn: async () => {
      try {
        const params = new URLSearchParams()
        if (tag) params.append("tag", tag)

        const response = await fetch(`/api/articles?${params.toString()}`, {
          next: { revalidate },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`)
        }

        const data = await response.json()
        return data.articles || []
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
          <Label.PageTitle label={t("title")} />
          {tag && (
            <h2 className="text-xl font-semibold text-tuatara-800">
              {`Filtered by tag: "${tag}"`}
            </h2>
          )}
          <h6 className="font-sans text-base font-normal text-tuatara-950 md:text-[18px] md:leading-[27px] md:max-w-[700px]">
            {t("subtitle")}
          </h6>
        </AppContent>
      </div>

      <AppContent className="flex flex-col gap-10 lg:gap-16 pb-10 lg:py-10 lg:max-w-[978px]">
        <Suspense
          fallback={
            <div className="flex justify-center py-10">Loading articles...</div>
          }
        >
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ArticlesList lang={lang} tag={tag} />
          </HydrationBoundary>
        </Suspense>
      </AppContent>
    </div>
  )
}

export default BlogPage
