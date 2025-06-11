import { LABELS } from "@/app/labels"
import { blogArticleCardTagCardVariants } from "@/components/blog/blog-article-card"
import { BlogContent } from "@/components/blog/blog-content"
import { AppContent } from "@/components/ui/app-content"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Markdown } from "@/components/ui/markdown"
import { getArticles, getArticleById } from "@/lib/markdownContentFetch"
import { cn, getBackgroundImage } from "@/lib/utils"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export const generateStaticParams = async () => {
  const articles = await getArticles()
  return articles.map(({ id }) => ({
    slug: id,
  }))
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = await getArticleById(params.slug)

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found",
    }
  }

  const imageUrl =
    post && (post?.image ?? "")?.length > 0 ? post?.image : "/og-image.png"

  const metadata: Metadata = {
    title: `${post?.title} - ${LABELS.COMMON.SITE_TITLE}`,
    description: post?.tldr,
    openGraph: {
      images: [{ url: imageUrl as string, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [imageUrl as string],
    },
  }

  if (post && "canonical" in post) {
    metadata.alternates = {
      canonical: post.canonical as string,
    }
  }

  return metadata
}

export default async function BlogArticle({ params }: any) {
  const slug = params.slug
  const post = await getArticleById(slug)

  if (!post) {
    notFound()
  }

  const imageUrl = getBackgroundImage(post?.image)

  const imageAsCover = true

  const isNewsletter =
    post?.title?.toLowerCase().includes("newsletter") ||
    post?.tags?.includes("newsletter") ||
    post?.tldr?.toLowerCase()?.includes("newsletter")

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-center z-0 relative">
        <div
          className={cn(
            "absolute inset-0 bg-cover",
            imageAsCover
              ? "bg-cover after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-20 bg-center"
              : "bg-cover-gradient"
          )}
          style={{
            backgroundImage:
              imageAsCover && imageUrl?.length > 0
                ? `url(${imageUrl})`
                : undefined,
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
                <div className="flex flex-wrap gap-2">
                  {post?.tags?.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${tag}`}>
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
        <BlogContent post={post} isNewsletter={isNewsletter} />
      </div>
    </div>
  )
}
