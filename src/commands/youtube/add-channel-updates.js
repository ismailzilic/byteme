const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-youtube-channel")
    .setDescription("Adds a YouTube channel to send upload notifications."),
  async execute(interaction, client) {
    let webhooks = new Collection();
    channel
      .fetchWebhooks()
      .then((fetchedWebhooks) => {
        webhooks = fetchedWebhooks;
        webhooks.filter((webhook) => webhook.name == webhookName);
      })
      .catch((error) => {
        console.error(`Error while fetching webhooks ${error}`);
      });
  },
};
