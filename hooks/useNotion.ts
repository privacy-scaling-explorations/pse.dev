import { EventProps } from '@/app/[lang]/events/page'
import { useQuery } from '@tanstack/react-query'

export function useGetNotionEvents() {
  return useQuery<{ events: EventProps['event'][]; page: any }>({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch(`/api/events?timestamp=${Date.now()}`)
      const data = await response.json()
      return {
        events: data.events,
        page: data.page,
      }
    },
  })
}
