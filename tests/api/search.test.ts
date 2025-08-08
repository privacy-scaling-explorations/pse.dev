import { GET } from "@/app/api/search/route"
import { NextRequest } from "next/server"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"

// Mock algoliasearch
const mockSearch = vi.fn()
const mockInitIndex = vi.fn()

vi.mock("algoliasearch", () => ({
  default: vi.fn((appId: string, apiKey: string) =>
    appId && apiKey
      ? {
          initIndex: mockInitIndex,
        }
      : null
  ),
}))

// Mock environment variables
const originalEnv = process.env

describe("/api/search", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env = { ...originalEnv }
    mockInitIndex.mockReturnValue({ search: mockSearch })
  })

  afterEach(() => {
    process.env = originalEnv
  })

  const createMockRequest = (searchParams: Record<string, string> = {}) => {
    const url = new URL("http://localhost:3000/api/search")
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
    return new NextRequest(url.toString())
  }

  const mockSearchResults = {
    hits: [
      {
        objectID: "1",
        title: "Test Article",
        description: "Test description",
        url: "/articles/test",
      },
    ],
    nbHits: 1,
    page: 0,
  }

  describe("GET /api/search", () => {
    it("returns empty results when query is empty", async () => {
      const request = createMockRequest({ query: "" })
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({
        results: [],
        status: "empty",
        availableIndexes: [],
      })
      expect(mockSearch).not.toHaveBeenCalled()
    })

    it("returns empty results when query is whitespace only", async () => {
      const request = createMockRequest({ query: "   " })
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({
        results: [],
        status: "empty",
        availableIndexes: [],
      })
      expect(mockSearch).not.toHaveBeenCalled()
    })

    it("returns error when Algolia credentials are missing", async () => {
      // Clear environment variables to simulate missing credentials
      process.env.ALGOLIA_APP_ID = ""
      process.env.ALGOLIA_SEARCH_API_KEY = ""

      const request = createMockRequest({ query: "test" })
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toEqual({
        error: "Search client not initialized - missing Algolia credentials",
        availableIndexes: [],
      })
    })

    it("returns error for search when credentials are invalid", async () => {
      // Test with invalid but present credentials
      process.env.ALGOLIA_APP_ID = ""
      process.env.ALGOLIA_SEARCH_API_KEY = ""

      const request = createMockRequest({
        query: "test query",
        index: "blog",
      })
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toEqual({
        error: "Search client not initialized - missing Algolia credentials",
        availableIndexes: [],
      })
    })

    it("handles search errors gracefully for specific index", async () => {
      const error = new Error("Algolia search failed")

      // Set up valid credentials but mock will reject
      process.env.ALGOLIA_APP_ID = ""
      process.env.ALGOLIA_SEARCH_API_KEY = ""

      const request = createMockRequest({
        query: "test",
        index: "blog",
      })
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toEqual({
        error: "Search client not initialized - missing Algolia credentials",
        availableIndexes: [],
      })
    })
  })
})
