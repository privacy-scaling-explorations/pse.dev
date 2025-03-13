'use client'

import { useEffect, useState } from 'react'
import { events } from '@/data/events/devcon-7'
import { useTranslation } from '@/app/i18n/client'

import { cn } from '@/lib/utils'
import { EventCard } from '@/components/cards/event-card'
import { tableSection } from '@/components/cards/event-card'
import { tableSectionTitle } from '@/components/cards/event-card'

export const Devcon7Section = ({ lang }: any) => {
  const { t } = useTranslation(lang, 'devcon-7')

  return (
    <div className="flex flex-col gap-10 relative">
      <div className="flex flex-col gap-3 lg:gap-10 lg:container">
        <div
          className={cn(
            tableSection(),
            '!hidden lg:border-b lg:border-anakiwa-200'
          )}
        >
          <div className={cn(tableSectionTitle(), 'lg:flex hidden')}>
            Details
          </div>
          <div className={cn(tableSectionTitle(), 'lg:text-left text-center')}>
            Talks
          </div>
          <div className={cn(tableSectionTitle(), 'lg:flex hidden')}>
            Speakers
          </div>
          <div className="lg:flex hidden"></div>
        </div>
        <div className="flex flex-col">
          {events?.map(({ event, speakers, location }, index) => {
            return (
              <EventCard
                key={index}
                event={event}
                speakers={speakers}
                location={location}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
