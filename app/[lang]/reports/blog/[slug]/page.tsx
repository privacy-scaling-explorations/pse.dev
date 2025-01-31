import Link from "next/link";
import { Icons } from "@/components/icons";
import { BlogContent } from "../BlogContent";

export default function BlogPageBySlug({
  params: { slug, lang },
}: {
  params: { slug: string; lang: string }
})  {
  return (
    <div className="flex flex-col">
      <BlogContent
        slug={slug}
        header={
          <Link
            className="flex items-center gap-2 text-tuatara-950/80 hover:text-tuatara-950"
            href={`/${lang}/reports/blog`}
          >
            <Icons.arrowLeft />
            <span className="font-sans text-base">Back</span>
          </Link>
        }
      />
    </div>
  )
}