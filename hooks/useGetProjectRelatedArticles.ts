import { useState, useEffect } from "react"
import { Article } from "@/lib/content"

interface UseGetProjectRelatedArticlesProps {
  projectId: string
}

async function fetchArticles(project: string) {
  const response = await fetch(`/api/articles?project=${project}`)
  const data = await response.json()
  return data.articles
}

export function useGetProjectRelatedArticles({
  projectId,
}: UseGetProjectRelatedArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles(projectId)
        setArticles(data)
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setLoading(false)
      }
    }

    getArticles()
  }, [projectId])

  return {
    articles,
    loading,
  }
}
