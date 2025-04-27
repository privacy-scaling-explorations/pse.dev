"use client"

import { Search } from "lucide-react"
import { Button, ButtonProps } from "@/components/ui/button"
import { useSearchConfig } from "@/hooks/useGlobalSearch"

interface SearchButtonProps extends ButtonProps {
  onClick: () => void
}

export function SearchButton({ onClick, ...props }: SearchButtonProps) {
  return (
    <Button
      variant="search"
      size="sm"
      onClick={onClick}
      aria-label="Open search"
      className="w-full text-left justify-start"
      {...props}
    >
      <div className="flex items-center gap-2">
        <Search className="h-5 w-5" />
        <span>search</span>
      </div>
    </Button>
  )
}
