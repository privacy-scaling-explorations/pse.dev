"use client"

import { useQuery } from "@tanstack/react-query"
import { Article, ArticleTag } from "@/lib/content"
import { ArticleListCard } from "./article-list-card"
import { cva } from "class-variance-authority"
import { ArticleInEvidenceCard } from "./article-in-evidance-card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { LABELS } from "@/app/labels"
import { Search as SearchIcon } from "lucide-react"
import { useState } from "react"
import { useDebounce, useMedia } from "react-use"
import { useRouter, useSearchParams } from "next/navigation"

const ArticleTitle = cva(
  "text-white font-display hover:text-anakiwa-400 transition-colors group-hover:text-anakiwa-400",
  {
    variants: {
      variant: {
        compact:
          "text-[20px] font-semibold lg:font-bold lg:text-lg line-clamp-2 mt-auto",
        default: "text-[20px] font-semibold lg:font-bold line-clamp-3 mt-auto",
        xl: "text-[20px] font-bold lg:!text-[40px] lg:!leading-[44px] mt-auto",
      },
    },
  }
)

async function fetchArticles(tag?: string) {
  try {
    const params = new URLSearchParams()
    if (tag) params.append("tag", tag)

    const response = await fetch(`/api/articles?${params.toString()}`, {
      cache: "default",
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
}

interface ArticlesListProps {
  tag?: string
}

export const ArticlesList: React.FC<ArticlesListProps> = ({
  tag,
}: ArticlesListProps) => {
  const router = useRouter()

  const params = useSearchParams()
  const query = params.get("query")
  const [searchQuery, setSearchQuery] = useState(query ?? "")

  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles", tag],
    queryFn: () => fetchArticles(tag),
  })

  if (isLoading || articles.length === 0) {
    return null
  }

  if (isError) {
    return (
      <div className="py-10 text-center">
        <p className="text-lg text-red-600">Error loading articles</p>
      </div>
    )
  }

  const hasSearchParams =
    (searchQuery ?? "")?.length > 0 && searchQuery !== "all"

  const lastArticle = articles[0]
  const featuredArticles = !tag ? articles.slice(1, 3) : []
  let otherArticles = !tag && !hasSearchParams ? articles.slice(3, 6) : []

  if (searchQuery === "all") {
    otherArticles = articles
  } else if (searchQuery?.length > 0) {
    otherArticles = articles.filter((article: Article) => {
      const title = article.title.toLowerCase()
      const content = article.content.toLowerCase()
      const tags =
        article.tags?.map((tag: ArticleTag) => tag.name.toLowerCase()) ?? []
      return (
        title.includes(searchQuery.toLowerCase()) ||
        tags.some((tag: string) => tag.includes(searchQuery.toLowerCase()))
      )
    })
  }

  const hasTag = tag !== undefined

  const onSearchArticles = (query: string) => {
    setSearchQuery(query)
    router.push(`/blog?query=${query}`)
  }

  useDebounce(
    () => {
      if (searchQuery === "") return null
      onSearchArticles(searchQuery)
    },
    500, // debounce timeout in ms when user is typing
    [searchQuery]
  )

  const isMobile = useMedia("(max-width: 768px)")

  return (
    <div className="flex flex-col gap-10 lg:gap-16">
      {!hasTag && !hasSearchParams && searchQuery !== "all" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 items-stretch">
          <div className="lg:col-span-2 h-full flex flex-col gap-4">
            <ArticleInEvidenceCard
              article={lastArticle}
              size="sm"
              className="h-full "
              asLink
            />
            {isMobile && (
              <>
                {featuredArticles?.map((article: Article) => {
                  return (
                    <ArticleInEvidenceCard
                      key={article.id}
                      article={article}
                      size="sm"
                      className="h-full"
                      asLink
                    />
                  )
                })}
              </>
            )}
          </div>
          {!isMobile && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 lg:col-span-2 h-full">
              {featuredArticles?.map((article: Article) => {
                return (
                  <ArticleInEvidenceCard
                    key={article.id}
                    article={article}
                    variant="compact"
                    size="sm"
                    className="h-full"
                    backgroundCover={false}
                    asLink
                  />
                )
              })}
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col gap-10 lg:gap-16 lg:px-12">
        <div className="flex flex-col gap-10 ">
          <Input
            className="max-w-[500px] mx-auto w-full"
            placeholder={LABELS.BLOG_PAGE.SEARCH_PLACEHOLDER}
            icon={SearchIcon}
            onChange={(e) => {
              onSearchArticles(e?.target?.value ?? "")
            }}
            onIconClick={() => {
              onSearchArticles(searchQuery)
            }}
          />
          <div className="flex flex-col gap-5 lg:gap-14 ">
            {otherArticles
              .filter((article: Article) => article.id !== lastArticle.id)
              .map((article: Article) => {
                return <ArticleListCard key={article.id} article={article} />
              })}
          </div>
        </div>
        {searchQuery?.length === 0 && (
          <Button
            className="mx-auto uppercase"
            onClick={() => {
              onSearchArticles("all")
            }}
          >
            {LABELS.COMMON.MORE_POSTS}
          </Button>
        )}
      </div>
    </div>
  )
}
