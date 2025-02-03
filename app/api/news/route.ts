import { NextResponse } from 'next/server'
import { getAnnouncementChannelMessages } from '@/common/discord'

export async function GET() {
  try {
    const announcements = await getAnnouncementChannelMessages()
    return NextResponse.json(
      { announcements: announcements ?? [] },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
