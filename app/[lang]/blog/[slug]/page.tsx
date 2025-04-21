import { blogArticleCardTagCardVariants } from "@/components/blog/blog-article-card"
import { BlogContent } from "@/components/blog/blog-content"
import { AppContent } from "@/components/ui/app-content"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Markdown } from "@/components/ui/markdown"
import { getArticles, getArticleById } from "@/lib/blog"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

export const generateStaticParams = async () => {
  try {
    const articles = await getArticles()
    return articles.map(({ id }) => ({
      slug: id,
    }))
  } catch (error) {
    console.error("Error generating static params for blog articles:", error)
    return []
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  try {
    const post = await getArticleById(params.slug)

    if (!post) {
      return {
        title: "Article Not Found",
        description: "The requested article could not be found.",
      }
    }

    const imageUrl =
      (post?.image ?? "")?.length > 0
        ? `/articles/${post?.id}/${post?.image}`
        : "/og-image.png"

    const metadata: Metadata = {
      title: post?.title,
      description: post?.tldr,
      openGraph: {
        images: [{ url: imageUrl, width: 1200, height: 630 }],
      },
    }

    // Add canonical URL if post has canonical property
    if (post && "canonical" in post) {
      metadata.alternates = {
        canonical: post.canonical as string,
      }
    }

    return metadata
  } catch (error) {
    console.error(`Error generating metadata for slug ${params.slug}:`, error)
    return {
      title: "Blog Article",
      description: "An error occurred while loading this article.",
    }
  }
}

export default async function BlogArticle({ params }: any) {
  try {
    const slug = params.slug
    const post = await getArticleById(slug)

    if (!post) {
      notFound()
    }

    return (
      <div className="flex flex-col">
        <div className="flex items-start justify-center background-gradient z-0">
          <div className="w-full bg-cover-gradient border-b border-tuatara-300">
            <AppContent className="flex flex-col gap-8 py-10 max-w-[978px]">
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
                  {post?.canonical && (
                    <div className="text-sm italic text-gray-500 mt-1">
                      This post was originally posted in{" "}
                      <a
                        href={post.canonical}
                        target="_blank"
                        rel="noopener noreferrer canonical"
                        className="text-primary hover:underline"
                      >
                        {new URL(post.canonical).hostname.replace(/^www\./, "")}
                      </a>
                    </div>
                  )}
                  {post?.tldr && <Markdown>{post?.tldr}</Markdown>}
                </div>
              ) : null}
              {(post?.tags ?? [])?.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-sm italic text-tuatara-950">Tags:</span>
                  <div className="flex gap-2">
                    {post?.tags?.map((tag) => (
                      <Link key={tag} href={`/${params.lang}/blog?tag=${tag}`}>
                        <Button size="xs">{tag}</Button>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </AppContent>
          </div>
        </div>
        <div className="pt-10 md:pt-16 pb-32">
          <BlogContent post={post} lang={params.lang} />
        </div>
      </div>
    )
  } catch (error) {
    console.error(`Error rendering blog article ${params.slug}:`, error)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold mb-4">Error Loading Article</h1>
        <p className="text-gray-600 mb-8">
          There was a problem loading this article. Please try again later.
        </p>
        <Link href={`/${params.lang}/blog`}>
          <Button>Return to Blog</Button>
        </Link>
      </div>
    )
  }
}
