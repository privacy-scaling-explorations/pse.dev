import { Divider } from "@/components/divider"
import { NewsSection } from "@/components/sections/NewsSection"
import { WhatWeDo } from "@/components/sections/WhatWeDo"
import { HomepageVideoFeed } from "@/components/sections/HomepageVideoFeed"

import { BlogRecentArticles } from "@/components/blog/blog-recent-articles"
import { HomepageHeader } from "@/components/sections/HomepageHeader"
import { HomepageBanner } from "@/components/sections/HomepageBanner"
import { Suspense } from "react"

function BlogSection() {
  return (
    <Suspense
      fallback={
        <div className="py-10 lg:py-16 text-center">
          Loading recent articles...
        </div>
      }
    >
      {/* @ts-expect-error - This is a valid server component pattern */}
      <BlogRecentArticles />
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
