require("dotenv").config();
const { DISCORD_BOT_TOKEN } = process.env;
const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

module.exports = (client) => {
  client.handleCommands = async () => {
    const { commands, commandArray } = client;

    const commandFolders = fs.readdirSync(path.join("src", "commands"));
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(path.join("src", "commands", `${folder}`))
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(path.join(
          __dirname,
          "..",
          "..",
          "commands",
          `${folder}`,
          `${file}`
        ));
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const rest = new REST().setToken(DISCORD_BOT_TOKEN);
    const clientId = client.config.clientId;

    try {
      console.log(
        `Started refreshing ${commandArray.length} application (/) commands.`
      );

      const data = await rest.put(Routes.applicationCommands(clientId), {
        body: commandArray,
      });

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      console.error(error);
    }
  };
};
