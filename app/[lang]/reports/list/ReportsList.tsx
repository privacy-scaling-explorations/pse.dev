import { Button } from "@/components/ui/button"
import { getReports } from "@/lib/reports"
import Link from "next/link"

export const ReportsList = ({ lang }: { lang: string }) => {
  const reports = getReports()
  return (
    <div className="grid grid-cols-1 gap-6">
      {reports.map((report) => (
        <div className="group flex flex-col overflow-hidden rounded-lg transition duration-200 ease-in min-h-[120px] border border-slate-900/20">
          <div className="flex flex-col justify-between h-full gap-8 p-4 bg-white rounded-b-lg ">
            <div className="flex flex-col justify-start gap-2">
              <Link href={`/${lang}/reports/list/${report.id}`}>
                <h1 className="text-2xl font-bold leading-7 text-black duration-200 cursor-pointer hover:text-anakiwa-500">
                  {report.title}
                </h1>
              </Link>
              <div className="flex flex-col h-16 gap-4">
                <p className="text-slate-900/80 line-clamp-2">
                  {report.tldr}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">HTML</Button>
              <Button variant="outline">PDF</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
