const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  InteractionContextType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("notifications-remove")
    .setDescription(
      "Removes the specified YouTube channel from server notifications."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setContexts(InteractionContextType.Guild),
  async execute(interaction, client) {
    await interaction.reply("Not implemented.");
  },
};
