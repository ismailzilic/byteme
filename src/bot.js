require("dotenv").config();
const { token } = process.env;

const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const path = require("node:path");
const fs = require("node:fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  partials: [Partials.Channel],
});

client.config = JSON.parse(fs.readFileSync(path.join("src", "config.json")));
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(path.join("src", "functions"));
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(path.join("src", "functions", `${folder}`))
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles)
    require(path.join(__dirname, "functions", `${folder}`, `${file}`))(client);
}

client.login(token);
client.handleCommands();
client.handleEvents();
