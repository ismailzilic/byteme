const {
  SlashCommandBuilder,
  InteractionContextType,
  PermissionFlagsBits,
  MessageFlags,
} = require("discord.js");

const {
  createYouTubeChannels,
} = require("../../database/crud/crud-YouTubeChannels.js");
const {
  createYouTubeVideos,
} = require("../../database/crud/crud-YouTubeVideos.js");
const { parseData } = require("../../tools/parse-data.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube-channel-add")
    .setDescription(
      "Subscribes a specified YouTube channel to notification feed."
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ManageWebhooks | PermissionFlagsBits.ManageChannels
    )
    .setContexts(InteractionContextType.Guild)
    .addStringOption((channelId) =>
      channelId
        .setName("channel-id")
        .setDescription("Target YouTube channel ID.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const channelId = interaction.options.getString("channel-id");

    let data;
    (async () => (data = await parseData(channelId)))();

    try {
      createYouTubeChannels(channelId, data.title, data.link, data.feedUrl);
      createYouTubeVideos(channelId, data.items);
    } catch (error) {
      return interaction.reply({
        content: "Unable to add specified YouTube channel.",
      });
    }

    await interaction.reply({
      content: `YouTube channel subscribed.`,
    });
  },
};
