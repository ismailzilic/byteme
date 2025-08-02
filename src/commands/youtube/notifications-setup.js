const {
  ChannelType,
  SlashCommandBuilder,
  InteractionContextType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const {
  createNotificationConfig,
  updateLastCheckedVideo,
  alreadyExists,
} = require("../../database/operations/op-NotificationConfig");
const Parser = require("rss-parser");

const parser = new Parser();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("notifications-setup")
    .setDescription("Sets up notifications for a YouTube channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setContexts(InteractionContextType.Guild)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Server channel where the notifications will be sent.")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
    )
    .addStringOption((option) =>
      option
        .setName("yt-channel-id")
        .setDescription(
          "ID of a YouTube channel whose notification you want to be sent."
        )
        .setRequired(true)
    ),
  async execute(interaction, client) {
    try {
      await interaction.deferReply();

      const guildChannelId = interaction.options.getChannel("channel");
      const ytChannelId = interaction.options.getString("yt-channel-id");

      if (await alreadyExists(guildChannelId, ytChannelId)) {
        return interaction.followUp(
          "The YouTube channel is already subscribed to the specified server channel."
        );
      }

      const YT_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${ytChannelId}`;

      const feed = await parser.parseURL(YT_URL).catch((error) => {
        interaction.followUp(
          "There was an error while fetching the YouTube channel. Double-check the ID."
        );
      });

      if (!feed) return;

      const guildId = interaction.guildId;
      const ytChannelTitle = feed.title;
      const newNotificationConfig = {
        guildId,
        guildChannelId,
        ytChannelId,
        ytChannelTitle,
      };
      await createNotificationConfig(newNotificationConfig);

      if (feed.items.length) {
        const latestVideo = feed.items[0];
        await updateLastCheckedVideo(
          { ytChannelId, guildChannelId },
          latestVideo
        )
          .then(() => {
            const embed = new EmbedBuilder()
              .setColor(client.config.colors.primary)
              .setTitle("YouTube channel configured successfully.")
              .setDescription(
                `${guildChannelId} will get notified whenever there's a new upload from **${ytChannelTitle}**`
              )
              .setTimestamp();

            interaction.followUp({ embeds: [embed] });
          })
          .catch((error) => {
            interaction.followUp("Database error.");
          });
      }
    } catch (error) {
      console.log(`Error in ${__filename}: ${error}`);
    }
  },
};
