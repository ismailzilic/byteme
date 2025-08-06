const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  InteractionContextType,
  ChannelType,
  EmbedBuilder,
} = require("discord.js");
const {
  removeNotificationConfig,
  alreadyExists,
} = require("../../database/queries/notificationconfig.js");

const command = new SlashCommandBuilder()
  .setName("notifications-remove")
  .setDescription("Removes YouTube channel notifications from this server.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
  .setContexts(InteractionContextType.Guild)
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("Target server channel.")
      .setRequired(true)
      .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
  )
  .addStringOption((option) =>
    option
      .setName("yt-channel-id")
      .setDescription(
        "Target YouTube channel ID. You can check the ID with /notifications-list"
      )
      .setRequired(true)
  );

const execute = async (interaction, client) => {
  try {
    await interaction.deferReply({ content: "Deleting the entry..." });

    const guildChannelId = interaction.options.getChannel("channel");
    const ytChannelId = interaction.options.getString("yt-channel-id");

    if (!alreadyExists) {
      return await interaction.followUp({
        content:
          "Entered parameters have not been configured, can't delete a non-existing record.",
      });
    }

    if (await removeNotificationConfig(guildChannelId, ytChannelId)) {
      const embed = new EmbedBuilder()
        .setColor(client.config.colors.primary)
        .setTitle("YouTube channel removed successfully.")
        .addFields({
          name: "",
          value: `Notifications turned off for YouTube ID \`\`${ytChannelId}\`\` in channel **${guildChannelId}**`,
        })
        .setTimestamp();

      await interaction.followUp({
        embeds: [embed],
      });
    } else
      await interaction.followUp({
        content: "Error while searching the database.",
      });
  } catch (error) {
    console.log(`Error in ${__filename}: ${error}`);
  }
};

module.exports = { data: command, execute };
