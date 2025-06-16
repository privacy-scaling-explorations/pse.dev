"use client"

import { useQuery } from "@tanstack/react-query"
import { Article } from "@/lib/content"
import { ArticleListCard } from "./article-list-card"
import Link from "next/link"
import { cva } from "class-variance-authority"
import { ArticleInEvidenceCard } from "./article-in-evidance-card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { LABELS } from "@/app/labels"
import { Search as SearchIcon } from "lucide-react"

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

  const lastArticle = articles[0]
  const featuredArticles = !tag ? articles.slice(1, 3) : []
  const otherArticles = !tag ? articles.slice(3) : articles

  const hasTag = tag !== undefined

  return (
    <div className="flex flex-col gap-10 lg:gap-16">
      {!hasTag && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 items-stretch">
          <div className="lg:col-span-2 h-full">
            <ArticleInEvidenceCard
              article={lastArticle}
              size="sm"
              className="h-full "
              asLink
            />
          </div>
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
        </div>
      )}
      <div className="flex flex-col gap-10 lg:gap-16 lg:px-12">
        <div className="flex flex-col gap-10 ">
          <Input
            className="max-w-[500px] mx-auto w-full"
            placeholder={LABELS.BLOG_PAGE.SEARCH_PLACEHOLDER}
            icon={SearchIcon}
            onIconClick={() => {
              console.log("ss")
            }}
          />
          <div className="flex flex-col gap-5 lg:gap-14 ">
            {otherArticles.map((article: Article) => {
              return <ArticleListCard key={article.id} article={article} />
            })}
          </div>
        </div>
        <Link href="/blog/all">
          <Button className="mx-auto">{LABELS.COMMON.MORE_POSTS}</Button>
        </Link>
      </div>
    </div>
  )
}
