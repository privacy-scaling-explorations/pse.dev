import { ProjectInterface } from "@/lib/types"
import { AppContent } from "../ui/app-content"
import { Article } from "@/lib/types"
import { ArticleListCard } from "./article-list-card"

export const ProjectBlogArticles = ({
  project,
  articles = [],
}: {
  project: ProjectInterface
  articles?: Article[]
}) => {
  // Don't render anything if no articles
  if (articles.length === 0) {
    return null
  }

  return (
    <div
      id="related-articles"
      data-section-id="related-articles"
      className="py-10 lg:py-16 w-full"
    >
      <div className="flex flex-col gap-10">
        <h3 className="text-[22px] font-bold text-tuatara-700">
          Related articles
        </h3>
        <div className="grid grid-cols-1 gap-4 lg:gap-8">
          {articles.map((article: Article) => {
            return <ArticleListCard key={article.id} article={article} />
          })}
        </div>
      </div>
    </div>
  )
}
