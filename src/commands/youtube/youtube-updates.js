const {
  ChannelType,
  SlashCommandBuilder,
  InteractionContextType,
  PermissionFlagsBits,
} = require("discord.js");
const { createWebhook } = require("../../webhooks/create-webhook.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube-updates")
    .setDescription(
      "Sets a channel where all YouTube uploads will be sent. (This will create a webhook)"
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ManageWebhooks | PermissionFlagsBits.ManageChannels
    )
    .setContexts(InteractionContextType.Guild)
    .addChannelOption(
      (channel) =>
        channel
          .setName("channel")
          .setDescription("Target channel.")
          .setRequired(true)
          .addChannelTypes(ChannelType.GuildText) // Allows only text channels
    ),
  async execute(interaction, client) {
    const channel = interaction.options.getChannel("channel");
    const webhookName = "YouTube Uploads";
    const webhookDesc = "Webhook used by YouTube to send notifications.";

    (async () =>
      await createWebhook(client, channel, webhookName, webhookDesc))();

    await interaction.reply({
      content: `Channel <#${channel.id}> set as YouTube uploads channel.`,
    });
  },
};
