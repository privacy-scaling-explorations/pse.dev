const { Client, Routes  } = require("discord.js")
const { config } = require("dotenv")
const { REST } = require("@discordjs/rest")

config()

const TOKEN = process.env.DISCORD_TOKEN
const MESSAGES_LIMIT = 1 // Number of messages to retrieve from the discord channel
const GUILD_ID = process.env.DISCORD_GUILD_ID

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
})

const rest = new REST({ version: "10" }).setToken(TOKEN)

export const getAnnouncementChannelMessages = async () => {
  try {
    if (!TOKEN) {
      return Promise.reject("Discord token is required")
    }

    if (!GUILD_ID) {
      return Promise.reject("Discord guild id is required")
    }
    console.log("Retrieve announcements from discord channel...")
    const MESSAGES_URL = `${Routes.channelMessages(GUILD_ID)}?limit=${MESSAGES_LIMIT}`
    // If operating on a guild channel, this endpoint requires the current user to have the VIEW_CHANNEL permission
    const messages = await rest.get(MESSAGES_URL)
    return messages
  } catch(err) {
    return Promise.reject(err)
  }
}

const runDiscordBot = () => {
  client.login(TOKEN)
  client.on("ready", async () => {
    await getAnnouncementChannelMessages()
  })
}

runDiscordBot()
