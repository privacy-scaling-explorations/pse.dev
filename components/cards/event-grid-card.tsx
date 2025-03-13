import { format } from 'date-fns'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { EventProps } from '@/app/[lang]/events/page'

export const EventGridCard = ({ event }: EventProps) => {
  const date =
    event.endDate && event.startDate
      ? `${format(new Date(event?.startDate), 'MMM d')} - ${format(new Date(event?.endDate), 'MMM d')}`
      : event?.startDate
        ? format(new Date(event?.startDate), 'MMM d')
        : ''

  const time =
    event.endDate && event.startDate
      ? `${format(new Date(event?.startDate), 'HH:mm')} - ${format(new Date(event?.endDate), 'HH:mm')}`
      : event?.startDate
        ? format(new Date(event?.startDate), 'HH:mm')
        : ''

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 text-tuatara-950">
              {event.title}
            </h3>

            <div className="space-y-2 mb-5">
              {(date || time) && (
                <div className="flex items-center text-sm text-gray-600">
                  <Icons.calendar className="w-4 h-4 mr-2" />
                  {date && (
                    <>
                      <span>{date}</span>
                      <span className="mx-2">•</span>
                    </>
                  )}
                  {time && <span>{time}</span>}
                </div>
              )}
              {event.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <Icons.eventLocation className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-4 mb-4">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      {event?.video && (
        <div className="flex px-6 pb-6 mt-auto">
          <Link
            href={event?.video}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto"
          >
            <Button variant="outline">
              <div className="flex items-center gap-1">
                <span>Watch Video</span>
                <Icons.externalUrl className="h-4 w-4" />
              </div>
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
