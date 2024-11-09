import React from "react"
import { Metadata } from "next"

import { Devcon7Header } from "./sections/Devcon7Header"
import { Devcon7Section } from "./sections/Devcon7Section"

export const metadata: Metadata = {
  title: "Devon 7",
  description: "PSE x Devcon 7 Southeast Asia",
  openGraph: {
    images: [
      {
        url: "/devcon-7-cover.png",
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default async function DevconPage() {
  return (
    <div className="flex flex-col">
      <Devcon7Header />
      <Devcon7Section />
    </div>
  )
}
