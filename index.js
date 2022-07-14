import { Client, Collection, Intents } from "discord.js";
import { spawn } from "child_process";
const { token } = require("./config.json");
import * as fs from 'node:fs';
import * as path from 'node:path';
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  switch (commandName) {
    case "ping":
        interaction.reply("pong");
    case 'exec':
        interaction.reply("pong");
  }
});

client.login(token);
