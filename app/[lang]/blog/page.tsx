import { useTranslation } from "@/app/i18n"
import { BlogArticles } from "@/components/blog/blog-articles"
import { AppContent } from "@/components/ui/app-content"
import { Label } from "@/components/ui/label"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "",
}

const BlogPage = async ({ params: { lang } }: any) => {
  const { t } = await useTranslation(lang, "blog-page")

  return (
    <div className="flex flex-col">
      <div className="w-full bg-cover-gradient border-b border-tuatara-300">
        <AppContent className="flex flex-col gap-4 py-10 w-full">
          <Label.PageTitle label={t("title")} />
          <h6 className="font-sans text-base font-normal text-tuatara-950 md:text-[18px] md:leading-[27px] md:max-w-[700px]">
            {t("subtitle")}
          </h6>
        </AppContent>
      </div>

      <AppContent className="flex flex-col gap-10 py-10">
        <BlogArticles />
      </AppContent>
    </div>
  )
}

export default BlogPage
