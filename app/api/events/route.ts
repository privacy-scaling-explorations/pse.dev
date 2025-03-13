import { Client } from '@notionhq/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })
  try {
    const databaseInfo: any = await notion.databases.retrieve({
      database_id: process.env.NOTION_EVENTS_DATABASE_ID as string,
    })

    const response = await notion.databases.query({
      database_id: process.env.NOTION_EVENTS_DATABASE_ID as string,
      sorts: [
        {
          property: 'Date',
          direction: 'ascending',
        },
      ],
    })

    const page = {
      id: databaseInfo.id,
      title: databaseInfo?.title?.[0]?.plain_text || 'Untitled Document',
      description: databaseInfo?.description?.[0]?.plain_text || '',
      createdTime: databaseInfo?.created_time,
      lastEditedTime: databaseInfo?.last_edited_time,
    }

    const events = response.results.map((page: any) => ({
      id: page.id,
      title: page.properties?.Title?.title[0]?.plain_text || '',
      startDate: page.properties?.Date?.date?.start || null,
      endDate: page.properties?.Date?.date?.end || null,
      description: page.properties?.Description?.rich_text[0]?.plain_text || '',
      location: page.properties?.Location?.rich_text[0]?.plain_text || '',
      speakers: page.properties?.Speakers?.rich_text[0]?.plain_text || '',
      status: page.properties?.Status?.select?.name || '',
      link: page.properties?.Link?.url || '',
      video: page.properties?.VideoURL?.url || '',
      attachments: page.properties?.Attachments?.files || [],
    }))

    const responseJson = NextResponse.json({ events, page })

    // Disable vercel cache
    responseJson.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    )
    responseJson.headers.set('Pragma', 'no-cache')
    responseJson.headers.set('Expires', '0')

    return responseJson
  } catch (error: any) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
