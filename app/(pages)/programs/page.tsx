import { Metadata } from "next"

import { ProgramPageContent } from "."

export const metadata: Metadata = {
  title: "ZK education programs",
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
  twitter: {
    card: "summary_large_image",
    images: ["/programs-page-banner.png"],
  },
}

export default function ProgramsPage() {
  return (
    <div className="flex flex-col">
      <ProgramPageContent />
    </div>
  )
}
