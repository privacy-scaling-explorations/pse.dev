import { vi } from "vitest"

// Mock window.matchMedia
export const setupMatchMediaMock = (matches = false) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

// Mock localStorage
export const setupLocalStorageMock = () => {
  const store: Record<string, string> = {}

  const mockStorage = {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((key) => delete store[key])
    }),
    length: 0,
    key: vi.fn(),
  }

  Object.defineProperty(window, "localStorage", {
    value: mockStorage,
    writable: true,
  })

  return mockStorage
}

// Mock sessionStorage
export const setupSessionStorageMock = () => {
  const store: Record<string, string> = {}

  const mockStorage = {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((key) => delete store[key])
    }),
    length: 0,
    key: vi.fn(),
  }

  Object.defineProperty(window, "sessionStorage", {
    value: mockStorage,
    writable: true,
  })

  return mockStorage
}

// Mock window.scrollTo
export const setupScrollMock = () => {
  const mockScrollTo = vi.fn()
  Object.defineProperty(window, "scrollTo", {
    value: mockScrollTo,
    writable: true,
  })
  return mockScrollTo
}

// Mock requestAnimationFrame
export const setupAnimationFrameMock = () => {
  const mockRaf = vi.fn((cb) => {
    setTimeout(cb, 0)
    return 0
  })
  global.requestAnimationFrame = mockRaf
  return mockRaf
}

// Mock ResizeObserver
export const setupResizeObserverMock = () => {
  const mockResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
  global.ResizeObserver = mockResizeObserver
  return mockResizeObserver
}

// Mock IntersectionObserver
export const setupIntersectionObserverMock = () => {
  const mockIntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    root: null,
    rootMargin: "",
    thresholds: [],
  }))
  global.IntersectionObserver = mockIntersectionObserver
  return mockIntersectionObserver
}

// Mock URL and URLSearchParams
export const setupUrlMocks = () => {
  // Mock URL.createObjectURL
  Object.defineProperty(URL, "createObjectURL", {
    value: vi.fn(() => "mocked-object-url"),
    writable: true,
  })

  // Mock URL.revokeObjectURL
  Object.defineProperty(URL, "revokeObjectURL", {
    value: vi.fn(),
    writable: true,
  })
}

// Mock Clipboard API
export const setupClipboardMock = () => {
  const mockClipboard = {
    writeText: vi.fn().mockResolvedValue(void 0),
    readText: vi.fn().mockResolvedValue(""),
  }

  Object.defineProperty(navigator, "clipboard", {
    value: mockClipboard,
    writable: true,
  })

  return mockClipboard
}

// Setup all browser API mocks at once
export const setupAllBrowserMocks = () => {
  setupMatchMediaMock()
  setupLocalStorageMock()
  setupSessionStorageMock()
  setupScrollMock()
  setupAnimationFrameMock()
  setupResizeObserverMock()
  setupIntersectionObserverMock()
  setupUrlMocks()
  setupClipboardMock()
}
