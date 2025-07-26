const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Latency info"),
  async execute(interaction, client) {
    console.log(client);
    await interaction.reply({
      content: `User ID: **${interaction.user.id}**\nUsername: **${interaction.user.username}**\n*This response message is only visible to you.*`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
