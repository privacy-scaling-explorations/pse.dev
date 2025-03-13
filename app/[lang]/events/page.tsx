'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from '@/app/i18n/client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useGetNotionEvents } from '@/hooks/useNotion'
import { EventCard } from '@/components/cards/event-card'
import { EventGridCard } from '@/components/cards/event-grid-card'
import { AppContent } from '@/components/ui/app-content'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
type ViewMode = 'list' | 'grid'

export interface EventProps {
  event: {
    title: string
    description: string
    startDate: string | null
    endDate: string | null
    location: string
    link: string
    video?: string
  }
  speakers?: any[]
  location?: string
}

export default function EventsPage({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const {
    data: { events, page } = { events: [], page: {} },
    isLoading,
    refresh,
  } = useGetNotionEvents()

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className="flex flex-col">
      <div className="w-full bg-cover-gradient border-b border-tuatara-300">
        <AppContent className="flex flex-col gap-4 py-10 w-full">
          {isLoading ? (
            <div className="h-14 bg-gray-400 w-2/3 animate-pulse"></div>
          ) : (
            page?.title && <Label.PageTitle label={page?.title} />
          )}
        </AppContent>
      </div>
      <div className="mx-auto max-w-[950px] py-10 w-full">
        {!isLoading && (
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <Icons.list className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Icons.grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div
            className={cn(
              'gap-6',
              viewMode === 'grid' ? 'grid grid-cols-1 ' : 'flex flex-col'
            )}
          >
            Loading...
          </div>
        ) : viewMode === 'list' ? (
          <div className="flex flex-col gap-10 relative">
            <div className="flex flex-col">
              {events?.map((event, index) => {
                const date =
                  event?.endDate && event?.startDate
                    ? `${format(new Date(event?.startDate), 'MMM d')} - ${format(new Date(event?.endDate), 'MMM d')}`
                    : event?.startDate
                      ? format(new Date(event?.startDate), 'MMM d')
                      : ''

                const time =
                  event?.endDate && event?.startDate
                    ? `${format(new Date(event?.startDate), 'HH:mm')} - ${format(new Date(event?.endDate), 'HH:mm')}`
                    : event?.startDate
                      ? format(new Date(event?.startDate), 'HH:mm')
                      : ''

                return (
                  <EventCard
                    key={index}
                    event={{
                      title: event.title,
                      description: event.description,
                      url: event.link,
                      date,
                      time,
                      youtubeLink: event?.video,
                    }}
                    speakers={[]}
                    location={event.location}
                  />
                )
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {events?.map((event, index) => (
              <EventGridCard key={index} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
