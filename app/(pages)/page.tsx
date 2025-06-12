import { Divider } from "@/components/divider"
import { WhatWeDo } from "@/components/sections/WhatWeDo"
import { HomepageVideoFeed } from "@/components/sections/HomepageVideoFeed"
import { BlogRecentArticles } from "@/components/blog/blog-recent-articles"
import { HomepageHeader } from "@/components/sections/HomepageHeader"
import { HomepageBanner } from "@/components/sections/HomepageBanner"
import { Suspense } from "react"
import { getArticles } from "@/lib/markdownContentFetch"

async function BlogSection() {
  const articles = await getArticles({ limit: 4 })

  return (
    <Suspense
      fallback={
        <div className="py-10 lg:py-16 text-center">
          Loading recent articles...
        </div>
      }
    >
      <BlogRecentArticles articles={articles} />
    </Suspense>
  )
}

export default function IndexPage() {
  return (
    <section className="flex flex-col">
      <Divider.Section>
        <HomepageHeader />

        <BlogSection />

        <HomepageVideoFeed />

        <WhatWeDo />

        <HomepageBanner />
      </Divider.Section>
    </section>
  )
}
