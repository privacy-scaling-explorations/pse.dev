import { LABELS } from "@/app/labels"
import { AppContent } from "../ui/app-content"
import { getArticles, Article } from "@/lib/content"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Icons } from "../icons"

const ArticleInEvidenceCard = ({
  article,
  showReadMore = false,
  size = "lg",
  variant = "default",
  className,
  asLink = false,
  titleClassName = "",
  contentClassName = "",
  showDate = true,
}: {
  article: Article
  showReadMore?: boolean
  size?: "sm" | "lg" | "xl"
  variant?: "default" | "compact" | "xl"
  className?: string
  asLink?: boolean
  titleClassName?: string
  contentClassName?: string
  showDate?: boolean
}) => {
  const hideTldr = variant === "compact"

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const AsLinkWrapper = ({
    children,
    href,
    asLink,
  }: {
    children: React.ReactNode
    href: string
    asLink: boolean
  }) => {
    return asLink ? (
      <Link className="group" href={href}>
        {children}
      </Link>
    ) : (
      <>{children}</>
    )
  }

  return (
    <AsLinkWrapper href={`/blog/${article.id}`} asLink={asLink}>
      <div
        className={cn(
          "min-h-[177px] lg:min-h-[190px] relative flex flex-col gap-5 w-full items-center after:absolute after:inset-0 after:content-[''] after:bg-black after:opacity-20 group-hover:after:opacity-80 transition-opacity duration-300 after:z-[0]",
          {
            "aspect-video": !className?.includes("h-full"),
          },
          className
        )}
        style={{
          backgroundImage: `url(${article.image ?? "/fallback.webp"})`,
          backgroundSize: "cover",
          backgroundPosition: "center centers",
        }}
      >
        <div
          className={cn(
            "duration-200 flex flex-col gap-[10px] text-left relative z-[1] w-full h-full",
            {
              "px-5 lg:px-16 py-6 lg:py-16 ": size === "lg",
              "px-6 py-4 lg:p-8": size === "sm",
              "px-6 lg:p-16": size === "xl",
            },
            contentClassName
          )}
        >
          {article.date && showDate && (
            <span className="text-white text-xs font-sans font-bold tracking-[2.5px] text-left uppercase">
              {formatDate(article.date)}
            </span>
          )}
          <Link
            href={`/blog/${article.id}`}
            className={cn(
              " text-white font-display hover:text-anakiwa-400 transition-colors",
              {
                "text-[20px] font-semibold lg:font-bold lg:text-lg line-clamp-2 mt-auto":
                  variant === "compact",
                "text-[20px] font-semibold lg:font-bold line-clamp-3 mt-auto":
                  variant === "default",
                "text-[20px] font-bold lg:!text-[40px] lg:!leading-[44px] mt-auto":
                  variant === "xl",
              },
              titleClassName
            )}
          >
            {article.title}
          </Link>
          <span className="text-sm text-white/80 uppercase font-inter">
            {article.authors?.join(", ")}
          </span>
          {article.tldr && !hideTldr && (
            <span
              className={
                "text-sm font-sans text-white font-normal line-clamp-2 lg:line-clamp-5 mt-auto hidden lg:block"
              }
            >
              {article.tldr}
            </span>
          )}
          {showReadMore && (
            <Link href={`/blog/${article.id}`} className="ml-auto mt-4">
              <Button className="uppercase ml-auto" variant="secondary">
                <div className="flex items-center gap-2">
                  <span className="!text-center">Read More</span>
                  <Icons.arrowRight className="w-4 h-4" />
                </div>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </AsLinkWrapper>
  )
}

export async function BlogRecentArticles() {
  const articles = getArticles({ limit: 4 })

  const lastArticle = articles[0]
  const otherArticles = articles.slice(1)

  return (
    <div className="py-10 lg:py-16">
      <AppContent>
        <div className="flex flex-col gap-10">
          <h3 className="font-sans text-base font-bold uppercase tracking-[4px] text-primary text-center">
            {LABELS.BLOG_PAGE.RECENT_ARTICLES}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-x-14 lg:max-w-[1200px] mx-auto relative">
            <div className="inset-0 relative lg:col-span-3">
              <ArticleInEvidenceCard
                article={lastArticle}
                showReadMore
                showDate={false}
                variant="xl"
                size="xl"
              />
            </div>

            <div className="flex flex-col gap-6 lg:col-span-2">
              {otherArticles.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.id}`}
                  className={cn("group border-b pb-4")}
                >
                  <h4 className="text-xl font-medium text-primary duration-200 group-hover:text-anakiwa-500 transition-colors">
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
                    <span>{LABELS.BLOG_PAGE.SEE_MORE}</span>
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
