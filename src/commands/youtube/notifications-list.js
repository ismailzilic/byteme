const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  InteractionContextType,
  EmbedBuilder,
  MessageFlags,
} = require("discord.js");
const NotificationConfig = require("../../database/operations/op-NotificationConfig.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("notifications-list")
    .setDescription("Fetches all YouTube channels set up in this server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setContexts(InteractionContextType.Guild),
  async execute(interaction, client) {
    await interaction.deferReply({ content: "Fetching list..." });

    const allNotificationConfigs =
      await NotificationConfig.findAllNotificationConfigs();

    const embed = new EmbedBuilder()
      .setColor(client.config.colors.primary)
      .setTitle("List of all saved channels.")
      .addFields(
        {
          name: "YouTube channel",
          value: "",
          inline: true,
        },
        {
          name: "Server channel",
          value: "",
          inline: true,
        }
      );

    if (allNotificationConfigs.length <= 0)
      return await interaction.followUp({ embeds: [embed] });

    allNotificationConfigs.forEach((data) => {
      embed.addFields(
        {
          name: "",
          value: "",
          inline: false,
        },
        {
          name: "",
          value: `**ID:** ${data.ytChannelId}\n**Name:** ${data.ytChannelTitle}`,
          inline: true,
        },
        {
          name: "",
          value: data.guildChannelId,
          inline: true,
        }
      );
    });

    await interaction.followUp({ embeds: [embed] });
  },
};
