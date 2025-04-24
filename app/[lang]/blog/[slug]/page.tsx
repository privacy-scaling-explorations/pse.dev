import { blogArticleCardTagCardVariants } from "@/components/blog/blog-article-card"
import { BlogContent } from "@/components/blog/blog-content"
import { AppContent } from "@/components/ui/app-content"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { createMarkdownElement, Markdown } from "@/components/ui/markdown"
import { getArticles, getArticleById } from "@/lib/blog"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import Link from "next/link"

export const dynamic = "force-dynamic"

export const generateStaticParams = async () => {
  const articles = await getArticles()
  return articles.map(({ id }) => ({
    slug: id,
  }))
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = await getArticleById(params.slug)

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
}

export default function BlogArticle({ params }: any) {
  const slug = params.slug
  const post = getArticleById(slug)

  const imageUrl =
    (post?.image ?? "")?.length > 0
      ? `/articles/${post?.id}/${post?.image}`
      : undefined

  const imageAsCover = post?.coverImage ?? false

  if (!post) return null
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-center z-0 relative">
        <div
          className={cn(
            "absolute inset-0 bg-cover",
            imageAsCover
              ? "bg-cover after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-10 bg-center"
              : "bg-cover-gradient"
          )}
          style={{
            backgroundImage: imageAsCover ? `url(${imageUrl})` : undefined,
          }}
        />
        <div className="flex items-start justify-center z-0 bg-cover border-tuatara-300 border-b w-full">
          <AppContent className="flex flex-col gap-8 py-10 max-w-[978px]">
            <Label.PageTitle
              label={post?.title}
              className={cn(imageAsCover && "text-white")}
            />
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
                  <div
                    className={cn(
                      "text-sm italic  mt-1",
                      imageAsCover ? "text-white" : "text-gray-500"
                    )}
                  >
                    This post was originally posted in{" "}
                    <a
                      href={post.canonical}
                      target="_blank"
                      rel="noopener noreferrer canonical"
                      className={cn(
                        "text-primary hover:underline",
                        imageAsCover ? "text-white" : "text-gray-500"
                      )}
                    >
                      {new URL(post.canonical).hostname.replace(/^www\./, "")}
                    </a>
                  </div>
                )}
                {post?.tldr && (
                  <Markdown darkMode={imageAsCover}>{post?.tldr}</Markdown>
                )}
              </div>
            ) : null}
            {(post?.tags ?? [])?.length > 0 && (
              <div className="flex flex-col gap-2">
                <span
                  className={cn(
                    "text-sm italic",
                    imageAsCover ? "text-white" : "text-tuatara-950"
                  )}
                >
                  Tags:
                </span>
                <div className="flex gap-2">
                  {post?.tags?.map((tag) => (
                    <Link key={tag} href={`/${params.lang}/blog?tag=${tag}`}>
                      <Button
                        size="xs"
                        variant={imageAsCover ? "secondary" : "default"}
                      >
                        {tag}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </AppContent>
        </div>
      </div>
      <div className="pt-10 md:pt-16 pb-32">
        <BlogContent post={post} />
      </div>
    </div>
  )
}
