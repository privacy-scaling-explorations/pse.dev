"use client"
import Link from "next/link"
import { Markdown } from "../ui/markdown"
import { Article } from "@/lib/blog"
import { useRouter } from "next/navigation"

export const ArticleListCard = ({
  lang,
  article,
  lineClamp = false,
}: {
  lang: string
  article: Article
  lineClamp?: boolean
}) => {
  const url = `/${lang}/blog/${article.id}`

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const router = useRouter()

  const tldr = lineClamp
    ? (article.tldr || "").replace(/\n/g, " ").substring(0, 120) +
      (article.tldr && article.tldr.length > 120 ? "..." : "")
    : article.tldr || ""

  return (
    <div className="flex h-full">
      <div
        className="flex-1 w-full group cursor-pointer"
        onClick={() => {
          router.push(url)
        }}
        rel="noreferrer"
      >
        <div className="grid grid-cols-[80px_1fr] lg:grid-cols-[120px_1fr] items-center gap-4 lg:gap-10">
          <div
            className="size-[80px] lg:size-[120px] rounded-full bg-slate-200"
            style={{
              backgroundImage: `url(${article.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="flex flex-col gap-2 lg:gap-5">
            <div className="flex flex-col gap-2 order-2 lg:order-1">
              <span className="text-xs font-display lg:text-[22px] font-bold text-tuatara-950 group-hover:text-anakiwa-500 group-hover:underline duration-200 leading-none">
                {article.title}
              </span>
              <span className="lg:uppercase text-tuatara-400 lg:text-sm text-[10px] leading-none font-inter">
                {article.authors?.map((author) => author).join(", ")}
              </span>
              <div className="hidden lg:block">
                <Markdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="font-sans text-sm text-tuatara-600 group-hover:text-tuatara-950 duration-200">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="font-sans text-sm text-tuatara-600 group-hover:text-tuatara-950 duration-200">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="font-sans text-sm text-tuatara-600 group-hover:text-tuatara-950 duration-200">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="font-sans text-sm text-tuatara-600 group-hover:text-tuatara-950 duration-200">
                        {children}
                      </h4>
                    ),
                    h5: ({ children }) => (
                      <h5 className="font-sans text-sm text-tuatara-600 group-hover:text-tuatara-950 duration-200">
                        {children}
                      </h5>
                    ),
                    h6: ({ children }) => (
                      <h6 className="font-sans text-sm text-tuatara-600 group-hover:text-tuatara-950 duration-200">
                        {children}
                      </h6>
                    ),
                    p: ({ children }) => (
                      <p className="font-sans text-sm text-tuatara-600 group-hover:text-tuatara-950 duration-200">
                        {children}
                      </p>
                    ),
                    img: ({ src, alt }) => null,
                  }}
                >
                  {tldr}
                </Markdown>
              </div>
            </div>
            <span
              className="order-1 lg:order-2 text-[10px] font-bold tracking-[2.1px] text-tuatara-400 font-sans
         uppercase"
            >
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
