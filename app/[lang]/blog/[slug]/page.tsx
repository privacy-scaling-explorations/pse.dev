import { blogArticleCardTagCardVariants } from "@/components/blog/blog-article-card"
import { BlogContent } from "@/components/blog/blog-content"
import { AppContent } from "@/components/ui/app-content"
import { Label } from "@/components/ui/label"
import { Markdown } from "@/components/ui/markdown"
import { getArticles, getArticleById } from "@/lib/blog"

export const generateStaticParams = async () => {
  const articles = getArticles()
  return articles.map(({ id }) => ({
    slug: id,
  }))
}

export async function generateMetadata({ params }: any) {
  const post = getArticleById(params.slug)

  return {
    title: post?.title ? `${post?.title} - Cursive` : "Cursive",
    description:
      post?.tldr ??
      "A cryptography and design lab focused on applications of signed data.",
  }
}

export default function BlogArticle({ params }: any) {
  const slug = params.slug
  const post = getArticleById(slug)

  if (!post) return null
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-center background-gradient z-0">
        <div className="w-full bg-cover-gradient border-b border-tuatara-300">
          <AppContent className="flex flex-col gap-4 py-10 max-w-[978px]">
            <Label.PageTitle label={post?.title} />
            {post?.date || post?.tldr ? (
              <div className="flex flex-col gap-2">
                {post?.date && (
                  <div
                    className={blogArticleCardTagCardVariants({
                      variant: "secondary",
                    })}
                  >
                    {new Date(post?.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                )}
                {post?.tldr && <Markdown>{post?.tldr}</Markdown>}
              </div>
            ) : null}
          </AppContent>
        </div>
      </div>
      <div className="pt-10 md:pt-16 pb-32">
        <BlogContent post={post} />
      </div>
    </div>
  )
}
