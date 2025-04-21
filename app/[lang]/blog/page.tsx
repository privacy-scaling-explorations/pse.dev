import { useTranslation } from "@/app/i18n"
import { BlogArticles } from "@/components/blog/blog-articles"
import { AppContent } from "@/components/ui/app-content"
import { Label } from "@/components/ui/label"
import { Metadata } from "next"
import { Suspense } from "react"

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
        <Suspense
          fallback={
            <div className="flex justify-center py-10">Loading articles...</div>
          }
        >
          <BlogArticles lang={lang} tag={tag} />
        </Suspense>
      </AppContent>
    </div>
  )
}

export default BlogPage
