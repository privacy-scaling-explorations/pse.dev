"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"

interface NewsContentInterface {
  id?: string
  news: any
}

const NewsContent = ({ news }: NewsContentInterface) => {
  return (
    <div className="flex flex-col gap-6 pb-5">
      <div className="flex flex-col gap-1">
        <span className="font-bold">Pinned: <span className="!font-normal">{news?.pinned ? 'YES' : 'NO'}</span></span>
        <span></span>
      </div>
      {news?.content && (
        <div className="flex flex-col gap-1">
          <span className="font-bold">Content</span>
          <span>{news?.content}</span>
        </div>
      )}
      <div className="flex gap-6">
        {news?.embeds?.map((embed: any, index: number) => {
          return (
            <Link href={embed?.url} key={index} className="flex flex-col gap-4 max-w-[300px]">
              <span className="font-bold">Embed {index + 1}</span>
              <div className="flex flex-col">
                <span>{embed?.title}</span>
                <span>{embed?.description}</span>
                <img src={embed?.thumbnail?.proxy_url} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function NewsPage() {
  const [loading, setLoading] = useState(true)
  const [newsItems, setNewsItems] = useState<any[]>([])

  useEffect(() => {
    const getAnnounces = async () => {
      setLoading(true)
      await fetch("/api/news")
        .then((res) => res.json())
        .then(({ announcements }) => {
          setNewsItems(announcements ?? [])
        })
      setLoading(false)
    }

    getAnnounces()
  }, [])

  console.log("newsItems", newsItems)
  return (
    <div className="flex flex-col py-7">
      <div>
        {(newsItems ?? [])?.map((news, index) => (
          <div className={'px-7 md:px-20 odd:bg-gray-100'}>
            <div key={news.id} className="flex flex-col gap-2">
              <h1 className="block text-2xl pb-4">{`# News ${
                index + 1
              } from discord`}</h1>
              <NewsContent news={news} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
