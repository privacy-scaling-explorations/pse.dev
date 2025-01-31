import { getBlogPosts } from "@/lib/blog"
import Link from "next/link"

export const BlogList = ({ lang }: { lang: string }) => {
  const blogs = getBlogPosts()
  return (
    <div className="grid grid-cols-1 gap-6">
      {blogs.map((blog, index) => (
        <div key={index} className="group flex flex-col overflow-hidden rounded-lg transition duration-200 ease-in min-h-[120px] border border-slate-900/20">
          <div className="flex flex-col justify-between h-full gap-8 p-4 bg-white rounded-b-lg ">
            <div className="flex flex-col justify-start gap-2">
              <Link href={`/${lang}/reports/blog/${blog.id}`}>
                <h1 className="text-2xl font-bold leading-7 text-black duration-200 cursor-pointer hover:text-anakiwa-500">
                  {blog.title}
                </h1>
              </Link>
              <div className="flex flex-col h-12 gap-4">
                <p className="text-slate-900/80 line-clamp-2">
                  {blog.tldr}
                </p>
              </div>
            </div>
            <Link href={`/${lang}/reports/blog/${blog.id}`}>
              <span className="text-sm text-slate-500 underline">
                Read more
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
