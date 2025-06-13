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
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize dark mode from system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const value = {
    isDarkMode,
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
