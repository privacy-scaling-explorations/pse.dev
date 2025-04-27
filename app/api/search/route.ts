import { NextRequest, NextResponse } from "next/server"
import algoliasearch from "algoliasearch"

const appId =
  process.env.ALGOLIA_APP_ID || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ""
const apiKey =
  process.env.ALGOLIA_SEARCH_API_KEY ||
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ||
  ""
const additionalIndexes = (
  process.env.ALGOLIA_ADDITIONAL_INDEXES ||
  process.env.NEXT_PUBLIC_ALGOLIA_ADDITIONAL_INDEXES ||
  ""
)
  .split(",")
  .map((index) => index.trim())
  .filter(Boolean)

const allIndexes = [...additionalIndexes].filter(Boolean) || [
  "blog",
  "projects",
]
const searchClient = appId && apiKey ? algoliasearch(appId, apiKey) : null

function transformQuery(query: string) {
  if (query.toLowerCase().includes("intmax")) {
    return query.replace(/intmax/i, '"intmax"')
  }
  return query
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query") || ""
  const indexName = searchParams.get("index") || ""
  const hitsPerPage = parseInt(searchParams.get("hitsPerPage") || "5", 10)

  if (!query || query.trim() === "") {
    return NextResponse.json({
      results: [],
      status: "empty",
      availableIndexes: allIndexes,
    })
  }

  if (!searchClient) {
    return NextResponse.json(
      {
        error: "Search client not initialized - missing Algolia credentials",
        availableIndexes: [],
      },
      { status: 500 }
    )
  }

  try {
    const transformedQuery = transformQuery(query)

    // If an index is specified, search only that index
    if (indexName && indexName.trim() !== "") {
      const index = searchClient.initIndex(indexName)
      const response = await index.search(transformedQuery, { hitsPerPage })

      return NextResponse.json({
        hits: response.hits,
        status: "success",
        availableIndexes: allIndexes,
      })
    }

    // Otherwise search across all configured indexes
    const searchPromises = allIndexes.map((idxName) => {
      return searchClient!
        .initIndex(idxName)
        .search(transformedQuery, { hitsPerPage })
        .then((response) => ({
          indexName: idxName,
          hits: response.hits,
        }))
        .catch((err) => {
          console.error(`Search error for index ${idxName}:`, err)
          return { indexName: idxName, hits: [] }
        })
    })

    const indexResults = await Promise.all(searchPromises)
    const nonEmptyResults = indexResults.filter(
      (result) => result.hits && result.hits.length > 0
    )

    return NextResponse.json({
      results: nonEmptyResults,
      status: "success",
      availableIndexes: allIndexes,
    })
  } catch (error: any) {
    console.error("Global search error:", error)
    return NextResponse.json(
      {
        error: error.message || "Search failed",
        availableIndexes: [],
      },
      { status: 500 }
    )
  }
}
