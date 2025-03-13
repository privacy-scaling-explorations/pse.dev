import { EventProps } from '@/app/[lang]/events/page'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }
  return response.json()
}

export function useGetNotionEvents() {
  const { data, error } = useSWR<{ events: EventProps['event'][]; page: any }>(
    `/api/events?timestamp=${Date.now()}`,
    fetcher,
    {
      refreshInterval: 60000,
      dedupingInterval: 60000,
      revalidateOnFocus: false,
      shouldRetryOnError: (err) => err.status !== 429,
    }
  )

  return {
    data: data
      ? { events: data.events, page: data.page }
      : { events: [], page: {} },
    isLoading: !data && !error,
    error,
  }
}
