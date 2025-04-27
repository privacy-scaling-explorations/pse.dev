import { useQuery } from "@tanstack/react-query"

type SearchHit = {
  objectID: string
  title?: string
  name?: string
  content?: string
  description?: string
  excerpt?: string
  url?: string
  locale?: string
  section?: string
  category?: string
  type?: string
  path?: string
  hierarchy?: {
    lvl0?: string
    [key: string]: string | undefined
  }
  [key: string]: any
}

type IndexResult = {
  indexName: string
  hits: SearchHit[]
}

// Fetch available indexes from the API
export const useSearchIndexes = () => {
  return useQuery({
    queryKey: ["searchIndexes"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/search/indexes")

        if (!response.ok) {
          return { indexes: ["blog", "projects"] }
        }

        const data = await response.json()
        return data
      } catch (error) {
        console.error("Failed to fetch search indexes:", error)
        return { indexes: ["blog", "projects"] }
      }
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  })
}

export const useGlobalSearch = ({
  query,
  hitsPerPage = 5,
}: {
  query: string
  hitsPerPage?: number
}) => {
  const { data: indexData } = useSearchIndexes()
  const allIndexes = indexData?.indexes || []

  return useQuery({
    queryKey: ["globalSearch", query, hitsPerPage, allIndexes],
    queryFn: async () => {
      if (!query || query.trim() === "") {
        return { results: [], status: "empty" }
      }

      try {
        const params = new URLSearchParams({
          query,
          hitsPerPage: hitsPerPage.toString(),
        })

        const response = await fetch(`/api/search?${params.toString()}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Search failed")
        }

        return await response.json()
      } catch (error: any) {
        console.error("Global search error:", error)
        throw new Error(error.message || "Search failed")
      }
    },
    enabled: Boolean(query) && query.trim() !== "",
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}

export const useIndexSearch = ({
  query,
  indexName,
  hitsPerPage = 5,
}: {
  query: string
  indexName: string
  hitsPerPage?: number
}) => {
  return useQuery({
    queryKey: ["indexSearch", indexName, query, hitsPerPage],
    queryFn: async () => {
      if (!query || query.trim() === "") {
        return { hits: [], status: "empty" }
      }

      try {
        const params = new URLSearchParams({
          query,
          index: indexName,
          hitsPerPage: hitsPerPage.toString(),
        })

        const response = await fetch(`/api/search?${params.toString()}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `Search in ${indexName} failed`)
        }

        return await response.json()
      } catch (error: any) {
        console.error(`Index search error for ${indexName}:`, error)
        throw new Error(error.message || `Search in ${indexName} failed`)
      }
    },
    enabled: Boolean(query) && query.trim() !== "" && Boolean(indexName),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}

export const filterSearchHitsByTerm = (hits: SearchHit[], term: string) => {
  const lowercaseTerm = term.toLowerCase()

  return hits.filter((hit) => {
    const content = (hit.content || "").toLowerCase()
    const title = (hit.title || hit.name || "").toLowerCase()
    const description = (hit.description || "").toLowerCase()

    return (
      content.includes(lowercaseTerm) ||
      title.includes(lowercaseTerm) ||
      description.includes(lowercaseTerm)
    )
  })
}

// Export a helper hook that ensures we have the indexes loaded
export const useSearchConfig = () => {
  const { data } = useSearchIndexes()
  return {
    allIndexes: data?.indexes || [],
  }
}
