import { describe, it, expect, beforeEach, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "../test-utils"
import {
  GlobalProvider,
  useGlobalProvider,
} from "@/app/providers/GlobalProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { mockMatchMedia, mockLocalStorage } from "../test-utils"

// Test component to access provider values
const TestComponent = () => {
  const { isDarkMode, setIsDarkMode } = useGlobalProvider()

  return (
    <div>
      <span data-testid="dark-mode-status">
        {isDarkMode ? "dark" : "light"}
      </span>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        data-testid="toggle-theme"
      >
        Toggle Theme
      </button>
    </div>
  )
}

describe("GlobalProvider", () => {
  let queryClient: QueryClient
  let localStorageMock: any

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()

    // Create fresh QueryClient for each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, refetchOnWindowFocus: false },
        mutations: { retry: false },
      },
    })

    // Setup localStorage mock
    localStorageMock = mockLocalStorage()
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    })
  })

  it("initializes with light mode by default", async () => {
    // Mock matchMedia to return false (light mode)
    mockMatchMedia(false)

    render(
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <TestComponent />
        </GlobalProvider>
      </QueryClientProvider>
    )

    await waitFor(() => {
      const status = screen.getByTestId("dark-mode-status")
      expect(status).toHaveTextContent("light")
    })
  })

  it("initializes with dark mode when system preference is dark", async () => {
    // Mock matchMedia to return true (dark mode)
    mockMatchMedia(true)

    render(
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <TestComponent />
        </GlobalProvider>
      </QueryClientProvider>
    )

    await waitFor(() => {
      const status = screen.getByTestId("dark-mode-status")
      expect(status).toHaveTextContent("dark")
    })
  })

  it("uses stored preference over system preference", async () => {
    // Set localStorage to have dark mode
    localStorageMock.getItem.mockReturnValue("true")
    // But system preference is light
    mockMatchMedia(false)

    render(
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <TestComponent />
        </GlobalProvider>
      </QueryClientProvider>
    )

    await waitFor(() => {
      const status = screen.getByTestId("dark-mode-status")
      expect(status).toHaveTextContent("dark")
    })
  })

  it("toggles theme and saves to localStorage", async () => {
    mockMatchMedia(false)

    render(
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <TestComponent />
        </GlobalProvider>
      </QueryClientProvider>
    )

    // Wait for initialization
    await waitFor(() => {
      expect(screen.getByTestId("dark-mode-status")).toHaveTextContent("light")
    })

    // Toggle to dark mode
    fireEvent.click(screen.getByTestId("toggle-theme"))

    await waitFor(() => {
      expect(screen.getByTestId("dark-mode-status")).toHaveTextContent("dark")
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "pse-dark-mode",
        "true"
      )
    })
  })

  it("provides QueryClient to children", () => {
    render(
      <GlobalProvider>
        <div data-testid="child">Child Component</div>
      </GlobalProvider>
    )

    expect(screen.getByTestId("child")).toBeInTheDocument()
  })

  it("throws error when useGlobalProvider is used outside provider", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow()

    consoleSpy.mockRestore()
  })

  it("handles media query changes", async () => {
    const mediaQueryMock = {
      matches: false,
      media: "(prefers-color-scheme: dark)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    }

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => mediaQueryMock),
    })

    render(
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <TestComponent />
        </GlobalProvider>
      </QueryClientProvider>
    )

    // Verify addEventListener was called
    expect(mediaQueryMock.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    )
  })
})
