import { ReportContent } from "../ReportContent"
import Link from "next/link";
import { Icons } from "@/components/icons";

export default function ReportPageBySlug({
  params: { slug, lang },
}: {
  params: { slug: string; lang: string }
})  {
  return (
    <div className="flex flex-col">
      <ReportContent
        slug={slug}
        header={
          <Link
            className="flex items-center gap-2 text-tuatara-950/80 hover:text-tuatara-950"
            href={`/${lang}/reports/list`}
          >
            <Icons.arrowLeft />
            <span className="font-sans text-base">Back to Reports</span>
          </Link>
        }
      />
    </div>
  )
}

