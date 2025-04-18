import { useTranslation } from "@/app/i18n"
import { BlogArticles } from "@/components/blog/blog-articles"
import { AppContent } from "@/components/ui/app-content"
import { Label } from "@/components/ui/label"
import { getArticles } from "@/lib/blog"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "",
}

interface BlogPageProps {
  params: { lang: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

const BlogPage = async ({ params: { lang }, searchParams }: BlogPageProps) => {
  const { t } = await useTranslation(lang, "blog-page")

  // Get the tag from searchParams
  const tag = searchParams?.tag as string | undefined

  // Fetch articles, filtering by tag if present
  const articles = await getArticles({ tag })

  return (
    <div className="flex flex-col">
      <div className="w-full bg-page-header-gradient">
        <AppContent className="flex flex-col gap-4 py-10 w-full">
          <Label.PageTitle label={t("title")} />
          {tag && (
            <h2 className="text-xl font-semibold text-tuatara-800">
              {`Filtered by tag: "${tag}"`}
            </h2>
          )}
          <h6 className="font-sans text-base font-normal text-tuatara-950 md:text-[18px] md:leading-[27px] md:max-w-[700px]">
            {t("subtitle")}
          </h6>
        </AppContent>
      </div>

      <AppContent className="flex flex-col gap-10 py-10">
        {/* Pass fetched articles and lang to the component */}
        <BlogArticles articles={articles} lang={lang} />
      </AppContent>
    </div>
  )
}

export default BlogPage
