import { useTranslation } from "@/app/i18n"
import { AppContent } from "../ui/app-content"
import { getArticles } from "@/lib/blog"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Icons } from "../icons"

export async function BlogRecentArticles({ lang }: { lang: any }) {
  const articles = getArticles(5)
  const { t } = await useTranslation(lang, "blog-page")

  const lastArticle = articles[0]
  const otherArticles = articles.slice(1)

  const imageUrl = `/articles/${lastArticle.id}/${lastArticle.image}`

  return (
    <div className="py-10 lg:py-16">
      <AppContent>
        <div className="flex flex-col gap-10">
          <h3 className="text-base font-bold font-sans text-center uppercase tracking-[3.36px]">
            {t("recentArticles")}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="flex flex-col gap-5 lg:col-span-2">
              <Image
                src={imageUrl}
                alt={lastArticle.title}
                width={1000}
                height={1000}
                className="w-full"
              />
              <Link
                href={`/blog/${lastArticle.id}`}
                className="group duration-200 flex flex-col gap-[10px] text-left"
              >
                <h4 className="text-3xl font-bold font-display group-hover:text-anakiwa-500 transition-colors">
                  {lastArticle.title}
                </h4>
                <span className="text-sm font-sans text-tuatara-400 uppercase">
                  {lastArticle.authors?.join(", ")}
                </span>
                {lastArticle.tldr && (
                  <span className="text-base font-sans text-tuatara-950 font-normal">
                    {lastArticle.tldr}
                  </span>
                )}
              </Link>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-1">
              {otherArticles.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.id}`}
                  className={cn("group border-b pb-4")}
                >
                  <h4 className="text-xl font-medium text-tuatara-950 duration-200 group-hover:text-anakiwa-500 transition-colors">
                    {article.title}
                  </h4>
                  {article.authors && (
                    <span className="text-sm font-sans text-tuatara-400 uppercase">
                      {article.authors?.join(", ")}
                    </span>
                  )}
                </Link>
              ))}
              <Link href="/blog">
                <Button className="uppercase">
                  <div className="flex items-center gap-2">
                    <span>{t("seeMore")}</span>
                    <Icons.arrowRight className="w-4 h-4" />
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </AppContent>
    </div>
  )
}
