"use client"

import { LocaleTypes } from "@/app/i18n/settings"
import { ProjectInterface } from "@/lib/types"
import { AppContent } from "../ui/app-content"
import { Article } from "@/lib/blog"
import { useEffect, useState } from "react"
import { ArticleListCard } from "./article-list-card"

async function fetchArticles(project: string) {
  const response = await fetch(`/api/articles?project=${project}`)
  const data = await response.json()
  return data.articles
}

export const ProjectBlogArticles = ({
  project,
  lang,
}: {
  project: ProjectInterface
  lang: LocaleTypes
}) => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles(project.id)
        setArticles(data)
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setLoading(false)
      }
    }

    getArticles()
  }, [project.id])

  // Show loading state
  if (loading) {
    return (
      <div className="py-10 lg:py-16 w-full">
        <AppContent>
          <div className="flex flex-col gap-10">
            <h3 className="text-base font-bold font-sans text-left uppercase tracking-[3.36px]">
              Related articles
            </h3>
            <div className="grid grid-cols-1 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex h-full animate-pulse">
                  <div className="flex-1 w-full rounded-xl overflow-hidden bg-slate-200 h-64"></div>
                </div>
              ))}
            </div>
          </div>
        </AppContent>
      </div>
    )
  }

  if (articles.length === 0 && !loading) {
    return null
  }

  return (
    <div className="py-10 lg:py-16 w-full">
      <div className="flex flex-col gap-10">
        <h3 className="text-[22px] font-bold text-tuatara-700">
          Related articles
        </h3>
        <div className="grid grid-cols-1 gap-4 lg:gap-8">
          {articles.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No articles found for this project.
            </p>
          )}
          {articles.map((article: Article) => {
            return (
              <ArticleListCard key={article.id} lang={lang} article={article} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
