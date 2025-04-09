import { Divider } from "@/components/divider"
import { NewsSection } from "@/components/sections/NewsSection"
import { WhatWeDo } from "@/components/sections/WhatWeDo"

import { BlogRecentArticles } from "@/components/blog/blog-recent-articles"
import { HomepageHeader } from "@/components/sections/HomepageHeader"
import { HomepageBanner } from "@/components/sections/HomepageBanner"
export default function IndexPage({ params: { lang } }: any) {
  return (
    <section className="flex flex-col">
      <Divider.Section>
        <HomepageHeader lang={lang} />

        <BlogRecentArticles lang={lang} />

        <WhatWeDo lang={lang} />

        <HomepageBanner lang={lang} />
      </Divider.Section>
    </section>
  )
}
