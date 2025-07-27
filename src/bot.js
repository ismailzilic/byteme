require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("node:fs");

const primaryColor = [0, 173, 239]; //RGB values

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.commands = new Collection();
client.commandArray = [];
client.color = primaryColor;

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.login(token);
client.handleCommands();
client.handleEvents();
