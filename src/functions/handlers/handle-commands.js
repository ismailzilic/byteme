require("dotenv").config();
const { token } = process.env;
const { REST, Routes } = require("discord.js");
const fs = require("node:fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const { commands, commandArray } = client;

    const commandFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const rest = new REST().setToken(token);
    const clientId = "1396116482072645722";

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
