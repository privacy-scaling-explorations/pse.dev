import { WhatWeDo } from "@/components/sections/WhatWeDo"
import { HomepageVideoFeed } from "@/components/sections/HomepageVideoFeed"

import { BlogRecentArticles } from "@/components/blog/blog-recent-articles"
import { HomepageHeader } from "@/components/sections/HomepageHeader"
import { HomepageBanner } from "@/components/sections/HomepageBanner"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { LABELS } from "../labels"
import { Icons } from "@/components/icons"
import Link from "next/link"

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
    <section className="flex flex-col w-full">
      <HomepageHeader />

      <div className="flex flex-col justify-center bg-anakiwa-975 py-16">
        <div className="lg:max-w-[730px] flex flex-col mx-auto gap-10 justify-center items-center">
          <span className="text-white font-sans text-base lg:text-xl text-center">
            {LABELS.HOMEPAGE.MISSION}
          </span>
          <Link href="/about">
            <Button variant="transparent">
              <div className="flex items-center gap-1">
                <span className="text-base font-medium uppercase">
                  {LABELS.HOMEPAGE.MISSION_BUTTON}
                </span>
                <Icons.arrowRight
                  fill="white"
                  className="h-5 duration-200 ease-in-out group-hover:translate-x-2"
                />
              </div>
            </Button>
          </Link>
        </div>
      </div>

      <BlogSection />

      <HomepageVideoFeed />

      <WhatWeDo />

      <HomepageBanner />
    </section>
  )
}
