import { useTranslation } from "@/app/i18n"
import { AppContent } from "../ui/app-content"
import { getArticles } from "@/lib/blog"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Icons } from "../icons"

export async function BlogRecentArticles({ lang }: { lang: any }) {
  const articles = getArticles({ limit: 4 })
  const { t } = await useTranslation(lang, "blog-page")

  const lastArticle = articles[0]
  const otherArticles = articles.slice(1)

  return (
    <div className="py-10 lg:py-16">
      <AppContent>
        <div className="flex flex-col gap-10">
          <h3 className="text-base font-bold font-sans text-center uppercase tracking-[3.36px]">
            {t("recentArticles")}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-x-14 lg:max-w-[1200px] mx-auto relative">
            <div className="inset-0 relative lg:col-span-3">
              <div
                className="flex flex-col gap-5 w-full items-center aspect-video after:absolute after:inset-0 after:content-[''] after:bg-black after:opacity-20 group-hover:after:opacity-50 transition-opacity duration-200 after:z-[0]"
                style={{
                  backgroundImage: `url(${lastArticle.image ?? "/fallback.webp"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="duration-200 flex flex-col gap-[10px] text-left px-5 lg:px-16 py-6 lg:py-16 relative z-[1] w-full">
                  <Link
                    href={`/blog/${lastArticle.id}`}
                    className="text-4xl font-bold text-white font-display hover:text-anakiwa-400 transition-colors"
                  >
                    {lastArticle.title}
                  </Link>
                  <span className="text-sm font-sans text-white/80 uppercase">
                    {lastArticle.authors?.join(", ")}
                  </span>
                  {lastArticle.tldr && (
                    <span className="text-base font-sans text-white/80 font-normal line-clamp-2 lg:line-clamp-3">
                      {lastArticle.tldr}
                    </span>
                  )}
                  <Link href={`/blog/${lastArticle.id}`} className="ml-auto">
                    <Button
                      className="uppercase ml-auto mt-4"
                      variant="secondary"
                    >
                      <div className="flex items-center gap-2">
                        <span className="!text-center">{t("readMore")}</span>
                        <Icons.arrowRight className="w-4 h-4" />
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-2">
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
              <Link href="/blog" className="mt-auto">
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
