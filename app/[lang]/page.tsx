import { Divider } from "@/components/divider"
import { NewsSection } from "@/components/sections/NewsSection"
import { WhatWeDo } from "@/components/sections/WhatWeDo"

import { BlogRecentArticles } from "@/components/blog/blog-recent-articles"
import { HomepageHeader } from "@/components/sections/HomepageHeader"
import { HomepageBanner } from "@/components/sections/HomepageBanner"
import { Suspense } from "react"

function BlogSection({ lang }: { lang: string }) {
  return (
    <Suspense
      fallback={
        <div className="py-10 lg:py-16 text-center">
          Loading recent articles...
        </div>
      }
    >
      {/* @ts-expect-error - This is a valid server component pattern */}
      <BlogRecentArticles lang={lang} />
    </Suspense>
  )
}

export default function IndexPage({ params: { lang } }: any) {
  return (
    <section className="flex flex-col">
      <Divider.Section>
        <HomepageHeader lang={lang} />

        <BlogSection lang={lang} />

        <WhatWeDo lang={lang} />

        <HomepageBanner lang={lang} />
      </Divider.Section>
    </section>
  )
}
