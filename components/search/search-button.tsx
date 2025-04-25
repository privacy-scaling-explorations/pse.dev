"use client"

import { Search } from "lucide-react"
import { Button, ButtonProps } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { searchConfig } from "@/hooks/useGlobalSearch"

interface SearchButtonProps extends ButtonProps {
  onClick: () => void
}

const { allIndexes, searchClient } = searchConfig

export function SearchButton({ onClick, ...props }: SearchButtonProps) {
  const [disabled, setDisabled] = useState(false)
  useEffect(() => {
    if (!searchClient || allIndexes.length === 0) {
      console.warn(
        "Algolia credentials (NEXT_PUBLIC_ALGOLIA_APP_ID, NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY) or indexes are not configured. Search will not work."
      )
      setDisabled(true)
    }
  }, [])

  return (
    <Button
      variant="search"
      size="sm"
      onClick={onClick}
      aria-label="Open search"
      className="w-full text-left justify-start"
      disabled={disabled}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Search className="h-5 w-5" />
        <span>search</span>
      </div>
    </Button>
  )
}
