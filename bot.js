import { Client, Collection, GatewayIntentBits } from "discord.js"
import "dotenv/config"
import fs from "fs"

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
})

client.commands = new Collection()

// Load controllers
const controllerFiles = fs.readdirSync("./controllers")

for (const file of controllerFiles) {
  const controller = await import(`./controllers/${file}`)
  controller.default(client)
}

client.login(process.env.DISCORD_TOKEN)