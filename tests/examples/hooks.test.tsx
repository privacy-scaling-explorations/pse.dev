import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

describe("Custom Hooks", () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, refetchOnWindowFocus: false },
        mutations: { retry: false },
      },
    })
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  describe("useCounter (Example Hook)", () => {
    // Example of testing a simple custom hook
    const useCounter = (initialValue = 0) => {
      const [count, setCount] = React.useState(initialValue)

      const increment = React.useCallback(() => {
        setCount((prev) => prev + 1)
      }, [])

      const decrement = React.useCallback(() => {
        setCount((prev) => prev - 1)
      }, [])

      const reset = React.useCallback(() => {
        setCount(initialValue)
      }, [initialValue])

      return { count, increment, decrement, reset }
    }

    it("returns initial count", () => {
      const { result } = renderHook(() => useCounter(5))

      expect(result.current.count).toBe(5)
    })

    it("increments count", () => {
      const { result } = renderHook(() => useCounter())

      act(() => {
        result.current.increment()
      })

      expect(result.current.count).toBe(1)
    })

    it("decrements count", () => {
      const { result } = renderHook(() => useCounter(5))

      act(() => {
        result.current.decrement()
      })

      expect(result.current.count).toBe(4)
    })

    it("resets count to initial value", () => {
      const { result } = renderHook(() => useCounter(10))

      act(() => {
        result.current.increment()
        result.current.increment()
      })

      expect(result.current.count).toBe(12)

      act(() => {
        result.current.reset()
      })

      expect(result.current.count).toBe(10)
    })
  })

  describe("useToggle (Example Hook)", () => {
    // Example of testing a toggle hook
    const useToggle = (initialValue = false) => {
      const [value, setValue] = React.useState(initialValue)

      const toggle = React.useCallback(() => {
        setValue((prev) => !prev)
      }, [])

      const setTrue = React.useCallback(() => {
        setValue(true)
      }, [])

      const setFalse = React.useCallback(() => {
        setValue(false)
      }, [])

      return { value, toggle, setTrue, setFalse }
    }

    it("returns initial value", () => {
      const { result } = renderHook(() => useToggle(true))

      expect(result.current.value).toBe(true)
    })

    it("toggles value", () => {
      const { result } = renderHook(() => useToggle(false))

      act(() => {
        result.current.toggle()
      })

      expect(result.current.value).toBe(true)

      act(() => {
        result.current.toggle()
      })

      expect(result.current.value).toBe(false)
    })

    it("sets value to true", () => {
      const { result } = renderHook(() => useToggle(false))

      act(() => {
        result.current.setTrue()
      })

      expect(result.current.value).toBe(true)
    })

    it("sets value to false", () => {
      const { result } = renderHook(() => useToggle(true))

      act(() => {
        result.current.setFalse()
      })

      expect(result.current.value).toBe(false)
    })
  })

  describe("useAsync (Example Hook)", () => {
    // Example of testing an async hook
    const useAsync = <T,>(asyncFn: () => Promise<T>) => {
      const [data, setData] = React.useState<T | null>(null)
      const [loading, setLoading] = React.useState(false)
      const [error, setError] = React.useState<Error | null>(null)

      const execute = React.useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
          const result = await asyncFn()
          setData(result)
        } catch (err) {
          setError(err as Error)
        } finally {
          setLoading(false)
        }
      }, [asyncFn])

      return { data, loading, error, execute }
    }

    it("returns initial state", () => {
      const mockAsyncFn = vi.fn().mockResolvedValue("test data")
      const { result } = renderHook(() => useAsync(mockAsyncFn))

      expect(result.current.data).toBeNull()
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it("executes async function successfully", async () => {
      const mockAsyncFn = vi.fn().mockResolvedValue("test data")
      const { result } = renderHook(() => useAsync(mockAsyncFn))

      await act(async () => {
        await result.current.execute()
      })

      expect(result.current.data).toBe("test data")
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(mockAsyncFn).toHaveBeenCalledTimes(1)
    })

    it("handles async function errors", async () => {
      const mockError = new Error("Async error")
      const mockAsyncFn = vi.fn().mockRejectedValue(mockError)
      const { result } = renderHook(() => useAsync(mockAsyncFn))

      await act(async () => {
        await result.current.execute()
      })

      expect(result.current.data).toBeNull()
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe(mockError)
    })
  })

  describe("Error Handling in Hooks", () => {
    it("handles network errors gracefully", async () => {
      // Simulate network error
      const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"))
      global.fetch = mockFetch

      const mockHook = () => {
        const [error, setError] = React.useState<Error | null>(null)

        const fetchData = async () => {
          try {
            await fetch("/api/data")
          } catch (err) {
            setError(err as Error)
          }
        }

        return { error, fetchData }
      }

      const { result } = renderHook(mockHook)

      await act(async () => {
        await result.current.fetchData()
      })

      expect(result.current.error).toBeInstanceOf(Error)
      expect(result.current.error?.message).toBe("Network error")
    })
  })
})
