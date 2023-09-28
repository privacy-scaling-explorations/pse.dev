const { Client, Routes  } = require("discord.js")
const { config } = require("dotenv")
const { REST } = require("@discordjs/rest")

config()

const TOKEN = process.env.DISCORD_TOKEN
const CLIENT_ID = process.env.DISCORD_CLIENT_ID
const GUILD_ID = process.env.DISCORD_GUILD_ID

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
})


const rest = new REST({ version: "10" }).setToken(TOKEN)

client.on("ready", () => {
  console.log("Bot is ready", client.user.tag)
})

client.on("messageCreate", (message) => {
  // todo: check if message is a command
})

client.login(TOKEN)


const commands = [
  {
    name: "learn",
    description: "Create a new lear post",
  },
  {
    name: "news",
    description: "Create a news post",
  },
  {
    name: "blog",
    description: "Create a blog post",
  },
]

async function main() {
  try {


    console.log("Registering slash commands...")

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    })
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error)
  }
}

main()
