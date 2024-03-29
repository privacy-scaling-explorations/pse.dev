import { Metadata } from "next"

import { ProgramPageContent } from "."

export const metadata: Metadata = {
  title: "Programs page",
  description: "Join our free programs to start your journey!",
  openGraph: {
    images: [
      {
        url: "/programs-page-banner.png",
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function ProgramsPage({ params: { lang } }: any) {
  return (
    <div className="flex flex-col">
      <ProgramPageContent lang={lang} />
    </div>
  )
}
