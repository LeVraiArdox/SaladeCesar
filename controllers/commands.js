import fs from "fs"
import config from "../config.js"

const commands = async (client) => {
  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"))

  for (const file of commandFiles) {
    const commandObject = await import(`../commands/${file}`)
    const command = commandObject.default
    client.commands.set(command.name, command)
  }

  client.on("ready", async () => {
    const devGuild = await client.guilds.cache.get(config.guildID)
    if (devGuild) {
      devGuild.commands.set(client.commands.map((cmd) => cmd))
    } else {
      console.error(`Guild with ID ${config.guildID} not found.`)
    }
  })
}

export default commands
