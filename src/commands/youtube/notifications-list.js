const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  InteractionContextType,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");
const {
  selectAllNotificationConfigs,
  selectNotificationConfigsByGuildChannel,
} = require("../../database/queries/notificationconfig.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("notifications-list")
    .setDescription("Fetches all YouTube channels set up in this server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setContexts(InteractionContextType.Guild)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          "(Optional) Channel you want to get all set YouTube notifications."
        )
        .setRequired(false)
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
    ),
  async execute(interaction, client) {
    await interaction.deferReply({ content: "Fetching list..." });

    const guildChannel = interaction.options.getChannel("channel");

    let allNotificationConfigs;

    if (guildChannel)
      allNotificationConfigs = await selectNotificationConfigsByGuildChannel(
        guildChannel
      );
    else allNotificationConfigs = await selectAllNotificationConfigs();

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
      )
      .setTimestamp();

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
          value: `**ID:** \`\`${data.ytChannelId}\`\`\n**Name:** \`\`${data.ytChannelTitle}\`\``,
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
