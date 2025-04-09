import Blog, { Article, getArticles } from "@/lib/blog"
import Link from "next/link"
import { AppContent } from "../ui/app-content"
import { Markdown } from "../ui/markdown"
import { BlogArticleCard } from "./blog-article-card"
interface BlogContentProps {
  post: Article
}

interface BlogImageProps {
  image: string
  alt?: string
  description?: string
}

export function BlogImage({ image, alt, description }: BlogImageProps) {
  return (
    <div className="flex flex-col">
      <img src={image} alt={alt} className="mb-1" />
      {alt && (
        <span className="font-semibold text-black text-center capitalize text-sm">
          {alt}
        </span>
      )}
      {description && (
        <span className="font-normal text-gray-600 dark:text-gray-200 text-center text-sm mt-2">
          {description}
        </span>
      )}
    </div>
  )
}

export async function BlogContent({ post }: BlogContentProps) {
  const articles = getArticles() ?? []
  const articleIndex = articles.findIndex((article) => article.id === post.id)

  const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null

  const nextArticle =
    articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null

  const moreArticles = [prevArticle, nextArticle].filter(Boolean) as Article[]

  return (
    <AppContent className="max-w-[978px]">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <Markdown>{post?.content ?? ""}</Markdown>
        </div>

        {moreArticles?.length > 0 && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <span className="text-tuatara-950 text-lg font-semibold leading-6">
                More articles
              </span>
              <Link
                href="/blog"
                className="text-black font-bold  text-base leading-6 hover:underline hover:text-anakiwa-500"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {moreArticles.map(
                ({
                  id,
                  title,
                  image,
                  tldr = "",
                  date,
                  content,
                  authors,
                }: Article) => {
                  const url = `/blog/${id}`
                  return (
                    <Link
                      href={url}
                      key={id}
                      className="flex-1 w-full h-full group hover:opacity-90 transition-opacity duration-300 rounded-xl overflow-hidden bg-white shadow-sm border border-slate-900/10"
                    >
                      <BlogArticleCard
                        id={id}
                        image={image}
                        title={title}
                        date={date}
                        content={content}
                        authors={authors}
                        tldr={tldr}
                      />
                    </Link>
                  )
                }
              )}
            </div>
          </div>
        )}
      </div>
    </AppContent>
  )
}
