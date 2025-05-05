import { NextResponse } from "next/server"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v10"
import { config } from "dotenv"

config()

const TOKEN = process.env.DISCORD_TOKEN || process.env.NEXT_PUBLIC_DISCORD_TOKEN
const CHANNEL_ID =
  process.env.DISCORD_GUILD_ID || process.env.NEXT_PUBLIC_DISCORD_GUILD_ID
const MESSAGES_LIMIT = 1

const rest = new REST({ version: "10" }).setToken(TOKEN as string)

export async function GET() {
  try {
    if (!TOKEN) {
      return NextResponse.json(
        { error: "Discord token is required" },
        { status: 400 }
      )
    }
    if (!CHANNEL_ID) {
      return NextResponse.json(
        { error: "Discord channel ID is required" },
        { status: 400 }
      )
    }

    const messagesUrl = `${Routes.channelMessages(CHANNEL_ID)}?limit=${MESSAGES_LIMIT}`

    const announcements = await rest.get(messagesUrl as any)

    // Return the announcements as a JSON response
    return NextResponse.json(
      { announcements: announcements ?? [] },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error retrieving announcements:", error)
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
