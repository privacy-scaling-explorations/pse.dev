import React from 'react'
import { Metadata } from 'next'

import { Devcon7Booths } from './sections/Devcon7Booths'
import { Devcon7Header } from './sections/Devcon7Header'
import { Devcon7Section } from './sections/Devcon7Section'

export const metadata: Metadata = {
  title: 'Devon 7',
  description: 'PSE x Devcon 7 Southeast Asia',
  openGraph: {
    images: [
      {
        url: '/devcon-7-cover.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default async function DevconPage() {
  return (
    <>
      <div className="flex flex-col lg:pb-[120px]">
        <Devcon7Header />
        <div className="flex flex-col gap-10 lg:gap-14 pt-8 lg:pt-[60px] mx-auto max-w-[950px]">
          <Devcon7Section />
        </div>
      </div>
    </>
  )
}
