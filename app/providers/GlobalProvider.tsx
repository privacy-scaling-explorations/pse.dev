"use client"

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ProjectsProvider } from "./ProjectsProvider"

interface GlobalContextType {
  children?: ReactNode
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
}

const DARK_MODE_KEY = "pse-dark-mode"
const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export function GlobalProvider({ children }: { children: ReactNode }) {
  // Initialize dark mode from local storage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage first
    const storedPreference = localStorage.getItem(DARK_MODE_KEY)
    if (storedPreference !== null) {
      return storedPreference === "true"
    }
    // Fall back to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't explicitly set a preference
      if (localStorage.getItem("pse,") === null) {
        setIsDarkMode(e.matches)
      }
    }

    // Add event listener
    mediaQuery.addEventListener("change", handleChange)

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Save preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, isDarkMode.toString())
  }, [isDarkMode])

  const value = {
    isDarkMode: true,
    setIsDarkMode,
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ProjectsProvider>
        <GlobalContext.Provider value={value}>
          {children}
        </GlobalContext.Provider>
      </ProjectsProvider>
    </QueryClientProvider>
  )
}

export function useGlobalProvider() {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider")
  }
  return context
}
