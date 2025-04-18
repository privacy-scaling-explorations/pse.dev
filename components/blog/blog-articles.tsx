import { Article } from "@/lib/blog"
import Link from "next/link"
import { BlogArticleCard } from "./blog-article-card"

interface BlogArticlesProps {
  articles: Article[]
  lang: string // Add lang prop for correct linking
}

export const BlogArticles = ({ articles, lang }: BlogArticlesProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {articles.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          No articles found for this tag.
        </p>
      )}
      {articles.map(
        ({ id, title, image, tldr = "", date, authors, content }: Article) => {
          // Use lang parameter for correct article URL
          const url = `/${lang}/blog/${id}`
          return (
            <Link
              className="flex-1 w-full h-full group hover:opacity-90 transition-opacity duration-300 rounded-xl overflow-hidden bg-white shadow-sm border border-slate-900/10"
              key={id}
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
          )
        }
      )}
    </div>
  )
}
