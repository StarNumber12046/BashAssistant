const { Client, Collection, Intents } = require( "discord.js");
const { token, owner_id } = require("./config.json");
const fs = require("node:fs")
const path = require("node:path")
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
client.owner = owner_id;

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  console.log("[COMMANDS] : found command in " + filePath)
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  console.log("[EVENTS] : found event in " + filePath)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  if (command.ownerOnly && interaction.user.id !== client.owner) {
    return interaction.reply("You are not the owner of this bot.", ephemeral = true);
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(token);
