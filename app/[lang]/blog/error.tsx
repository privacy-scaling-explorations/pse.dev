"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import Link from "next/link"
import { AppContent } from "@/components/ui/app-content"

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Blog page error:", error)
  }, [error])

  return (
    <AppContent>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          We encountered an error while loading the blog. Please try again or
          contact support if the issue persists.
        </p>
        <div className="flex gap-4">
          <Button onClick={reset} variant="black">
            Try again
          </Button>
          <Link href="/">
            <Button variant="outline">Return to home</Button>
          </Link>
        </div>
      </div>
    </AppContent>
  )
}
