"use client"

import { createContext, useContext, ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"

// Define the Project type based on your needs
export interface Project {
  id: string
  title: string
  description: string
  image?: string
  tags?: string[]
  url?: string
  github?: string
  date?: string
  status?: "completed" | "in-progress" | "planned"
}

interface ProjectsContextType {
  projects: any[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => Promise<any>
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
)

async function fetchProjects(tag?: string) {
  try {
    const params = new URLSearchParams()
    if (tag) params.append("tag", tag)

    const response = await fetch(`/api/projects?${params.toString()}`, {
      cache: "default",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status}`)
    }

    const projects = await response.json()
    return projects || []
  } catch (error) {
    console.error("Error fetching projects:", error)
    throw error // Let React Query handle the error
  }
}

interface ProjectsProviderProps {
  children: ReactNode
  tag?: string
}

export function ProjectsProvider({ children, tag }: ProjectsProviderProps) {
  const {
    data: projects = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["projects", tag],
    queryFn: async () => {
      const projects = await fetchProjects()
      console.log("projects for provider", projects)
      return projects
    },
  })

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        isLoading,
        isError,
        error: error as Error | null,
        refetch,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider")
  }
  return context
}
