import { useTranslation } from "@/app/i18n"
import { AppContent } from "@/components/ui/app-content"
import { Label } from "@/components/ui/label"
import { Metadata } from "next"
import { Suspense } from "react"
import { Article, getArticles } from "@/lib/blog"
import { BlogArticleCard } from "@/components/blog/blog-article-card"
import Link from "next/link"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog",
  description: "",
}

interface BlogPageProps {
  params: { lang: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

const ArticlesGrid = ({
  articles,
  lang,
}: {
  articles: Article[]
  lang: string
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {articles.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          No articles found for this tag.
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

const BlogPage = async ({ params: { lang }, searchParams }: BlogPageProps) => {
  const { t } = await useTranslation(lang, "blog-page")

  const tag = searchParams?.tag as string | undefined
  const articles =
    getArticles({
      tag,
    }) ?? []

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

      <AppContent className="flex flex-col gap-10 py-10">
        <Suspense
          fallback={
            <div className="flex justify-center py-10">Loading articles...</div>
          }
        >
          <ArticlesGrid articles={articles} lang={lang} />
        </Suspense>
      </AppContent>
    </div>
  )
}

export default BlogPage
