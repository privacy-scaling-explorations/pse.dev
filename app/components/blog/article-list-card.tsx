import Link from "next/link"
import { Article } from "@/lib/types"
import { getBackgroundImage } from "@/lib/utils"

export const ArticleListCard = ({
  article,
  lineClamp = false,
}: {
  article: Article
  lineClamp?: boolean
}) => {
  const url = `/blog/${article.id}`

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const tldr = lineClamp
    ? (article.tldr || "").replace(/\n/g, " ").substring(0, 120) +
      (article.tldr && article.tldr.length > 120 ? "..." : "")
    : article.tldr || ""

  const backgroundImage = getBackgroundImage(article?.image)

  return (
    <div className="flex h-full">
      <Link
        className="full group cursor-pointer hover:scale-105 duration-300"
        href={url}
        rel="noreferrer"
      >
        <div className="grid grid-cols-[80px_1fr] lg:grid-cols-[120px_1fr] items-center gap-4 lg:gap-10">
          <div
            className="size-[80px] lg:size-[120px] rounded-full bg-cover bg-center bg-anakiwa-100 border border-anakiwa-200 flex-shrink-0"
            style={{
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : "",
            }}
          />
          <div className="flex flex-col gap-2 lg:gap-4 w-full justify-center">
            <span className="text-tuatara-950 font-display font-bold text-[18px] lg:text-[22px] leading-5 lg:leading-6 line-clamp-2 group-hover:text-anakiwa-500 transition group-hover:underline">
              {article.title}
            </span>
            {tldr && (
              <span className="text-tuatara-500 text-sm lg:text-base font-normal line-clamp-3 leading-[150%]">
                {tldr}
              </span>
            )}
            <span className="text-tuatara-400 text-xs font-normal">
              {formattedDate}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
