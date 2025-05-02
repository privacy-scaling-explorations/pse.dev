"use client"

import { useQuery } from "@tanstack/react-query"
import { Article } from "@/lib/blog"
import { ArticleInEvidenceCard } from "./article-in-evidance-card"
import { ArticleListCard } from "./article-list-card"

async function fetchArticles(tag?: string) {
  try {
    const params = new URLSearchParams()
    if (tag) params.append("tag", tag)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://pse.dev"}/api/articles?${params.toString()}`,
      { cache: "no-store" }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`)
    }

    const data = await response.json()
    return data.articles || []
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

interface ArticlesListProps {
  lang: string
  tag?: string
}

const ArticlesList = ({ lang, tag }: ArticlesListProps) => {
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles", tag],
    queryFn: () => fetchArticles(tag),
  })

  if (isLoading) {
    return <div className="flex justify-center py-10">Loading articles...</div>
  }

  if (isError) {
    return (
      <div className="py-10 text-center">
        <p className="text-lg text-red-600">Error loading articles</p>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-lg text-gray-600">No articles found</p>
      </div>
    )
  }

  const lastArticle = articles[0]
  const featuredArticles = articles.slice(1, 5)
  const otherArticles = articles.slice(5)

  return (
    <div className="flex flex-col gap-10 lg:gap-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
        <ArticleInEvidenceCard
          article={lastArticle}
          size="sm"
          className="h-full"
          asLink
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 lg:col-span-2 h-full">
          {featuredArticles?.map((article: Article) => {
            return (
              <ArticleInEvidenceCard
                key={article.id}
                article={article}
                variant="compact"
                size="sm"
                className="h-full"
                asLink
              />
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-5 lg:gap-14">
        {otherArticles.map((article: Article) => {
          return (
            <ArticleListCard key={article.id} lang={lang} article={article} />
          )
        })}
      </div>
    </div>
  )
}

export default ArticlesList
