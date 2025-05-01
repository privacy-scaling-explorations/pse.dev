"use client"

import { LocaleTypes } from "@/app/i18n/settings"
import { ProjectInterface } from "@/lib/types"
import { AppContent } from "../ui/app-content"
import { Article } from "@/lib/blog"
import Link from "next/link"
import { BlogArticleCard } from "./blog-article-card"
import { useEffect, useState } from "react"

async function fetchArticles(project: string) {
  const response = await fetch(`/api/articles?project=${project}`)
  const data = await response.json()
  return data.articles
}

function ArticlesGrid({
  articles,
  lang,
}: {
  articles: Article[]
  lang: string
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {articles.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          No articles found for this project.
        </p>
      )}
      {articles.map(
        ({ id, title, image, tldr = "", date, authors, content }: Article) => {
          const url = `/${lang}/blog/${id}`
          return (
            <div key={id} className="flex h-full">
              <Link
                className="flex-1 w-full hover:opacity-90 transition-opacity duration-300 rounded-xl overflow-hidden bg-white shadow-sm border border-slate-900/10"
                href={url}
                rel="noreferrer"
              >
                <BlogArticleCard
                  id={id}
                  image={image}
                  title={title}
                  date={date}
                  authors={authors}
                  content={content}
                />
              </Link>
            </div>
          )
        }
      )}
    </div>
  )
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
            <h3 className="text-base font-bold font-sans text-center uppercase tracking-[3.36px]">
              Related articles
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
      <AppContent>
        <div className="flex flex-col gap-10">
          <h3 className="text-base font-bold font-sans text-center uppercase tracking-[3.36px]">
            Related articles
          </h3>
          <ArticlesGrid articles={articles} lang={lang} />
        </div>
      </AppContent>
    </div>
  )
}
