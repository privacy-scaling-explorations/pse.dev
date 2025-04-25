import { useQuery } from "@tanstack/react-query"
import algoliasearch, { SearchIndex } from "algoliasearch/lite"

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

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ""
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ""
const additionalIndexes = process.env.NEXT_PUBLIC_ALGOLIA_ADDITIONAL_INDEXES
  ? process.env.NEXT_PUBLIC_ALGOLIA_ADDITIONAL_INDEXES.split(",").map((index) =>
      index.trim()
    )
  : []

const allIndexes = [...additionalIndexes].filter(Boolean) ?? [
  "blog",
  "projects",
]

const searchClient = appId && apiKey ? algoliasearch(appId, apiKey) : null

const transformQuery = (query: string) => {
  if (query.toLowerCase().includes("intmax")) {
    return query.replace(/intmax/i, '"intmax"')
  }
  return query
}

export const useGlobalSearch = ({
  query,
  hitsPerPage = 5,
}: {
  query: string
  hitsPerPage?: number
}) => {
  return useQuery({
    queryKey: ["globalSearch", query, hitsPerPage, allIndexes],
    queryFn: async () => {
      if (!query || query.trim() === "") {
        return { results: [], status: "empty" }
      }

      if (!searchClient) {
        throw new Error(
          "Search client not initialized - missing Algolia credentials"
        )
      }

      try {
        const transformedQuery = transformQuery(query)

        const searchPromises = allIndexes.map((indexName) => {
          return searchClient
            .initIndex(indexName)
            .search<SearchHit>(transformedQuery, { hitsPerPage })
            .then((response) => ({
              indexName,
              hits: response.hits,
            }))
            .catch((err) => {
              console.error(`Search error for index ${indexName}:`, err)
              return { indexName, hits: [] as SearchHit[] }
            })
        })

        const indexResults = await Promise.all(searchPromises)
        const nonEmptyResults = indexResults.filter(
          (result) => result.hits && result.hits.length > 0
        )

        return {
          results: nonEmptyResults,
          status: "success",
        }
      } catch (error: any) {
        console.error("Global search error:", error)
        throw new Error(error.message || "Search failed")
      }
    },
    enabled: Boolean(query) && query.trim() !== "" && Boolean(searchClient),
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

      if (!searchClient) {
        throw new Error(
          "Search client not initialized - missing Algolia credentials"
        )
      }

      try {
        const transformedQuery = transformQuery(query)
        const index = searchClient.initIndex(indexName)
        const response = await index.search<SearchHit>(transformedQuery, {
          hitsPerPage,
        })

        return {
          hits: response.hits,
          status: "success",
        }
      } catch (error: any) {
        console.error(`Index search error for ${indexName}:`, error)
        throw new Error(error.message || `Search in ${indexName} failed`)
      }
    },
    enabled:
      Boolean(query) &&
      query.trim() !== "" &&
      Boolean(searchClient) &&
      Boolean(indexName),
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

export const searchConfig = {
  allIndexes,
  appId,
  apiKey,
  searchClient,
}
